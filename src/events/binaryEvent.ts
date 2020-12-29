import { v4 as uuid } from "uuid";

export interface BinaryEventData<Type extends string = string> {
  id: string;
  contentType: "application/octet-stream";
  type: Type;
  data: Uint8Array;
  metadata?: Uint8Array;
}

export interface BinaryEventOptions<Type extends string = string> {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type
   */
  type: Type;
  /**
   * The binary data of the event
   */
  data: Uint8Array | Buffer;
  /**
   * The binary metadata of the event
   */
  metadata?: Uint8Array | Buffer;
}

export const binaryEvent = <Type extends string = string>({
  type,
  data,
  metadata,
  id = uuid(),
}: BinaryEventOptions<Type>): BinaryEventData<Type> => ({
  id,
  contentType: "application/octet-stream",
  type,
  data: Uint8Array.from(data),
  metadata: metadata ? Uint8Array.from(metadata) : undefined,
});
