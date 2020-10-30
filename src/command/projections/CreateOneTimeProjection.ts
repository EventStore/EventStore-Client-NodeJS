import { Empty } from "../../../generated/shared_pb";
import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { CreateReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class CreateOneTimeProjection extends Command {
  private _query: string;

  constructor(query: string) {
    super();
    this._query = query;
  }

  /**
   * Creates a one time projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new CreateReq();
    const options = new CreateReq.Options();

    options.setOneTime(new Empty());
    options.setQuery(this._query);

    req.setOptions(options);

    debug.command("CreateOneTimeProjection: %c", this);
    debug.command_grpc("CreateOneTimeProjection: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "CreateOneTimeProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.create(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
