import type { DuplexOptions } from "stream";

import { Empty } from "../../generated/shared_pb";
import { ReadReq } from "../../generated/persistent_pb";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";

import type { BaseOptions, PersistentSubscriptionToAll } from "../types";
import {
  convertPersistentSubscriptionToAllGrpcEvent,
  debug,
  UnsupportedError,
} from "../utils";
import { Client } from "../Client";
import { PersistentSubscriptionImpl } from "./utils/PersistentSubscriptionImpl";

export interface SubscribeToPersistentSubscriptionToAllOptions
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
    subscribeToPersistentSubscriptionToAll(
      groupName: string,
      options?: SubscribeToPersistentSubscriptionToAllOptions,
      duplexOptions?: DuplexOptions
    ): PersistentSubscriptionToAll;
  }
}

Client.prototype.subscribeToPersistentSubscriptionToAll = function (
  this: Client,
  groupName: string,
  {
    bufferSize = 10,
    ...baseOptions
  }: SubscribeToPersistentSubscriptionToAllOptions = {},
  duplexOptions: DuplexOptions = {}
): PersistentSubscriptionToAll {
  return new PersistentSubscriptionImpl(
    this.GRPCStreamCreator(
      PersistentSubscriptionsClient,
      "subscribeToPersistentSubscriptionToAll",
      async (client) => {
        if (
          !(await this.supports(PersistentSubscriptionsService.read, "all"))
        ) {
          throw new UnsupportedError(
            "subscribeToPersistentSubscriptionToAll",
            "21.10"
          );
        }

        const req = new ReadReq();
        const options = new ReadReq.Options();
        const uuidOption = new ReadReq.Options.UUIDOption();
        uuidOption.setString(new Empty());

        options.setAll(new Empty());
        options.setGroupName(groupName);
        options.setBufferSize(bufferSize);
        options.setUuidOption(uuidOption);
        req.setOptions(options);

        debug.command("subscribeToPersistentSubscriptionToAll: %O", {
          groupName,
          options: {
            bufferSize,
            ...baseOptions,
          },
        });
        debug.command_grpc("subscribeToPersistentSubscriptionToAll: %g", req);

        const stream = client.read(
          ...this.callArguments(baseOptions, {
            deadline: Infinity,
          })
        );
        stream.write(req);
        return stream;
      }
    ),
    convertPersistentSubscriptionToAllGrpcEvent,
    duplexOptions
  );
};
