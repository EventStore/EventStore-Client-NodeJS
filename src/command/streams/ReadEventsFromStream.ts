import { StreamsClient } from "../../../generated/streams_grpc_pb";
import { ReadReq } from "../../../generated/streams_pb";
import { Empty, StreamIdentifier } from "../../../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import {
  ESDBConnection,
  ReadRevision,
  Direction,
  ResolvedEvent,
} from "../../types";
import { Command } from "../Command";
import { handleBatchRead } from "../../utils/handleBatchRead";
import { convertGrpcEvent } from "../../utils/convertGrpcEvent";
import { debug } from "../../utils/debug";

export class ReadEventsFromStream extends Command {
  private _stream: string;
  private _revision: ReadRevision;
  private _resolveLinkTos: boolean;
  private _direction: Direction;
  private _count: bigint;

  constructor(stream: string) {
    super();
    this._stream = stream;
    this._revision = "start";
    this._resolveLinkTos = false;
    this._direction = "forward";
    this._count = BigInt(1);
  }

  /**
   * Asks the command to read forward (toward the end of the stream). Default behavior.
   */
  forward(): ReadEventsFromStream {
    this._direction = "forward";
    return this;
  }

  /**
   * Asks the command to read backward (toward the beginning of the stream).
   */
  backward(): ReadEventsFromStream {
    this._direction = "backward";
    return this;
  }

  /**
   * Asks the command to read in a specific direction.
   * @param direction
   */
  readDirection(direction: Direction): ReadEventsFromStream {
    this._direction = direction;
    return this;
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(revision: bigint): ReadEventsFromStream {
    this._revision = revision;
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): ReadEventsFromStream {
    this._revision = "start";
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): ReadEventsFromStream {
    this._revision = "end";
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  resolveLink(): ReadEventsFromStream {
    this._resolveLinkTos = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  doNotResolveLink(): ReadEventsFromStream {
    this._resolveLinkTos = false;
    return this;
  }

  count(count: bigint | number): ReadEventsFromStream {
    this._count = BigInt(count);
    return this;
  }

  /**
   * Sends asynchronously the read command to the server.
   * @param count Max number of events to read.
   */

  async execute(connection: ESDBConnection): Promise<ResolvedEvent[]> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const streamOptions = new ReadReq.Options.StreamOptions();
    streamOptions.setStreamIdentifier(identifier);

    switch (this._revision) {
      case "start": {
        streamOptions.setStart(new Empty());
        break;
      }
      case "end": {
        streamOptions.setEnd(new Empty());
        break;
      }
      default: {
        streamOptions.setRevision(this._revision.toString(10));
        break;
      }
    }

    options.setStream(streamOptions);
    options.setResolveLinks(this._resolveLinkTos);
    options.setCount(this._count.toString(10));
    options.setUuidOption(uuidOption);
    options.setNoFilter(new Empty());

    switch (this._direction) {
      case "forward": {
        options.setReadDirection(0);
        break;
      }
      case "backward": {
        options.setReadDirection(1);
        break;
      }
    }

    req.setOptions(options);

    debug.command("ReadEventsFromStream: %c", this);
    debug.command_grpc("ReadEventsFromStream: %g", req);

    const client = await connection._client(
      StreamsClient,
      "ReadEventsFromStream"
    );
    const stream = client.read(req, this.metadata);
    return handleBatchRead(stream, convertGrpcEvent);
  }
}
