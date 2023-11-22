import { StreamsService } from "../../../generated/streams_grpc_pb";

import { Client } from "../../Client";
import { ANY } from "../../constants";
import schemas from "../../schemas";
import type {
  BaseOptions,
  AppendResult,
  AppendExpectedRevision,
  EventData,
  EventType,
} from "../../types";
import { validateField } from "../../utils/validation";

import { append } from "./append";
import { batchAppend } from "./batchAppend";

export interface AppendToStreamOptions extends BaseOptions {
  /**
   * Asks the server to check the stream is at specific revision before writing events.
   *
   * @default ANY
   */
  expectedRevision?: AppendExpectedRevision;
  /**
   * The batch size, in bytes.
   *
   * @default 3 * 1024 * 1024
   */
  batchAppendSize?: number;
}

declare module "../../Client" {
  interface Client {
    /**
     * Appends events to a given stream.
     *
     * @param streamName A stream name.
     * @param events Events or event to write.
     * @param options Writing options.
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
  options: AppendToStreamOptions = {}
): Promise<AppendResult> {
  const events = Array.isArray(event) ? event : [event];

  const {
    expectedRevision = ANY,
    batchAppendSize = 3 * 1024 * 1024,
    ...baseOptions
  } = options;

  validateField(schemas.streamName, streamName);
  // validateField(schemas.eventData, events);

  schemas.eventData.parse(events);

  validateField(schemas.appendToStreamOptions.optional(), options);

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
