import { END, ROUND_ROBIN, START, UNBOUNDED } from "../../constants";
import { ConsumerStrategy, Position } from "../../types";

interface PersistentSubscriptionSettingsGeneric {
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @default false
   */
  resolveLinkTos: boolean;

  /**
   * Enables in depth latency statistics should be tracked on this subscription.
   * @default false
   */
  extraStatistics: boolean;

  /**
   * The amount of time in milliseconds after which a message should be considered to be timeout and retried.
   * @default 30_000
   */
  messageTimeout: number;

  /**
   * The maximum number of retries (due to timeout) before a message get considered to be parked.
   * @default 10
   */
  maxRetryCount: number;

  /**
   * The amount of time to try checkpoint after in milliseconds.
   * @default 2_000
   */
  checkPointAfter: number;

  /**
   * The minimum number of messages to process before a checkpoint may be written.
   * @default 10
   */
  checkPointLowerBound: number;

  /**
   * The maximum number of messages not checkpointed before forcing a checkpoint.
   * @default 1_000
   */
  checkPointUpperBound: number;

  /**
   * The maximum number of subscribers allowed.
   * @default UNLIMITED
   */
  maxSubscriberCount: typeof UNBOUNDED | number;

  /**
   * The size of the buffer listening to live messages as they happen.
   * @default 500
   */
  liveBufferSize: number;

  /**
   * The number of events read at a time when paging in history.
   * @default 20
   */
  readBatchSize: number;

  /**
   * The number of events to cache when paging through history.
   * @default 500
   */
  historyBufferSize: number;

  /**
   * The strategy to use for distributing events to client consumers.
   * @default ROUND_ROBIN
   */
  consumerStrategyName: ConsumerStrategy;
}

export interface PersistentSubscriptionSettings
  extends PersistentSubscriptionSettingsGeneric {
  /**
   * The exclusive position in the stream or transaction file the subscription should start from.
   * @default END
   */
  startFrom: typeof START | typeof END | bigint;
}

export interface PersistentSubscriptionToAllSettings
  extends PersistentSubscriptionSettingsGeneric {
  /**
   * The exclusive position in the stream or transaction file the subscription should start from.
   * @default END
   */
  startFrom: typeof START | typeof END | Position;
}

const defaults: PersistentSubscriptionSettingsGeneric = {
  resolveLinkTos: false,
  extraStatistics: false,
  messageTimeout: 30_000,
  maxRetryCount: 10,
  checkPointAfter: 2_000,
  checkPointLowerBound: 10,
  checkPointUpperBound: 1_000,
  maxSubscriberCount: UNBOUNDED,
  liveBufferSize: 500,
  readBatchSize: 20,
  historyBufferSize: 500,
  consumerStrategyName: ROUND_ROBIN,
};

export const persistentSubscriptionSettingsFromDefaults = (
  changes: Partial<PersistentSubscriptionSettings> = {}
): PersistentSubscriptionSettings => ({
  startFrom: END,
  ...defaults,
  ...changes,
});

export const persistentSubscriptionToAllSettingsFromDefaults = (
  changes: Partial<PersistentSubscriptionToAllSettings> = {}
): PersistentSubscriptionToAllSettings => ({
  startFrom: END,
  ...defaults,
  ...changes,
});
