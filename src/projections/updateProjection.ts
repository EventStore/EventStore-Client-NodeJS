import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { UpdateReq } from "../../generated/projections_pb";
import { Empty } from "../../generated/shared_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface UpdateProjectionOptions extends BaseOptions {
  /**
   * Enables tracking emitted streams
   * @defaultValue undefined
   */
  trackEmittedStreams?: boolean | undefined;
}

declare module "../Client" {
  interface Client {
    /**
     * Updates a projection
     * @param projectionName The name of the projection
     * @param query The query to run
     * @param options Projection options.
     */
    updateProjection(
      projectionName: string,
      query: string,
      options?: UpdateProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.updateProjection = async function (
  this: Client,
  projectionName: string,
  query: string,
  { trackEmittedStreams, ...baseOptions }: UpdateProjectionOptions = {}
): Promise<void> {
  const req = new UpdateReq();
  const options = new UpdateReq.Options();

  options.setName(projectionName);
  options.setQuery(query);

  if (trackEmittedStreams == null) {
    options.setNoEmitOptions(new Empty());
  } else {
    options.setEmitEnabled(trackEmittedStreams);
  }

  req.setOptions(options);

  debug.command("updateProjection: %O", {
    projectionName,
    query,
    options: { trackEmittedStreams, ...baseOptions },
  });
  debug.command_grpc("updateProjection: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "updateProjection"
  );

  return new Promise<void>((resolve, reject) => {
    client.update(req, ...this.callArguments(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
