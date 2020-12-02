import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { Empty } from "../../generated/shared_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface RestartSubsystemOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Restarts the entire projection subsystem
     * @param options Restart subsystem options
     */
    restartSubsystem(options?: RestartSubsystemOptions): Promise<void>;
  }
}

Client.prototype.restartSubsystem = async function (
  this: Client,
  baseOptions: RestartSubsystemOptions = {}
): Promise<void> {
  const req = new Empty();

  debug.command("RestartSubsystem: %c", this);
  debug.command_grpc("RestartSubsystem: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "RestartSubsystem"
  );

  return new Promise<void>((resolve, reject) => {
    client.restartSubsystem(req, this.metadata(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
