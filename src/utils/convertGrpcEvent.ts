import type { ReadResp as StreamsReadResp } from "../../generated/streams_pb";
import type { ReadResp as PersistentReadResp } from "../../generated/persistent_pb";

import { debug } from "./debug";
import type {
  EventType,
  EventTypeToRecordedEvent,
  LinkEvent,
  PersistentSubscriptionToStreamResolvedEvent,
  Position,
  ResolvedEvent,
} from "../types";

import { parseUUID } from ".";

export type GRPCReadResp = StreamsReadResp | PersistentReadResp;
export type GRPCReadEvent =
  | StreamsReadResp.ReadEvent
  | PersistentReadResp.ReadEvent;
export type GRPCRecordedEvent =
  | StreamsReadResp.ReadEvent.RecordedEvent
  | PersistentReadResp.ReadEvent.RecordedEvent;

export type ConvertGrpcEvent<GRPCEvent, E> = (grpcEvent: GRPCEvent) => E;

export const convertGrpcEvent = <T extends ResolvedEvent>(
  grpcEvent: StreamsReadResp.ReadEvent,
): T => {
  const resolved: ResolvedEvent = {};

  if (grpcEvent.hasEvent()) {
    resolved.event = convertGrpcRecord(grpcEvent.getEvent()!);
  }

  if (grpcEvent.hasLink()) {
    resolved.link = convertGrpcRecord<LinkEvent>(grpcEvent.getLink()!);
  }

  if (grpcEvent.hasCommitPosition()) {
    resolved.commitPosition = BigInt(grpcEvent.getCommitPosition()!);
  }

  return resolved as T;
};

export const convertPersistentSubscriptionGrpcEvent = <
  T extends PersistentSubscriptionToStreamResolvedEvent,
>(
  grpcEvent: PersistentReadResp.ReadEvent,
): T => {
  const resolved: PersistentSubscriptionToStreamResolvedEvent = {
    retryCount: grpcEvent.hasRetryCount() ? grpcEvent.getRetryCount() : 0,
  };

  if (grpcEvent.hasEvent()) {
    resolved.event = convertGrpcRecord(grpcEvent.getEvent()!);
  }

  if (grpcEvent.hasLink()) {
    resolved.link = convertGrpcRecord<LinkEvent>(grpcEvent.getLink()!);
  }

  if (grpcEvent.hasCommitPosition()) {
    resolved.commitPosition = BigInt(grpcEvent.getCommitPosition()!);
  }

  return resolved as T;
};

const extractPosition = (
  grpcRecord: GRPCRecordedEvent,
): Position | undefined => {
  const commit = grpcRecord.getCommitPosition();
  const prepare = grpcRecord.getPreparePosition();

  if (commit != null && prepare != null) {
    return {
      commit: BigInt(commit),
      prepare: BigInt(prepare),
    };
  }

  return undefined;
};

const safeParseJSON = <T = unknown>(
  str: string,
  fallback: (str: string) => T,
  errorMessage: string,
): T => {
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (error) {
    debug.events(errorMessage);
    return fallback(str);
  }
};

const parseMetadata = (grpcRecord: GRPCRecordedEvent, id: string) => {
  const metadata = grpcRecord.getCustomMetadata_asU8();
  if (!metadata.length) return;
  try {
    return JSON.parse(Buffer.from(metadata).toString("utf8"));
  } catch (error) {
    return metadata;
  }
};

const TICKS_PER_MILLISECOND = BigInt(10_000);
const convertCreatedToDate = (
  created: string | undefined,
  id: string,
): Date => {
  // Created should always be present, but we'll default to `0` just in case.
  if (created == null) {
    debug.events(`Missing "created" in event ${id}`);
    return new Date(0);
  }

  try {
    // Created is in dotnet "ticks", which are 100 nanoseconds.
    const millisecondsSinceEpoch = BigInt(created) / TICKS_PER_MILLISECOND;
    // We need to convert to a number to create a Date.
    // An ECMAScript Date can only go up to 8.64e15, so this should be safe to do until the year 275760.
    // https://262.ecma-international.org/10.0/#sec-time-values-and-time-range
    const epoch = Number(millisecondsSinceEpoch);
    return new Date(epoch);
  } catch (error) {
    debug.events(`Invalid "created" in event ${id}. ${error.message}`);
    return new Date(0);
  }
};

export const convertGrpcRecord = <E extends EventType = EventType>(
  grpcRecord: GRPCRecordedEvent,
): EventTypeToRecordedEvent<E> => {
  const metadataMap = grpcRecord.getMetadataMap();

  const type = metadataMap.get("type") ?? "<no-event-type-provided>";
  const contentType =
    metadataMap.get("content-type") ?? "application/octet-stream";

  if (!grpcRecord.hasStreamIdentifier()) {
    throw "Impossible situation where streamIdentifier is undefined in a recorded event";
  }
  const streamId = Buffer.from(
    grpcRecord.getStreamIdentifier()!.getStreamName(),
  ).toString("utf8");

  if (!grpcRecord.hasId()) {
    throw "Impossible situation where id is undefined in a recorded event";
  }
  const id = parseUUID(grpcRecord.getId()!);
  const created = convertCreatedToDate(metadataMap.get("created"), id);
  const revision = BigInt(grpcRecord.getStreamRevision());
  const metadata: E["metadata"] = parseMetadata(grpcRecord, id);
  const isJson = contentType === "application/json";

  const position = extractPosition(grpcRecord);

  if (isJson) {
    const dataStr = Buffer.from(grpcRecord.getData()).toString("utf8");

    const data = safeParseJSON<E["data"]>(
      dataStr,
      (d) => d,
      `Malformed JSON data in event ${id}`,
    );

    return {
      streamId,
      id,
      revision,
      type,
      data,
      metadata,
      isJson,
      created,
      position,
    } as EventTypeToRecordedEvent<E>;
  }

  const data = grpcRecord.getData_asU8();

  return {
    streamId,
    id,
    revision,
    type,
    data,
    metadata,
    isJson,
    created,
    position,
  } as EventTypeToRecordedEvent<E>;
};
