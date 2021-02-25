import { StreamIdentifier } from "../../generated/shared_pb";
import { CreateReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import { BaseOptions } from "../types";
import {
  debug,
  convertToCommandError,
  PersistentSubscriptionSettings,
} from "../utils";
import { Client } from "../Client";
import {
  DISPATCH_TO_SINGLE,
  PINNED,
  ROUND_ROBIN,
  START,
  UNLIMITED,
} from "../constants";

declare module "../Client" {
  interface Client {
    /**
     * Creates a persistent subscription on a stream. Persistent subscriptions are special kind of subscription where the
     * server remembers where the read offset is at. This allows for many different modes of operations compared to a
     * regular subscription where the client holds the read offset. The pair stream name and group must be unique.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param settings PersistentSubscription settings.
     * @see {@link persistentSubscriptionSettingsFromDefaults}
     * @param options Command options.
     */
    createPersistentSubscription(
      streamName: string,
      groupName: string,
      settings: PersistentSubscriptionSettings,
      options?: BaseOptions
    ): Promise<void>;
  }
}

Client.prototype.createPersistentSubscription = async function (
  this: Client,
  streamName: string,
  groupName: string,
  settings: PersistentSubscriptionSettings,
  baseOptions: BaseOptions = {}
): Promise<void> {
  const req = new CreateReq();
  const options = new CreateReq.Options();
  const identifier = new StreamIdentifier();
  const reqSettings = new CreateReq.Settings();

  reqSettings.setResolveLinks(settings.resolveLinkTos);
  switch (settings.fromRevision) {
    case START: {
      reqSettings.setRevision(BigInt(0).toString(10));
      break;
    }
    default: {
      reqSettings.setRevision(settings.fromRevision.toString(10));
      break;
    }
  }
  reqSettings.setExtraStatistics(settings.extraStats);
  reqSettings.setMessageTimeoutMs(settings.messageTimeout);
  reqSettings.setCheckpointAfterMs(settings.checkpointAfter);
  reqSettings.setMaxRetryCount(settings.maxRetryCount);
  reqSettings.setMinCheckpointCount(settings.minCheckpointCount);
  reqSettings.setMaxCheckpointCount(settings.maxCheckpointCount);
  switch (settings.maxSubscriberCount) {
    case UNLIMITED: {
      reqSettings.setMaxSubscriberCount(0);
      break;
    }
    default: {
      reqSettings.setMaxSubscriberCount(settings.maxSubscriberCount);
      break;
    }
  }
  reqSettings.setLiveBufferSize(settings.liveBufferSize);
  reqSettings.setReadBatchSize(settings.readBatchSize);
  reqSettings.setHistoryBufferSize(settings.historyBufferSize);

  switch (settings.strategy) {
    case DISPATCH_TO_SINGLE:
      reqSettings.setNamedConsumerStrategy(
        CreateReq.ConsumerStrategy.DISPATCHTOSINGLE
      );
      break;
    case PINNED:
      reqSettings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.PINNED);
      break;
    case ROUND_ROBIN:
      reqSettings.setNamedConsumerStrategy(
        CreateReq.ConsumerStrategy.ROUNDROBIN
      );
      break;
  }

  identifier.setStreamname(Buffer.from(streamName).toString("base64"));

  options.setGroupName(groupName);
  options.setStreamIdentifier(identifier);
  options.setSettings(reqSettings);

  req.setOptions(options);

  debug.command("createPersistentSubscription: %O", {
    streamName,
    groupName,
    settings,
    options: baseOptions,
  });
  debug.command_grpc("createPersistentSubscription: %g", req);

  const client = await this.getGRPCClient(
    PersistentSubscriptionsClient,
    "createPersistentSubscription"
  );

  return new Promise<void>((resolve, reject) => {
    client.create(req, ...this.callArguments(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
