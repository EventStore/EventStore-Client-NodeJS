import { AppendReq } from "../../../generated/streams_pb";
import { Empty } from "../../../generated/shared_pb";
import { StreamsClient } from "../../../generated/streams_grpc_pb";

import type { Client } from "../../Client";
import type {
  AppendResult,
  AppendStreamState,
  EventData,
} from "../../types";
import {
  backpressuredWrite,
  convertToCommandError,
  createStreamIdentifier,
  createUUID,
  debug,
  InternalOptions,
  WrongExpectedVersionError,
} from "../../utils";

import type { AppendToStreamOptions } from ".";

export const append = async function (
  this: Client,
  streamName: string,
  events: EventData[],
  { streamState, ...baseOptions }: InternalOptions<AppendToStreamOptions>
): Promise<AppendResult> {
  const header = new AppendReq();
  const options = new AppendReq.Options();
  const identifier = createStreamIdentifier(streamName);

  options.setStreamIdentifier(identifier);

  switch (streamState) {
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
      options.setRevision(streamState.toString(10));
      break;
    }
  }

  header.setOptions(options);

  debug.command("appendToStream: %O", {
    streamName,
    events,
    options: { streamState: streamState, ...baseOptions },
  });
  debug.command_grpc("appendToStream: %g", header);

  return this.execute(
    StreamsClient,
    "appendToStream",
    (client) =>
      new Promise<AppendResult>(async (resolve, reject) => {
        const sink = client.append(
          ...this.callArguments(baseOptions),
          (error, resp) => {
            if (error != null) {
              return reject(convertToCommandError(error));
            }

            if (resp.hasWrongExpectedVersion()) {
              const grpcError = resp.getWrongExpectedVersion()!;

              let expected: AppendStreamState = "any";

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

        sink.on("error", (err) => reject(err));

        await backpressuredWrite(sink, header);

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

          await backpressuredWrite(sink, entry);
        }

        sink.end();
      })
  );
};
