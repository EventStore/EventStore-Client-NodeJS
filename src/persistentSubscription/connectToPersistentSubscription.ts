import { DuplexOptions } from "stream";

import { StreamIdentifier, Empty } from "../../generated/shared_pb";
import { ReadReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import { PersistentSubscription, BaseOptions, EventType } from "../types";
import { TwoWaySubscription, debug } from "../utils";
import { Client } from "../Client";

export interface ConnectToPersistentSubscriptionOptions extends BaseOptions {
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
    connectToPersistentSubscription<E extends EventType = EventType>(
      streamName: string,
      groupName: string,
      options?: ConnectToPersistentSubscriptionOptions,
      duplexOptions?: DuplexOptions
    ): PersistentSubscription<E>;
  }
}

Client.prototype.connectToPersistentSubscription = function <
  E extends EventType = EventType
>(
  this: Client,
  streamName: string,
  groupName: string,
  {
    bufferSize = 10,
    ...baseOptions
  }: ConnectToPersistentSubscriptionOptions = {},
  duplexOptions: DuplexOptions = {}
): PersistentSubscription<E> {
  const req = new ReadReq();
  const options = new ReadReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamname(Uint8Array.from(Buffer.from(streamName, "utf8")));

  const uuidOption = new UUIDOption();
  uuidOption.setString(new Empty());
  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);
  options.setBufferSize(bufferSize);
  options.setUuidOption(uuidOption);
  req.setOptions(options);

  debug.command("connectToPersistentSubscription: %O", {
    streamName,
    groupName,
    options: {
      bufferSize,
      ...baseOptions,
    },
  });
  debug.command_grpc("connectToPersistentSubscription: %g", req);

  return new TwoWaySubscription(async () => {
    const client = await this.getGRPCClient(
      PersistentSubscriptionsClient,
      "connectToPersistentSubscription"
    );
    const stream = client.read(
      ...this.callArguments(baseOptions, {
        deadline: Infinity,
      })
    );
    stream.write(req);
    return stream;
  }, duplexOptions);
};
