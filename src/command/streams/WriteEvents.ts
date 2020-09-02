import { AppendReq } from "../../../generated/streams_pb";
import { StreamIdentifier, Empty, UUID } from "../../../generated/shared_pb";
import { StreamsClient } from "../../../generated/streams_grpc_pb";

import {
  Revision,
  EventData,
  WriteResult,
  WriteResultFailure,
  WriteResultSuccess,
  CurrentRevision,
  CurrentRevisionNoStream,
  ExpectedRevision,
  ExpectedRevisionAny,
  CurrentStreamRevision,
  ExpectedStreamRevision,
  ExpectedRevisionExists,
} from "../..";
import { Command } from "../Command";
import { ESDBConnection } from "../../types";

export class WriteEvents extends Command {
  private readonly _stream: string;
  private _revision: Revision;
  private _events: EventData[] = [];

  constructor(stream: string) {
    super();
    this._stream = stream;
    this._revision = Revision.Any;
  }

  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @param revision
   */
  expectedRevision(revision: Revision): WriteEvents {
    this._revision = revision;
    return this;
  }

  /**
   * Sends asynchronously events to the server.
   * @param events Events sent to the server.
   */

  /**
   * Adds events to be sent to the server, can be called multiple times.
   * @param events Events sent to the server.
   */
  send(...events: EventData[]): WriteEvents {
    this._events.concat(events);
    return this;
  }

  /**
   * Sends events to the server
   * @param connection
   */
  async execute(connection: ESDBConnection): Promise<WriteResult> {
    const header = new AppendReq();
    const options = new AppendReq.Options();
    const identifier = new StreamIdentifier();

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    options.setStreamIdentifier(identifier);

    switch (this._revision.__typename) {
      case "exact": {
        options.setRevision(this._revision.revision);
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

      case "any": {
        options.setAny(new Empty());
        break;
      }
    }
    header.setOptions(options);

    const client = await connection._client(StreamsClient);

    return new Promise<WriteResult>((resolve) => {
      const sink = client.append(this.metadata, (error, resp) => {
        if (error != null) {
          const result: WriteResultFailure = {
            __typename: "failure",
            error,
          };

          resolve(result);
          return;
        }

        const success = resp.getSuccess();
        const grpcError = resp.getWrongExpectedVersion();
        if (resp.hasSuccess() && success) {
          const nextExpectedVersion = success.getCurrentRevision();
          const grpcPosition = success.getPosition();

          const position = grpcPosition
            ? {
                commit: grpcPosition.getCommitPosition(),
                prepare: grpcPosition.getPreparePosition(),
              }
            : undefined;

          const result: WriteResultSuccess = {
            __typename: "success",
            nextExpectedVersion,
            position,
          };

          resolve(result);
        } else if (resp.hasWrongExpectedVersion() && grpcError) {
          let current: CurrentRevision = CurrentRevisionNoStream;
          let expected: ExpectedRevision = ExpectedRevisionAny;

          if (grpcError.hasCurrentRevision()) {
            current = CurrentStreamRevision(grpcError.getCurrentRevision());
          }

          if (grpcError.hasExpectedRevision()) {
            expected = ExpectedStreamRevision(grpcError.getExpectedRevision());
          } else if (grpcError.hasStreamExists()) {
            expected = ExpectedRevisionExists;
          }

          const failure: WriteResultFailure = {
            __typename: "failure",
            error: {
              current: current,
              expected: expected,
            },
          };

          resolve(failure);
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
