import { Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import {
  BaseOptions,
  ReadPosition,
  Direction,
  AllStreamResolvedEvent,
} from "../types";
import { debug, convertAllStreamGrpcEvent, handleBatchRead } from "../utils";
import { BACKWARDS, FORWARDS, START } from "../constants";
import { Client } from "../Client";

export interface ReadAllOptions extends BaseOptions {
  /**
   * The number of events to read.
   * @defaultValue Number.MAX_SAFE_INTEGER
   */
  maxCount?: number | BigInt;
  /**
   * Starts the read at the given position.
   * @defaultValue START
   */
  fromPosition?: ReadPosition;
  /**
   *  Sets the read direction of the streamconnection
   * @defaultValue FORWARDS
   */
  direction?: Direction;
}

declare module "../Client" {
  interface Client {
    /**
     * Reads events from the $all. You can read forwards or backwards.
     * You might need to be authenticated to execute the command successfully.
     * @param options Reading options
     */
    readAll(options?: ReadAllOptions): Promise<AllStreamResolvedEvent[]>;
  }
}

Client.prototype.readAll = async function (
  this: Client,
  {
    maxCount = Number.MAX_SAFE_INTEGER,
    fromPosition = START,
    direction = FORWARDS,
    ...baseOptions
  }: ReadAllOptions = {}
): Promise<AllStreamResolvedEvent[]> {
  const req = new ReadReq();
  const options = new ReadReq.Options();

  const uuidOption = new UUIDOption();
  uuidOption.setString(new Empty());

  const allOptions = new ReadReq.Options.AllOptions();

  switch (fromPosition) {
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
      pos.setCommitPosition(fromPosition.commit.toString(10));
      pos.setPreparePosition(fromPosition.prepare.toString(10));
      allOptions.setPosition(pos);
      break;
    }
  }
  options.setCount(maxCount.toString(10));
  options.setAll(allOptions);
  options.setUuidOption(uuidOption);
  options.setNoFilter(new Empty());

  switch (direction) {
    case FORWARDS: {
      options.setReadDirection(0);
      break;
    }
    case BACKWARDS: {
      options.setReadDirection(1);
      break;
    }
  }

  req.setOptions(options);

  debug.command("readAll: %O", {
    maxCount,
    options: {
      fromPosition,
      direction,
      ...baseOptions,
    },
  });
  debug.command_grpc("readAll: %g", req);

  const client = await this.getGRPCClient(StreamsClient, "readAll");
  const stream = client.read(req, this.metadata(baseOptions));
  return handleBatchRead(stream, convertAllStreamGrpcEvent);
};
