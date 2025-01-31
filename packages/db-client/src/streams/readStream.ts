import type { ReadableOptions } from "stream";
import { RustReadStreamOptions } from "@eventstore/db-client-bridge";

import { Client } from "../Client";
import { FORWARDS, START, END } from "../constants";
import type {
  BaseOptions,
  Direction,
  EventType,
  ReadRevision,
  ResolvedEvent,
} from "../types";
import {InvalidArgumentError} from "../utils";

export interface ReadStreamOptions extends BaseOptions {
  /**
   * The number of events to read.
   * @defaultValue Number.MAX_SAFE_INTEGER
   */
  maxCount?: number | bigint;
  /**
   * Starts the read at the given event revision.
   * @defaultValue START
   */
  fromRevision?: ReadRevision;
  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   * @defaultValue false
   */
  resolveLinkTos?: boolean;
  /**
   * Sets the read direction of the stream.
   * @defaultValue FORWARDS
   */
  direction?: Direction;
}

declare module "../Client" {
  interface Client {
    /**
     * Reads events from a given stream.
     * @param streamName - A stream name.
     * @param options - Reading options.
     */
    readStream<KnownEventType extends EventType = EventType>(
      streamName: string,
      options?: ReadStreamOptions,
      readableOptions?: ReadableOptions
    ): Promise<AsyncIterableIterator<ResolvedEvent<KnownEventType>>>;
  }
}

Client.prototype.readStream = async function* <
    KnownEventType extends EventType = EventType
>(
    this: Client,
    streamName: string,
    {
      maxCount = Number.MAX_SAFE_INTEGER,
      fromRevision = START,
      resolveLinkTos = false,
      direction = FORWARDS,
      ...baseOptions
    }: ReadStreamOptions = {},
): Promise<AsyncIterableIterator<ResolvedEvent<KnownEventType>>> {
  const options: RustReadStreamOptions = {
    maxCount: BigInt(maxCount),
    fromRevision,
    resolveLinks: resolveLinkTos,
    direction,
    requiresLeader: baseOptions.requiresLeader ?? true,
  };
  switch (fromRevision) {
    case START: {
      break;
    }

    case END: {
      break;
    }

    default: {
      const lowerBound = BigInt("0");
      const upperBound = BigInt("0xffffffffffffffff");

      if (fromRevision < lowerBound) {
        throw new InvalidArgumentError(
            `fromRevision value must be a non-negative integer. Value Received: ${fromRevision}`
        );
      }

      if (fromRevision > upperBound) {
        throw new InvalidArgumentError(
            `fromRevision value must be a non-negative integer, range from 0 to 18446744073709551615. Value Received: ${fromRevision}`
        );
      }

      options.fromRevision = fromRevision;

      break;
    }
  }

  const stream = await this.rustClient.readStream(streamName, options);

  for await (const event of stream) {
    const resolved: ResolvedEvent = {};

    if (event.event != undefined) {
        resolved.event = {
          streamId: event.event.streamId,
          id: event.event.id,
          revision: event.event.revision,
          type: event.event.type,
          isJson: event.event.isJson,
          data: event.event.data,
          metadata: event.event.metadata,
          position: event.event.position,
          created: event.event.created,
        };
    }

    if (event.link != undefined) {
      resolved.link = {
        streamId: event.link.streamId,
        id: event.link.id,
        revision: event.link.revision,
        type: event.link.type,
        isJson: false,
        data: event.link.data,
        metadata: event.link.metadata,
        position: event.link.position,
        created: event.link.created,
      };
    }

    yield resolved;
  }
};
