import {
  PersistentSubscriptionsClient,
  PersistentSubscriptionsService,
} from "../../generated/persistent_grpc_pb";
import { Empty } from "../../generated/shared_pb";

import { Client } from "../Client";
import type { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";

export interface RestartPersistentSubscriptionSubsystemOptions
  extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Restarts the persistent subscription subsystem.
     * @param options Restart subsystem options.
     */
    restartPersistentSubscriptionSubsystem(
      options?: RestartPersistentSubscriptionSubsystemOptions,
    ): Promise<void>;
  }
}

Client.prototype.restartPersistentSubscriptionSubsystem = async function (
  this: Client,
  options: RestartPersistentSubscriptionSubsystemOptions = {},
): Promise<void> {
  debug.command("restartPersistentSubscriptionSubsystem: %O", {
    options,
  });

  if (await this.supports(PersistentSubscriptionsService.restartSubsystem)) {
    return restartPersistentSubscriptionSubsystemGRPC.call(this, options);
  }

  return restartPersistentSubscriptionSubsystemHTTP.call(this, options);
};

const restartPersistentSubscriptionSubsystemGRPC = async function (
  this: Client,
  baseOptions: RestartPersistentSubscriptionSubsystemOptions = {},
): Promise<void> {
  const req = new Empty();

  debug.command_grpc("restartPersistentSubscriptionSubsystem: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "restartPersistentSubscriptionSubsystem",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.restartSubsystem(
          req,
          ...this.callArguments(baseOptions),
          (error) => {
            if (error) return reject(convertToCommandError(error));
            return resolve();
          },
        );
      }),
  );
};

const restartPersistentSubscriptionSubsystemHTTP = async function (
  this: Client,
  baseOptions: RestartPersistentSubscriptionSubsystemOptions = {},
): Promise<void> {
  await this.HTTPRequest<string>("POST", "/subscriptions/restart", baseOptions);
};
