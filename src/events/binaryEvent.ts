import { v4 as uuid } from "uuid";

export interface BinaryEventData<EventType extends string = string> {
  id: string;
  contentType: "application/octet-stream";
  type: EventType;
  data: Uint8Array;
  metadata?: Uint8Array;
}

export interface BinaryEventOptions<EventType extends string = string> {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type
   */
  type: EventType;
  /**
   * The binary data of the event
   */
  data: Uint8Array | Buffer;
  /**
   * The binary metadata of the event
   */
  metadata?: Uint8Array | Buffer;
}

export const binaryEvent = <EventType extends string = string>({
  type,
  data,
  metadata,
  id = uuid(),
}: BinaryEventOptions<EventType>): BinaryEventData<EventType> => ({
  id,
  contentType: "application/octet-stream",
  type,
  data: Uint8Array.from(data),
  metadata: metadata ? Uint8Array.from(metadata) : undefined,
});
