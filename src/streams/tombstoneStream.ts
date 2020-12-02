import { Empty, StreamIdentifier } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { TombstoneReq } from "../../generated/streams_pb";

import { Client } from "../Client";
import { ANY, NO_STREAM, STREAM_EXISTS } from "../constants";
import { BaseOptions, DeleteResult, ExpectedRevision } from "../types";
import { convertToCommandError, debug } from "../utils";

export interface TombstoneStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before deleting
   * @defaultValue ANY
   */
  expectedRevision?: ExpectedRevision;
}

declare module "../Client" {
  interface Client {
    /**
     * Hard-deletes a stream.
     * @param streamName A stream name.
     * @param options Tombstoneing options
     */
    tombstoneStream(
      streamName: string,
      options?: TombstoneStreamOptions
    ): Promise<DeleteResult>;
  }
}

Client.prototype.tombstoneStream = async function (
  this: Client,
  streamName: string,
  { expectedRevision = ANY, ...baseOptions }: TombstoneStreamOptions = {}
): Promise<DeleteResult> {
  const req = new TombstoneReq();
  const options = new TombstoneReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamname(Buffer.from(streamName).toString("base64"));

  options.setStreamIdentifier(identifier);

  switch (expectedRevision) {
    case ANY: {
      options.setAny(new Empty());
      break;
    }
    case NO_STREAM: {
      options.setNoStream(new Empty());
      break;
    }
    case STREAM_EXISTS: {
      options.setStreamExists(new Empty());
      break;
    }
    default: {
      options.setRevision(expectedRevision.toString(10));
      break;
    }
  }

  req.setOptions(options);

  debug.command("tombstoneStream: %O", {
    streamName,
    options: { expectedRevision, ...baseOptions },
  });
  debug.command_grpc("tombstoneStream: %g", req);

  const client = await this.getGRPCClient(StreamsClient, "tombstoneStream");

  return new Promise<DeleteResult>((resolve, reject) => {
    client.tombstone(req, this.metadata(baseOptions), (error, resp) => {
      if (error) {
        return reject(convertToCommandError(error));
      }

      const result: DeleteResult = {};

      if (resp.hasPosition()) {
        const grpcPos = resp.getPosition()!;
        result.position = {
          commit: BigInt(grpcPos.getCommitPosition()),
          prepare: BigInt(grpcPos.getPreparePosition()),
        };
      }

      return resolve(result);
    });
  });
};
