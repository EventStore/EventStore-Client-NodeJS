import { StreamIdentifier, Empty } from "../../generated/shared_pb";
import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import { Client } from "../Client";
import { BACKWARD, END, FORWARD, START } from "../constants";
import { BaseOptions, Direction, ReadRevision, ResolvedEvent } from "../types";
import { debug, handleBatchRead } from "../utils";
import { convertGrpcEvent } from "../utils/convertGrpcEvent";

export interface ReadEventsFromStreamOptions extends BaseOptions {
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
  resolveLinks?: boolean;
  /**
   *  Sets the read direction of the stream
   * @defaultValue FORWARDS
   */
  direction?: Direction;
}

declare module "../Client" {
  interface Client {
    /**
     * Sends events to a given stream.
     * @param stream A stream name.
     * @param events Events or event to write
     * @param options Writing options
     */
    readEventsFromStream(
      stream: string,
      count: number | BigInt,
      options?: ReadEventsFromStreamOptions
    ): Promise<ResolvedEvent[]>;
  }
}

Client.prototype.readEventsFromStream = async function (
  this: Client,
  stream: string,
  count: number | BigInt,
  {
    fromRevision = START,
    resolveLinks = false,
    direction = FORWARD,
    ...baseOptions
  }: ReadEventsFromStreamOptions = {}
): Promise<ResolvedEvent[]> {
  const req = new ReadReq();
  const options = new ReadReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamname(Buffer.from(stream).toString("base64"));

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
  options.setResolveLinks(resolveLinks);
  options.setCount(count.toString(10));
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

  debug.command("ReadEventsFromStream: %c", this);
  debug.command_grpc("ReadEventsFromStream: %g", req);

  const client = await this.getGRPCClient(
    StreamsClient,
    "ReadEventsFromStream"
  );
  const readableStream = client.read(req, this.metadata(baseOptions));
  return handleBatchRead(readableStream, convertGrpcEvent);
};
