import { CreateReq, UpdateReq } from "../../../generated/persistent_pb";

import {
  DISPATCH_TO_SINGLE,
  PINNED,
  ROUND_ROBIN,
  UNBOUNDED,
} from "../../constants";
import {
  PersistentSubscriptionSettings,
  PersistentSubscriptionToAllSettings,
} from "./persistentSubscriptionSettings";

type GRPCSettings = typeof CreateReq.Settings | typeof UpdateReq.Settings;

export const settingsToGRPC = <T extends GRPCSettings>(
  settings:
    | PersistentSubscriptionSettings
    | PersistentSubscriptionToAllSettings,
  ReqSettings: T
): InstanceType<T> => {
  const reqSettings = new ReqSettings() as InstanceType<T>;

  reqSettings.setResolveLinks(settings.resolveLinkTos);
  reqSettings.setExtraStatistics(settings.extraStatistics);
  reqSettings.setMessageTimeoutMs(settings.messageTimeout);
  reqSettings.setCheckpointAfterMs(settings.checkPointAfter);
  reqSettings.setMaxRetryCount(settings.maxRetryCount);
  reqSettings.setMinCheckpointCount(settings.checkPointLowerBound);
  reqSettings.setMaxCheckpointCount(settings.checkPointUpperBound);

  switch (settings.maxSubscriberCount) {
    case UNBOUNDED: {
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

  switch (settings.consumerStrategyName) {
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

  return reqSettings;
};
