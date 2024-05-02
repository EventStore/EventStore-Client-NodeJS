import { Empty } from "../../generated/shared_pb";
import { DeleteReq } from "../../generated/persistent_pb";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";

import { convertToCommandError, debug, UnsupportedError } from "../utils";
import type { BaseOptions } from "../types";
import { Client } from "../Client";

export interface DeletePersistentSubscriptionToAllOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Deletes a persistent subscription.
     * @param streamName - A stream name.
     * @param groupName - A group name.
     * @param options - Deletion options.
     */
    deletePersistentSubscriptionToAll(
      groupName: string,
      options?: DeletePersistentSubscriptionToAllOptions
    ): Promise<void>;
  }
}

Client.prototype.deletePersistentSubscriptionToAll = async function (
  this: Client,
  groupName: string,
  { ...baseOptions }: DeletePersistentSubscriptionToAllOptions = {}
): Promise<void> {
  if (!(await this.supports(PersistentSubscriptionsService.delete, "all"))) {
    throw new UnsupportedError("deletePersistentSubscriptionToAll", "21.10");
  }

  const req = new DeleteReq();
  const options = new DeleteReq.Options();

  options.setAll(new Empty());
  options.setGroupName(groupName);
  req.setOptions(options);

  debug.command("deletePersistentSubscriptionToAll: %O", {
    groupName,
    options: baseOptions,
  });
  debug.command_grpc("deletePersistentSubscriptionToAll: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "deletePersistentSubscriptionToAll",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.delete(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
