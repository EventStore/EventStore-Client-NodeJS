import { v4 as uuid } from "uuid";

export type JSONType = Record<string | number, unknown> | unknown[];

export interface JSONEventData<T extends string = string, D extends JSONType = JSONType, M extends JSONType = JSONType> {
  id: string;
  contentType: "application/json";
  eventType: T;
  payload: D;
  metadata?: M;
}

export interface JSONEventOptions<T extends string = string, D extends JSONType = JSONType, M extends JSONType = JSONType> {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type
   */
  eventType: T;
  /**
   * The payload of the event
   */
  payload: D;
  /**
   * The payload of the event
   */
  metadata?: M;
}

export const jsonEvent = <T extends string = string, D extends JSONType = JSONType, M extends JSONType = JSONType>({
  eventType,
  payload,
  metadata,
  id = uuid(),
}: JSONEventOptions<T, D, M>): JSONEventData<T, D, M> => ({
  id,
  contentType: "application/json",
  eventType,
  payload,
  metadata,
});
