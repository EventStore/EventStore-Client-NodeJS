import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { Empty } from "../../generated/shared_pb";

import { Client } from "../Client";
import type { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface RestartSubsystemOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Restarts the entire projection subsystem.
     * @param options Restart subsystem options.
     */
    restartSubsystem(options?: RestartSubsystemOptions): Promise<void>;
  }
}

Client.prototype.restartSubsystem = async function (
  this: Client,
  baseOptions: RestartSubsystemOptions = {}
): Promise<void> {
  const req = new Empty();

  debug.command("restartSubsystem: %O", {
    options: baseOptions,
  });
  debug.command_grpc("restartSubsystem: %g", req);

  return this.execute(
    ProjectionsClient,
    "restartSubsystem",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.restartSubsystem(
          req,
          ...this.callArguments(baseOptions),
          (error) => {
            if (error) return reject(convertToCommandError(error));
            return resolve();
          }
        );
      })
  );
};
