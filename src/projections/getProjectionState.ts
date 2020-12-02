import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { StateReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface GetProjectionStateOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Gets the result of a projection
     * @param projectionName The name of the projection
     * @param options Get state options
     */
    getProjectionState<T = unknown>(
      projectionName: string,
      options?: GetProjectionStateOptions
    ): Promise<T>;
  }
}

Client.prototype.getProjectionState = async function <T = unknown>(
  this: Client,
  projectionName: string,
  baseOptions: GetProjectionStateOptions = {}
): Promise<T> {
  const req = new StateReq();
  const options = new StateReq.Options();
  options.setName(projectionName);
  req.setOptions(options);

  debug.command("getProjectionState: %O", {
    projectionName,
    options: baseOptions,
  });
  debug.command_grpc("getProjectionState: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "getProjectionState"
  );

  return new Promise<T>((resolve, reject) => {
    client.state(req, this.metadata(baseOptions), (error, response) => {
      if (error) return reject(convertToCommandError(error));
      return resolve(response.getState()?.toJavaScript() as T);
    });
  });
};
