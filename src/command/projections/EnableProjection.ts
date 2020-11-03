import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { EnableReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";
import { CLIENT } from "../../symbols";

export class EnableProjection extends Command {
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }

  /**
   * Enables a projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new EnableReq();
    const options = new EnableReq.Options();

    options.setName(this._name);

    req.setOptions(options);

    debug.command("EnableProjection: %c", this);
    debug.command_grpc("EnableProjection: %g", req);

    const client = await connection[CLIENT](
      ProjectionsClient,
      "EnableProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.enable(req, this.metadata(connection), (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
