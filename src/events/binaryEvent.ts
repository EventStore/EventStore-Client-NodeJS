import { v4 as uuid } from "uuid";

import type { BinaryEventType, EventData } from "../types";

import { convertMetadata } from "./convertMetadata";

export type BinaryEventOptions<E extends BinaryEventType> = E & {
  /**
   * The id to this event. By default, the id will be generated.
   */
  id?: string;
  /**
   * The binary data of the event.
   */
  data: Uint8Array | Buffer;
};

export const binaryEvent = <E extends BinaryEventType = BinaryEventType>({
  type,
  data,
  metadata,
  id = uuid(),
}: BinaryEventOptions<E>): EventData<E> =>
  ({
    id,
    contentType: "application/octet-stream",
    type,
    data: Uint8Array.from(data),
    metadata: convertMetadata<E["metadata"]>(metadata),
  }) as EventData<E>;
