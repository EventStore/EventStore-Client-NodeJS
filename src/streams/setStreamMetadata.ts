import { Client } from "../Client";
import type {
  BaseOptions,
  AppendResult,
  AppendExpectedRevision,
} from "../types";
import { debug, metastreamOf } from "../utils";
import { jsonEvent } from "../events";
import { prepareStreamMetadata, StreamMetadata } from "../utils/streamMetadata";

export interface SetStreamMetadataOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @default ANY
   */
  expectedRevision?: AppendExpectedRevision;
}

declare module "../Client" {
  interface Client {
    /**
     * Sets metadata for steam.
     * @param streamName A stream name.
     * @param metadata Metadata to write.
     * @param options Writing options.
     */
    setStreamMetadata<MetadataType extends StreamMetadata = StreamMetadata>(
      streamName: string,
      metadata: StreamMetadata<MetadataType>,
      options?: SetStreamMetadataOptions
    ): Promise<AppendResult>;
  }
}

Client.prototype.setStreamMetadata = async function <
  MetadataType extends StreamMetadata = StreamMetadata
>(
  this: Client,
  streamName: string,
  metadata: MetadataType,
  options: SetStreamMetadataOptions = {}
): Promise<AppendResult> {
  debug.command("setStreamMetadata: %O", {
    streamName,
    metadata,
    options,
  });

  const event = jsonEvent({
    type: "$metadata",
    data: prepareStreamMetadata(metadata),
  });

  return this.appendToStream(metastreamOf(streamName), event, options);
};
