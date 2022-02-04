import { Empty } from "../../generated/shared_pb";
import { ReplayParkedReq } from "../../generated/persistent_pb";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";

import { convertToCommandError, debug, UnsupportedError } from "../utils";
import { BaseOptions } from "../types";
import { Client } from "../Client";

export interface ReplayParkedMessagesToAllOptions extends BaseOptions {
  /**
   * When to stop replaying parked messages. Leave undefined to have no limit.
   * @default undefined
   */
  stopAt?: number | BigInt;
}

declare module "../Client" {
  interface Client {
    /**
     * Replays the parked messages of a persistent subscription to $all.
     * @param groupName A group name.
     * @param options Replay options.
     */
    replayParkedMessagesToAll(
      groupName: string,
      options?: ReplayParkedMessagesToAllOptions
    ): Promise<void>;
  }
}

Client.prototype.replayParkedMessagesToAll = async function (
  this: Client,
  groupName: string,
  { stopAt, ...baseOptions }: ReplayParkedMessagesToAllOptions = {}
): Promise<void> {
  if (
    !(await this.supports(PersistentSubscriptionsService.replayParked, "all"))
  ) {
    throw new UnsupportedError("replayParkedMessagesToAll", "21.10");
  }

  const req = new ReplayParkedReq();
  const options = new ReplayParkedReq.Options();
  options.setAll(new Empty());
  options.setGroupName(groupName);

  if (stopAt != null) {
    options.setStopAt(stopAt.toString(10));
  } else {
    options.setNoLimit(new Empty());
  }

  req.setOptions(options);

  debug.command("replayParkedMessagesToAll: %O", {
    groupName,
    options: baseOptions,
  });
  debug.command_grpc("replayParkedMessagesToAll: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "replayParkedMessagesToAll",
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
