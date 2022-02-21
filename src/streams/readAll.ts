import type { ReadableOptions } from "stream";

import { Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";

import type {
  BaseOptions,
  ReadPosition,
  Direction,
  AllStreamResolvedEvent,
  StreamingRead,
} from "../types";
import { debug, convertAllStreamGrpcEvent } from "../utils";
import { BACKWARDS, FORWARDS, START } from "../constants";
import { Client } from "../Client";

import { ReadStream } from "./utils/ReadStream";

export interface ReadAllOptions extends BaseOptions {
  /**
   * The number of events to read.
   * @default Number.MAX_SAFE_INTEGER
   */
  maxCount?: number | BigInt;
  /**
   * Starts the read at the given position.
   * @default START
   */
  fromPosition?: ReadPosition;
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @default false
   */
  resolveLinkTos?: boolean;
  /**
   * Sets the read direction of the streamconnection.
   * @default FORWARDS
   */
  direction?: Direction;
}

declare module "../Client" {
  interface Client {
    /**
     * Reads events from the $all. You can read forwards or backwards.
     * You might need to be authenticated to execute the command successfully.
     * @param options Reading options.
     */
    readAll(
      options?: ReadAllOptions,
      readableOptions?: ReadableOptions
    ): StreamingRead<AllStreamResolvedEvent>;
  }
}

Client.prototype.readAll = function (
  this: Client,
  {
    maxCount = Number.MAX_SAFE_INTEGER,
    fromPosition = START,
    resolveLinkTos = false,
    direction = FORWARDS,
    ...baseOptions
  }: ReadAllOptions = {},
  readableOptions: ReadableOptions = {}
): StreamingRead<AllStreamResolvedEvent> {
  const req = new ReadReq();
  const options = new ReadReq.Options();

  const uuidOption = new ReadReq.Options.UUIDOption();
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

  options.setAll(allOptions);
  options.setResolveLinks(resolveLinkTos);
  options.setCount(maxCount.toString(10));
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

  const createGRPCStream = this.GRPCStreamCreator(
    StreamsClient,
    "readAll",
    (client) =>
      client.read(
        req,
        ...this.callArguments(baseOptions, {
          deadline: Infinity,
        })
      )
  );

  return new ReadStream(
    createGRPCStream,
    convertAllStreamGrpcEvent,
    readableOptions
  );
};
