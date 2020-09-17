import { Client, ChannelCredentials, ClientOptions } from "@grpc/grpc-js";

import { MemberInfo as GrpcMemberInfo } from "../generated/gossip_pb";
import VNodeState = GrpcMemberInfo.VNodeState;
import * as constants from "./constants";
export { VNodeState };

/**
 * A structure referring to a potential logical record position in the EventStoreDB transaction file.
 */
export type Position = {
  commit: number;
  prepare: number;
};

export type ReadRevision =
  | typeof constants.START
  | typeof constants.END
  | number;

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
   * The stream should exist. If it or a metadata stream does not exist, treats that as a concurrency problem.
   */
  | typeof constants.STREAM_EXISTS
  /**
   * The stream being written to should not yet exist. If it does exist, treats that as a concurrency problem.
   */
  | typeof constants.NO_STREAM
  /**
   * States that the last event written to the stream should have an event number matching your expected value.
   */
  | number;

/**
 * Delete stream does not support "stream_exists". see: {@link ExpectedRevision}.
 */
export type DeleteStreamExpectedRevision = Exclude<
  ExpectedRevision,
  typeof constants.STREAM_EXISTS
>;

export type CurrentRevision =
  /**
   * The stream being written to does not yet exist.
   */
  | typeof constants.NO_STREAM
  /**
   * the current event number of the last event written to the stream
   */
  | number;

/**
 * Represents the direction of read operation (both from '$all' and a regular stream).
 */
export type Direction = typeof constants.FORWARD | typeof constants.BACKWARD;

export type WriteResult = {
  nextExpectedVersion: number;
  position?: Position;
};

/**
 * A structure representing a single event or an resolved link event.
 */
export type ResolvedEvent = {
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
  commit_position?: number;
};

/**
 * Represents a previously written event.
 */
export type RecordedEvent = {
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
  revision: number;

  /**
   * Type of this event.
   */
  eventType: string;

  /**
   * Payload of this event.
   */
  data: Uint8Array | Record<string, unknown>;

  /**
   * Representing the metadata associated with this event.
   */
  metadata: Uint8Array | Record<string, unknown>;

  /**
   * Indicates wheter the content is internally marked as JSON.
   */
  isJson: boolean;

  /**
   * Position of this event in the transaction log.
   */
  position: Position;

  /**
   * Representing when this event was created in the database system.
   */
  created: number;
};

export type SubscriptionHandler = {
  onEvent: (report: SubscriptionReport, event: ResolvedEvent) => void;
  onEnd?: () => void;
  onConfirmation?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
};

export type PersistentSubscriptionHandler = {
  onEvent: (report: PersistentReport, event: ResolvedEvent) => void;
  onEnd?: () => void;
  onConfirmation?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
};

export type DeleteResult = {
  position?: Position;
};

export type ConsumerStrategy =
  | typeof constants.DISPATCH_TO_SINGLE
  | typeof constants.ROUND_ROBIN
  | typeof constants.PINNED;

export interface PersistentReport {
  ack(ids: string[]): void;
  nack(action: PersistentAction, reason: string, ids: string[]): void;
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

export type EndPoint = {
  address: string;
  port: number;
};

export type MemberInfo = {
  instanceId?: string;
  timeStamp: number;
  state: VNodeState;
  isAlive: boolean;
  httpEndpoint?: EndPoint;
};

export type ClientConstructor<T extends Client> = new (
  address: string,
  credentials: ChannelCredentials,
  options?: Partial<ClientOptions>
) => T;

export interface ESDBConnection {
  close(): Promise<void>;
  _client<T extends Client>(c: ClientConstructor<T>): Promise<T>;
}
