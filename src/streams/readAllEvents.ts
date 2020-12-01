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
import { BACKWARD, FORWARD, START } from "../constants";
import { Client } from "../Client";

export interface ReadAllEventsOptions extends BaseOptions {
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
     * Reads events from the $all. You can read forward or backward.
     * You might need to be authenticated to execute the command successfully.
     * @param count The number of events to read
     * @param options Reading options
     */
    readAllEvents(
      count: number | BigInt,
      options?: ReadAllEventsOptions
    ): Promise<AllStreamResolvedEvent[]>;
  }
}

Client.prototype.readAllEvents = async function (
  this: Client,
  count: number | BigInt,
  {
    fromPosition = START,
    direction = FORWARD,
    ...baseOptions
  }: ReadAllEventsOptions = {}
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
  options.setCount(count.toString(10));
  options.setAll(allOptions);
  options.setUuidOption(uuidOption);
  options.setNoFilter(new Empty());

  switch (direction) {
    case FORWARD: {
      options.setReadDirection(0);
      break;
    }
    case BACKWARD: {
      options.setReadDirection(1);
      break;
    }
  }

  req.setOptions(options);

  debug.command("ReadAllEvents: %c", this);
  debug.command_grpc("ReadAllEvents: %g", req);

  const client = await this.getGRPCClient(StreamsClient, "ReadAllEvents");
  const stream = client.read(req, this.metadata(baseOptions));
  return handleBatchRead(stream, convertAllStreamGrpcEvent);
};
