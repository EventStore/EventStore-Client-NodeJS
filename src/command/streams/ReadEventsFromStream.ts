import { StreamsClient } from "../../../generated/streams_grpc_pb";
import { ReadReq } from "../../../generated/streams_pb";
import { Empty, StreamIdentifier } from "../../../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import {
  Backward,
  Direction,
  Forward,
  ReadStreamResult,
  StreamEnd,
  StreamExact,
  StreamRevision,
  StreamStart,
  ESDBConnection,
} from "../../types";
import { Command } from "../Command";
import { handleBatchRead } from "./utils";

export class ReadEventsFromStream extends Command {
  private _stream: string;
  private _revision: StreamRevision;
  private _resolveLinkTos: boolean;
  private _direction: Direction;
  private _count: number;

  constructor(stream: string) {
    super();
    this._stream = stream;
    this._revision = StreamStart;
    this._resolveLinkTos = false;
    this._direction = Forward;
    this._count = 1;
  }

  /**
   * Asks the command to read forward (toward the end of the stream). Default behavior.
   */
  forward(): ReadEventsFromStream {
    this._direction = Forward;
    return this;
  }

  /**
   * Asks the command to read backward (toward the beginning of the stream).
   */
  backward(): ReadEventsFromStream {
    this._direction = Backward;
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
  fromRevision(revision: number): ReadEventsFromStream {
    this._revision = StreamExact(revision);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): ReadEventsFromStream {
    this._revision = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): ReadEventsFromStream {
    this._revision = StreamEnd;
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

  count(count: number): ReadEventsFromStream {
    this._count = count;
    return this;
  }

  /**
   * Sends asynchronously the read command to the server.
   * @param count Max number of events to read.
   */

  async execute(connection: ESDBConnection): Promise<ReadStreamResult> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const streamOptions = new ReadReq.Options.StreamOptions();
    streamOptions.setStreamIdentifier(identifier);

    switch (this._revision.__typename) {
      case "exact": {
        streamOptions.setRevision(this._revision.revision);
        break;
      }
      case "start": {
        streamOptions.setStart(new Empty());
        break;
      }
      case "end": {
        streamOptions.setEnd(new Empty());
        break;
      }
    }

    options.setStream(streamOptions);
    options.setResolveLinks(this._resolveLinkTos);
    options.setCount(this._count);
    options.setUuidOption(uuidOption);
    options.setNoFilter(new Empty());

    switch (this._direction.__typename) {
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

    const client = await connection._client(StreamsClient);
    const stream = client.read(req, this.metadata);
    return handleBatchRead(stream);
  }
}
