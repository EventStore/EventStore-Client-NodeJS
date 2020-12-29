import { v4 as uuid } from "uuid";

export type JSONType = Record<string | number, unknown> | unknown[];

export interface JSONEventData<
  EventType extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
> {
  id: string;
  contentType: "application/json";
  eventType: EventType;
  payload: Data;
  metadata?: Metadata;
}

export interface JSONEventOptions<
  EventType extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
> {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type
   */
  eventType: EventType;
  /**
   * The payload of the event
   */
  payload: Data;
  /**
   * The payload of the event
   */
  metadata?: Metadata;
}

export const jsonEvent = <
  EventType extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
>({
  eventType,
  payload,
  metadata,
  id = uuid(),
}: JSONEventOptions<EventType, Data, Metadata>): JSONEventData<
  EventType,
  Data,
  Metadata
> => ({
  id,
  contentType: "application/json",
  eventType,
  payload,
  metadata,
});
