import { Position } from "../types";

export type JSONType = Record<string | number, unknown> | unknown[] | string;
export type MetadataType = JSONType | Uint8Array;

export interface JSONEventType<
  Type extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends MetadataType | unknown = unknown
> {
  type: Type;
  data: Data;
  metadata: Metadata;
}

export interface BinaryEventType<
  Type extends string = string,
  Metadata extends MetadataType | unknown = unknown
> {
  type: Type;
  data: Uint8Array;
  metadata: Metadata;
}

export type EventType = JSONEventType | BinaryEventType;

export interface JSONEventData<E extends JSONEventType = JSONEventType> {
  id: string;
  contentType: "application/json";
  type: E["type"];
  data: E["data"];
  metadata: E["metadata"] extends MetadataType
    ? E["metadata"]
    : MetadataType | undefined;
}

export interface BinaryEventData<E extends BinaryEventType = BinaryEventType> {
  id: string;
  contentType: "application/octet-stream";
  type: E["type"];
  data: E["data"];
  metadata: E["metadata"] extends MetadataType
    ? E["metadata"]
    : MetadataType | undefined;
}

export type EventData = JSONEventData | BinaryEventData;

/**
 * Represents a previously written event.
 */
interface RecordedEventBase<E extends EventType = EventType> {
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
  type: E["type"];

  /**
   * Representing when this event was created in the database system.
   */
  created: number;

  /**
   * Representing the metadata associated with this event.
   */
  metadata: E["metadata"] extends MetadataType
    ? E["metadata"]
    : MetadataType | undefined;
}

export interface JSONRecordedEvent<E extends JSONEventType = JSONEventType>
  extends RecordedEventBase<E> {
  /**
   * Indicates whether the content is internally marked as JSON.
   */
  isJson: true;

  /**
   * Data of this event.
   */
  data: E["data"];
}

export interface BinaryRecordedEvent<
  E extends BinaryEventType = BinaryEventType
> extends RecordedEventBase<E> {
  /**
   * Indicates whether the content is internally marked as JSON.
   */
  isJson: false;

  /**
   * Data of this event.
   */
  data: Uint8Array;
}

export interface AllStreamJSONRecordedEvent<
  E extends JSONEventType = JSONEventType
> extends JSONRecordedEvent<E> {
  /**
   * Position of this event in the transaction log.
   */
  position: Position;
}

export interface AllStreamBinaryRecordedEvent<
  E extends BinaryEventType = BinaryEventType
> extends BinaryRecordedEvent<E> {
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
export interface ResolvedEvent<Event extends EventType = EventType> {
  /**
   * The event, or the resolved link event if this {@link ResolvedEvent} is a link event.
   */
  event?: EventTypeToRecordedEvent<Event>;

  /**
   * The link event if this ResolvedEvent is a link event.
   */
  link?: EventTypeToRecordedEvent<Event>;

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

export type EventTypeToRecordedEvent<
  T extends EventType
> = T extends JSONEventType
  ? JSONRecordedEvent<T>
  : T extends BinaryEventType
  ? BinaryRecordedEvent<T>
  : never;

export type RecordedEventToEventType<
  T extends RecordedEvent
> = T extends JSONRecordedEvent<infer E>
  ? E
  : T extends BinaryRecordedEvent<infer E>
  ? E
  : never;

export type EventTypeToEventData<T extends EventType> = T extends JSONEventType
  ? JSONEventData<T>
  : T extends BinaryEventType
  ? BinaryEventData<T>
  : never;

export type EventDataToEventType<T extends EventData> = T extends JSONEventData<
  infer E
>
  ? E
  : T extends BinaryEventData<infer E>
  ? E
  : never;

export type RecordedEventToEventData<
  T extends RecordedEvent
> = T extends JSONRecordedEvent<infer E>
  ? JSONEventData<E>
  : T extends BinaryRecordedEvent<infer E>
  ? BinaryEventData<E>
  : never;

export type EventDataToRecordedEvent<
  T extends EventData
> = T extends JSONRecordedEvent<infer E>
  ? JSONEventData<E>
  : T extends BinaryRecordedEvent<infer E>
  ? BinaryEventData<E>
  : never;
