import { v4 as uuid } from "uuid";

export type JSONType = Record<string | number, unknown> | unknown[];

export interface JSONEventData {
  id: string;
  contentType: "application/json";
  eventType: string;
  payload: JSONType;
  metadata?: JSONType;
}

export interface JSONEventOptions {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type
   */
  eventType: string;
  /**
   * The payload of the event
   */
  payload: JSONType;
  /**
   * The payload of the event
   */
  metadata?: JSONType;
}

export const jsonEvent = ({
  eventType,
  payload,
  metadata,
  id = uuid(),
}: JSONEventOptions): JSONEventData => ({
  id,
  contentType: "application/json",
  eventType,
  payload,
  metadata,
});
