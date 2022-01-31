import { Client } from "../Client";
import type { ProjectionStatus } from "../types";
import { debug } from "../utils";
import type { GetProjectionStatisticsOptions } from "./getProjectionStatistics";

export interface GetProjectionStatusOptions
  extends GetProjectionStatisticsOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Gets the projection's current status.
     * @param projectionName The name of the projection.
     * @param options Get status options.
     */
    getProjectionStatus(
      projectionName: string,
      options?: GetProjectionStatusOptions
    ): Promise<ProjectionStatus>;
  }
}

Client.prototype.getProjectionStatus = async function (
  this: Client,
  projectionName: string,
  baseOptions: GetProjectionStatusOptions = {}
): Promise<ProjectionStatus> {
  debug.command("getProjectionStatus: %O", {
    projectionName,
    options: baseOptions,
  });

  const { projectionStatus } = await this.getProjectionStatistics(
    projectionName,
    baseOptions
  );

  return projectionStatus;
};
