import { v4 as uuid } from "uuid";
import { convertMetadata } from "./convertMetadata";
import { MetadataType } from "./types";

export interface BinaryEventData<
  Type extends string = string,
  Metadata extends MetadataType = MetadataType
> {
  id: string;
  contentType: "application/octet-stream";
  type: Type;
  data: Uint8Array;
  metadata?: Metadata;
}

export interface BinaryEventOptions<
  Type extends string = string,
  Metadata extends MetadataType = MetadataType | Buffer
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
   * The binary data of the event
   */
  data: Uint8Array | Buffer;
  /**
   * The binary metadata of the event
   */
  metadata?: Metadata;
}

export const binaryEvent = <
  Type extends string = string,
  Metadata extends MetadataType = MetadataType
>({
  type,
  data,
  metadata,
  id = uuid(),
}: BinaryEventOptions<Type, Metadata>): BinaryEventData<Type, Metadata> => ({
  id,
  contentType: "application/octet-stream",
  type,
  data: Uint8Array.from(data),
  metadata: convertMetadata<Metadata>(metadata),
});
