import { StreamIdentifier, Empty } from "../../generated/shared_pb";
import { ReadReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import { PersistentSubscription, BaseOptions } from "../types";
import { TwoWaySubscription, debug } from "../utils";
import { Client } from "../Client";

export interface ConnectToPersistentSubscriptionOptions extends BaseOptions {
  /**
   * The buffer size to use for the persistent subscription.
   * @defaultValue 10
   */
  bufferSize?: number;
}

declare module "../Client" {
  interface Client {
    /**
     * Connects to a persistent subscription.
     * @param stream A stream name.
     * @param group A group name
     * @param options Connection options
     */
    connectToPersistentSubscription(
      streamName: string,
      groupName: string,
      options?: ConnectToPersistentSubscriptionOptions
    ): Promise<PersistentSubscription>;
  }
}

Client.prototype.connectToPersistentSubscription = async function (
  this: Client,
  streamName: string,
  groupName: string,
  {
    bufferSize = 10,
    ...baseOptions
  }: ConnectToPersistentSubscriptionOptions = {}
): Promise<PersistentSubscription> {
  const req = new ReadReq();
  const options = new ReadReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamname(Buffer.from(streamName).toString("base64"));

  const uuidOption = new UUIDOption();
  uuidOption.setString(new Empty());
  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);
  options.setBufferSize(bufferSize);
  options.setUuidOption(uuidOption);
  req.setOptions(options);

  debug.command("ConnectToPersistentSubscription: %c", this);
  debug.command_grpc("ConnectToPersistentSubscription: %g", req);

  const client = await this.getGRPCClient(
    PersistentSubscriptionsClient,
    "ConnectToPersistentSubscription"
  );
  const stream = client.read(this.metadata(baseOptions), {
    deadline: Infinity,
  });
  stream.write(req);

  return new TwoWaySubscription(stream);
};
