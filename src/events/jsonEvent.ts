import { v4 as uuid } from "uuid";
import { JSONEventData, JSONEventType, MetadataType } from "../types";
import { convertMetadata } from "./convertMetadata";

// https://github.com/Microsoft/TypeScript/issues/12400
type OptionalMetadata<
  E extends JSONEventType
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

export type JSONEventOptions<E extends JSONEventType> = {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The event type.
   */
  type: E["type"];
  /**
   * The data of the event.
   */
  data: E["data"];
} & OptionalMetadata<E>;

export const jsonEvent = <E extends JSONEventType>({
  type,
  data,
  metadata,
  id = uuid(),
}: JSONEventOptions<E>): JSONEventData<E> => ({
  id,
  contentType: "application/json",
  type,
  data: data as JSONEventData<E>["data"],
  metadata: convertMetadata<E["metadata"]>(
    metadata
  ) as JSONEventData<E>["metadata"],
});
