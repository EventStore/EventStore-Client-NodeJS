import { ServiceError } from "@grpc/grpc-js";
import { Empty } from "../../../generated/shared_pb";
import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import {
  StatisticsReq,
  StatisticsResp,
} from "../../../generated/projections_pb";

import { ESDBConnection, ProjectionDetails } from "../../types";
import { Command } from "../Command";
import { debug } from "../../utils/debug";
import { convertToCommandError } from "../../utils/CommandError";
import { convertGrpcProjectionDetails } from "../../utils/convertGrpcProjectionDetails";

const fetchAndTransformProjectionList = async (
  connection: ESDBConnection,
  options: StatisticsReq.Options,
  command: Command,
  debugName: string
): Promise<ProjectionDetails[]> => {
  const req = new StatisticsReq();
  req.setOptions(options);

  debug.command("%s: %c", debugName, command);
  debug.command_grpc("%s: %g", debugName, req);

  const client = await connection._client(ProjectionsClient, debugName);

  const stream = client.statistics(req, command.metadata);

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

export class ListContinuousProjections extends Command {
  /**
   * Lists all continuous projections
   */
  async execute(connection: ESDBConnection): Promise<ProjectionDetails[]> {
    const options = new StatisticsReq.Options();
    options.setContinuous(new Empty());

    return fetchAndTransformProjectionList(
      connection,
      options,
      this,
      "ListContinuousProjections"
    );
  }
}

export class ListOneTimeProjections extends Command {
  /**
   * Lists all one time projections
   */
  async execute(connection: ESDBConnection): Promise<ProjectionDetails[]> {
    const options = new StatisticsReq.Options();
    options.setOneTime(new Empty());

    return fetchAndTransformProjectionList(
      connection,
      options,
      this,
      "ListOneTimeProjections"
    );
  }
}

export class ListTransientProjections extends Command {
  /**
   * Lists all transient projections
   */
  async execute(connection: ESDBConnection): Promise<ProjectionDetails[]> {
    const options = new StatisticsReq.Options();
    options.setTransient(new Empty());

    return fetchAndTransformProjectionList(
      connection,
      options,
      this,
      "ListTransientProjections"
    );
  }
}
