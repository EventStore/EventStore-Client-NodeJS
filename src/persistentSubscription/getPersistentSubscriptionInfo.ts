import { StreamIdentifier } from "../../generated/shared_pb";
import { GetInfoReq } from "../../generated/persistent_pb";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";

import {
  convertToCommandError,
  debug,
  PersistentSubscriptionDoesNotExistError,
} from "../utils";
import { BaseOptions } from "../types";
import { Client } from "../Client";
import {
  HTTPSubscriptionInfo,
  mapHTTPPersistentSubscriptionInfo,
  mapPersistentSubscriptionInfo,
  PersistentSubscriptionInfo,
} from "./utils/mapPersistentSubscriptionInfo";

export interface GetPersistentSubscriptionInfoOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Gets information and statistics on the specified persistent subscription and its connections.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param options Get persistent subscription info options.
     */
    getPersistentSubscriptionInfo(
      streamName: string,
      groupName: string,
      options?: GetPersistentSubscriptionInfoOptions
    ): Promise<PersistentSubscriptionInfo>;
  }
}

Client.prototype.getPersistentSubscriptionInfo = async function (
  this: Client,
  streamName: string,
  groupName: string,
  options: GetPersistentSubscriptionInfoOptions
): Promise<PersistentSubscriptionInfo> {
  debug.command("getPersistentSubscriptionInfo: %O", {
    streamName,
    groupName,
    options,
  });

  if (await this.supports(PersistentSubscriptionsService.getInfo, "stream")) {
    return getPersistentSubscriptionInfoGRPC.call(
      this,
      streamName,
      groupName,
      options
    );
  }

  return getPersistentSubscriptionInfoHTTP.call(
    this,
    streamName,
    groupName,
    options
  );
};

const getPersistentSubscriptionInfoGRPC = async function (
  this: Client,
  streamName: string,
  groupName: string,
  baseOptions: GetPersistentSubscriptionInfoOptions = {}
): Promise<PersistentSubscriptionInfo> {
  const req = new GetInfoReq();
  const options = new GetInfoReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));
  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);

  req.setOptions(options);

  debug.command_grpc("getPersistentSubscriptionInfo: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "getPersistentSubscriptionInfo",
    (client) =>
      new Promise<PersistentSubscriptionInfo>((resolve, reject) => {
        client.getInfo(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              mapPersistentSubscriptionInfo(response.getSubscriptionInfo()!)
            );
          }
        );
      })
  );
};

const getPersistentSubscriptionInfoHTTP = async function (
  this: Client,
  streamName: string,
  groupName: string,
  baseOptions: GetPersistentSubscriptionInfoOptions = {}
): Promise<PersistentSubscriptionInfo> {
  const info = await this.HTTPRequest<HTTPSubscriptionInfo>(
    "GET",
    `/subscriptions/${encodeURIComponent(streamName)}/${encodeURIComponent(
      groupName
    )}/info`,
    {
      ...baseOptions,
      transformError(statusCode) {
        if (statusCode === 404) {
          return new PersistentSubscriptionDoesNotExistError(undefined, {
            streamName,
            groupName,
          });
        }
      },
    }
  );

  return mapHTTPPersistentSubscriptionInfo(info);
};
