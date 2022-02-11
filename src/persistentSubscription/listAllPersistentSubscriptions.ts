import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";
import { Client } from "../Client";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";
import { ListReq } from "../../generated/persistent_pb";
import {
  HTTPSubscriptionInfo,
  mapHTTPPersistentSubscriptionInfo,
  mapPersistentSubscriptionToEitherInfo,
  PersistentSubscriptionToEitherInfo,
} from "./utils/mapPersistentSubscriptionInfo";
import { Empty } from "../../generated/shared_pb";

interface ListPersistentSubscriptionsOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Lists all persistent subscriptions.
     * @param options List projections options.
     */
    listAllPersistentSubscriptions(
      options?: ListPersistentSubscriptionsOptions
    ): Promise<PersistentSubscriptionToEitherInfo[]>;
  }
}

Client.prototype.listAllPersistentSubscriptions = async function (
  this: Client,
  options: ListPersistentSubscriptionsOptions = {}
): Promise<PersistentSubscriptionToEitherInfo[]> {
  debug.command("listAllPersistentSubscriptions: %O", {
    options,
  });

  if (await this.supports(PersistentSubscriptionsService.list)) {
    return listPersistentSubscriptionsGRPC.call(this, options);
  }

  return listAllPersistentSubscriptionsHTTP.call(this, options);
};

const listPersistentSubscriptionsGRPC = async function (
  this: Client,
  baseOptions: ListPersistentSubscriptionsOptions = {}
): Promise<PersistentSubscriptionToEitherInfo[]> {
  const options = new ListReq.Options();
  const req = new ListReq();
  options.setListAllSubscriptions(new Empty());
  req.setOptions(options);

  debug.command("listAllPersistentSubscriptions: %O", {
    options: baseOptions,
  });
  debug.command_grpc("listAllPersistentSubscriptions: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "listAllPersistentSubscriptions",
    (client) =>
      new Promise<PersistentSubscriptionToEitherInfo[]>((resolve, reject) => {
        client.list(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              response
                .getSubscriptionsList()
                .map((r) => mapPersistentSubscriptionToEitherInfo(r))
            );
          }
        );
      })
  );
};

const listAllPersistentSubscriptionsHTTP = async function (
  this: Client,
  baseOptions: ListPersistentSubscriptionsOptions = {}
): Promise<PersistentSubscriptionToEitherInfo[]> {
  const basicList = await this.HTTPRequest<
    Array<{ eventStreamId: string; groupName: string }>
  >("GET", `/subscriptions`, baseOptions);

  const list = await Promise.all(
    basicList.map(({ eventStreamId, groupName }) =>
      this.HTTPRequest<HTTPSubscriptionInfo>(
        "GET",
        `/subscriptions/${encodeURIComponent(
          eventStreamId
        )}/${encodeURIComponent(groupName)}/info`,
        baseOptions
      )
    )
  );

  return list.map((info) => mapHTTPPersistentSubscriptionInfo(info));
};
