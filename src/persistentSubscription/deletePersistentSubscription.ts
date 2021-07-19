import { StreamIdentifier } from "../../generated/shared_pb";
import { DeleteReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import { convertToCommandError, debug } from "../utils";
import { BaseOptions } from "../types";
import { Client } from "../Client";

export interface DeletePersistentSubscriptionOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Deletes a persistent subscription.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param options Deletion options.
     */
    deletePersistentSubscription(
      streamName: string,
      groupName: string,
      options?: DeletePersistentSubscriptionOptions
    ): Promise<void>;
  }
}

Client.prototype.deletePersistentSubscription = async function (
  this: Client,
  streamName: string,
  groupName: string,
  baseOptions: DeletePersistentSubscriptionOptions = {}
): Promise<void> {
  const req = new DeleteReq();
  const options = new DeleteReq.Options();
  const identifier = new StreamIdentifier();

  identifier.setStreamname(Uint8Array.from(Buffer.from(streamName, "utf8")));
  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);
  req.setOptions(options);

  debug.command("deletePersistentSubscription: %O", {
    streamName,
    groupName,
    options: baseOptions,
  });
  debug.command_grpc("deletePersistentSubscription: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "deletePersistentSubscription",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.delete(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
