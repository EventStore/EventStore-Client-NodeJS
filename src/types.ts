import {
  Client as GRPCClient,
  ClientOptions as GRPCClientOptions,
  ChannelCredentials,
} from "@grpc/grpc-js";

import { MemberInfo as GrpcMemberInfo } from "../generated/gossip_pb";
import VNodeState = GrpcMemberInfo.VNodeState;
import * as constants from "./constants";
export { VNodeState };

export interface BaseOptions {
  /**
   * Overwrite the default credentials
   */
  credentials?: Credentials;
  /**
   * Command requires a leader node
   */
  requiresLeader?: boolean;
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

export type WriteEventsExpectedRevision =
  /**
   * The stream should exist. If it or a metadata stream does not exist, treats that as a concurrency problem.
   */
  | typeof constants.STREAM_EXISTS
  /**
   * see: {@link ExpectedRevision}.
   */
  | ExpectedRevision;

export type CurrentRevision =
  /**
   * The stream being written to does not yet exist.
   */
  | typeof constants.NO_STREAM
  /**
   * the current event number of the last event written to the stream
   */
  | bigint;

/**
 * Represents the direction of read operation (both from '$all' and a regular stream).
 */
export type Direction = typeof constants.FORWARD | typeof constants.BACKWARD;

export interface WriteResult {
  nextExpectedVersion: bigint;
  position?: Position;
}

/**
 * Represents a previously written event.
 */
export interface RecordedEventBase {
  /**
   * The event stream that events belongs to.
   */
  streamId: string;

  /**
   * Unique identifier representing this event. UUID format.
   */
  id: string;

  /**
   * Number of this event in the stream.
   */
  revision: bigint;

  /**
   * Type of this event.
   */
  eventType: string;

  /**
   * Representing when this event was created in the database system.
   */
  created: number;
}

export interface JSONRecordedEvent extends RecordedEventBase {
  /**
   * Indicates wheter the content is internally marked as JSON.
   */
  isJson: true;

  /**
   * Payload of this event.
   */
  data: unknown;

  /**
   * Representing the metadata associated with this event.
   */
  metadata: Record<string, unknown>;
}

export interface BinaryRecordedEvent extends RecordedEventBase {
  /**
   * Indicates whether the content is internally marked as JSON.
   */
  isJson: false;

  /**
   * Payload of this event.
   */
  data: Uint8Array;

  /**
   * Representing the metadata associated with this event.
   */
  metadata: Uint8Array;
}

export interface AllStreamJSONRecordedEvent extends JSONRecordedEvent {
  /**
   * Position of this event in the transaction log.
   */
  position: Position;
}

export interface AllStreamBinaryRecordedEvent extends BinaryRecordedEvent {
  /**
   * Position of this event in the transaction log.
   */
  position: Position;
}

export type RecordedEvent = JSONRecordedEvent | BinaryRecordedEvent;
export type AllStreamRecordedEvent =
  | AllStreamJSONRecordedEvent
  | AllStreamBinaryRecordedEvent;

/**
 * A structure representing a single event or an resolved link event.
 */
export interface ResolvedEvent {
  /**
   * The event, or the resolved link event if this {@link ResolvedEvent} is a link event.
   */
  event?: RecordedEvent;

  /**
   *
   The link event if this ResolvedEvent is a link event.
   */
  link?: RecordedEvent;

  /**
   * Commit position of the record.
   */
  commitPosition?: bigint;
}

/**
 * A structure representing a single event or an resolved link event.
 */
export interface AllStreamResolvedEvent {
  /**
   * The event, or the resolved link event if this {@link ResolvedEvent} is a link event.
   */
  event?: AllStreamRecordedEvent;

  /**
   *
   The link event if this ResolvedEvent is a link event.
   */
  link?: AllStreamRecordedEvent;

  /**
   * Commit position of the record.
   */
  commitPosition?: bigint;
}

export type ProjectionMode =
  | typeof constants.CONTINUOUS
  | typeof constants.ONE_TIME
  | typeof constants.TRANSIENT;

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
   * The CoreProcessingTime
   * */
  coreProcessingTime: BigInt;

  /**
   * The projection version
   * */
  version: BigInt;

  /**
   * The Epoch
   * */
  epoch: BigInt;

  /**
   * The projection EffectiveName
   * */
  effectiveName: string;

  /**
   * The projection WritesInProgress
   * */
  writesInProgress: number;

  /**
   * The projection ReadsInProgress
   * */
  readsInProgress: number;

  /**
   * The projection PartitionsCached
   * */
  partitionsCached: number;

