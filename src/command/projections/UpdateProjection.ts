import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { Empty } from "../../../generated/shared_pb";
import { UpdateReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";
import { CLIENT } from "../../symbols";

export class UpdateProjection extends Command {
  private _name: string;
  private _query: string;
  private _trackEmittedStreams?: boolean;

  constructor(name: string, query: string) {
    super();
    this._query = query;
    this._name = name;
  }

  /**
   * Enables tracking emitted streams.
   */
  trackEmittedStreams(): UpdateProjection {
    this._trackEmittedStreams = true;
    return this;
  }

  /**
   * Disables tracking emitted streams. See {@link trackEmittedStreams}
   */
  doNotTrackEmittedStreams(): UpdateProjection {
    this._trackEmittedStreams = false;
    return this;
  }

  /**
   * Creates a transient projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new UpdateReq();
    const options = new UpdateReq.Options();

    options.setName(this._name);
    options.setQuery(this._query);

    if (this._trackEmittedStreams == null) {
      options.setNoEmitOptions(new Empty());
    } else {
      options.setEmitEnabled(this._trackEmittedStreams);
    }

    req.setOptions(options);

    debug.command("UpdateProjection: %c", this);
    debug.command_grpc("UpdateProjection: %g", req);

    const client = await connection[CLIENT](
      ProjectionsClient,
      "UpdateProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.update(req, this.metadata(connection), (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
