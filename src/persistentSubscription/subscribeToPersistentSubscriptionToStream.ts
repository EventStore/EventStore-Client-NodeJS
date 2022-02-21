import type { DuplexOptions } from "stream";

import { StreamIdentifier, Empty } from "../../generated/shared_pb";
import { ReadReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import type {
  PersistentSubscriptionToStream,
  BaseOptions,
  EventType,
} from "../types";
import { debug, convertGrpcEvent } from "../utils";
import { Client } from "../Client";
import { PersistentSubscriptionImpl } from "./utils/PersistentSubscriptionImpl";

export interface SubscribeToPersistentSubscriptionToStreamOptions
  extends BaseOptions {
  /**
   * The buffer size to use for the persistent subscription.
   * @default 10
   */
  bufferSize?: number;
}

declare module "../Client" {
  interface Client {
    /**
     * Connects to a persistent subscription.
     * @param stream A stream name.
     * @param group A group name.
     * @param options Connection options.
     */
    subscribeToPersistentSubscriptionToStream<E extends EventType = EventType>(
      streamName: string,
      groupName: string,
      options?: SubscribeToPersistentSubscriptionToStreamOptions,
      duplexOptions?: DuplexOptions
    ): PersistentSubscriptionToStream<E>;

    /**
     * Connects to a persistent subscription.
     * @param stream A stream name.
     * @param group A group name.
     * @param options Connection options.
     * @deprecated Renamed to {@link subscribeToPersistentSubscriptionToStream}.
     */
    subscribeToPersistentSubscription<E extends EventType = EventType>(
      streamName: string,
      groupName: string,
      options?: SubscribeToPersistentSubscriptionToStreamOptions,
      duplexOptions?: DuplexOptions
    ): PersistentSubscriptionToStream<E>;
  }
}

Client.prototype.subscribeToPersistentSubscriptionToStream = function <
  E extends EventType = EventType
>(
  this: Client,
  streamName: string,
  groupName: string,
  {
    bufferSize = 10,
    ...baseOptions
  }: SubscribeToPersistentSubscriptionToStreamOptions = {},
  duplexOptions: DuplexOptions = {}
): PersistentSubscriptionToStream<E> {
  return new PersistentSubscriptionImpl(
    this.GRPCStreamCreator(
      PersistentSubscriptionsClient,
      "subscribeToPersistentSubscriptionToStream",
      (client) => {
        const req = new ReadReq();
        const options = new ReadReq.Options();
        const identifier = new StreamIdentifier();
        identifier.setStreamName(
          Uint8Array.from(Buffer.from(streamName, "utf8"))
        );

        const uuidOption = new ReadReq.Options.UUIDOption();
        uuidOption.setString(new Empty());
        options.setStreamIdentifier(identifier);
        options.setGroupName(groupName);
        options.setBufferSize(bufferSize);
        options.setUuidOption(uuidOption);
        req.setOptions(options);

        debug.command("subscribeToPersistentSubscriptionToStream: %O", {
          streamName,
          groupName,
          options: {
            bufferSize,
            ...baseOptions,
          },
        });
        debug.command_grpc(
          "subscribeToPersistentSubscriptionToStream: %g",
          req
        );

        const stream = client.read(
          ...this.callArguments(baseOptions, {
            deadline: Infinity,
          })
        );
        stream.write(req);
        return stream;
      }
    ),
    convertGrpcEvent,
    duplexOptions
  );
};

Client.prototype.subscribeToPersistentSubscription =
  Client.prototype.subscribeToPersistentSubscriptionToStream;
