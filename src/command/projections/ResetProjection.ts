import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { ResetReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class ResetProjection extends Command {
  private _name: string;
  private _writeCheckpoint: boolean;

  constructor(name: string) {
    super();
    this._name = name;
    this._writeCheckpoint = true;
  }

  /**
   * Write a checkpoint. Default behaviour
   */
  writeCheckpoint(): ResetProjection {
    this._writeCheckpoint = true;
    return this;
  }

  /**
   * Do not write a checkpoint. See {@link writeCheckpoint}
   */
  doNotWriteCheckpoint(): ResetProjection {
    this._writeCheckpoint = false;
    return this;
  }

  /**
   * Resets a projection. This will re-emit events. Streams that are written to from the projection will also be soft deleted.
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new ResetReq();
    const options = new ResetReq.Options();

    options.setName(this._name);
    options.setWriteCheckpoint(this._writeCheckpoint);

    req.setOptions(options);

    debug.command("ResetProjection: %c", this);
    debug.command_grpc("ResetProjection: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "ResetProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.reset(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
