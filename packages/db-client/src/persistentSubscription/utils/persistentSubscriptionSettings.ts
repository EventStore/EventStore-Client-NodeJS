import { END, ROUND_ROBIN, START, UNBOUNDED } from "../../constants";
import type { ConsumerStrategy, Position } from "../../types";

export interface PersistentSubscriptionSettingsGeneric {
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @defaultValue false
   */
  resolveLinkTos: boolean;

  /**
   * Enable tracking of in depth latency statistics on this subscription.
   * @defaultValue false
   */
  extraStatistics: boolean;

  /**
   * The amount of time in milliseconds after which a message should be considered to be timeout and retried.
   * @defaultValue 30_000
   */
  messageTimeout: number;

  /**
   * The maximum number of retries (due to timeout) before a message gets considered to be parked.
   * @defaultValue 10
   */
  maxRetryCount: number;

  /**
   * The amount of time to try checkpoint after in milliseconds.
   * @defaultValue 2_000
   */
  checkPointAfter: number;

  /**
   * The minimum number of messages to process before a checkpoint may be written.
   * @defaultValue 10
   */
  checkPointLowerBound: number;

  /**
   * The maximum number of messages not checkpointed before forcing a checkpoint.
   * @defaultValue 1_000
   */
  checkPointUpperBound: number;

  /**
   * The maximum number of subscribers allowed.
   * @defaultValue UNLIMITED
   */
  maxSubscriberCount: typeof UNBOUNDED | number;

  /**
   * The size of the buffer listening to live messages as they happen.
   * @defaultValue 500
   */
  liveBufferSize: number;

  /**
   * The number of events read at a time when paging in history.
   * @defaultValue 20
   */
  readBatchSize: number;

  /**
   * The number of events to cache when paging through history.
   * @defaultValue 500
   */
  historyBufferSize: number;

  /**
   * The strategy to use for distributing events to client consumers.
   * @defaultValue ROUND_ROBIN
   */
  consumerStrategyName: ConsumerStrategy | string;
}

export interface PersistentSubscriptionToStreamSettings
  extends PersistentSubscriptionSettingsGeneric {
  /**
   * Where to start the subscription from. This can be from the start of the stream, from the end of the stream at the time of creation, or from an inclusive position in the stream.
   * @defaultValue END
   */
  startFrom: typeof START | typeof END | bigint;
}

export interface PersistentSubscriptionToAllSettings
  extends PersistentSubscriptionSettingsGeneric {
  /**
   * Where to start the subscription from. This can be from the start of the stream, from the end of the stream at the time of creation, or from an inclusive position in the stream.
   * @defaultValue END
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

/**
 * Creates {@link PersistentSubscriptionToStreamSettings} from default settings.
 * @param changes - Changes to apply to the default settings.
 */
export const persistentSubscriptionToStreamSettingsFromDefaults = (
  changes: Partial<PersistentSubscriptionToStreamSettings> = {}
): PersistentSubscriptionToStreamSettings => ({
  startFrom: END,
  ...defaults,
  ...changes,
});

/**
 * Creates {@link PersistentSubscriptionToAllSettings} from default settings.
 * @param changes - Changes to apply to the default settings.
 */
export const persistentSubscriptionToAllSettingsFromDefaults = (
  changes: Partial<PersistentSubscriptionToAllSettings> = {}
): PersistentSubscriptionToAllSettings => ({
  startFrom: END,
  ...defaults,
  ...changes,
});
