import { StreamIdentifier } from "../../generated/shared_pb";
import { DeleteReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import { convertToCommandError, debug } from "../utils";
import { BaseOptions } from "../types";
import { Client } from "../Client";

export interface DeletePersistentSubscriptionToStreamOptions
  extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Deletes a persistent subscription.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param options Deletion options.
     */
    deletePersistentSubscriptionToStream(
      streamName: string,
      groupName: string,
      options?: DeletePersistentSubscriptionToStreamOptions
    ): Promise<void>;

    /**
     * Deletes a persistent subscription.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param options Deletion options.
     * @deprecated Renamed to {@link deletePersistentSubscriptionToStream}.
     */
    deletePersistentSubscription(
      streamName: string,
      groupName: string,
      options?: DeletePersistentSubscriptionToStreamOptions
    ): Promise<void>;
  }
}

Client.prototype.deletePersistentSubscriptionToStream = async function (
  this: Client,
  streamName: string,
  groupName: string,
  baseOptions: DeletePersistentSubscriptionToStreamOptions = {}
): Promise<void> {
  const req = new DeleteReq();
  const options = new DeleteReq.Options();
  const identifier = new StreamIdentifier();

  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));
  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);
  req.setOptions(options);

  debug.command("deletePersistentSubscriptionToStream: %O", {
    streamName,
    groupName,
    options: baseOptions,
  });
  debug.command_grpc("deletePersistentSubscriptionToStream: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "deletePersistentSubscriptionToStream",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.delete(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};

Client.prototype.deletePersistentSubscription =
  Client.prototype.deletePersistentSubscriptionToStream;
