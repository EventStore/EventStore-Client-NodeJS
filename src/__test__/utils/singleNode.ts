/* eslint-disable no-constant-condition */
import { join } from "path";
import { rmdir, mkdir, readFile, writeFile } from "fs/promises";

import { v4 as uuid } from "uuid";
import * as getPort from "get-port";
import { upAll, down, exec } from "docker-compose";
import { parse, stringify } from "yaml";

export class SingleNode {
  private id: string;
  private port!: number;
  private ready: Promise<void>;

  constructor(id = uuid()) {
    this.id = id;
    this.ready = this.initialize();
  }

  public get certPath(): string {
    return this.path("./certs/node/node.crt");
  }
  public get uri(): string {
    return `127.0.0.1:${this.port}`;
  }

  public up = async (): Promise<void> => {
    // allow up to 5 minites to complete (pulling a package can take a while)
    jest.setTimeout(300_000);

    await this.ready;

    const { exitCode: e } = await upAll({ cwd: this.path() });
    expect(e).toBe(0);

    while (true) {
      try {
        const { exitCode } = await exec(
          "eventstore.db",
          `curl --fail --insecure https://localhost:2113/health/live`,
          { cwd: this.path() }
        );
        if (exitCode === 0) break;
      } catch (error) {
        // retry
      }
    }
  };

  public down = async (): Promise<void> => {
    const { exitCode } = await down({
      cwd: this.path(),
      commandOptions: ["--volumes"],
    });
    expect(exitCode).toBe(0);

    await rmdir(this.path(), { recursive: true });
  };

  private initialize = async (): Promise<void> => {
    this.port = await getPort();
    const baseConfig = await readFile(
      join(__dirname, "./singleNode.yaml"),
      "utf-8"
    );
    const config = parse(baseConfig);
    config.services[
      "eventstore.db"
    ].image = `docker.pkg.github.com/eventstore/eventstore/eventstore:${
      process.env.EVENTSTORE_VERSION ?? "ci"
    }`;
    config.services["eventstore.db"].ports = [`${this.port}:2113`];
    await mkdir(this.path(), { recursive: true });
    await writeFile(this.path("./docker-compose.yaml"), stringify(config));
  };

  private path = (...parts: string[]): string => {
    return join(__dirname, "instances", this.id, ...parts);
  };
}
