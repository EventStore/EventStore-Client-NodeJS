import type { ServiceError } from "@grpc/grpc-js";

import { Empty } from "../../generated/shared_pb";
import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { StatisticsReq, StatisticsResp } from "../../generated/projections_pb";

import type { BaseOptions, ProjectionDetails } from "../types";
import { debug, convertToCommandError } from "../utils";
import { Client } from "../Client";

import { mapGrpcProjectionDetails } from "./utils/mapGrpcProjectionDetails";

interface ListProjectionsOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Lists projections.
     * @param options List projections options.
     */
    listProjections(
      options?: ListProjectionsOptions,
    ): Promise<ProjectionDetails[]>;
  }
}

Client.prototype.listProjections = async function (
  this: Client,
  baseOptions: ListProjectionsOptions = {},
): Promise<ProjectionDetails[]> {
  const options = new StatisticsReq.Options();
  options.setContinuous(new Empty());

  const req = new StatisticsReq();
  req.setOptions(options);

  debug.command("%s: %O", "listProjections", {
    options: baseOptions,
  });
  debug.command_grpc("%s: %g", "listProjections", req);

  return this.execute(ProjectionsClient, "listProjections", (client) => {
    const stream = client.statistics(req, ...this.callArguments(baseOptions));

    return new Promise((resolve, reject) => {
      const projectionDetails: ProjectionDetails[] = [];

      stream.on("error", (error: ServiceError) => {
        reject(convertToCommandError(error));
      });

      stream.on("data", (resp: StatisticsResp) => {
        if (!resp.hasDetails()) return;
        projectionDetails.push(mapGrpcProjectionDetails(resp.getDetails()!));
      });

      stream.on("end", () => {
        resolve(projectionDetails);
      });
    });
  });
};
