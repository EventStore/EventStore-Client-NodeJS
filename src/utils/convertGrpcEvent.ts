import type { ReadResp as StreamsReadResp } from "../../generated/streams_pb";
import type { ReadResp as PersistentReadResp } from "../../generated/persistent_pb";

import { debug } from "./debug";
import type {
  AllStreamResolvedEvent,
  EventType,
  EventTypeToRecordedEvent,
  LinkEvent,
  PersistentSubscriptionToStreamResolvedEvent,
  PersistentSubscriptionToAllResolvedEvent,
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

export const convertGrpcEvent: ConvertGrpcEvent<
  StreamsReadResp.ReadEvent,
  ResolvedEvent
> = (grpcEvent) => {
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

  return resolved;
};

export const convertPersistentSubscriptionToStreamGrpcEvent: ConvertGrpcEvent<
  PersistentReadResp.ReadEvent,
  PersistentSubscriptionToStreamResolvedEvent
> = (grpcEvent) => {
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

  return resolved;
};

export const convertAllStreamGrpcEvent: ConvertGrpcEvent<
  StreamsReadResp.ReadEvent,
  AllStreamResolvedEvent
> = (grpcEvent) => {
  const resolved: AllStreamResolvedEvent = {};

  if (grpcEvent.hasEvent()) {
    const event = grpcEvent.getEvent()!;
    resolved.event = {
      ...convertGrpcRecord(event),
      position: extractPosition(event),
    };
  }

  if (grpcEvent.hasLink()) {
    const link = grpcEvent.getLink()!;
    resolved.link = {
      ...convertGrpcRecord<LinkEvent>(link),
      position: extractPosition(link),
    };
  }

  if (grpcEvent.hasCommitPosition()) {
    resolved.commitPosition = BigInt(grpcEvent.getCommitPosition()!);
  }

  return resolved;
};

export const convertPersistentSubscriptionToAllGrpcEvent: ConvertGrpcEvent<
  PersistentReadResp.ReadEvent,
  PersistentSubscriptionToAllResolvedEvent
> = (grpcEvent) => {
  const resolved: PersistentSubscriptionToAllResolvedEvent = {
    retryCount: grpcEvent.hasRetryCount() ? grpcEvent.getRetryCount() : 0,
  };

  if (grpcEvent.hasEvent()) {
    const event = grpcEvent.getEvent()!;
    resolved.event = {
      ...convertGrpcRecord(event),
      position: extractPosition(event),
    };
  }

  if (grpcEvent.hasLink()) {
    const link = grpcEvent.getLink()!;
    resolved.link = {
      ...convertGrpcRecord<LinkEvent>(link),
      position: extractPosition(link),
    };
  }

  if (grpcEvent.hasCommitPosition()) {
    resolved.commitPosition = BigInt(grpcEvent.getCommitPosition()!);
  }

  return resolved;
};

const extractPosition = (grpcRecord: GRPCRecordedEvent): Position => ({
  commit: BigInt(grpcRecord.getCommitPosition()),
  prepare: BigInt(grpcRecord.getPreparePosition()),
});

const safeParseJSON = <T = unknown>(
  str: string,
  fallback: (str: string) => T,
  errorMessage: string
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

export const convertGrpcRecord = <E extends EventType = EventType>(
  grpcRecord: GRPCRecordedEvent
): EventTypeToRecordedEvent<E> => {
  const metadataMap = grpcRecord.getMetadataMap();

  const type = metadataMap.get("type") ?? "<no-event-type-provided>";
  const contentType =
    metadataMap.get("content-type") ?? "application/octet-stream";
  const created = parseInt(metadataMap.get("created") ?? "0", 10);

  if (!grpcRecord.hasStreamIdentifier()) {
    throw "Impossible situation where streamIdentifier is undefined in a recorded event";
  }
  const streamId = Buffer.from(
    grpcRecord.getStreamIdentifier()!.getStreamName()
  ).toString("utf8");

  if (!grpcRecord.hasId()) {
    throw "Impossible situation where id is undefined in a recorded event";
  }
  const id = parseUUID(grpcRecord.getId()!);
  const revision = BigInt(grpcRecord.getStreamRevision());
  const metadata: E["metadata"] = parseMetadata(grpcRecord, id);
  const isJson = contentType === "application/json";

  if (isJson) {
    const dataStr = Buffer.from(grpcRecord.getData()).toString("utf8");

    const data = safeParseJSON<E["data"]>(
      dataStr,
      (d) => d,
      `Malformed JSON data in event ${id}`
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
  } as EventTypeToRecordedEvent<E>;
};
