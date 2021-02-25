import { StreamIdentifier } from "../../generated/shared_pb";
import { CreateReq, UpdateReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import {
  debug,
  convertToCommandError,
  PersistentSubscriptionSettings,
} from "../utils";
import {
  DISPATCH_TO_SINGLE,
  PINNED,
  ROUND_ROBIN,
  START,
  UNLIMITED,
} from "../constants";
import { Client } from "../Client";
import { BaseOptions } from "../types";

declare module "../Client" {
  interface Client {
    /**
     * Updates a persistent subscription configuration.
     * @param streamName A stream name.
     * @param groupName A group name.
     * @param settings PersistentSubscription settings.
     * @see {@link persistentSubscriptionSettingsFromDefaults}
     * @param options Command options.
     */
    updatePersistentSubscription(
      streamName: string,
      groupName: string,
      settings: PersistentSubscriptionSettings,
      options?: BaseOptions
    ): Promise<void>;
  }
}

Client.prototype.updatePersistentSubscription = async function (
  this: Client,
  streamName: string,
  groupName: string,
  settings: PersistentSubscriptionSettings,
  baseOptions: BaseOptions = {}
): Promise<void> {
  const req = new UpdateReq();
  const options = new UpdateReq.Options();
  const identifier = new StreamIdentifier();
  const reqSettings = new UpdateReq.Settings();

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

  debug.command("updatePersistentSubscription: %O", {
    streamName,
    groupName,
    settings,
    options: baseOptions,
  });
  debug.command_grpc("updatePersistentSubscription: %g", req);

  const client = await this.getGRPCClient(
    PersistentSubscriptionsClient,
    "updatePersistentSubscription"
  );

  return new Promise<void>((resolve, reject) => {
    client.update(req, ...this.callArguments(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
