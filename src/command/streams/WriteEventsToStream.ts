import { AppendReq } from "../../../generated/streams_pb";
import { StreamIdentifier, Empty, UUID } from "../../../generated/shared_pb";
import { StreamsClient } from "../../../generated/streams_grpc_pb";

import {
  WriteResult,
  ESDBConnection,
  WriteEventsExpectedRevision,
} from "../../types";
import { Command } from "../Command";
import { EventData } from "../../events";
import {
  convertToCommandError,
  WrongExpectedVersionError,
} from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class WriteEventsToStream extends Command {
  private readonly _stream: string;
  private _revision: WriteEventsExpectedRevision;
  private _events: EventData[] = [];

  constructor(stream: string) {
    super();
    this._stream = stream;
    this._revision = "any";
  }

  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @param revision
   */
  expectedRevision(revision: WriteEventsExpectedRevision): WriteEventsToStream {
    this._revision = revision;
    return this;
  }

  /**
   * Adds events to be sent to the server, can be called multiple times.
   * @param events Events sent to the server.
   */
  send(...events: EventData[]): WriteEventsToStream {
    this._events = this._events.concat(events);
    return this;
  }

  /**
   * Sends events to the server
   * @param connection
   */
  async execute(connection: ESDBConnection): Promise<WriteResult> {
    if (!this._events.length) {
      throw new Error("No events to send");
    }

    const header = new AppendReq();
    const options = new AppendReq.Options();
    const identifier = new StreamIdentifier();

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    options.setStreamIdentifier(identifier);

    switch (this._revision) {
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
        options.setRevision(this._revision.toString(10));
        break;
      }
    }

    header.setOptions(options);

    debug.command("WriteEventsToStream: %c", this);
    debug.command_grpc("WriteEventsToStream: %g", header);

    const client = await connection._client(
      StreamsClient,
      "WriteEventsToStream"
    );

    return new Promise<WriteResult>((resolve, reject) => {
      const sink = client.append(this.metadata, (error, resp) => {
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
              streamName: this._stream,
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

      for (const event of this._events) {
        const entry = new AppendReq();
        const message = new AppendReq.ProposedMessage();
        const id = new UUID();

        id.setString(event.id);

        message.setId(id);

        switch (event.payload.__typename) {
          case "json": {
            message.getMetadataMap().set("content-type", "application/json");
            const data = JSON.stringify(event.payload.payload);
            message.setData(Buffer.from(data, "binary").toString("base64"));
            break;
          }
          case "binary": {
            message
              .getMetadataMap()
              .set("content-type", "application/octet-stream");
            message.setData(event.payload.payload);
            break;
          }
        }

        switch (event.metadata?.__typename) {
          case "json": {
            const metadata = JSON.stringify(event.metadata.payload);
            message.setCustomMetadata(
              Buffer.from(metadata, "binary").toString("base64")
            );
            break;
          }
          case "binary": {
            message.setCustomMetadata(event.metadata.payload);
          }
        }

        message.getMetadataMap().set("type", event.eventType);
        entry.setProposedMessage(message);
        sink.write(entry);
      }

      sink.end();
    });
  }
}
