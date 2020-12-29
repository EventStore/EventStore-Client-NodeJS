import { ROUND_ROBIN, START, UNLIMITED } from "../constants";
import { ConsumerStrategy } from "../types";

export interface PersistentSubscriptionSettings {
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @defaultValue false
   */
  resolveLinkTos: boolean;

  /**
   * Starts the read at the given event revision.
   * @defaultValue START
   */
  fromRevision: typeof START | bigint;

  /**
   * Enables in depth latency statistics should be tracked on this subscription.
   * @defaultValue false
   */
  extraStats: boolean;

  /**
   * The amount of time in milliseconds after which a message should be considered to be timeout and retried.
   * @defaultValue 30_000
   */
  messageTimeout: number;

  /**
   * The maximum number of retries (due to timeout) before a message get considered to be parked.
   * @defaultValue 10
   */
  maxRetryCount: number;

  /**
   * The amount of time to try checkpoint after in milliseconds.
   * @defaultValue 2_000
   */
  checkpointAfter: number;

  /**
   * The minimum number of messages to checkpoint.
   * @defaultValue 10
   */
  minCheckpointCount: number;

  /**
   * The maximum number of messages to checkpoint.
   * If this number is reached, a checkpoint will be forced.
   * @defaultValue 1_000
   */
  maxCheckpointCount: number;

  /**
   * The maximum number of subscribers allowed.
   * @defaultValue UNLIMITED
   */
  maxSubscriberCount: typeof UNLIMITED | number;

  /**
   * The size of the buffer listening to live messages as they happen
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
  strategy: ConsumerStrategy;
}

export const persistentSubscriptionSettingsFromDefaults = (
  changes: Partial<PersistentSubscriptionSettings> = {}
): PersistentSubscriptionSettings => ({
  resolveLinkTos: false,
  extraStats: false,
  fromRevision: START,
  messageTimeout: 30_000,
  maxRetryCount: 10,
  checkpointAfter: 2_000,
  minCheckpointCount: 10,
  maxCheckpointCount: 1_000,
  maxSubscriberCount: UNLIMITED,
  liveBufferSize: 500,
  readBatchSize: 20,
  historyBufferSize: 500,
  strategy: ROUND_ROBIN,
  ...changes,
});
