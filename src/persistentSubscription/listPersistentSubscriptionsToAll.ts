import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";
import { ListReq } from "../../generated/persistent_pb";
import { Empty } from "../../generated/shared_pb";

import type { BaseOptions } from "../types";
import { debug, convertToCommandError, UnsupportedError } from "../utils";
import { Client } from "../Client";

import {
  mapPersistentSubscriptionToAllInfo,
  PersistentSubscriptionToAllInfo,
} from "./utils/mapPersistentSubscriptionInfo";

interface ListPersistentSubscriptionsToAllOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Lists persistent subscriptions to the $all stream.
     * @param options List persistent subscriptions options.
     */
    listPersistentSubscriptionsToAll(
      options?: ListPersistentSubscriptionsToAllOptions
    ): Promise<PersistentSubscriptionToAllInfo[]>;
  }
}

Client.prototype.listPersistentSubscriptionsToAll = async function (
  this: Client,
  baseOptions: ListPersistentSubscriptionsToAllOptions = {}
): Promise<PersistentSubscriptionToAllInfo[]> {
  if (!(await this.supports(PersistentSubscriptionsService.list, "all"))) {
    throw new UnsupportedError("listPersistentSubscriptionsToAll", "21.10.1");
  }

  const req = new ListReq();
  const options = new ListReq.Options();
  const streamOption = new ListReq.StreamOption();

  streamOption.setAll(new Empty());
  options.setListForStream(streamOption);
  req.setOptions(options);

  debug.command("listPersistentSubscriptionsToAll: %O", {
    options: baseOptions,
  });
  debug.command_grpc("listPersistentSubscriptionsToAll: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "listPersistentSubscriptionsToAll",
    (client) =>
      new Promise<PersistentSubscriptionToAllInfo[]>((resolve, reject) => {
        client.list(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              response
                .getSubscriptionsList()
                .map((r) => mapPersistentSubscriptionToAllInfo(r))
            );
          }
        );
      })
  );
};
