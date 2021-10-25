import { StreamsService } from "../../../generated/streams_grpc_pb";

import { Client } from "../../Client";
import { ANY } from "../../constants";
import {
  BaseOptions,
  AppendResult,
  AppendExpectedRevision,
  EventData,
} from "../../types";

import { append } from "./append";
import { batchAppend } from "./batchAppend";

export interface AppendToStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @default ANY
   */
  expectedRevision?: AppendExpectedRevision;
  /**
   * The batch size, in bytes.
   * @default 3 * 1024 * 1024
   */
  batchAppendSize?: number;
}

export type InternalAppendToStreamOptions = Required<
  Omit<AppendToStreamOptions, keyof BaseOptions>
> &
  BaseOptions;

declare module "../../Client" {
  interface Client {
    /**
     * Appends events to a given stream.
     * @param streamName A stream name.
     * @param events Events or event to write.
     * @param options Writing options.
     */
    appendToStream(
      streamName: string,
      events: EventData | EventData[],
      options?: AppendToStreamOptions
    ): Promise<AppendResult>;
  }
}

Client.prototype.appendToStream = async function (
  this: Client,
  streamName: string,
  event: EventData | EventData[],
  {
    expectedRevision = ANY,
    batchAppendSize = 3 * 1024 * 1024,
    ...baseOptions
  }: AppendToStreamOptions = {}
): Promise<AppendResult> {
  const events = Array.isArray(event) ? event : [event];

  if (
    !baseOptions.credentials &&
    (await this.supports(StreamsService.batchAppend))
  ) {
    return batchAppend.call(this, streamName, events, {
      expectedRevision,
      batchAppendSize,
      ...baseOptions,
    });
  }

  return append.call(this, streamName, events, {
    expectedRevision,
    batchAppendSize,
    ...baseOptions,
  });
};
