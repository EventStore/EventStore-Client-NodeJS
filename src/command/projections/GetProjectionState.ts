import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { StateReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { debug } from "../../utils/debug";
import { convertToCommandError } from "../../utils/CommandError";

export class GetProjectionState<S = unknown> extends Command {
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }
  /**
   * gets the state of the projection
   */
  async execute(connection: ESDBConnection): Promise<S> {
    const req = new StateReq();
    const options = new StateReq.Options();
    options.setName(this._name);
    req.setOptions(options);

    debug.command("GetProjectionState: %c", this);
    debug.command_grpc("GetProjectionState: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "GetProjectionState"
    );

    return new Promise<S>((resolve, reject) => {
      client.state(req, this.metadata, (error, response) => {
        if (error) return reject(convertToCommandError(error));
        return resolve(response.getState()?.toJavaScript() as S);
      });
    });
  }
}
