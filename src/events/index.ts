import { v4 as uuid } from "uuid";
export type Payload = JsonPayload | BinaryPayload;

export type JsonPayload = {
  __typename: "json";
  payload: Record<string | number, unknown> | unknown[];
};

export type BinaryPayload = {
  __typename: "binary";
  payload: Uint8Array;
};

export class EventDataBuilder {
  eventType: string;
  payload: JsonPayload | BinaryPayload;
  id: string | null;

  private constructor(
    eventType: string,
    payload: JsonPayload | BinaryPayload,
    id: string | null
  ) {
    this.eventType = eventType;
    this.payload = payload;
    this.id = id;
  }

  static json(
    eventType: string,
    obj: JsonPayload["payload"]
  ): EventDataBuilder {
    const payload: JsonPayload = {
      __typename: "json",
      payload: obj,
    };

    return new EventDataBuilder(eventType, payload, null);
  }

  static binary(eventType: string, buffer: Uint8Array): EventDataBuilder {
    const payload: BinaryPayload = {
      __typename: "binary",
      payload: buffer,
    };

    return new EventDataBuilder(eventType, payload, null);
  }

  /**
   * Set an id to this event. By default, the id will be generated.
   * @param id
   */
  eventId(id: string): EventDataBuilder {
    this.id = id;
    return this;
  }

  build(): EventData {
    const id: string = this.id != null ? this.id : uuid();
    return new EventData(this.eventType, this.payload, id);
  }
}

/**
 * Holds data of event about to be sent to the server.
 */
export class EventData {
  eventType: string;
  payload: JsonPayload | BinaryPayload;
  id: string;

  public constructor(
    eventType: string,
    payload: JsonPayload | BinaryPayload,
    id: string
  ) {
    this.eventType = eventType;
    this.payload = payload;
    this.id = id;
  }

  /**
   * Creates an event with a JSON payload.
   * @param eventType
   * @param payload An object.
   */

  static json(
    eventType: string,
    payload: JsonPayload["payload"]
  ): EventDataBuilder {
    return EventDataBuilder.json(eventType, payload);
  }

  /**
   * Creates an event with a raw binary payload.
   * @param eventType
   * @param payload
   */
  static binary(eventType: string, payload: Uint8Array): EventDataBuilder {
    return EventDataBuilder.binary(eventType, payload);
  }
}
