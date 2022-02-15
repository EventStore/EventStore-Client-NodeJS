import { Empty } from "../../generated/shared_pb";
import { GetInfoReq } from "../../generated/persistent_pb";
import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";

import { convertToCommandError, debug, UnsupportedError } from "../utils";
import { BaseOptions } from "../types";
import { Client } from "../Client";
import {
  mapPersistentSubscriptionToAllInfo,
  PersistentSubscriptionToAllInfo,
} from "./utils/mapPersistentSubscriptionInfo";

export interface GetPersistentSubscriptionToAllInfoOptions
  extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Gets information and statistics on the specified persistent subscription to $all and its connections.
     * @param groupName A group name.
     * @param options Replay options.
     */
    getPersistentSubscriptionToAllInfo(
      groupName: string,
      options?: GetPersistentSubscriptionToAllInfoOptions
    ): Promise<PersistentSubscriptionToAllInfo>;
  }
}

Client.prototype.getPersistentSubscriptionToAllInfo = async function (
  this: Client,
  groupName: string,
  baseOptions: GetPersistentSubscriptionToAllInfoOptions = {}
): Promise<PersistentSubscriptionToAllInfo> {
  if (!(await this.supports(PersistentSubscriptionsService.getInfo, "all"))) {
    throw new UnsupportedError("getPersistentSubscriptionToAllInfo", "21.10.1");
  }

  const req = new GetInfoReq();
  const options = new GetInfoReq.Options();
  options.setAll(new Empty());
  options.setGroupName(groupName);

  req.setOptions(options);

  debug.command("getPersistentSubscriptionToAllInfo: %O", {
    groupName,
    options,
  });
  debug.command_grpc("getPersistentSubscriptionToAllInfo: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "getPersistentSubscriptionToAllInfo",
    (client) =>
      new Promise<PersistentSubscriptionToAllInfo>((resolve, reject) => {
        client.getInfo(
          req,
          ...this.callArguments(baseOptions),
          (error, response) => {
            if (error) return reject(convertToCommandError(error));
            return resolve(
              mapPersistentSubscriptionToAllInfo(
                response.getSubscriptionInfo()!
              )
            );
          }
        );
      })
  );
};
