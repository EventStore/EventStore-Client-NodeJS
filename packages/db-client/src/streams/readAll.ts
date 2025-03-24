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
  Filter,
} from "../types";
import { debug, convertGrpcEvent } from "../utils";
import {
  BACKWARDS,
  EVENT_TYPE,
  FORWARDS,
  START,
  STREAM_NAME,
} from "../constants";
import { Client } from "../Client";

import { ReadStream } from "./utils/ReadStream";

export interface ReadAllOptions extends BaseOptions {
  /**
   * The number of events to read.
   * @defaultValue Number.MAX_SAFE_INTEGER
   */
  maxCount?: number | bigint;
  /**
   * Starts the read at the given position.
   * @defaultValue START
   */
  fromPosition?: ReadPosition;
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @defaultValue false
   */
  resolveLinkTos?: boolean;
  /**
   * Sets the read direction of the streamconnection.
   * @defaultValue FORWARDS
   */
  direction?: Direction;
  /**
   * Filters events or streams based upon a predicate.
   */
  filter?: Filter;
}

declare module "../Client" {
  interface Client {
    /**
     * Reads events from the $all. You can read forwards or backwards.
     * You might need to be authenticated to execute the command successfully.
     * @param options - Reading options.
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
    filter,
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

  if (filter) {
    const expr = new ReadReq.Options.FilterOptions.Expression();

    if ("prefixes" in filter) {
      expr.setPrefixList(filter.prefixes);
    }

    if ("regex" in filter) {
      expr.setRegex(filter.regex);
    }

    const filterOptions = new ReadReq.Options.FilterOptions();

    switch (filter.filterOn) {
      case STREAM_NAME: {
        filterOptions.setStreamIdentifier(expr);
        break;
      }
      case EVENT_TYPE: {
        filterOptions.setEventType(expr);
        break;
      }
    }

    if (typeof filter.maxSearchWindow === "number") {
      if (filter.maxSearchWindow <= 0) {
        throw new Error("MaxSearchWindow must be greater than 0.");
      }
      filterOptions.setMax(filter.maxSearchWindow);
    } else {
      filterOptions.setCount(new Empty());
    }

    if (filter.checkpointInterval <= 0) {
      throw new Error("CheckpointInterval must be greater than 0.");
    }

    filterOptions.setCheckpointintervalmultiplier(filter.checkpointInterval);

    options.setFilter(filterOptions);
  } else {
    options.setNoFilter(new Empty());
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

  return new ReadStream(createGRPCStream, convertGrpcEvent, readableOptions);
};
