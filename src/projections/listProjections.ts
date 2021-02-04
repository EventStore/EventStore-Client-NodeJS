import { ServiceError } from "@grpc/grpc-js";
import { Empty } from "../../generated/shared_pb";
import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { StatisticsReq, StatisticsResp } from "../../generated/projections_pb";

import { BaseOptions, ProjectionDetails } from "../types";
import {
  debug,
  convertToCommandError,
  convertGrpcProjectionDetails,
} from "../utils";
import { Client } from "../Client";

interface ListProjectionsOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * lists continuous projections
     * @param options List projections options
     */
    listContinuousProjections(
      options?: ListProjectionsOptions
    ): Promise<ProjectionDetails[]>;

    /**
     * lists one time projections
     * @param options List projections options
     */
    listOneTimeProjections(
      options?: ListProjectionsOptions
    ): Promise<ProjectionDetails[]>;

    /**
     * lists transient projections
     * @param options List projections options
     */
    listTransientProjections(
      options?: ListProjectionsOptions
    ): Promise<ProjectionDetails[]>;
  }
}

const fetchAndTransformProjectionList = async function (
  this: Client,
  debugName: string,
  baseOptions: ListProjectionsOptions,
  options: StatisticsReq.Options
): Promise<ProjectionDetails[]> {
  const req = new StatisticsReq();
  req.setOptions(options);

  debug.command("%s: %O", debugName, {
    options: baseOptions,
  });
  debug.command_grpc("%s: %g", debugName, req);

  const client = await this.getGRPCClient(ProjectionsClient, debugName);

  const stream = client.statistics(req, ...this.callArguments(baseOptions));

  return new Promise((resolve, reject) => {
    const projectionDetails: ProjectionDetails[] = [];

    stream.on("error", (error: ServiceError) => {
      reject(convertToCommandError(error));
    });

    stream.on("data", (resp: StatisticsResp) => {
      if (!resp.hasDetails()) return;
      projectionDetails.push(convertGrpcProjectionDetails(resp.getDetails()!));
    });

    stream.on("end", () => {
      resolve(projectionDetails);
    });
  });
};

Client.prototype.listContinuousProjections = async function (
  this: Client,
  baseOptions: ListProjectionsOptions = {}
): Promise<ProjectionDetails[]> {
  const options = new StatisticsReq.Options();
  options.setContinuous(new Empty());

  return fetchAndTransformProjectionList.call(
    this,
    "listContinuousProjections",
    baseOptions,
    options
  );
};

Client.prototype.listOneTimeProjections = async function (
  this: Client,
  baseOptions: ListProjectionsOptions = {}
): Promise<ProjectionDetails[]> {
  const options = new StatisticsReq.Options();
  options.setOneTime(new Empty());

  return fetchAndTransformProjectionList.call(
    this,
    "listOneTimeProjections",
    baseOptions,
    options
  );
};

Client.prototype.listTransientProjections = async function (
  this: Client,
  baseOptions: ListProjectionsOptions = {}
): Promise<ProjectionDetails[]> {
  const options = new StatisticsReq.Options();
  options.setTransient(new Empty());

  return fetchAndTransformProjectionList.call(
    this,
    "listTransientProjections",
    baseOptions,
    options
  );
};
