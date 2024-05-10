import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { DisableReq } from "../../generated/projections_pb";

import { Client } from "../Client";
import type { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface DisableProjectionOptions extends BaseOptions {}
export interface AbortProjectionOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Disables a projection.
     * @param projectionName - The name of the projection to disable.
     * @param options - Disable projection options.
     */
    disableProjection(
      projectionName: string,
      options?: DisableProjectionOptions
    ): Promise<void>;
    /**
     * Aborts a projection.
     * @param projectionName - The name of the projection to disable.
     * @param options - Disable projection options.
     */
    abortProjection(
      projectionName: string,
      options?: DisableProjectionOptions
    ): Promise<void>;
  }
}

Client.prototype.disableProjection = async function (
  this: Client,
  projectionName: string,
  baseOptions: DisableProjectionOptions = {}
): Promise<void> {
  return disableProjection("disableProjection", true).call(
    this,
    projectionName,
    baseOptions
  );
};

Client.prototype.abortProjection = async function (
  this: Client,
  projectionName: string,
  baseOptions: DisableProjectionOptions = {}
): Promise<void> {
  return disableProjection("abortProjection", false).call(
    this,
    projectionName,
    baseOptions
  );
};

function disableProjection(debugName: string, writeCheckpoint: boolean) {
  return async function (
    this: Client,
    projectionName: string,
    baseOptions: DisableProjectionOptions = {}
  ): Promise<void> {
    const req = new DisableReq();
    const options = new DisableReq.Options();

    options.setName(projectionName);
    options.setWriteCheckpoint(writeCheckpoint);

    req.setOptions(options);

    debug.command(`${debugName}: %O`, {
      projectionName,
      options: baseOptions,
    });
    debug.command_grpc(`${debugName}: %g`, req);

    return this.execute(
      ProjectionsClient,
      debugName,
      (client) =>
        new Promise<void>((resolve, reject) => {
          client.disable(req, ...this.callArguments(baseOptions), (error) => {
            if (error) return reject(convertToCommandError(error));
            return resolve();
          });
        })
    );
  };
}
