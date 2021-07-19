import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { CreateReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface CreateTransientProjectionOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Creates a transient projection.
     * @param projectionName The name of the projection.
     * @param query The query to run.
     * @param options Transient projection options.
     */
    createTransientProjection(
      projectionName: string,
      query: string,
      options?: CreateTransientProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.createTransientProjection = async function (
  this: Client,
  projectionName: string,
  query: string,
  baseOptions: CreateTransientProjectionOptions = {}
): Promise<void> {
  const req = new CreateReq();
  const options = new CreateReq.Options();
  const transient = new CreateReq.Options.Transient();

  transient.setName(projectionName);

  options.setTransient(transient);
  options.setQuery(query);

  req.setOptions(options);

  debug.command("createTransientProjection: %O", {
    projectionName,
    query,
    options: baseOptions,
  });
  debug.command_grpc("createTransientProjection: %g", req);

  return this.execute(
    ProjectionsClient,
    "CreateTransientProjection",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.create(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
