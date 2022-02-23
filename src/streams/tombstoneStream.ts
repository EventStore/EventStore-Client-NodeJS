import { Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { TombstoneReq } from "../../generated/streams_pb";

import { Client } from "../Client";
import { ANY, NO_STREAM, STREAM_EXISTS } from "../constants";
import type { BaseOptions, DeleteResult, ExpectedRevision } from "../types";
import { convertToCommandError, createStreamIdentifier, debug } from "../utils";

export interface TombstoneStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before deleting.
   * @default ANY
   */
  expectedRevision?: ExpectedRevision;
}

declare module "../Client" {
  interface Client {
    /**
     * Hard-deletes a stream.
     * @param streamName A stream name.
     * @param options Tombstoneing options.
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
  const identifier = createStreamIdentifier(streamName);

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

  return this.execute(
    StreamsClient,
    "tombstoneStream",
    (client) =>
      new Promise<DeleteResult>((resolve, reject) => {
        client.tombstone(
          req,
          ...this.callArguments(baseOptions),
          (error, resp) => {
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
          }
        );
      })
  );
};
