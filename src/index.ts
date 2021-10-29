import "./persistentSubscription";
import "./projections";
import "./streams";

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
export type { StreamMetadata } from "./utils/streamMetadata";
export * from "./utils/systemStreams";
export * from "./persistentSubscription/utils/persistentSubscriptionSettings";
