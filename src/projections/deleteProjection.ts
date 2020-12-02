import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { DeleteReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface DeleteProjectionOptions extends BaseOptions {
  /**
   * Deletes emitted streams
   * @defaultValue true
   */
  deleteEmittedStreams?: boolean;

  /**
   * Deletes state stream
   * @defaultValue true
   */
  deleteStateStream?: boolean;

  /**
   * Deletes checkpoint stream
   * @defaultValue true
   */
  deleteCheckpointStream?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Deletes a projection.
     * @param projectionName The name of the projection to delete
     * @param options Delete projection options
     */
    deleteProjection(
      projectionName: string,
      options?: DeleteProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.deleteProjection = async function (
  this: Client,
  projectionName: string,
  {
    deleteEmittedStreams = true,
    deleteStateStream = true,
    deleteCheckpointStream = true,
    ...baseOptions
  }: DeleteProjectionOptions = {}
): Promise<void> {
  const req = new DeleteReq();
  const options = new DeleteReq.Options();

  options.setName(projectionName);
  options.setDeleteEmittedStreams(deleteEmittedStreams);
  options.setDeleteStateStream(deleteStateStream);
  options.setDeleteCheckpointStream(deleteCheckpointStream);

  req.setOptions(options);

  debug.command("deleteProjection: %c", this);
  debug.command_grpc("deleteProjection: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "deleteProjection"
  );

  return new Promise<void>((resolve, reject) => {
    client.delete(req, this.metadata(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
