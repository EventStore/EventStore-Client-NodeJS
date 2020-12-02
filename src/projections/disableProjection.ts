import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { DisableReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface DisableProjectionOptions extends BaseOptions {
  /**
   * If a checkpoint should be written
   * @defaultValue true
   */
  writeCheckpoint?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Disables a projection.
     * @param projectionName The name of the projection to disable
     * @param options Disable projection options
     */
    disableProjection(
      projectionName: string,
      options?: DisableProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.disableProjection = async function (
  this: Client,
  projectionName: string,
  { writeCheckpoint = true, ...baseOptions }: DisableProjectionOptions = {}
): Promise<void> {
  const req = new DisableReq();
  const options = new DisableReq.Options();

  options.setName(projectionName);
  options.setWriteCheckpoint(writeCheckpoint);

  req.setOptions(options);

  debug.command("disableProjection: %c", this);
  debug.command_grpc("disableProjection: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "disableProjection"
  );

  return new Promise<void>((resolve, reject) => {
    client.disable(req, this.metadata(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
