import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { CreateReq } from "../../generated/projections_pb";
import { Client } from "../Client";
import { BaseOptions } from "../types";

import { debug, convertToCommandError } from "../utils";

export interface CreateContinuousProjectionOptions extends BaseOptions {
  /**
   * Enables tracking emitted streams
   * @defaultValue false
   */
  trackEmittedStreams?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Creates a continuous projection.
     * @param projectionName The name of the projection
     * @param query The query to run
     * @param options Continuous projection options.
     */
    createContinuousProjection(
      projectionName: string,
      query: string,
      options?: CreateContinuousProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.createContinuousProjection = async function (
  this: Client,
  projectionName: string,
  query: string,
  {
    trackEmittedStreams = false,
    ...baseOptions
  }: CreateContinuousProjectionOptions = {}
): Promise<void> {
  const req = new CreateReq();
  const options = new CreateReq.Options();
  const continuous = new CreateReq.Options.Continuous();

  continuous.setName(projectionName);
  continuous.setTrackEmittedStreams(trackEmittedStreams);

  options.setContinuous(continuous);
  options.setQuery(query);

  req.setOptions(options);

  debug.command("createContinuousProjection: %O", {
    projectionName,
    query,
    options: {
      trackEmittedStreams,
      ...baseOptions,
    },
  });
  debug.command_grpc("createContinuousProjection: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "createContinuousProjection"
  );

  return new Promise<void>((resolve, reject) => {
    client.create(req, this.metadata(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
