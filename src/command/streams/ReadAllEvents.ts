import { Empty } from "../../../generated/shared_pb";
import { StreamsClient } from "../../../generated/streams_grpc_pb";
import { ReadReq } from "../../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import {
  Position,
  ESDBConnection,
  ReadPosition,
  Direction,
  AllStreamResolvedEvent,
} from "../../types";

import { Command } from "../Command";
import { handleBatchRead } from "../../utils/handleBatchRead";
import { convertAllStreamGrpcEvent } from "../../utils/convertGrpcEvent";
import { debug } from "../../utils/debug";

export class ReadAllEvents extends Command {
  private _position: ReadPosition;
  private _direction: Direction;
  private _count: bigint;

  constructor() {
    super();
    this._direction = "forward";
    this._position = "start";
    this._count = BigInt(1);
  }

  /**
   * Asks the command to read forward (toward the end of the stream). Default behavior.
   */
  forward(): ReadAllEvents {
    this._direction = "forward";
    return this;
  }

  /**
   * Asks the command to read backward (toward the beginning of the stream).
   */
  backward(): ReadAllEvents {
    this._direction = "backward";
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
    this._position = position;
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): ReadAllEvents {
    this._position = "start";
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): ReadAllEvents {
    this._position = "end";
    return this;
  }

  /**
   * Sets the max number of events to read
   * @param count Max number of events to read.
   */
  count(count: bigint | number): ReadAllEvents {
    this._count = BigInt(count);
    return this;
  }

  /**
   * Sends asynchronously the read command to the server.
   */
  async execute(connection: ESDBConnection): Promise<AllStreamResolvedEvent[]> {
    const req = new ReadReq();
    const options = new ReadReq.Options();

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this._position) {
      case "start": {
        allOptions.setStart(new Empty());
        break;
      }

      case "end": {
        allOptions.setEnd(new Empty());
        break;
      }

      default: {
        const pos = new ReadReq.Options.Position();
        pos.setCommitPosition(this._position.commit.toString(10));
        pos.setPreparePosition(this._position.prepare.toString(10));
        allOptions.setPosition(pos);
        break;
      }
    }
    options.setCount(this._count.toString(10));
    options.setAll(allOptions);
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

    debug.command("ReadAllEvents: %c", this);
    debug.command_grpc("ReadAllEvents: %g", req);

    const client = await connection._client(StreamsClient, "ReadAllEvents");
    const stream = client.read(req, this.metadata);
    return handleBatchRead(stream, convertAllStreamGrpcEvent);
  }
}
