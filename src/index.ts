export * from "./persistentSubscription";
export * from "./projections";
export * from "./streams";

export {
  Client as EventStoreDBClient,
  DNSClusterOptions,
  GossipClusterOptions,
  SingleNodeOptions,
  ChannelCredentialOptions,
} from "./Client";
export * from "./events";
export * from "./constants";
export * from "./types";

export * from "./utils/filter";
export * from "./utils/CommandError";

export type { StreamMetadata } from "./streams/utils/streamMetadata";
export * from "./streams/utils/systemStreams";
export {
  PersistentSubscriptionSettings,
  PersistentSubscriptionToStreamSettings,
  PersistentSubscriptionToAllSettings,
  persistentSubscriptionSettingsFromDefaults,
  persistentSubscriptionToStreamSettingsFromDefaults,
  persistentSubscriptionToAllSettingsFromDefaults,
} from "./persistentSubscription/utils/persistentSubscriptionSettings";
export type {
  ExtraStatisticsKey,
  PersistentSubscriptionConnectionInfo,
  PersistentSubscriptionToAllStats,
  PersistentSubscriptionToStreamStats,
  PersistentSubscriptionToAllInfo,
  PersistentSubscriptionToStreamInfo,
} from "./persistentSubscription/utils/mapPersistentSubscriptionInfo";
