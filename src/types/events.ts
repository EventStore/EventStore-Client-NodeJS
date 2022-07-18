import type { Position } from "../types";

export type JSONType = Record<string | number, unknown> | unknown[] | string;
export type MetadataType = JSONType | Uint8Array;

export type JSONEventType<
  Type extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends MetadataType | unknown = unknown
> = Metadata extends MetadataType
  ? {
      type: Type;
      data: Data;
      metadata: Metadata;
    }
  : {
      type: Type;
      data: Data;
      metadata?: Metadata;
    };

export type BinaryEventType<
  Type extends string = string,
  Metadata extends MetadataType | unknown = unknown
> = Metadata extends MetadataType
  ? {
      type: Type;
      data: Uint8Array;
      metadata: Metadata;
    }
  : {
      type: Type;
      data: Uint8Array;
      metadata?: Metadata;
    };

export type EventType = JSONEventType | BinaryEventType;

export type JSONEventData<E extends JSONEventType = JSONEventType> =
  E extends JSONEventType
    ? {
        id: string;
        contentType: "application/json";
        type: E["type"];
        data: E["data"];
        metadata: E["metadata"] extends MetadataType
          ? E["metadata"]
          : MetadataType | undefined;
      }
    : never;

export type BinaryEventData<E extends BinaryEventType = BinaryEventType> =
  E extends BinaryEventType
    ? {
        id: string;
        contentType: "application/octet-stream";
        type: E["type"];
        data: E["data"];
        metadata: E["metadata"] extends MetadataType
          ? E["metadata"]
          : MetadataType | undefined;
      }
    : never;

export type EventData<E extends EventType = EventType> =
  E extends BinaryEventType
    ? BinaryEventData<E>
    : E extends JSONEventType
    ? JSONEventData<E>
    : never;

export type LinkEvent = BinaryEventType<
  "$>",
  {
    $causedBy?: string;
    $correlationId?: string;
    [key: string]: unknown;
  }
>;

/**
 * Represents a previously written event.
 */
export type RecordedEvent<E extends EventType = EventType> = E extends EventType
  ? {
      /**
       * The event stream that events belongs to.
       */
      streamId: string;

      /**
       * Unique identifier representing this event. UUID format.
       */
      id: string;

      /**
       * Indicates whether the content is internally marked as JSON.
       */
      isJson: E extends JSONEventType ? true : false;

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
       * Data of this event.
       */
      data: E extends JSONEventType ? E["data"] : Uint8Array;

      /**
       * Representing the metadata associated with this event.
       */
      metadata: E["metadata"] extends MetadataType
        ? E["metadata"]
        : MetadataType | undefined;

      /**
       * Position of this event in the transaction log.
       * Only returned on server versions later than 22.6.0.
       */
      position?: Position;
    }
  : never;

export type JSONRecordedEvent<E extends JSONEventType = JSONEventType> =
  RecordedEvent<E>;

export type BinaryRecordedEvent<E extends BinaryEventType = BinaryEventType> =
  RecordedEvent<E>;

export type AllStreamJSONRecordedEvent<
  E extends JSONEventType = JSONEventType
> = RecordedEvent<E> & {
  /**
   * Position of this event in the transaction log.
   */
  position: Position;
};

export type AllStreamBinaryRecordedEvent<
  E extends BinaryEventType = BinaryEventType
> = RecordedEvent<E> & {
  /**
   * Position of this event in the transaction log.
   */
  position: Position;
};

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
  link?: EventTypeToRecordedEvent<LinkEvent>;

  /**
   * Commit position of the record.
   */
  commitPosition?: bigint;
}

/**
 * A structure representing a single event or a resolved link event from a persistent subscription to a stream.
 */
export interface PersistentSubscriptionToStreamResolvedEvent<
  Event extends EventType = EventType
> extends ResolvedEvent<Event> {
  /**
   * The number of times this event has been retried.
   */
  retryCount: number;
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
  link?: AllStreamBinaryRecordedEvent<LinkEvent>;

  /**
   * Commit position of the record.
   */
  commitPosition?: bigint;
}

/**
 * A structure representing a single event or a resolved link event from a persistent subscription to $all.
 */
export interface PersistentSubscriptionToAllResolvedEvent
  extends AllStreamResolvedEvent {
  /**
   * The number of times this event has been retried.
   */
  retryCount: number;
}

export type EventTypeToRecordedEvent<T extends EventType> =
  T extends JSONEventType
    ? JSONRecordedEvent<T>
    : T extends BinaryEventType
    ? BinaryRecordedEvent<T>
    : never;

export type RecordedEventToEventType<T extends RecordedEvent> =
  T extends JSONRecordedEvent<infer E>
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

export type RecordedEventToEventData<T extends RecordedEvent> =
  T extends JSONRecordedEvent<infer E>
    ? JSONEventData<E>
    : T extends BinaryRecordedEvent<infer E>
    ? BinaryEventData<E>
    : never;

export type EventDataToRecordedEvent<T extends EventData> =
  T extends JSONRecordedEvent<infer E>
    ? JSONEventData<E>
    : T extends BinaryRecordedEvent<infer E>
    ? BinaryEventData<E>
    : never;
