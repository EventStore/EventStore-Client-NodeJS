import { v4 as uuid } from "uuid";

export interface BinaryEventData<EventType extends string = string> {
  id: string;
  contentType: "application/octet-stream";
  eventType: EventType;
  payload: Uint8Array;
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
  eventType: EventType;
  /**
   * The binary payload of the event
   */
  payload: Uint8Array | Buffer;
  /**
   * The binary metadata of the event
   */
  metadata?: Uint8Array | Buffer;
}

export const binaryEvent = <EventType extends string = string>({
  eventType,
  payload,
  metadata,
  id = uuid(),
}: BinaryEventOptions<EventType>): BinaryEventData<EventType> => ({
  id,
  contentType: "application/octet-stream",
  eventType,
  payload: Uint8Array.from(payload),
  metadata: metadata ? Uint8Array.from(metadata) : undefined,
});
