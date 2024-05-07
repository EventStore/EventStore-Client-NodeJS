import { StreamsService } from "../../../generated/streams_grpc_pb";

import { Client } from "../../Client";
import { ANY } from "../../constants";
import type {
  BaseOptions,
  AppendResult,
  AppendExpectedRevision,
  EventData,
  EventType,
} from "../../types";

import { append } from "./append";
import { batchAppend } from "./batchAppend";

export interface AppendToStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @defaultValue ANY
   */
  expectedRevision?: AppendExpectedRevision;
  /**
   * The batch size, in bytes.
   * @defaultValue 3 * 1024 * 1024
   */
  batchAppendSize?: number;
}

declare module "../../Client" {
  interface Client {
    /**
     * Appends events to a given stream.
     * @param streamName - A stream name.
     * @param events - Events or event to write.
     * @param options - Writing options.
     */
    appendToStream<KnownEventType extends EventType = EventType>(
      streamName: string,
      events: EventData<KnownEventType> | EventData<KnownEventType>[],
      options?: AppendToStreamOptions
    ): Promise<AppendResult>;
  }
}

Client.prototype.appendToStream = async function <
  KnownEventType extends EventType = EventType
>(
  this: Client,
  streamName: string,
  event: EventData<KnownEventType> | EventData<KnownEventType>[],
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