  /**
   * The raw status of the projection.
   * Split into {@link projectionStatus} and {@link processingStatus} for convenience.
   * */
  status: string;

  /**
   * The current status of the projection
   * */
  projectionStatus: ProjectionStatus;

  /**
   * The current status of the projection
   * */
  processingStatus: ProcessingStatus;

  /**
   * The projection StateReason
   * */
  stateReason: string;

  /**
   * The projection Name
   * */
  name: string;

  /**
   * The projection Mode
   * */
  mode: ProjectionMode;

  /**
   * The projection Position
   * */
  position: string;

  /**
   * The projection Progress
   * */
  progress: number;

  /**
   * LastCheckpoint
   * */
  lastCheckpoint: string;

  /**
   * The projection EventsProcessedAfterRestart
   * */
  eventsProcessedAfterRestart: BigInt;

  /**
   * The projection CheckpointStatus
   * */
  checkpointStatus: string;

  /**
   * The projection BufferedEvents
   * */
  bufferedEvents: BigInt;

  /**
   * The projection WritePendingEventsBeforeCheckpoint
   * */
  writePendingEventsBeforeCheckpoint: number;

  /**
   * The projection WritePendingEventsAfterCheckpoint
   * */
  writePendingEventsAfterCheckpoint: number;
}

export interface SubscriptionHandler<T> {
  onEvent: (report: SubscriptionReport, event: T) => void;
  onEnd?: () => void;
  onConfirmation?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export type PersistentSubscriptionHandler = {
  onEvent: (report: PersistentReport, event: ResolvedEvent) => void;
  onEnd?: () => void;
  onConfirmation?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
};

export interface DeleteResult {
  position?: Position;
}

export type ConsumerStrategy =
  | typeof constants.DISPATCH_TO_SINGLE
  | typeof constants.ROUND_ROBIN
  | typeof constants.PINNED;

export interface PersistentReport {
  ack(...ids: string[]): void;
  nack(action: PersistentAction, reason: string, ...ids: string[]): void;
  unsubscribe(): void;
}

export interface SubscriptionReport {
  unsubscribe(): void;
}

export type PersistentAction =
  | typeof constants.PARK
  | typeof constants.RETRY
  | typeof constants.SKIP
  | typeof constants.STOP;

export type NodePreference =
  | typeof constants.RANDOM
  | typeof constants.FOLLOWER
  | typeof constants.LEADER;

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

export type SubscriptionEvent =
  | typeof constants.EVENT_EVENT
  | typeof constants.END_EVENT
  | typeof constants.CONFIRMATION_EVENT
  | typeof constants.ERROR_EVENT
  | typeof constants.CLOSE_EVENT;

export interface SubscriptionListeners<E, R> {
  [constants.EVENT_EVENT]: (event: E, report: R) => void;
  [constants.END_EVENT]: () => void;
  [constants.CONFIRMATION_EVENT]: () => void;
  [constants.ERROR_EVENT]: (error: Error) => void;
  [constants.CLOSE_EVENT]: () => void;
}

export type FilterOn =
  | typeof constants.EVENT_TYPE
  | typeof constants.STREAM_NAME;

export interface Filter {
  filterOn: FilterOn;
  max?: number;
  checkpointIntervalMul?: number;
  regex?: string;
  prefixes?: string[];
}

export interface Credentials {
  username: string;
  password: string;
}

export type Listeners<E, R> = {
  [P in keyof SubscriptionListeners<E, R>]: Set<SubscriptionListeners<E, R>[P]>;
};

export interface Subscription<E, R> {
  on<Name extends SubscriptionEvent>(
    name: Name,
    handler: SubscriptionListeners<E, R>[Name]
  ): Subscription<E, R>;

  once<Name extends SubscriptionEvent>(
    name: Name,
    handler: SubscriptionListeners<E, R>[Name]
  ): Subscription<E, R>;

  off<Name extends SubscriptionEvent>(
    name: Name,
    handler: SubscriptionListeners<E, R>[Name]
  ): Subscription<E, R>;

  unsubscribe: () => void;

  isPaused: boolean;
  pause: () => void;
  resume: () => void;

  [Symbol.asyncIterator](): AsyncIterator<E>;
}

export interface PersistentSubscription
  extends Subscription<ResolvedEvent, PersistentReport>,
    PersistentReport {}

export interface StreamSubscription
  extends Subscription<ResolvedEvent, SubscriptionReport>,
    SubscriptionReport {}

export interface AllStreamSubscription
  extends Subscription<AllStreamResolvedEvent, SubscriptionReport>,
    SubscriptionReport {}
