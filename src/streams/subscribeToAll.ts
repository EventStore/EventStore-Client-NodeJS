import type { ReadableOptions } from "stream";

import { Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";

import type {
  ReadPosition,
  AllStreamSubscription,
  BaseOptions,
  Filter,
} from "../types";
import { convertGrpcEvent, debug } from "../utils";
import { Client } from "../Client";
import { END, EVENT_TYPE, START, STREAM_NAME } from "../constants";

import { Subscription } from "./utils/Subscription";
import schemas from "../schemas";
import { validateField } from "../utils/validation";

export interface SubscribeToAllOptions extends BaseOptions {
  /**
   * Starts the read at the given position.
   *
   * @default START
   */
  fromPosition?: ReadPosition;
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   *
   * @default false
   */
  resolveLinkTos?: boolean;
  /**
   * Filters events or streams based upon a predicate.
   */
  filter?: Filter;
}

declare module "../Client" {
  interface Client {
    /**
     * Subscribe to events on the $all stream.
     *
     * @param options Subscription options.
     * @param readableOptions Readable stream options.
     */
    subscribeToAll(
      options?: SubscribeToAllOptions,
      readableOptions?: ReadableOptions
    ): AllStreamSubscription;
  }
}

Client.prototype.subscribeToAll = function (
  this: Client,
  subscribeToAllOptions: SubscribeToAllOptions = {},
  readableOptions: ReadableOptions = {}
): AllStreamSubscription {
  const {
    fromPosition = START,
    resolveLinkTos = false,
    filter,
    ...baseOptions
  } = subscribeToAllOptions;

  validateField(
    schemas.subscribeToAllOptions.optional(),
    subscribeToAllOptions
  );

  const req = new ReadReq();
  const options = new ReadReq.Options();
  const uuidOption = new ReadReq.Options.UUIDOption();
  uuidOption.setString(new Empty());

  const allOptions = new ReadReq.Options.AllOptions();

  switch (fromPosition) {
    case START: {
      allOptions.setStart(new Empty());
      break;
    }

    case END: {
      allOptions.setEnd(new Empty());
      break;
    }

    default: {
      const grpcPos = new ReadReq.Options.Position();
      grpcPos.setCommitPosition(fromPosition.commit.toString(10));
      grpcPos.setPreparePosition(fromPosition.prepare.toString(10));
      allOptions.setPosition(grpcPos);
      break;
    }
  }

  options.setAll(allOptions);
  options.setResolveLinks(resolveLinkTos);
  options.setSubscription(new ReadReq.Options.SubscriptionOptions());
  options.setUuidOption(uuidOption);

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

  debug.command("subscribeToAll: %O", {
    options: {
      fromPosition,
      resolveLinkTos,
      filter,
      ...baseOptions,
    },
  });
  debug.command_grpc("subscribeToAll: %g", req);

  const createGRPCStream = this.GRPCStreamCreator(
    StreamsClient,
    "subscribeToAll",
    (client) =>
      client.read(
        req,
        ...this.callArguments(baseOptions, {
          deadline: Infinity,
        })
      )
  );

  return new Subscription(
    createGRPCStream,
    convertGrpcEvent,
    readableOptions,
    filter?.checkpointReached
  );
};
