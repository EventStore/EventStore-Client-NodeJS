import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";
import { ListReq } from "../../generated/persistent_pb";
import { StreamIdentifier } from "../../generated/shared_pb";

import type { BaseOptions } from "../types";
import {
  debug,
  convertToCommandError,
  PersistentSubscriptionDoesNotExistError,
} from "../utils";
import { Client } from "../Client";

import {
  HTTPSubscriptionInfo,
  mapHTTPPersistentSubscriptionInfo,
  mapPersistentSubscriptionToStreamInfo,
  PersistentSubscriptionToStreamInfo,
} from "./utils/mapPersistentSubscriptionInfo";

interface ListPersistentSubscriptionsToStreamOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Lists persistent subscriptions to a stream.
     * @param streamName A stream name.
     * @param options List persistent subscriptions options.
     */
    listPersistentSubscriptionsToStream(
      streamName: string,
      options?: ListPersistentSubscriptionsToStreamOptions
    ): Promise<PersistentSubscriptionToStreamInfo[]>;
  }
}

Client.prototype.listPersistentSubscriptionsToStream = async function (
  this: Client,
  streamName: string,
  options: ListPersistentSubscriptionsToStreamOptions = {}
): Promise<PersistentSubscriptionToStreamInfo[]> {
  debug.command("listPersistentSubscriptionsToStream: %O", {
    streamName,
    options,
  });

  if (await this.supports(PersistentSubscriptionsService.list, "stream")) {
    return listPersistentSubscriptionsToStreamGRPC.call(
      this,
      streamName,
      options
    );
  }

  return listPersistentSubscriptionsToStreamHTTP.call(
    this,
    streamName,
    options
  );
};

const listPersistentSubscriptionsToStreamGRPC = async function (
  this: Client,
  streamName: string,
  baseOptions: ListPersistentSubscriptionsToStreamOptions = {}
): Promise<PersistentSubscriptionToStreamInfo[]> {
  const req = new ListReq();
  const options = new ListReq.Options();
  const streamOption = new ListReq.StreamOption();
  const identifier = new StreamIdentifier();
  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));
  streamOption.setStream(identifier);
  options.setListForStream(streamOption);
  req.setOptions(options);

  debug.command_grpc("listPersistentSubscriptionsToStream: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "listPersistentSubscriptionsToStream",
    (client) =>
      new Promise<PersistentSubscriptionToStreamInfo[]>((resolve, reject) => {
        client.list(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              response
                .getSubscriptionsList()
                .map((r) => mapPersistentSubscriptionToStreamInfo(r))
            );
          }
        );
      })
  );
};

const listPersistentSubscriptionsToStreamHTTP = async function (
  this: Client,
  streamName: string,
  baseOptions: ListPersistentSubscriptionsToStreamOptions = {}
): Promise<PersistentSubscriptionToStreamInfo[]> {
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
