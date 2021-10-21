import { ReadableOptions } from "stream";

import { StreamIdentifier, Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import { Client } from "../Client";
import { BACKWARDS, END, FORWARDS, START } from "../constants";
import {
  BaseOptions,
  Direction,
  EventType,
  ReadRevision,
  ResolvedEvent,
  StreamingRead,
} from "../types";
import { debug, convertGrpcEvent, ReadStream } from "../utils";

export interface ReadStreamOptions extends BaseOptions {
  /**
   * The number of events to read.
   * @default Number.MAX_SAFE_INTEGER
   */
  maxCount?: number | BigInt;
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
  /**
   * Sets the read direction of the stream.
   * @default FORWARDS
   */
  direction?: Direction;
}

declare module "../Client" {
  interface Client {
    /**
     * Sends events to a given stream.
     * @param streamName A stream name.
     * @param options Reading options.
     */
    readStream<KnownEventType extends EventType = EventType>(
      streamName: string,
      options?: ReadStreamOptions,
      readableOptions?: ReadableOptions
    ): StreamingRead<ResolvedEvent<KnownEventType>>;
  }
}

Client.prototype.readStream = function <
  KnownEventType extends EventType = EventType
>(
  this: Client,
  streamName: string,
  {
    maxCount = Number.MAX_SAFE_INTEGER,
    fromRevision = START,
    resolveLinkTos = false,
    direction = FORWARDS,
    ...baseOptions
  }: ReadStreamOptions = {},
  readableOptions: ReadableOptions = {}
): StreamingRead<ResolvedEvent<KnownEventType>> {
  const req = new ReadReq();
  const options = new ReadReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));

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

  debug.command("readStream: %O", {
    streamName,
    maxCount,
    options: {
      fromRevision,
      resolveLinkTos,
      direction,
      ...baseOptions,
    },
  });
  debug.command_grpc("readStream: %g", req);

  const createGRPCStream = this.GRPCStreamCreator(
    StreamsClient,
    "readStream",
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
