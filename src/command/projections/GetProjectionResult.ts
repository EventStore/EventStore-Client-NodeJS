import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { ResultReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { debug } from "../../utils/debug";
import { convertToCommandError } from "../../utils/CommandError";

export class GetProjectionResult<S = unknown> extends Command {
  private _name: string;
  private _partition: string;

  constructor(name: string) {
    super();
    this._name = name;
    this._partition = "";
  }

  /**
   * Sets partition
   */
  fromPartition(partition: string): GetProjectionResult<S> {
    this._partition = partition;
    return this;
  }

  /**
   * gets the result of the projection
   */
  async execute(connection: ESDBConnection): Promise<S> {
    const req = new ResultReq();
    const options = new ResultReq.Options();
    options.setName(this._name);
    options.setPartition(this._partition);

    req.setOptions(options);

    debug.command("GetProjectionResult: %c", this);
    debug.command_grpc("GetProjectionResult: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "GetProjectionResult"
    );

    return new Promise<S>((resolve, reject) => {
      client.result(req, this.metadata, (error, response) => {
        if (error) return reject(convertToCommandError(error));
        return resolve(response.getResult()?.toJavaScript() as S);
      });
    });
  }
}
