import { DuplexOptions } from "stream";

import { Empty } from "../../generated/shared_pb";
import { ReadReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import { BaseOptions, PersistentSubscriptionToAll } from "../types";
import { convertAllStreamGrpcEvent, debug, UnsupportedError } from "../utils";
import { Client } from "../Client";
import { PersistentSubscriptionImpl } from "./utils/PersistentSubscriptionImpl";

export interface ConnectToPersistentSubscriptionToAllOptions
  extends BaseOptions {
  /**
   * The buffer size to use for the persistent subscription.
   * @default 10
   */
  bufferSize?: number;
  /**
   * Skips server version check, possibly sending unsupported call to server.
   */
  skipVersionCheck?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Connects to a persistent subscription.
     * @param stream A stream name.
     * @param group A group name.
     * @param options Connection options.
     */
    connectToPersistentSubscriptionToAll(
      groupName: string,
      options?: ConnectToPersistentSubscriptionToAllOptions,
      duplexOptions?: DuplexOptions
    ): PersistentSubscriptionToAll;
  }
}

Client.prototype.connectToPersistentSubscriptionToAll = function (
  this: Client,
  groupName: string,
  {
    bufferSize = 10,
    skipVersionCheck = false,
    ...baseOptions
  }: ConnectToPersistentSubscriptionToAllOptions = {},
  duplexOptions: DuplexOptions = {}
): PersistentSubscriptionToAll {
  return new PersistentSubscriptionImpl(
    this.GRPCStreamCreator(
      PersistentSubscriptionsClient,
      "connectToPersistentSubscription",
      async (client) => {
        if (!skipVersionCheck && (await this.versionMatches("<21.10"))) {
          throw new UnsupportedError(
            "connectToPersistentSubscriptionToAll",
            "21.10"
          );
        }

        const req = new ReadReq();
        const options = new ReadReq.Options();
        const uuidOption = new UUIDOption();
        uuidOption.setString(new Empty());

        options.setAll(new Empty());
        options.setGroupName(groupName);
        options.setBufferSize(bufferSize);
        options.setUuidOption(uuidOption);
        req.setOptions(options);

        debug.command("connectToPersistentSubscriptionToAll: %O", {
          groupName,
          options: {
            bufferSize,
            ...baseOptions,
          },
        });
        debug.command_grpc("connectToPersistentSubscriptionToAll: %g", req);

        const stream = client.read(
          ...this.callArguments(baseOptions, {
            deadline: Infinity,
          })
        );
        stream.write(req);
        return stream;
      }
    ),
    convertAllStreamGrpcEvent,
    duplexOptions
  );
};
