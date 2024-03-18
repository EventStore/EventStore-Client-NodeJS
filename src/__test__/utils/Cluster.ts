import { join, relative } from "path";
import * as fs from "fs";
import { promisify } from "util";
import * as cp from "child_process";

import { v4 as uuid } from "uuid";
import * as getPort from "get-port";
import { upAll, down, exec, stopOne, logs } from "docker-compose/dist/v2";

import type { EndPoint, Certificate } from "../../types";

import { testDebug } from "./debug";
import { dockerImages } from "./dockerImages";

const rmdir = promisify(fs.rmdir);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const CPExec = promisify(cp.exec);

type LogLevel = "Warning" | "Debug" | "Information" | "Error" | "Verbose";
interface LogLevels {
  Default: LogLevel;
  System: LogLevel;
  Microsoft: LogLevel;
  Grpc: LogLevel;
}

const nodeList = (count: number, ipStub: string) =>
  Promise.all<ClusterLocation>(
    Array.from({ length: count }, async (_, i) => ({
      port: await getPort(),
      ipv4_address: `${ipStub}.${10 + i}`,
    }))
  );

const createCertGen = (
  internalIPs: ClusterLocation[],
  domain: string,
  insecure: boolean
) =>
  insecure
    ? {}
    : {
        "cert-gen": {
          image: dockerImages.certGen,
          entrypoint: "bash",
          command: `-c "es-gencert-cli create-ca -out /tmp/certs/ca && ${internalIPs
            .map(
              ({ ipv4_address }, i) =>
                `es-gencert-cli create-node -ca-certificate /tmp/certs/ca/ca.crt -ca-key /tmp/certs/ca/ca.key -out /tmp/certs/node${i} -ip-addresses 127.0.0.1,${ipv4_address} -dns-names ${domain}`
            )
            .join(
              " && "
            )} && es-gencert-cli create-user -username admin -ca-certificate /tmp/certs/ca/ca.crt -ca-key /tmp/certs/ca/ca.key -out /tmp/certs/user-admin && es-gencert-cli create-user -username invalid -ca-certificate /tmp/certs/ca/ca.crt -ca-key /tmp/certs/ca/ca.key -out /tmp/certs/user-invalid && chown -R 1000:1000 /tmp/certs && chmod -R 755 /tmp/certs"`,
          user: "1000:1000",
          volumes: ["./certs:/tmp/certs"],
          depends_on: ["volumes-provisioner"],
        },
      };

interface ClusterLocation {
  port: number;
  ipv4_address: string;
}

const createNodes = (
  internalIPs: ClusterLocation[],
  domain: string,
  insecure: boolean,
  extraOptions: string[]
) =>
  internalIPs.reduce(
    (acc, { port, ipv4_address }, i, ipAddresses) => ({
      ...acc,
      [`esdb-node-${i}`]: {
        image: dockerImages.esdb,
        environment: [
          `EVENTSTORE_GOSSIP_SEED=${ipAddresses
            .reduce<string[]>(
              (acc, { ipv4_address: ip }) =>
                ip === ipv4_address ? acc : [...acc, `${ip}:2113`],
              []
            )
            .join(",")}`,
          `EVENTSTORE_INT_IP=${ipv4_address}`,
          `EVENTSTORE_ADVERTISE_HOST_TO_CLIENT_AS=${domain}`,
          `EVENTSTORE_ADVERTISE_HTTP_PORT_TO_CLIENT_AS=${port}`,
          `EVENTSTORE_CLUSTER_SIZE=${internalIPs.length}`,
          "EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true",
          "EVENTSTORE_RUN_PROJECTIONS=All",
          "EVENTSTORE_LOG_CONFIG=/etc/eventstore/config/logconfig.json",
          "EVENTSTORE_DISCOVER_VIA_DNS=false",
          "EventStore__Plugins__UserCertificates__Enabled=true",
          ...(insecure
            ? [`EVENTSTORE_INSECURE=true`]
            : [
                `EVENTSTORE_CERTIFICATE_FILE=/etc/eventstore/certs/node${i}/node.crt`,
                `EVENTSTORE_CERTIFICATE_PRIVATE_KEY_FILE=/etc/eventstore/certs/node${i}/node.key`,
                "EVENTSTORE_TRUSTED_ROOT_CERTIFICATES_PATH=/etc/eventstore/certs/ca",
              ]),
          ...extraOptions,
        ],
        ports: [`${port}:2113`],
        networks: {
          clusternetwork: {
            ipv4_address,
          },
        },
        restart: "unless-stopped",
        ...(insecure
          ? {
              volumes: ["./config:/etc/eventstore/config"],
            }
          : {
              volumes: [
                "./certs:/etc/eventstore/certs",
                "./config:/etc/eventstore/config",
              ],
              depends_on: ["cert-gen"],
            }),
      },
    }),
    {}
  );

