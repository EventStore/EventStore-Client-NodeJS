import type { ServiceError } from "@grpc/grpc-js";

import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { StatisticsReq, StatisticsResp } from "../../generated/projections_pb";

import { Client } from "../Client";
import type { BaseOptions, ProjectionDetails } from "../types";
import {
  debug,
  convertToCommandError,
  convertGrpcProjectionDetails,
} from "../utils";

export interface GetProjectionStatusOptions extends BaseOptions {}

/**
 * @deprecated Renamed to `GetProjectionStatusOptions`.
 */
export type GetProjectionStatisticsOptions = GetProjectionStatusOptions;

declare module "../Client" {
  interface Client {
    /**
     * Gets the current status of a projection.
     * @param projectionName The name of the projection.
     * @param options Get status options.
     */
    getProjectionStatus(
      projectionName: string,
      options?: GetProjectionStatusOptions
    ): Promise<ProjectionDetails>;

    /**
     * Gets the current status of a projection.
     * @param projectionName The name of the projection.
     * @param options Get statistics options.
     * @deprecated Renamed to `getProjectionStatus`.
     */
    getProjectionStatistics(
      projectionName: string,
      options?: GetProjectionStatisticsOptions
    ): Promise<ProjectionDetails>;
  }
}

Client.prototype.getProjectionStatus = async function (
  this: Client,
  projectionName: string,
  baseOptions: GetProjectionStatusOptions = {}
): Promise<ProjectionDetails> {
  const req = new StatisticsReq();
  const options = new StatisticsReq.Options();
  options.setName(projectionName);
  req.setOptions(options);

  debug.command("getProjectionStatistics: %O", {
    projectionName,
    options: baseOptions,
  });
  debug.command_grpc("getProjectionStatistics: %g", req);

  return this.execute(
    ProjectionsClient,
    "getProjectionStatistics",
    (client) => {
      const stream = client.statistics(req, ...this.callArguments(baseOptions));

      return new Promise((resolve, reject) => {
        let projectionDetail: ProjectionDetails;

        stream.on("error", (error: ServiceError) => {
          reject(convertToCommandError(error));
        });

        stream.on("data", (resp: StatisticsResp) => {
          if (!resp.hasDetails()) return;
          projectionDetail = convertGrpcProjectionDetails(resp.getDetails()!);
        });

        stream.on("end", () => {
          resolve(projectionDetail);
        });
      });
    }
  );
};

Client.prototype.getProjectionStatistics = Client.prototype.getProjectionStatus;
