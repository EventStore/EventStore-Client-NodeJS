import type { Readable } from "stream";
import type {
  Client as GRPCClient,
  ClientOptions as GRPCClientOptions,
  ChannelCredentials,
} from "@grpc/grpc-js";

import { MemberInfo as GrpcMemberInfo } from "../../generated/gossip_pb";
import VNodeState = GrpcMemberInfo.VNodeState;

import type {
  ResolvedEvent,
  AllStreamResolvedEvent,
  EventType,
  PersistentSubscriptionToAllResolvedEvent,
  PersistentSubscriptionToStreamResolvedEvent,
} from "./events";

import type * as constants from "../constants";

export interface BaseOptions {
  /**
   * Overwrite the default credentials.
   */
  credentials?: Credentials;
  /**
   * Command requires a leader node.
   */
  requiresLeader?: boolean;
  /**
   * An optional length of time (in milliseconds) to override the default deadline.
   */
  deadline?: number;
}

/**
 * A structure referring to a potential logical record position in the EventStoreDB transaction file.
 */
export type Position = {
  commit: bigint;
  prepare: bigint;
};

export type ReadRevision =
  | typeof constants.START
  | typeof constants.END
  | bigint;

export type ReadPosition =
  | typeof constants.START
  | typeof constants.END
  | Position;

/**
 * Constants used for expected version control. The use of expected version can be a bit tricky especially when
 * discussing assurances given by the EventStoreDB server.
 *
 * The EventStoreDB server will assure idempotency for all operations using any value in ExpectedVersion except
 * {@link ANY}. When using {@link ANY}., the EventStoreDB server will do its best to assure
 * idempotency but will not guarantee idempotency.
 */
export type ExpectedRevision =
  | typeof constants.ANY
  /**
   * The stream being written to should not yet exist. If it does exist, treats that as a concurrency problem.
   */
  | typeof constants.NO_STREAM
  /**
   * States that the last event written to the stream should have an event number matching your expected value.
   */
  | bigint;

export type AppendExpectedRevision =
  /**
   * The stream should exist. If it or a metadata stream does not exist, treats that as a concurrency problem.
   */
  | typeof constants.STREAM_EXISTS
  /**
   * @see {@link ExpectedRevision}.
   */
  | ExpectedRevision;

export type CurrentRevision =
  /**
   * The stream being written to does not yet exist.
   */
  | typeof constants.NO_STREAM
  /**
   * The current event number of the last event written to the stream.
   */
  | bigint;

/**
 * Represents the direction of read operation (both from '$all' and a regular stream).
 */
export type Direction = typeof constants.FORWARDS | typeof constants.BACKWARDS;

export interface AppendResult {
  /**
   * If the append was successful. Only relevent if `throwOnAppendFailure` is set to false.
   */
  success: boolean;
  /**
   * The current revision of the stream, to be passed as the `expectedRevision` in the next call.
   */
  nextExpectedRevision: bigint;
  /**
   * The logical record position in the EventStoreDB transaction file.
   */
  position?: Position;
}

export type ProjectionStatus =
  | typeof constants.CREATING
  | typeof constants.LOADING
  | typeof constants.LOADED
  | typeof constants.PREPARING
  | typeof constants.PREPARED
  | typeof constants.STARTING
  | typeof constants.LOADING_STOPPED
  | typeof constants.RUNNING
  | typeof constants.STOPPING
  | typeof constants.ABORTING
  | typeof constants.STOPPED
  | typeof constants.COMPLETED
  | typeof constants.ABORTED
  | typeof constants.FAULTED
  | typeof constants.DELETING;

export type ProcessingStatus =
  | typeof constants.PAUSED
  | typeof constants.WRITING_RESULTS
  | typeof constants.STOPPED
  | "";

/**
 * Provides the details for a projection.
 */
export interface ProjectionDetails {
  /**
   * The CoreProcessingTime.
   */
  coreProcessingTime: bigint;

  /**
   * The projection version.
   */
  version: bigint;

  /**
   * The Epoch.
   */
  epoch: bigint;

  /**
   * The projection EffectiveName.
   */
  effectiveName: string;

  /**
   * The projection WritesInProgress.
   */
  writesInProgress: number;

  /**
   * The projection ReadsInProgress.
   */
  readsInProgress: number;

  /**
   * The projection PartitionsCached.
   */
  partitionsCached: number;

  /**
   * The raw status of the projection.
   * Split into {@link projectionStatus} and {@link processingStatus} for convenience.
   */
  status: string;

  /**
   * The current status of the projection.
   */
  projectionStatus: ProjectionStatus;

  /**
   * The current status of the projection.
   */
  processingStatus: ProcessingStatus;

  /**
   * The projection StateReason.
   */
  stateReason: string;

