import { Client } from "../Client";
import { BACKWARDS, END } from "../constants";
import type { BaseOptions } from "../types";
import { debug, StreamNotFoundError } from "../utils";

import {
  CustomStreamMetadata,
  readStreamMetadata,
  StreamMetadata,
} from "./utils/streamMetadata";
import { metastreamOf } from "./utils/systemStreams";

export interface GetStreamMetadataResult<
  CustomMetadata extends CustomStreamMetadata = CustomStreamMetadata
> {
  /**
   * The name of the stream.
   */
  streamName: string;

  /**
   * A containing user-specified metadata.
   */
  metadata?: StreamMetadata<CustomMetadata>;

  /**
   * A the version of the metadata.
   */
  metastreamRevision?: bigint;
}

export type GetStreamMetadataOptions = BaseOptions;

declare module "../Client" {
  interface Client {
    /**
     * Reads the metadata for a stream.
     * @param streamName - A stream name.
     * @param options - Read options.
     */
    getStreamMetadata<
      CustomMetadata extends CustomStreamMetadata = CustomStreamMetadata
    >(
      streamName: string,
      options?: GetStreamMetadataOptions
    ): Promise<GetStreamMetadataResult<CustomMetadata>>;
  }
}

Client.prototype.getStreamMetadata = async function <
  CustomMetadata extends CustomStreamMetadata = CustomStreamMetadata
>(
  this: Client,
  streamName: string,
  baseOptions: GetStreamMetadataOptions = {}
): Promise<GetStreamMetadataResult<CustomMetadata>> {
  const metadataStreamName = metastreamOf(streamName);

  debug.command("getStreamMetadata: %O", {
    streamName,
    options: baseOptions,
  });

  try {
    let metadataEvent;

    for await (const e of await this.readStream(metadataStreamName, {
      ...baseOptions,
      fromRevision: END,
      maxCount: 1,
      direction: BACKWARDS,
    })) {
      metadataEvent = e;
    }

    if (!metadataEvent || !metadataEvent.event || !metadataEvent.event.isJson) {
      return { streamName };
    }

    return {
      streamName,
      metadata: readStreamMetadata<CustomMetadata>(
        metadataEvent.event.data as Record<string, unknown>
      ),
      metastreamRevision: metadataEvent.commitPosition,
    };
  } catch (error) {
    if (error instanceof StreamNotFoundError) {
      return { streamName };
    }

    throw error;
  }
};
