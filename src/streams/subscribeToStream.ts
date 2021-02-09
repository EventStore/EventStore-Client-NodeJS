import { ReadableOptions } from "stream";

import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import { Empty, StreamIdentifier } from "../../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;

import {
  ReadRevision,
  StreamSubscription,
  BaseOptions,
  EventType,
} from "../types";
import { Client } from "../Client";
import { END, START } from "../constants";
import { debug, convertGrpcEvent, OneWaySubscription } from "../utils";

export interface SubscribeToStreamOptions extends BaseOptions {
  /**
   * Starts the read at the given event revision.
   * @defaultValue START
   */
  fromRevision?: ReadRevision;
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @defaultValue false
   */
  resolveLinkTos?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Sends events to a given stream.
     * @param streamName A stream name.
     * @param options Writing options
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
  const identifier = new StreamIdentifier();
  identifier.setStreamname(Buffer.from(streamName).toString("base64"));

  const uuidOption = new UUIDOption();
  uuidOption.setString(new Empty());

  const streamOptions = new ReadReq.Options.StreamOptions();
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
  options.setSubscription(new SubscriptionOptions());
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

  return new OneWaySubscription(
    async () => {
      const client = await this.getGRPCClient(
        StreamsClient,
        "subscribeToStream"
      );
      return client.read(
        req,
        ...this.callArguments(baseOptions, {
          deadline: Infinity,
        })
      );
    },
    convertGrpcEvent,
    readableOptions
  );
};
