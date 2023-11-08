import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { UpdateReq } from "../../generated/projections_pb";
import { Empty } from "../../generated/shared_pb";

import { Client } from "../Client";
import schemas from "../schemas";
import type { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";
import { validateField } from "../utils/validation";

export interface UpdateProjectionOptions extends BaseOptions {
  /**
   * Enables emitting events from the projection.
   * Passing `undefined` will leave emitEnabled at its current value.
   *
   * @default undefined
   */
  emitEnabled?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Updates a projection.
     *
     * @param projectionName The name of the projection.
     * @param query The query to run.
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
  updateProjectionOptions: UpdateProjectionOptions = {}
): Promise<void> {
  const { emitEnabled, ...baseOptions } = updateProjectionOptions;

  validateField(schemas.projectionName, projectionName);
  validateField(schemas.query, query);
  validateField(
    schemas.updateProjectionOptions.optional(),
    updateProjectionOptions
  );

  const req = new UpdateReq();
  const options = new UpdateReq.Options();

  options.setName(projectionName);
  options.setQuery(query);

  if (emitEnabled == null) {
    options.setNoEmitOptions(new Empty());
  } else {
    options.setEmitEnabled(emitEnabled);
  }

  req.setOptions(options);

  debug.command("updateProjection: %O", {
    projectionName,
    query,
    options: { emitEnabled, ...baseOptions },
  });
  debug.command_grpc("updateProjection: %g", req);

  return this.execute(
    ProjectionsClient,
    "updateProjection",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.update(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
