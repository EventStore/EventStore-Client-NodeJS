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

  /* eslint-disable no-fallthrough */ // We want to fall through for deprecated strings.
  switch (settings.consumerStrategyName) {
    case "dispatch_to_single":
      console.warn(
        `consumerStrategyName as string "dispatch_to_single" is deprecated, please use the constant DISPATCH_TO_SINGLE.`
      );
    case DISPATCH_TO_SINGLE: {
      reqSettings.setNamedConsumerStrategy(
        CreateReq.ConsumerStrategy.DISPATCHTOSINGLE
      );
      break;
    }

    case "pinned":
      console.warn(
        `consumerStrategyName as string "pinned" is deprecated, please use the constant PINNED.`
      );
    case PINNED: {
      reqSettings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.PINNED);
      break;
    }

    case "round_robin":
      console.warn(
        `consumerStrategyName as string "round_robin" is deprecated, please use the constant ROUND_ROBIN.`
      );
    case ROUND_ROBIN: {
      reqSettings.setNamedConsumerStrategy(
        CreateReq.ConsumerStrategy.ROUNDROBIN
      );
      break;
    }

    default: {
      console.warn(
        `Unknown consumerStrategyName ${settings.consumerStrategyName}.`
      );
      break;
    }
  }
  /* eslint-enable no-fallthrough */

  return reqSettings;
};
