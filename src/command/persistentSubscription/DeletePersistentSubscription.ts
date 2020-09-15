import { StreamIdentifier } from "../../../generated/shared_pb";
import { DeleteReq } from "../../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../../generated/persistent_grpc_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";

export class DeletePersistentSubscription extends Command {
  private _stream: string;
  private _group: string;

  constructor(stream: string, group: string) {
    super();
    this._stream = stream;
    this._group = group;
  }

  /**
   * Deletes a persistent subscription asynchronously.
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new DeleteReq();
    const options = new DeleteReq.Options();
    const identifier = new StreamIdentifier();

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    options.setStreamIdentifier(identifier);
    options.setGroupName(this._group);
    req.setOptions(options);

    const client = await connection._client(PersistentSubscriptionsClient);

    return new Promise<void>((resolve, reject) => {
      client.delete(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
