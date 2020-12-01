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
     * @link persistentSubscriptionSettingsFromDefaults
     * @param streamName A stream name.
     * @param groupName A group name
     * @param settings PersistentSubscription settings.
     * @param options command options
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
  {
    resolveLinks,
    extraStats,
    fromRevision,
    messageTimeout,
    maxRetryCount,
    checkpointAfter,
    minCheckpointCount,
    maxCheckpointCount,
    maxSubscriberCount,
    liveBufferSize,
    readBatchSize,
    historyBufferSize,
    strategy,
  }: PersistentSubscriptionSettings,
  baseOptions: BaseOptions = {}
): Promise<void> {
  const req = new UpdateReq();
  const options = new UpdateReq.Options();
  const identifier = new StreamIdentifier();
  const settings = new UpdateReq.Settings();

  settings.setResolveLinks(resolveLinks);
  switch (fromRevision) {
    case START: {
      settings.setRevision(BigInt(0).toString(10));
      break;
    }
    default: {
      settings.setRevision(fromRevision.toString(10));
      break;
    }
  }
  settings.setExtraStatistics(extraStats);
  settings.setMessageTimeoutMs(messageTimeout);
  settings.setCheckpointAfterMs(checkpointAfter);
  settings.setMaxRetryCount(maxRetryCount);
  settings.setMinCheckpointCount(minCheckpointCount);
  settings.setMaxCheckpointCount(maxCheckpointCount);
  switch (maxSubscriberCount) {
    case UNLIMITED: {
      settings.setMaxSubscriberCount(0);
      break;
    }
    default: {
      settings.setMaxSubscriberCount(maxSubscriberCount);
      break;
    }
  }
  settings.setLiveBufferSize(liveBufferSize);
  settings.setReadBatchSize(readBatchSize);
  settings.setHistoryBufferSize(historyBufferSize);

  switch (strategy) {
    case DISPATCH_TO_SINGLE:
      settings.setNamedConsumerStrategy(
        CreateReq.ConsumerStrategy.DISPATCHTOSINGLE
      );
      break;
    case PINNED:
      settings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.PINNED);
      break;
    case ROUND_ROBIN:
      settings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.ROUNDROBIN);
      break;
  }

  identifier.setStreamname(Buffer.from(streamName).toString("base64"));

  options.setGroupName(groupName);
  options.setStreamIdentifier(identifier);
  options.setSettings(settings);

  req.setOptions(options);

  debug.command("UpdatePersistentSubscription: %c", this);
  debug.command_grpc("UpdatePersistentSubscription: %g", req);

  const client = await this.getGRPCClient(
    PersistentSubscriptionsClient,
    "UpdatePersistentSubscription"
  );

  return new Promise<void>((resolve, reject) => {
    client.update(req, this.metadata(baseOptions), (error) => {
      if (error) return reject(convertToCommandError(error));
      return resolve();
    });
  });
};
