import { StreamIdentifier } from "../../generated/shared_pb";
import { CreateReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";
import { Client } from "../Client";
import { END, START } from "../constants";

import { settingsToGRPC } from "./utils/settingsToGRPC";
import { PersistentSubscriptionToStreamSettings } from "./utils/persistentSubscriptionSettings";

declare module "../Client" {
  interface Client {
    /**
     * Creates a persistent subscription on a stream. Persistent subscriptions are special kind of subscription where the
     * server remembers where the read offset is at. This allows for many different modes of operations compared to a
     * regular subscription where the client holds the read offset. The pair stream name and group must be unique.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param settings PersistentSubscription settings.
     * @see {@link persistentSubscriptionToStreamSettingsFromDefaults}
     * @param options Command options.
     */
    createPersistentSubscriptionToStream(
      streamName: string,
      groupName: string,
      settings: PersistentSubscriptionToStreamSettings,
      options?: BaseOptions
    ): Promise<void>;

    /**
     * Creates a persistent subscription on a stream. Persistent subscriptions are special kind of subscription where the
     * server remembers where the read offset is at. This allows for many different modes of operations compared to a
     * regular subscription where the client holds the read offset. The pair stream name and group must be unique.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param settings PersistentSubscription settings.
     * @see {@link persistentSubscriptionToStreamSettingsFromDefaults}
     * @param options Command options.
     * @deprecated Renamed to {@link createPersistentSubscriptionToStream}.
     */
    createPersistentSubscription(
      streamName: string,
      groupName: string,
      settings: PersistentSubscriptionToStreamSettings,
      options?: BaseOptions
    ): Promise<void>;
  }
}

Client.prototype.createPersistentSubscriptionToStream = async function (
  this: Client,
  streamName: string,
  groupName: string,
  settings: PersistentSubscriptionToStreamSettings,
  baseOptions: BaseOptions = {}
): Promise<void> {
  const req = new CreateReq();
  const options = new CreateReq.Options();
  const identifier = new StreamIdentifier();
  const reqSettings = settingsToGRPC(settings, CreateReq.Settings);

  // Add deprecated revision option for pre-21.10 support
  switch (settings.startFrom) {
    case START: {
      reqSettings.setRevision(BigInt(0).toString(10));
      break;
    }
    case END: {
      // This is the largest possible value of UInt64
      reqSettings.setRevision("18446744073709551615");
      break;
    }
    default: {
      reqSettings.setRevision(settings.startFrom.toString(10));
      break;
    }
  }

  identifier.setStreamName(Uint8Array.from(Buffer.from(streamName, "utf8")));

  options.setGroupName(groupName);
  options.setStreamIdentifier(identifier);
  options.setSettings(reqSettings);

  req.setOptions(options);

  debug.command("createPersistentSubscriptionToStream: %O", {
    streamName,
    groupName,
    settings,
    options: baseOptions,
  });
  debug.command_grpc("createPersistentSubscriptionToStream: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "createPersistentSubscriptionToStream",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.create(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};

Client.prototype.createPersistentSubscription =
  Client.prototype.createPersistentSubscriptionToStream;
