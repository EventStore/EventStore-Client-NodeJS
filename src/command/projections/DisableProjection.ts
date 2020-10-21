import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { DisableReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class DisableProjection extends Command {
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
  writeCheckpoint(): DisableProjection {
    this._writeCheckpoint = true;
    return this;
  }

  /**
   * Do not write a checkpoint. See {@link writeCheckpoint}
   */
  doNotWriteCheckpoint(): DisableProjection {
    this._writeCheckpoint = false;
    return this;
  }

  /**
   * Disables a projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new DisableReq();
    const options = new DisableReq.Options();

    options.setName(this._name);
    options.setWriteCheckpoint(this._writeCheckpoint);

    req.setOptions(options);

    debug.command("DisableProjection: %c", this);
    debug.command_grpc("DisableProjection: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "DisableProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.disable(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
