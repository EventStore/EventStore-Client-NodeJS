import { AppendReq } from "../../generated/streams_pb";
import { StreamIdentifier, Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";

import { Client } from "../Client";
import { ANY } from "../constants";
import {
  BaseOptions,
  AppendResult,
  AppendExpectedRevision,
  EventData,
} from "../types";

import {
  convertToCommandError,
  createUUID,
  debug,
  WrongExpectedVersionError,
} from "../utils";

export interface AppendToStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @default ANY
   */
  expectedRevision?: AppendExpectedRevision;
}

declare module "../Client" {
  interface Client {
    /**
     * Appends events to a given stream.
     * @param streamName A stream name.
     * @param events Events or event to write.
     * @param options Writing options.
     */
    appendToStream(
      streamName: string,
      events: EventData | EventData[],
      options?: AppendToStreamOptions
    ): Promise<AppendResult>;
  }
}

Client.prototype.appendToStream = async function (
  this: Client,
  streamName: string,
  event: EventData | EventData[],
  { expectedRevision = ANY, ...baseOptions }: AppendToStreamOptions = {}
): Promise<AppendResult> {
  const events = Array.isArray(event) ? event : [event];

  const header = new AppendReq();
  const options = new AppendReq.Options();
  const identifier = new StreamIdentifier();

  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));
  options.setStreamIdentifier(identifier);

  switch (expectedRevision) {
    case "any": {
      options.setAny(new Empty());
      break;
    }
    case "no_stream": {
      options.setNoStream(new Empty());
      break;
    }
    case "stream_exists": {
      options.setStreamExists(new Empty());
      break;
    }
    default: {
      options.setRevision(expectedRevision.toString(10));
      break;
    }
  }

  header.setOptions(options);

  debug.command("appendToStream: %O", {
    streamName,
    events,
    options: { expectedRevision, ...baseOptions },
  });
  debug.command_grpc("appendToStream: %g", header);

  return this.execute(
    StreamsClient,
    "appendToStream",
    (client) =>
      new Promise<AppendResult>((resolve, reject) => {
        const sink = client.append(
          ...this.callArguments(baseOptions),
          (error, resp) => {
            if (error != null) {
              // Make sure we don't write to the stream after it has closed.
              sink.destroy();
              return reject(convertToCommandError(error));
            }

            if (resp.hasWrongExpectedVersion()) {
              const grpcError = resp.getWrongExpectedVersion()!;

              let expected: AppendExpectedRevision = "any";

              switch (true) {
                case grpcError.hasExpectedRevision(): {
                  expected = BigInt(grpcError.getExpectedRevision()!);
                  break;
                }
                case grpcError.hasExpectedStreamExists(): {
                  expected = "stream_exists";
                  break;
                }
                case grpcError.hasExpectedNoStream(): {
                  expected = "no_stream";
                  break;
                }
              }

              if (this.throwOnAppendFailure) {
                return reject(
                  new WrongExpectedVersionError(null as never, {
                    streamName: streamName,
                    current: grpcError.hasCurrentRevision()
                      ? BigInt(grpcError.getCurrentRevision())
                      : "no_stream",
                    expected,
                  })
                );
              }

              const nextExpectedRevision = grpcError.hasCurrentRevision()
                ? BigInt(grpcError.getCurrentRevision())
                : BigInt(-1);

              return resolve({
                success: false,
                nextExpectedRevision,
                position: undefined,
              });
            }

            if (resp.hasSuccess()) {
              const success = resp.getSuccess()!;
              const nextExpectedRevision = BigInt(success.getCurrentRevision());
              const grpcPosition = success.getPosition();

              const position = grpcPosition
                ? {
                    commit: BigInt(grpcPosition.getCommitPosition()),
                    prepare: BigInt(grpcPosition.getPreparePosition()),
                  }
                : undefined;

              return resolve({
                success: true,
                nextExpectedRevision,
                position,
              });
            }
          }
        );

        sink.write(header);

        for (const event of events) {
          const entry = new AppendReq();
          const message = new AppendReq.ProposedMessage();
          const id = createUUID(event.id);
          message.setId(id);
          message.getMetadataMap().set("type", event.type);
          message.getMetadataMap().set("content-type", event.contentType);

          switch (event.contentType) {
            case "application/json": {
              const data = JSON.stringify(event.data);
              message.setData(Buffer.from(data, "utf8").toString("base64"));
              break;
            }
            case "application/octet-stream": {
              message.setData(event.data);
              break;
            }
          }

          if (event.metadata) {
            if (event.metadata.constructor === Uint8Array) {
              message.setCustomMetadata(event.metadata);
            } else {
              const metadata = JSON.stringify(event.metadata);
              message.setCustomMetadata(
                Buffer.from(metadata, "utf8").toString("base64")
              );
            }
          }

          entry.setProposedMessage(message);
          sink.write(entry);
        }

        sink.end();
      })
  );
};
