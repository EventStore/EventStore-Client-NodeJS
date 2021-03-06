import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { ResultReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface GetProjectionResultOptions extends BaseOptions {
  /**
   * Sets partition.
   */
  fromPartition?: string;
}

declare module "../Client" {
  interface Client {
    /**
     * Gets the result of a projection.
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
  { fromPartition = "", ...baseOptions }: GetProjectionResultOptions = {}
): Promise<T> {
  const req = new ResultReq();
  const options = new ResultReq.Options();
  options.setName(projectionName);
  options.setPartition(fromPartition);

  req.setOptions(options);

  debug.command("getProjectionResult: %O", {
    projectionName,
    options: {
      fromPartition,
      ...baseOptions,
    },
  });
  debug.command_grpc("getProjectionResult: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "getProjectionResult"
  );

  return new Promise<T>((resolve, reject) => {
    client.result(
      req,
      ...this.callArguments(baseOptions),
      (error, response) => {
        if (error) return reject(convertToCommandError(error));
        return resolve(response.getResult()?.toJavaScript() as T);
      }
    );
  });
};
