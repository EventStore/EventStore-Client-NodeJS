import { v4 as uuid } from "uuid";
import { BinaryEventData, BinaryEventType, MetadataType } from "../types";
import { convertMetadata } from "./convertMetadata";

// https://github.com/Microsoft/TypeScript/issues/12400
type OptionalMetadata<
  E extends BinaryEventType
> = E["metadata"] extends MetadataType
  ? {
      /**
       * The metadata of the event.
       */
      metadata: E["metadata"];
    }
  : {
      /**
       * The metadata of the event.
       */
      metadata?: E["metadata"];
    };

export type BinaryEventOptions<E extends BinaryEventType> = {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type.
   */
  type: E["type"];
  /**
   * The binary data of the event.
   */
  data: Uint8Array | Buffer;
} & OptionalMetadata<E>;

export const binaryEvent = <E extends BinaryEventType = BinaryEventType>({
  type,
  data,
  metadata,
  id = uuid(),
}: BinaryEventOptions<E>): BinaryEventData<E> => ({
  id,
  contentType: "application/octet-stream",
  type,
  data: Uint8Array.from(data),
  metadata: convertMetadata<E["metadata"]>(
    metadata
  ) as BinaryEventData<E>["metadata"],
});
