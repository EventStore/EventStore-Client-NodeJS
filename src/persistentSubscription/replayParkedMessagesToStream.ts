import { Empty } from "../../generated/shared_pb";
import { ReplayParkedReq } from "../../generated/persistent_pb";
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

export interface ReplayParkedMessagesToStreamOptions extends BaseOptions {
  /**
   * When to stop replaying parked messages. Leave undefined to have no limit.
   * @defaultValue undefined
   */
  stopAt?: number | bigint;
}

declare module "../Client" {
  interface Client {
    /**
     * Replays the parked messages of a persistent subscription.
     * @param streamName - A stream name.
     * @param groupName - A group name.
     * @param options - Replay options.
     */
    replayParkedMessagesToStream(
      streamName: string,
      groupName: string,
      options?: ReplayParkedMessagesToStreamOptions
    ): Promise<void>;
  }
}

Client.prototype.replayParkedMessagesToStream = async function (
  this: Client,
  streamName: string,
  groupName: string,
  options: ReplayParkedMessagesToStreamOptions = {}
): Promise<void> {
  debug.command("replayParkedMessagesToStream: %O", {
    streamName,
    groupName,
    options,
  });

  if (
    await this.supports(PersistentSubscriptionsService.replayParked, "stream")
  ) {
    return replayParkedMessagesToStreamGRPC.call(
      this,
      streamName,
      groupName,
      options
    );
  }

  return replayParkedMessagesToStreamHTTP.call(
    this,
    streamName,
    groupName,
    options
  );
};

const replayParkedMessagesToStreamGRPC = async function (
  this: Client,
  streamName: string,
  groupName: string,
  { stopAt, ...baseOptions }: ReplayParkedMessagesToStreamOptions = {}
) {
  const req = new ReplayParkedReq();
  const options = new ReplayParkedReq.Options();
  const identifier = createStreamIdentifier(streamName);

  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);

  if (stopAt != null) {
    options.setStopAt(stopAt.toString(10));
  } else {
    options.setNoLimit(new Empty());
  }

  req.setOptions(options);

  debug.command_grpc("replayParkedMessagesToStream: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "replayParkedMessagesToStream",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.replayParked(
          req,
          ...this.callArguments(baseOptions),
          (error) => {
            if (error) return reject(convertToCommandError(error));
            return resolve();
          }
        );
      })
  );
};

const replayParkedMessagesToStreamHTTP = async function (
  this: Client,
  streamName: string,
  groupName: string,
  { stopAt, ...baseOptions }: ReplayParkedMessagesToStreamOptions = {}
) {
  await this.HTTPRequest(
    "POST",
    `/subscriptions/${encodeURIComponent(streamName)}/${encodeURIComponent(
      groupName
    )}/replayParked`,
    {
      ...baseOptions,
      searchParams: {
        stopAt: stopAt?.toString(10),
      },
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
};
