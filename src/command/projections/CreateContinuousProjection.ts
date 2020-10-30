import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { CreateReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";
import { CLIENT } from "../../symbols";

export class CreateContinuousProjection extends Command {
  private _name: string;
  private _query: string;
  private _trackEmittedStreams: boolean;

  constructor(name: string, query: string) {
    super();
    this._query = query;
    this._name = name;
    this._trackEmittedStreams = false;
  }

  /**
   * Enables tracking emitted streams.
   */
  trackEmittedStreams(): CreateContinuousProjection {
    this._trackEmittedStreams = true;
    return this;
  }

  /**
   * Disables tracking emitted streams. See {@link trackEmittedStreams}. Default behavior.
   */
  doNotTrackEmittedStreams(): CreateContinuousProjection {
    this._trackEmittedStreams = false;
    return this;
  }

  /**
   * Creates a continuous projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new CreateReq();
    const options = new CreateReq.Options();
    const continuous = new CreateReq.Options.Continuous();

    continuous.setName(this._name);
    continuous.setTrackEmittedStreams(this._trackEmittedStreams);

    options.setContinuous(continuous);
    options.setQuery(this._query);

    req.setOptions(options);

    debug.command("CreateContinuousProjection: %c", this);
    debug.command_grpc("CreateContinuousProjection: %g", req);

    const client = await connection[CLIENT](
      ProjectionsClient,
      "CreateContinuousProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.create(req, this.metadata(connection), (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