  /**
   * The projection Name.
   */
  name: string;

  /**
   * The projection Position.
   */
  position: string;

  /**
   * The projection Progress.
   */
  progress: number;

  /**
   * LastCheckpoint.
   */
  lastCheckpoint: string;

  /**
   * The projection EventsProcessedAfterRestart.
   */
  eventsProcessedAfterRestart: bigint;

  /**
   * The projection CheckpointStatus.
   */
  checkpointStatus: string;

  /**
   * The projection BufferedEvents.
   */
  bufferedEvents: bigint;

  /**
   * The projection WritePendingEventsBeforeCheckpoint.
   */
  writePendingEventsBeforeCheckpoint: number;

  /**
   * The projection WritePendingEventsAfterCheckpoint.
   */
  writePendingEventsAfterCheckpoint: number;
}

export interface DeleteResult {
  position?: Position;
}

export type ConsumerStrategy =
  | typeof constants.DISPATCH_TO_SINGLE
  | typeof constants.ROUND_ROBIN
  | typeof constants.PINNED;

export type PersistentAction =
  | typeof constants.PARK
  | typeof constants.RETRY
  | typeof constants.SKIP
  | typeof constants.STOP;

export type NodePreference =
  | typeof constants.RANDOM
  | typeof constants.FOLLOWER
  | typeof constants.LEADER
  | typeof constants.READ_ONLY_REPLICA;

export interface EndPoint {
  address: string;
  port: number;
}

export interface MemberInfo {
  instanceId?: string;
  timeStamp: number;
  state: VNodeState;
  isAlive: boolean;
  httpEndpoint?: EndPoint;
}

export type VerifyOptions = Parameters<typeof ChannelCredentials.createSsl>[3];

export type GRPCClientConstructor<T extends GRPCClient> = new (
  address: string,
  credentials: ChannelCredentials,
  options?: Partial<GRPCClientOptions>
) => T;

export type FilterOn =
  | typeof constants.EVENT_TYPE
  | typeof constants.STREAM_NAME;

export interface FilterBase {
  /**
   * What to filter on.
   */
  filterOn: FilterOn;
  /**
   * Sets how often the checkpointReached callback is called.
   * Must be greater than 0.
   */
  checkpointInterval: number;
  /**
   * A callback invoked and await when a checkpoint is reached.
   * Set the checkpointInterval to define how often this method is called.
   */
  checkpointReached?: (
    subscription: AllStreamSubscription,
    position: Position
  ) => Promise<void> | void;
  /**
   * The maximum number of events that are filtered out before the page is returned
   * Must be greater than 0, if supplied.
   */
  maxSearchWindow?: number;
}

export interface RegexFilter extends FilterBase {
  /**
   * A regex to filter by.
   */
  regex: string;
}

export interface PrefixesFilter extends FilterBase {
  /**
   * A list of prefixes to filter on.
   */
  prefixes: string[];
}

export type Filter = RegexFilter | PrefixesFilter;

export interface Credentials {
  username: string;
  password: string;
}

export interface Certificate {
  userCertFile: Buffer;
  userKeyFile: Buffer;
}

export interface StreamingRead<E> extends Readable {
  cancel(): Promise<void>;

  addListener(event: "close", listener: () => void): this;
  addListener(event: "data", listener: (event: E) => void): this;
  addListener(event: "end", listener: () => void): this;
  addListener(event: "readable", listener: () => void): this;
  addListener(event: "error", listener: (err: Error) => void): this;
  addListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  on(event: "close", listener: () => void): this;
  on(event: "data", listener: (event: E) => void): this;
  on(event: "end", listener: () => void): this;
  on(event: "readable", listener: () => void): this;
  on(event: "error", listener: (err: Error) => void): this;
  on(event: string | symbol, listener: (...args: unknown[]) => void): this;

  once(event: "close", listener: () => void): this;
  once(event: "data", listener: (event: E) => void): this;
  once(event: "end", listener: () => void): this;
  once(event: "readable", listener: () => void): this;
  once(event: "error", listener: (err: Error) => void): this;
  once(event: string | symbol, listener: (...args: unknown[]) => void): this;

  prependListener(event: "close", listener: () => void): this;
  prependListener(event: "data", listener: (event: E) => void): this;
  prependListener(event: "end", listener: () => void): this;
  prependListener(event: "readable", listener: () => void): this;
  prependListener(event: "error", listener: (err: Error) => void): this;
  prependListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  prependOnceListener(event: "close", listener: () => void): this;
  prependOnceListener(event: "data", listener: (event: E) => void): this;
  prependOnceListener(event: "end", listener: () => void): this;
  prependOnceListener(event: "readable", listener: () => void): this;
  prependOnceListener(event: "error", listener: (err: Error) => void): this;
  prependOnceListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  removeListener(event: "close", listener: () => void): this;
  removeListener(event: "data", listener: (event: E) => void): this;
  removeListener(event: "end", listener: () => void): this;
  removeListener(event: "error", listener: (err: Error) => void): this;
  removeListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  [Symbol.asyncIterator](): AsyncIterableIterator<E>;
}

