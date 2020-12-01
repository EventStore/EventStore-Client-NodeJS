import { CallOptions } from "@grpc/grpc-js";

import { StreamsClient } from "../../generated/streams_grpc_pb";
import { ReadReq } from "../../generated/streams_pb";
import { Empty, StreamIdentifier } from "../../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;

import { ReadRevision, StreamSubscription, BaseOptions } from "../types";
import { Client } from "../Client";
import { END, START } from "../constants";
import { debug, OneWaySubscription, convertGrpcEvent } from "../utils";

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
  resolveLinks?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Sends events to a given stream.
     * @param stream A stream name.
     * @param options Writing options
     */
    subscribeToStream(
      stream: string,
      options?: SubscribeToStreamOptions
    ): Promise<StreamSubscription>;
  }
}

Client.prototype.subscribeToStream = async function (
  this: Client,
  stream: string,
  {
    fromRevision = START,
    resolveLinks = false,
    ...baseOptions
  }: SubscribeToStreamOptions = {}
): Promise<StreamSubscription> {
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
  options.setSubscription(new SubscriptionOptions());
  options.setUuidOption(uuidOption);
  options.setNoFilter(new Empty());

  req.setOptions(options);

  const callOptions: CallOptions = {
    deadline: Infinity,
  };

  debug.command("SubscribeToAll: %c", this);
  debug.command_grpc("SubscribeToAll: %g", req);

  const client = await this.getGRPCClient(StreamsClient, "SubscribeToAll");
  const readStream = client.read(req, this.metadata(baseOptions), callOptions);

  return new OneWaySubscription(readStream, convertGrpcEvent);
};