const rnd = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export class Cluster {
  private id: string;
  private count: number;
  private insecure: boolean;
  private ipStub!: string;
  private certificates?: {
    root: Buffer;
    users: {
      admin: Certificate;
      invalid: Certificate;
    };
  };
  private retryCount = 3;
  private locations: ClusterLocation[] = [];
  private ready: Promise<void>;
  private inspected = false;
  private failed = false;
  private logLevel: LogLevels = {
    Default: "Debug",
    System: "Warning",
    Microsoft: "Warning",
    Grpc: "Warning",
  };
  private extraOptions: string[] = [];

  constructor(count: number, insecure = false, id = uuid()) {
    this.id = id;
    this.count = count;
    this.insecure = insecure;
    this.ready = this.initialize();
  }

  public setLogLevel = (levels: Partial<LogLevels>): this => {
    this.logLevel = { ...this.logLevel, ...levels };
    return this;
  };

  public setOption = (key: string, value: unknown): this => {
    this.extraOptions.push(`${key}=${value}`);
    return this;
  };

  public get certs() {
    if (this.insecure) {
      throw new Error("No Cert for insecure cluster");
    }
    if (this.failed || !this.certificates) {
      throw new Error("Cluster failed to initialize");
    }
    if (Object.values(this.certificates).some((value) => value === null)) {
      throw new Error("One or more certificate properties are null");
    }

    return this.certificates;
  }
  public get certPath() {
    if (this.insecure) throw new Error("No Cert for insecure cluster");

    return {
      root: this.path("./certs/ca/ca.crt"),
      admin: {
        certPath: this.path("./certs/user-admin/user-admin.crt"),
        certKeyPath: this.path("./certs/user-admin/user-admin.key"),
      },
      invalid: {
        certPath: this.path("./certs/user-invalid/user-invalid.crt"),
        certKeyPath: this.path("./certs/user-invalid/user-invalid.key"),
      },
    };
  }
  public domain = "client.bespin.dev";
  public get uri(): string {
    return `${this.domain}:${this.locations[0].port}`;
  }
  public get endpoints(): EndPoint[] {
    return this.locations.map(({ port }) => ({
      address: this.domain,
      port,
    }));
  }

  public up = async (): Promise<void> => {
    await this.ready;

    try {
      const { exitCode: e } = await upAll({ cwd: this.path() });
      if (e !== 0) throw `Exited with code ${e}`;
    } catch (error) {
      if (this.retryCount > 0) {
        this.retryCount -= 1;

        testDebug(
          `Failed to initialize cluster. Retry ${3 - this.retryCount}\n${
            error.err
          } `
        );

        await this.down();
        await this.cleanUp();
        await this.initialize();
        return this.up();
      }

      this.failed = true;

      console.error(`Cluster failed to initialize with error: ${error.err}`);
    }

    await this.healthy();

    if (this.count > 1) {
      await this.leaderElected();
    }

    if (!this.insecure) {
      this.certificates = {
        root: await readFile(this.certPath.root),
        users: {
          admin: {
            certFile: await readFile(this.certPath.admin.certPath),
            certKeyFile: await readFile(this.certPath.admin.certKeyPath),
          },
          invalid: {
            certFile: await readFile(this.certPath.invalid.certPath),
            certKeyFile: await readFile(this.certPath.invalid.certKeyPath),
          },
        },
      };
    }
  };

  public down = async (): Promise<void> => {
    if (this.inspected) {
      const composeFile = relative(
        process.cwd(),
        this.path("./docker-compose.yaml")
      );

      const folder = relative(process.cwd(), this.path());

      console.log(
        "Leaving cluster open for inspection. Dont forget to take it down: \n",
        `docker compose -f ${composeFile} down --volumes && rm -rf ${folder}`
      );

      return;
    }

    const { exitCode } = await down({
      cwd: this.path(),
      commandOptions: ["--volumes"],
    });

    if (exitCode !== 0) throw `Exited with code ${exitCode}`;

    await this.cleanUp();
  };

  public enableNodeLogs = async (
    node: EndPoint = this.endpoints[0]
  ): Promise<void> => {
    const nodeId = this.endpointToNodeId(node);
    logs(nodeId, {
      cwd: this.path(),
      follow: true,
      log: true,
    });
  };

  public killNode = async (node: EndPoint): Promise<void> => {
    const nodeId = this.endpointToNodeId(node);
    const response = await stopOne(nodeId, {
      cwd: this.path(),
    });

    if (response.exitCode === 0) return;

    console.log(response);
    throw new Error("Failed to kill node");
  };

  public resurrect = async (): Promise<void> => {
    const response = await upAll({
      cwd: this.path(),
    });

    if (response.exitCode === 0) {
      return this.healthy();
    }

    console.log(response);
    throw new Error("Failed to resurrect node");
  };

  public inspect = () => this.openInBrowser(false);
  public openInBrowser = async (launch = true): Promise<void> => {
    this.inspected = true;
    const url = `http${this.insecure ? "" : "s"}://${this.uri}`;

    if (launch) {
      console.log(`Opening ui: ${url}`);

      const start =
        process.platform == "darwin"
          ? "open"
          : process.platform == "win32"
          ? "start"
          : "xdg-open";

      await CPExec(start + " " + url);
    } else {
      console.log(`ui available at: ${url}`);
    }
  };

  private initialize = async (): Promise<void> => {
    this.ipStub = `172.${rnd(0, 255)}.${process.env.JEST_WORKER_ID ?? 1}`;
    this.locations = await nodeList(this.count, this.ipStub);

    const config = {
      version: "3.5",
      services: {
        "volumes-provisioner": {
          image: dockerImages.volumesProvisioner,
          environment: {
            PROVISION_DIRECTORIES: "1000:1000:0755:/tmp/certs",
          },
          volumes: ["./certs:/tmp/certs"],
          network_mode: "none",
        },
        ...createCertGen(this.locations, this.domain, this.insecure),
        ...createNodes(
          this.locations,
          this.domain,
          this.insecure,
          this.extraOptions
        ),
      },
      networks: {
        clusternetwork: {
          name: `${this.id}.eventstoredb.local`,
          driver: "bridge",
          ipam: {
            driver: "default",
            config: [
              {
                subnet: `${this.ipStub}.0/24`,
              },
            ],
          },
        },
      },
    };

    await mkdir(this.path(), { recursive: true });
    await mkdir(this.path("./config"), { recursive: true });
    await writeFile(
      this.path("./config/logconfig.json"),
      JSON.stringify({
        Logging: {
          LogLevel: this.logLevel,
        },
      })
    );
    await writeFile(this.path("./docker-compose.yaml"), JSON.stringify(config));
  };

  private healthy = async (...nodes: string[]) => {
    nodes = !nodes.length
      ? Array.from({ length: this.count }, (_, i) => `esdb-node-${i}`)
      : nodes;

    const healthy = new Set();

    while (healthy.size !== nodes.length) {
      for (const node of nodes) {
        if (healthy.has(node)) continue;

        try {
          const response = await exec(
            node,
            `curl --fail --insecure http${
              this.insecure ? "" : "s"
            }://localhost:2113/health/live`,
            { cwd: this.path() }
          );

          if (response.exitCode === 0) {
            healthy.add(node);

            testDebug(`--> ${node} is healthy`);
          }
        } catch (error) {
          // retry
        }
      }
    }
  };

  private leaderElected = async (...nodes: string[]) => {
    nodes = !nodes.length
      ? Array.from({ length: this.count }, (_, i) => `esdb-node-${i}`)
      : nodes;

    const ready = new Set();

    while (ready.size !== nodes.length) {
      for (const node of nodes) {
        if (ready.has(node)) continue;

        try {
          const response = await exec(
            node,
            `curl --fail --insecure http${
              this.insecure ? "" : "s"
            }://localhost:2113/gossip`,
            { cwd: this.path() }
          );

          interface Member {
            state: "Unknown" | "Leader" | "Follower";
          }

          const { members } = JSON.parse(response.out) as { members: Member[] };

          if (
            members.every(({ state }) => state !== "Unknown") &&
            members.some(({ state }) => state === "Leader")
          ) {
            ready.add(node);

            testDebug(`--> ${node} is ready`);
          }
        } catch (error) {
          // retry
        }
      }
    }
  };

  private path = (...parts: string[]): string => {
    return join(__dirname, "instances", this.id, ...parts);
  };

  private cleanUp = async () => {
    try {
      await rmdir(this.path(), { recursive: true });
    } catch (error) {
      if (process.env.CI) return;
      if (error.code === "ENOENT") return;

      console.log(
        `Failed to clean up test files at "${this.path()}": ${error}`
      );
    }
  };

  private endpointToNodeId = (endpoint: EndPoint) => {
    const index = this.locations.findIndex(
      (location) => location.port === endpoint.port
    );

    if (index === -1) {
      throw new Error(`unknown node ${endpoint.address}:${endpoint.port}`);
    }

    return `esdb-node-${index}`;
  };
}
