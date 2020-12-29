import { v4 as uuid } from "uuid";

export type JSONType = Record<string | number, unknown> | unknown[];

export interface JSONEventData<
  Type extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
> {
  id: string;
  contentType: "application/json";
  type: Type;
  data: Data;
  metadata?: Metadata;
}

export interface JSONEventOptions<
  Type extends string = string,
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
  type: Type;
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
  Type extends string = string,
  Data extends JSONType = JSONType,
  Metadata extends JSONType = JSONType
>({
  type,
  data,
  metadata,
  id = uuid(),
}: JSONEventOptions<Type, Data, Metadata>): JSONEventData<
  Type,
  Data,
  Metadata
> => ({
  id,
  contentType: "application/json",
  type,
  data,
  metadata,
});
