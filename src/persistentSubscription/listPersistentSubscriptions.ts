import { BaseOptions } from "../types";
import {
  debug,
  convertToCommandError,
  PersistentSubscriptionDoesNotExistError,
} from "../utils";
import { Client } from "../Client";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";
import { ListReq } from "../../generated/persistent_pb";
import {
  HTTPSubscriptionInfo,
  mapHTTPPersistentSubscriptionInfo,
  mapPersistentSubscriptionInfo,
  PersistentSubscriptionInfo,
} from "./utils/mapPersistentSubscriptionInfo";
import { StreamIdentifier } from "../../generated/shared_pb";

interface ListPersistentSubscriptionsOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Lists persistent subscriptions to a stream.
     * @param streamName A stream name.
     * @param options List projections options.
     */
    listPersistentSubscriptions(
      streamName: string,
      options?: ListPersistentSubscriptionsOptions
    ): Promise<PersistentSubscriptionInfo[]>;
  }
}

Client.prototype.listPersistentSubscriptions = async function (
  this: Client,
  streamName: string,
  options: ListPersistentSubscriptionsOptions = {}
): Promise<PersistentSubscriptionInfo[]> {
  debug.command("listPersistentSubscriptions: %O", {
    streamName,
    options,
  });

  if (await this.supports(PersistentSubscriptionsService.list, "stream")) {
    return listPersistentSubscriptionsGRPC.call(this, streamName, options);
  }

  return listPersistentSubscriptionsHTTP.call(this, streamName, options);
};

const listPersistentSubscriptionsGRPC = async function (
  this: Client,
  streamName: string,
  baseOptions: ListPersistentSubscriptionsOptions = {}
): Promise<PersistentSubscriptionInfo[]> {
  const req = new ListReq();
  const options = new ListReq.Options();
  const streamOption = new ListReq.StreamOption();
  const identifier = new StreamIdentifier();
  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));
  streamOption.setStream(identifier);
  options.setListForStream(streamOption);
  req.setOptions(options);

  debug.command_grpc("listPersistentSubscriptions: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "listPersistentSubscriptions",
    (client) =>
      new Promise<PersistentSubscriptionInfo[]>((resolve, reject) => {
        client.list(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              response
                .getSubscriptionsList()
                .map((r) => mapPersistentSubscriptionInfo(r))
            );
          }
        );
      })
  );
};

const listPersistentSubscriptionsHTTP = async function (
  this: Client,
  streamName: string,
  baseOptions: ListPersistentSubscriptionsOptions = {}
): Promise<PersistentSubscriptionInfo[]> {
  const basicList = await this.HTTPRequest<
    Array<{ eventStreamId: string; groupName: string }>
  >("GET", `/subscriptions/${encodeURIComponent(streamName)}`, {
    ...baseOptions,
    transformError(statusCode) {
      if (statusCode === 404) {
        return new PersistentSubscriptionDoesNotExistError(undefined, {
          streamName,
        });
      }
    },
  });

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
