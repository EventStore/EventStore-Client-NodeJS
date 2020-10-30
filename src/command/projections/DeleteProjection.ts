import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { DeleteReq } from "../../../generated/projections_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class DeleteProjection extends Command {
  private _name: string;
  private _deleteEmittedStreams: boolean;
  private _deleteStateStream: boolean;
  private _deleteCheckpointStream: boolean;

  constructor(name: string) {
    super();
    this._name = name;
    this._deleteEmittedStreams = true;
    this._deleteStateStream = true;
    this._deleteCheckpointStream = true;
  }

  /**
   * Deletes emitted streams. Default behaviour
   */
  deleteEmittedStreams(): DeleteProjection {
    this._deleteEmittedStreams = true;
    return this;
  }

  /**
   * Does not delete emitted streams
   */
  keepEmittedStreams(): DeleteProjection {
    this._deleteEmittedStreams = false;
    return this;
  }

  /**
   * Deletes state streams. Default behaviour
   */
  deleteStateStream(): DeleteProjection {
    this._deleteStateStream = true;
    return this;
  }

  /**
   * Does not delete state streams
   */
  keepStateStream(): DeleteProjection {
    this._deleteStateStream = false;
    return this;
  }

  /**
   * Does not delete checkpoint stream
   */
  keepCheckpointStream(): DeleteProjection {
    this._deleteCheckpointStream = false;
    return this;
  }

  /**
   * Deletes checkpoint stream. Default behaviour
   */
  deleteCheckpointStream(): DeleteProjection {
    this._deleteCheckpointStream = true;
    return this;
  }

  /**
   * Creates a transient projection
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new DeleteReq();
    const options = new DeleteReq.Options();

    options.setName(this._name);
    options.setDeleteEmittedStreams(this._deleteEmittedStreams);
    options.setDeleteStateStream(this._deleteStateStream);
    options.setDeleteCheckpointStream(this._deleteCheckpointStream);

    req.setOptions(options);

    debug.command("DeleteProjection: %c", this);
    debug.command_grpc("DeleteProjection: %g", req);

    const client = await connection._client(
      ProjectionsClient,
      "DeleteProjection"
    );

    return new Promise<void>((resolve, reject) => {
      client.delete(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
