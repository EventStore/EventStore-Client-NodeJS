import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { CreateReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class CreateTransientProjection extends Command {
  private _name: string;
  private _query: string;

  constructor(name: string, query: string) {
    super();
    this._query = query;
    this._name = name;
  }

  /**
   * Creates a transient projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new CreateReq();
    const options = new CreateReq.Options();
    const transient = new CreateReq.Options.Transient();

    transient.setName(this._name);

    options.setTransient(transient);
    options.setQuery(this._query);

    req.setOptions(options);

    debug.command("CreateTransientProjection: %c", this);
    debug.command_grpc("CreateTransientProjection: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "CreateTransientProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.create(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
