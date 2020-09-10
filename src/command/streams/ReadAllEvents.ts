import { Empty } from "../../../generated/shared_pb";
import { StreamsClient } from "../../../generated/streams_grpc_pb";
import { ReadReq } from "../../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import {
  Backward,
  Direction,
  Forward,
  Position,
  ReadStreamResult,
  StreamEnd,
  StreamPosition,
  StreamStart,
  ESDBConnection,
} from "../../types";
import { Command } from "../Command";
import { handleBatchRead } from "./utils";

export class ReadAllEvents extends Command {
  private _position: StreamPosition | StreamStart | StreamEnd;
  private _direction: Direction;
  private _count: number;

  constructor() {
    super();
    this._direction = Forward;
    this._position = StreamStart;
    this._count = 1;
  }

  /**
   * Asks the command to read forward (toward the end of the stream). Default behavior.
   */
  forward(): ReadAllEvents {
    this._direction = Forward;
    return this;
  }

  /**
   * Asks the command to read backward (toward the beginning of the stream).
   */
  backward(): ReadAllEvents {
    this._direction = Backward;
    return this;
  }

  /**
   * Asks the command to read in a specific direction.
   * @param direction
   */
  readDirection(direction: Direction): ReadAllEvents {
    this._direction = direction;
    return this;
  }

  /**
   * Starts the read at the given position in $all.
   * @param position
   */
  fromPosition(position: Position): ReadAllEvents {
    this._position = StreamPosition(position);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): ReadAllEvents {
    this._position = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): ReadAllEvents {
    this._position = StreamEnd;
    return this;
  }

  /**
   * Sets the max number of events to read
   * @param count Max number of events to read.
   */
  count(count: number): ReadAllEvents {
    this._count = count;
    return this;
  }

  /**
   * Sends asynchronously the read command to the server.
   */
  async execute(connection: ESDBConnection): Promise<ReadStreamResult> {
    const req = new ReadReq();
    const options = new ReadReq.Options();

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this._position.__typename) {
      case "position": {
        const pos = new ReadReq.Options.Position();
        pos.setCommitPosition(this._position.position.commit);
        pos.setPreparePosition(this._position.position.prepare);
        allOptions.setPosition(pos);
        break;
      }

      case "start": {
        allOptions.setStart(new Empty());
        break;
      }

      case "end": {
        allOptions.setEnd(new Empty());
        break;
      }
    }
    options.setCount(this._count);
    options.setAll(allOptions);
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
