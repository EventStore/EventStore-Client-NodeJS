import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { EnableReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import schemas from "../schemas";
import type { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";
import { validateField } from "../utils/validation";

export interface EnableProjectionOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Enables a projection.
     *
     * @param projectionName The name of the projection to enable.
     * @param options Enable projection options.
     */
    enableProjection(
      projectionName: string,
      options?: EnableProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.enableProjection = async function (
  this: Client,
  projectionName: string,
  baseOptions: EnableProjectionOptions = {}
): Promise<void> {
  validateField(schemas.projectionName, projectionName);
  validateField(schemas.enableProjectionOptions.optional(), baseOptions);

  const req = new EnableReq();
  const options = new EnableReq.Options();

  options.setName(projectionName);

  req.setOptions(options);

  debug.command("enableProjection: %O", {
    projectionName,
    options: baseOptions,
  });
  debug.command_grpc("enableProjection: %g", req);

  return this.execute(
    ProjectionsClient,
    "enableProjection",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.enable(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
