import { Empty, StreamIdentifier } from "../../generated/shared_pb";
import { ReplayParkedReq } from "../../generated/persistent_pb";
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

export interface ReplayParkedMessagesOptions extends BaseOptions {
  /**
   * When to stop replaying parked messages. Leave undefined to have no limit.
   * @default undefined
   */
  stopAt?: number | BigInt;
}

declare module "../Client" {
  interface Client {
    /**
     * Replays the parked messages of a persistent subscription.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param options Replay options.
     */
    replayParkedMessages(
      streamName: string,
      groupName: string,
      options?: ReplayParkedMessagesOptions
    ): Promise<void>;
  }
}

Client.prototype.replayParkedMessages = async function (
  this: Client,
  streamName: string,
  groupName: string,
  options: ReplayParkedMessagesOptions = {}
): Promise<void> {
  debug.command("replayParkedMessages: %O", {
    streamName,
    groupName,
    options,
  });

  if (
    await this.supports(PersistentSubscriptionsService.replayParked, "stream")
  ) {
    return replayParkedMessagesGRPC.call(this, streamName, groupName, options);
  }

  return replayParkedMessagesHTTP.call(this, streamName, groupName, options);
};

const replayParkedMessagesGRPC = async function (
  this: Client,
  streamName: string,
  groupName: string,
  { stopAt, ...baseOptions }: ReplayParkedMessagesOptions = {}
) {
  const req = new ReplayParkedReq();
  const options = new ReplayParkedReq.Options();
  const identifier = new StreamIdentifier();
  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));
  options.setStreamIdentifier(identifier);
  options.setGroupName(groupName);

  if (stopAt != null) {
    options.setStopAt(stopAt.toString(10));
  } else {
    options.setNoLimit(new Empty());
  }

  req.setOptions(options);

  debug.command_grpc("replayParkedMessages: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "replayParkedMessages",
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

const replayParkedMessagesHTTP = async function (
  this: Client,
  streamName: string,
  groupName: string,
  { stopAt, ...baseOptions }: ReplayParkedMessagesOptions = {}
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
