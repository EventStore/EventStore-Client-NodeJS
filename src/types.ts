import { Readable } from "stream";
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

export type AppendExpectedRevision =
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

export interface AppendResult {
  nextExpectedVersion: bigint;
  position?: Position;
}

/**
 * Represents a previously written event.
 */
export interface RecordedEventBase<EventType extends string = string> {
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
  eventType: EventType;

  /**
   * Representing when this event was created in the database system.
   */
  created: number;
}

export interface JSONRecordedEvent<
  EventType extends string = string,
  Data = unknown,
  Metadata extends Record<string, unknown> = Record<string, unknown>
> extends RecordedEventBase<EventType> {
  /**
   * Indicates whether the content is internally marked as JSON.
   */
  isJson: true;

  /**
   * Payload of this event.
   */
  data: Data;

  /**
   * Representing the metadata associated with this event.
   */
  metadata: Metadata;
}

export interface BinaryRecordedEvent<EventType extends string = string>
  extends RecordedEventBase<EventType> {
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

export interface AllStreamJSONRecordedEvent<
  EventType extends string = string,
  Data = unknown,
  Metadata extends Record<string, unknown> = Record<string, unknown>
> extends JSONRecordedEvent<EventType, Data, Metadata> {
  /**
   * Position of this event in the transaction log.
   */
  position: Position;
}

export interface AllStreamBinaryRecordedEvent<EventType extends string = string>
  extends BinaryRecordedEvent<EventType> {
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
   * The link event if this ResolvedEvent is a link event.
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
   * The link event if this ResolvedEvent is a link event.
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

export interface PersistentSubscription
  extends ReadableSubscription<ResolvedEvent> {
  ack(...ids: string[]): Promise<void>;
  nack(
    action: PersistentAction,
    reason: string,
    ...ids: string[]
  ): Promise<void>;
}

export type StreamSubscription = ReadableSubscription<ResolvedEvent>;
export type AllStreamSubscription = ReadableSubscription<AllStreamResolvedEvent>;
