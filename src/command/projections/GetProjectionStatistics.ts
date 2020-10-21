import { ServiceError } from "@grpc/grpc-js";
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

export class GetProjectionStatistics extends Command {
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }
  /**
   * Lists all transient projections
   */
  async execute(connection: ESDBConnection): Promise<ProjectionDetails> {
    const req = new StatisticsReq();
    const options = new StatisticsReq.Options();
    options.setName(this._name);
    req.setOptions(options);

    debug.command("GetProjectionStatistics: %c", this);
    debug.command_grpc("GetProjectionStatistics: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "GetProjectionStatistics"
    );

    const stream = client.statistics(req, this.metadata);

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
}
