import { CallOptions } from "@grpc/grpc-js";
import { Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;
import GRPCFilterOptions = ReadReq.Options.FilterOptions;
import GRPCExpression = ReadReq.Options.FilterOptions.Expression;

import {
  ReadPosition,
  AllStreamSubscription,
  BaseOptions,
  Filter,
} from "../types";
import { OneWaySubscription, convertAllStreamGrpcEvent, debug } from "../utils";
import { Client } from "../Client";
import { END, EVENT_TYPE, START, STREAM_NAME } from "../constants";

export interface SubscribeToAllOptions extends BaseOptions {
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
  resolveLinks?: boolean;
  /**
   * Filters events or streams based upon a predicate.
   */
  filter?: Filter;
}

declare module "../Client" {
  interface Client {
    /**
     * Sends events to a given stream.
     * @param stream A stream name.
     * @param options Writing options
     */
    subscribeToAll(
      options?: SubscribeToAllOptions
    ): Promise<AllStreamSubscription>;
  }
}

Client.prototype.subscribeToAll = async function (
  this: Client,
  {
    fromPosition = START,
    resolveLinks = false,
    filter,
    ...baseOptions
  }: SubscribeToAllOptions = {}
): Promise<AllStreamSubscription> {
  const req = new ReadReq();
  const options = new ReadReq.Options();
  const uuidOption = new UUIDOption();
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
  options.setResolveLinks(resolveLinks);
  options.setSubscription(new SubscriptionOptions());
  options.setUuidOption(uuidOption);

  if (filter) {
    const expr = new GRPCExpression();

    if (filter.prefixes) {
      expr.setPrefixList(filter.prefixes);
    }

    if (filter.regex) {
      expr.setRegex(filter.regex);
    }

    const filterOptions = new GRPCFilterOptions();

    if (filter.max) {
      filterOptions.setMax(filter.max);
    }

    if (filter.checkpointIntervalMul) {
      filterOptions.setCheckpointintervalmultiplier(
        filter.checkpointIntervalMul
      );
    }

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
    options.setFilter(filterOptions);
  } else {
    options.setNoFilter(new Empty());
  }

  req.setOptions(options);

  const callOptions: CallOptions = {
    deadline: Infinity,
  };

  debug.command("SubscribeToAll: %c", this);
  debug.command_grpc("SubscribeToAll: %g", req);

  const client = await this.getGRPCClient(StreamsClient, "SubscribeToAll");
  const readStream = client.read(req, this.metadata(baseOptions), callOptions);

  return new OneWaySubscription(readStream, convertAllStreamGrpcEvent);
};