export interface ReadableSubscription<E> extends Readable {
  unsubscribe(): Promise<void>;

  addListener(event: "close", listener: () => void): this;
  addListener(event: "data", listener: (event: E) => void): this;
  addListener(event: "end", listener: () => void): this;
  addListener(event: "readable", listener: () => void): this;
  addListener(event: "error", listener: (err: Error) => void): this;
  addListener(event: "confirmation", listener: () => void): this;
  addListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  on(event: "close", listener: () => void): this;
  on(event: "data", listener: (event: E) => void): this;
  on(event: "end", listener: () => void): this;
  on(event: "readable", listener: () => void): this;
  on(event: "error", listener: (err: Error) => void): this;
  on(event: "confirmation", listener: () => void): this;
  on(event: string | symbol, listener: (...args: unknown[]) => void): this;

  once(event: "close", listener: () => void): this;
  once(event: "data", listener: (event: E) => void): this;
  once(event: "end", listener: () => void): this;
  once(event: "readable", listener: () => void): this;
  once(event: "error", listener: (err: Error) => void): this;
  once(event: "confirmation", listener: () => void): this;
  once(event: string | symbol, listener: (...args: unknown[]) => void): this;

  prependListener(event: "close", listener: () => void): this;
  prependListener(event: "data", listener: (event: E) => void): this;
  prependListener(event: "end", listener: () => void): this;
  prependListener(event: "readable", listener: () => void): this;
  prependListener(event: "error", listener: (err: Error) => void): this;
  prependListener(event: "confirmation", listener: () => void): this;
  prependListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  prependOnceListener(event: "close", listener: () => void): this;
  prependOnceListener(event: "data", listener: (event: E) => void): this;
  prependOnceListener(event: "end", listener: () => void): this;
  prependOnceListener(event: "readable", listener: () => void): this;
  prependOnceListener(event: "error", listener: (err: Error) => void): this;
  prependOnceListener(event: "confirmation", listener: () => void): this;
  prependOnceListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  removeListener(event: "close", listener: () => void): this;
  removeListener(event: "data", listener: (event: E) => void): this;
  removeListener(event: "end", listener: () => void): this;
  removeListener(event: "readable", listener: () => void): this;
  removeListener(event: "error", listener: (err: Error) => void): this;
  removeListener(event: "confirmation", listener: () => void): this;
  removeListener(
    event: string | symbol,
    listener: (...args: unknown[]) => void
  ): this;

  [Symbol.asyncIterator](): AsyncIterableIterator<E>;
}

export interface PersistentSubscriptionBase<E> extends ReadableSubscription<E> {
  /**
   * Acknowledge events as handled.
   */
  ack(...events: ResolvedEvent[]): Promise<void>;

  /**
   * "Not Acknowledge" the event.
   */
  nack(
    action: PersistentAction,
    reason: string,
    ...events: ResolvedEvent[]
  ): Promise<void>;
}

// Other listeners that are only supported in catch-up subscriptions
export interface CatchupSubscription {
  addListener(event: "caughtUp", listener: () => void): this;
  addListener(event: "fellBehind", listener: () => void): this;

  on(event: "caughtUp", listener: () => void): this;
  on(event: "fellBehind", listener: () => void): this;

  once(event: "caughtUp", listener: () => void): this;
  once(event: "fellBehind", listener: () => void): this;

  prependListener(event: "caughtUp", listener: () => void): this;
  prependListener(event: "fellBehind", listener: () => void): this;

  prependOnceListener(event: "caughtUp", listener: () => void): this;
  prependOnceListener(event: "fellBehind", listener: () => void): this;

  removeListener(event: "caughtUp", listener: () => void): this;
  removeListener(event: "fellBehind", listener: () => void): this;
}

export type PersistentSubscriptionToStream<E extends EventType = EventType> =
  PersistentSubscriptionBase<PersistentSubscriptionToStreamResolvedEvent<E>>;

export type PersistentSubscriptionToAll =
  PersistentSubscriptionBase<PersistentSubscriptionToAllResolvedEvent>;

export type StreamSubscription<E extends EventType = EventType> =
  ReadableSubscription<ResolvedEvent<E>> & CatchupSubscription;
export type AllStreamSubscription =
  ReadableSubscription<AllStreamResolvedEvent> & CatchupSubscription;

export { VNodeState };
export * from "./events";
