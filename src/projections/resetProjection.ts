import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { ResetReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface ResetProjectionOptions extends BaseOptions {
  /**
   * If a checkpoint should be written.
   * @default true
   */
  writeCheckpoint?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Resets a projection. This will re-emit events.
     * Streams that are written to from the projection will also be soft deleted.
     * @param projectionName The name of the projection to reset.
     * @param options Reset projection options.
     */
    resetProjection(
      projectionName: string,
      options?: ResetProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.resetProjection = async function (
  this: Client,
  projectionName: string,
  { writeCheckpoint = true, ...baseOptions }: ResetProjectionOptions = {}
): Promise<void> {
  const req = new ResetReq();
  const options = new ResetReq.Options();

  options.setName(projectionName);
  options.setWriteCheckpoint(writeCheckpoint);

  req.setOptions(options);

  debug.command("resetProjection: %O", {
    projectionName,
    options: { writeCheckpoint, ...baseOptions },
  });
  debug.command_grpc("resetProjection: %g", req);

  return this.execute(
    ProjectionsClient,
    "resetProjection",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.reset(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
