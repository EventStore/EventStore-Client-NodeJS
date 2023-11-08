import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { ResultReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import schemas from "../schemas";
import type { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";
import { validateField } from "../utils/validation";

export interface GetProjectionResultOptions extends BaseOptions {
  /**
   * Gets result from partition.
   */
  partition?: string;
}

declare module "../Client" {
  interface Client {
    /**
     * Gets the result of a projection.
     *
     * @param projectionName The name of the projection.
     * @param options Get result options.
     */
    getProjectionResult<T = unknown>(
      projectionName: string,
      options?: GetProjectionResultOptions
    ): Promise<T>;
  }
}

Client.prototype.getProjectionResult = async function <T = unknown>(
  this: Client,
  projectionName: string,
  getProjectionResultOptions: GetProjectionResultOptions = {}
): Promise<T> {
  const { partition = "", ...baseOptions } = getProjectionResultOptions;

  validateField(schemas.projectionName, projectionName);
  validateField(
    schemas.getProjectionResultOptions.optional(),
    getProjectionResultOptions
  );

  const req = new ResultReq();
  const options = new ResultReq.Options();
  options.setName(projectionName);
  options.setPartition(partition);

  req.setOptions(options);

  debug.command("getProjectionResult: %O", {
    projectionName,
    options: {
      partition,
      ...baseOptions,
    },
  });
  debug.command_grpc("getProjectionResult: %g", req);

  return this.execute(
    ProjectionsClient,
    "getProjectionResult",
    (client) =>
      new Promise<T>((resolve, reject) => {
        client.result(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(response.getResult()?.toJavaScript() as T);
          }
        );
      })
  );
};
