import { join } from "path";
import * as fs from "fs";
import { promisify } from "util";

import { v4 as uuid } from "uuid";
import * as getPort from "get-port";
import { upAll, down, exec } from "docker-compose";
import { stringify } from "yaml";

import { EndPoint } from "../../types";

const rmdir = promisify(fs.rmdir);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const nodeList = (count: number, ipStub: string) =>
  Promise.all<ClusterLocation>(
    Array.from({ length: count }, async (_, i) => ({
      port: await getPort(),
      ipv4_address: `${ipStub}.${10 + i}`,
    }))
  );

const createCertGen = (internalIPs: ClusterLocation[], insecure: boolean) =>
  insecure
    ? {}
    : {
        "cert-gen": {
          image:
            "docker.pkg.github.com/eventstore/es-gencert-cli/es-gencert-cli:1.0.2",
          entrypoint: "bash",
          command: `-c "es-gencert-cli create-ca -out /tmp/certs/ca &&
    ${internalIPs
      .map(
        ({ ipv4_address }, i) =>
          `es-gencert-cli create-node -ca-certificate /tmp/certs/ca/ca.crt -ca-key /tmp/certs/ca/ca.key -out /tmp/certs/node${i} -ip-addresses 127.0.0.1,${ipv4_address}`
      )
      .join(" && ")}"`,
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
  insecure: boolean
) =>
  internalIPs.reduce(
    (acc, { port, ipv4_address }, i, ipAddresses) => ({
      ...acc,
      [`esdb-node-${i}`]: {
        image: "docker.pkg.github.com/eventstore/eventstore/eventstore:ci",
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
          "EVENTSTORE_RUN_PROJECTIONS=All",
          "EVENTSTORE_DISCOVER_VIA_DNS=false",
          ...(insecure
            ? [`EVENTSTORE_INSECURE=true`]
            : [
                `EVENTSTORE_CERTIFICATE_FILE=/etc/eventstore/certs/node${i}/node.crt`,
                `EVENTSTORE_CERTIFICATE_PRIVATE_KEY_FILE=/etc/eventstore/certs/node${i}/node.key`,
                "EVENTSTORE_TRUSTED_ROOT_CERTIFICATES_PATH=/etc/eventstore/certs/ca",
              ]),
        ],
        ports: [`${port}:2113`],
        networks: {
          clusternetwork: {
            ipv4_address,
          },
        },
        restart: "unless-stopped",
        ...(insecure
          ? {}
          : {
              volumes: ["./certs:/etc/eventstore/certs"],
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
  private retryCount = 3;
  private locations: ClusterLocation[] = [];
  private ready: Promise<void>;

  constructor(count: number, insecure = false, id = uuid()) {
    this.id = id;
    this.count = count;
    this.insecure = insecure;
    this.ready = this.initialize();
  }

  public get certPath(): string {
    if (this.insecure) throw new Error("No Cert for insecure cluster");
    return this.path("./certs/ca/ca.crt");
  }
  public domain = "127.0.0.1";
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
    // allow up to 5 minites to complete (pulling a package can take a while)
    jest.setTimeout(300_000);

    await this.ready;

    try {
      const { exitCode: e } = await upAll({ cwd: this.path() });
      expect(e).toBe(0);
    } catch (error) {
      if (this.retryCount > 0) {
        this.retryCount -= 1;

        console.log(
          `Failed to initialize cluster. Retry ${3 - this.retryCount}`,
          error
        );

        await this.cleanUp();
        await this.initialize();
        return this.up();
      }

      console.log(`${this.ipStub}.0/24`);
      console.log(JSON.stringify(this.endpoints, null, 2));
      console.error(error.err);
      return;
    }

    health: while (true) {
      for (let i = 0; i < this.count; i++) {
        try {
          const { exitCode } = await exec(
            `esdb-node-${i}`,
            `curl --fail --insecure http${
              this.insecure ? "" : "s"
            }://localhost:2113/health/live`,
            { cwd: this.path() }
          );
          // console.log(`--> esdb-node-${i}`, exitCode, out, err);

          if (exitCode === 0) break health;
        } catch (error) {
          // retry
          // console.log(`--> esdb-node-${i}`, error);
        }
      }
    }
  };

  public down = async (): Promise<void> => {
    const { exitCode } = await down({
      cwd: this.path(),
      commandOptions: ["--volumes"],
    });
    expect(exitCode).toBe(0);

    await this.cleanUp();
  };

  private initialize = async (): Promise<void> => {
    this.ipStub = `172.${rnd(0, 255)}.${process.env.JEST_WORKER_ID}`;
    this.locations = await nodeList(this.count, this.ipStub);

    const config = {
      version: "3.5",
      services: {
        "volumes-provisioner": {
          image: "hasnat/volumes-provisioner",
          environment: {
            PROVISION_DIRECTORIES: "1000:1000:0755:/tmp/certs",
          },
          volumes: ["./certs:/tmp/certs"],
          network_mode: "none",
        },
        ...createCertGen(this.locations, this.insecure),
        ...createNodes(this.locations, this.domain, this.insecure),
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
    await writeFile(this.path("./docker-compose.yaml"), stringify(config));
  };

  private path = (...parts: string[]): string => {
    return join(__dirname, "instances", this.id, ...parts);
  };

  private cleanUp = async () => {
    await rmdir(this.path(), { recursive: true });
  };
}
