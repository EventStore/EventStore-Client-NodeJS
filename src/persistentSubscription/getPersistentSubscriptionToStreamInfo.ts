import { GetInfoReq } from "../../generated/persistent_pb";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";

import {
  convertToCommandError,
  createStreamIdentifier,
  debug,
  PersistentSubscriptionDoesNotExistError,
} from "../utils";
import type { BaseOptions } from "../types";
import { Client } from "../Client";
import {
  HTTPSubscriptionInfo,
  mapHTTPPersistentSubscriptionInfo,
  mapPersistentSubscriptionToStreamInfo,
  PersistentSubscriptionToStreamInfo,
} from "./utils/mapPersistentSubscriptionInfo";
import schemas from "../schemas";
import { validateField } from "../utils/validation";

export interface GetPersistentSubscriptionToStreamInfoOptions
  extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Gets information and statistics on the specified persistent subscription
     * and its connections.
     *
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param options Get persistent subscription info options.
     */
    getPersistentSubscriptionToStreamInfo(
      streamName: string,
      groupName: string,
      options?: GetPersistentSubscriptionToStreamInfoOptions
    ): Promise<PersistentSubscriptionToStreamInfo>;
  }
}

Client.prototype.getPersistentSubscriptionToStreamInfo = async function (
  this: Client,
  streamName: string,
  groupName: string,
  options: GetPersistentSubscriptionToStreamInfoOptions
): Promise<PersistentSubscriptionToStreamInfo> {
  validateField(schemas.streamName, streamName);
  validateField(schemas.groupName, groupName);
  validateField(
    schemas.getPersistentSubscriptionToStreamInfoOptions.optional(),
    options
  );

  debug.command("getPersistentSubscriptionToStreamInfo: %O", {
    streamName,
    groupName,
    options,
  });

  if (await this.supports(PersistentSubscriptionsService.getInfo, "stream")) {
    return getPersistentSubscriptionToStreamInfoGRPC.call(
      this,
      streamName,
      groupName,
      options
    );
  }

  return getPersistentSubscriptionToStreamInfoHTTP.call(
    this,
    streamName,
    groupName,
    options
  );
};

const getPersistentSubscriptionToStreamInfoGRPC = async function (
  this: Client,
  streamName: string,
  groupName: string,
  baseOptions: GetPersistentSubscriptionToStreamInfoOptions = {}
): Promise<PersistentSubscriptionToStreamInfo> {
  const req = new GetInfoReq();
  const options = new GetInfoReq.Options();
  const identifier = createStreamIdentifier(streamName);

  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);

  req.setOptions(options);

  debug.command_grpc("getPersistentSubscriptionToStreamInfo: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "getPersistentSubscriptionToStreamInfo",
    (client) =>
      new Promise<PersistentSubscriptionToStreamInfo>((resolve, reject) => {
        client.getInfo(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              mapPersistentSubscriptionToStreamInfo(
                response.getSubscriptionInfo()!
              )
            );
          }
        );
      })
  );
};

const getPersistentSubscriptionToStreamInfoHTTP = async function (
  this: Client,
  streamName: string,
  groupName: string,
  baseOptions: GetPersistentSubscriptionToStreamInfoOptions = {}
): Promise<PersistentSubscriptionToStreamInfo> {
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
