import type { ReadableOptions } from "stream";

import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import { Empty } from "../../generated/shared_pb";

import type {
  ReadRevision,
  StreamSubscription,
  BaseOptions,
  EventType,
} from "../types";
import { Client } from "../Client";
import { END, START } from "../constants";
import { debug, convertGrpcEvent, createStreamIdentifier } from "../utils";

import { Subscription } from "./utils/Subscription";

export interface SubscribeToStreamOptions extends BaseOptions {
  /**
   * Starts the read at the given event revision.
   * @default START
   */
  fromRevision?: ReadRevision;
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @default false
   */
  resolveLinkTos?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Subscribe to events on the given stream.
     * @param streamName A stream name.
     * @param options Subscription options.
     * @param readableOptions Readable stream options.
     */
    subscribeToStream<KnownEventType extends EventType = EventType>(
      streamName: string,
      options?: SubscribeToStreamOptions,
      readableOptions?: ReadableOptions
    ): StreamSubscription<KnownEventType>;
  }
}

Client.prototype.subscribeToStream = function <
  KnownEventType extends EventType = EventType
>(
  this: Client,
  streamName: string,
  {
    fromRevision = START,
    resolveLinkTos = false,
    ...baseOptions
  }: SubscribeToStreamOptions = {},
  readableOptions: ReadableOptions = {}
): StreamSubscription<KnownEventType> {
  const req = new ReadReq();
  const options = new ReadReq.Options();
  const streamOptions = new ReadReq.Options.StreamOptions();
  const uuidOption = new ReadReq.Options.UUIDOption();
  const identifier = createStreamIdentifier(streamName);

  uuidOption.setString(new Empty());
  streamOptions.setStreamIdentifier(identifier);

  switch (fromRevision) {
    case START: {
      streamOptions.setStart(new Empty());
      break;
    }

    case END: {
      streamOptions.setEnd(new Empty());
      break;
    }

    default: {
      streamOptions.setRevision(fromRevision.toString(10));
      break;
    }
  }

  options.setStream(streamOptions);
  options.setResolveLinks(resolveLinkTos);
  options.setSubscription(new ReadReq.Options.SubscriptionOptions());
  options.setUuidOption(uuidOption);
  options.setNoFilter(new Empty());

  req.setOptions(options);

  debug.command("subscribeToStream: %O", {
    streamName,
    options: {
      fromRevision,
      resolveLinkTos,
      ...baseOptions,
    },
  });
  debug.command_grpc("subscribeToStream: %g", req);

  const createGRPCStream = () =>
    this.execute(StreamsClient, "subscribeToStream", (client) =>
      client.read(
        req,
        ...this.callArguments(baseOptions, {
          deadline: Infinity,
        })
      )
    );

  return new Subscription(createGRPCStream, convertGrpcEvent, readableOptions);
};
