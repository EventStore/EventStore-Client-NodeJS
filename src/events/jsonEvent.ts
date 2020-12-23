import { v4 as uuid } from "uuid";

export type JSONType = Record<string | number, unknown> | unknown[];

export interface JSONEventData<
  EventType extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
> {
  id: string;
  contentType: "application/json";
  type: EventType;
  data: Data;
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
  type: EventType;
  /**
   * The data of the event
   */
  data: Data;
  /**
   * The meta data of the event
   */
  metadata?: Metadata;
}

export const jsonEvent = <
  EventType extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
>({
  type,
  data,
  metadata,
  id = uuid(),
}: JSONEventOptions<EventType, Data, Metadata>): JSONEventData<
  EventType,
  Data,
  Metadata
> => ({
  id,
  contentType: "application/json",
  type,
  data,
  metadata,
});
