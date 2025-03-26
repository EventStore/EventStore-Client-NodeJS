import { DeleteReq } from "../../generated/streams_pb";
import { Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";

import { Client } from "../Client";
import type { BaseOptions, DeleteResult, StreamState } from "../types";
import { debug, convertToCommandError, createStreamIdentifier } from "../utils";
import { ANY, NO_STREAM } from "../constants";

export interface DeleteStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before deleting.
   * @defaultValue ANY
   */
  expectedRevision?: StreamState;
}

declare module "../Client" {
  interface Client {
    /**
     * Soft-deletes a stream.
     * @param streamName - A stream name.
     * @param options - Deletion options.
     */
    deleteStream(
      streamName: string,
      options?: DeleteStreamOptions
    ): Promise<DeleteResult>;
  }
}

Client.prototype.deleteStream = async function (
  this: Client,
  streamName: string,
  { expectedRevision = ANY, ...baseOptions }: DeleteStreamOptions = {}
): Promise<DeleteResult> {
  const req = new DeleteReq();
  const options = new DeleteReq.Options();
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
    default: {
      options.setRevision(expectedRevision.toString(10));
      break;
    }
  }

  req.setOptions(options);

  debug.command("deleteStream: %O", {
    streamName,
    options: { expectedRevision, ...baseOptions },
  });
  debug.command_grpc("deleteStream: %g", req);

  return this.execute(
    StreamsClient,
    "deleteStream",
    (client) =>
      new Promise<DeleteResult>((resolve, reject) => {
        client.delete(
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
