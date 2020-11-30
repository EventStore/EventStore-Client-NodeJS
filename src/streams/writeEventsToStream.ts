import { AppendReq } from "../../generated/streams_pb";
import { StreamIdentifier, Empty, UUID } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";

import { Client } from "../Client";
import { ANY } from "../constants";
import { BaseOptions, Position, WriteEventsExpectedRevision } from "../types";
import { EventData } from "../events";
import {
  convertToCommandError,
  debug,
  WrongExpectedVersionError,
} from "../utils";

export interface WriteEventsToStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @defaultValue ANY
   */
  expectedRevision?: WriteEventsExpectedRevision;
}

export interface WriteResult {
  nextExpectedVersion: bigint;
  position?: Position;
}

declare module "../Client" {
  interface Client {
    /**
     * Sends events to a given stream.
     * @param stream A stream name.
     * @param events Events or event to write
     * @param options Writing options
     */
    writeEventsToStream(
      stream: string,
      events: EventData | EventData[],
      options?: WriteEventsToStreamOptions
    ): Promise<WriteResult>;
  }
}

Client.prototype.writeEventsToStream = async function (
  this: Client,
  stream: string,
  event: EventData | EventData[],
  { expectedRevision = ANY, ...baseOptions }: WriteEventsToStreamOptions = {}
): Promise<WriteResult> {
  const events = Array.isArray(event) ? event : [event];

  const header = new AppendReq();
  const options = new AppendReq.Options();
  const identifier = new StreamIdentifier();

  identifier.setStreamname(Buffer.from(stream).toString("base64"));
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

  debug.command("WriteEventsToStream: %c", this);
  debug.command_grpc("WriteEventsToStream: %g", header);

  const client = await this.getGRPCClient(StreamsClient, "WriteEventsToStream");

  return new Promise<WriteResult>((resolve, reject) => {
    const sink = client.append(this.metadata(baseOptions), (error, resp) => {
      if (error != null) {
        return reject(convertToCommandError(error));
      }

      if (resp.hasWrongExpectedVersion()) {
        const grpcError = resp.getWrongExpectedVersion()!;

        let expected: WriteEventsExpectedRevision = "any";

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

        return reject(
          new WrongExpectedVersionError(null as never, {
            streamName: stream,
            current: grpcError.hasCurrentRevision()
              ? BigInt(grpcError.getCurrentRevision())
              : "no_stream",
            expected,
          })
        );
      }

      if (resp.hasSuccess()) {
        const success = resp.getSuccess()!;
        const nextExpectedVersion = BigInt(success.getCurrentRevision());
        const grpcPosition = success.getPosition();

        const position = grpcPosition
          ? {
              commit: BigInt(grpcPosition.getCommitPosition()),
              prepare: BigInt(grpcPosition.getPreparePosition()),
            }
          : undefined;

        return resolve({
          nextExpectedVersion,
          position,
        });
      }
    });

    sink.write(header);

    for (const event of events) {
      const entry = new AppendReq();
      const message = new AppendReq.ProposedMessage();
      const id = new UUID();
      id.setString(event.id);
      message.setId(id);
      message.getMetadataMap().set("type", event.eventType);
      message.getMetadataMap().set("content-type", event.contentType);

      switch (event.contentType) {
        case "application/json": {
          const data = JSON.stringify(event.payload);
          message.setData(Buffer.from(data, "binary").toString("base64"));
          break;
        }
        case "application/octet-stream": {
          message.setData(event.payload);
          break;
        }
      }

      if (event.metadata) {
        switch (event.contentType) {
          case "application/json": {
            const metadata = JSON.stringify(event.metadata);
            message.setCustomMetadata(
              Buffer.from(metadata, "binary").toString("base64")
            );
            break;
          }
          case "application/octet-stream": {
            message.setCustomMetadata(event.metadata);
            break;
          }
        }
      }

      entry.setProposedMessage(message);
      sink.write(entry);
    }

    sink.end();
  });
};
