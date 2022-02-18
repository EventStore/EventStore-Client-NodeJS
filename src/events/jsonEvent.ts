import { v4 as uuid } from "uuid";
import { EventData, JSONEventType } from "../types";
import { convertMetadata } from "./convertMetadata";

export type JSONEventOptions<E extends JSONEventType> = {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
} & E;

export const jsonEvent = <E extends JSONEventType>({
  type,
  data,
  metadata,
  id = uuid(),
}: JSONEventOptions<E>): EventData<E> =>
  ({
    id,
    contentType: "application/json",
    type,
    data: data,
    metadata: convertMetadata<E["metadata"]>(metadata),
  } as EventData<E>);
