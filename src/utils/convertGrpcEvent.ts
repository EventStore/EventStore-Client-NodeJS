import { ReadResp as StreamsReadResp } from "../../generated/streams_pb";
import { ReadResp as PersistentReadResp } from "../../generated/persistent_pb";
import StreamsEvent = StreamsReadResp.ReadEvent;
import PersistentEvent = PersistentReadResp.ReadEvent;
import StreamsRecordedEvent = StreamsEvent.RecordedEvent;
import PersistentRecordedEvent = PersistentEvent.RecordedEvent;

import { debug } from "./debug";
import {
  AllStreamResolvedEvent,
  EventType,
  EventTypeToRecordedEvent,
  LinkEvent,
  Position,
  ResolvedEvent,
} from "../types";

export type GRPCReadResp = StreamsReadResp | PersistentReadResp;
export type GRPCReadEvent = StreamsEvent | PersistentEvent;
export type GRPCRecordedEvent = StreamsRecordedEvent | PersistentRecordedEvent;

export type ConvertGrpcEvent<E> = (grpcEvent: GRPCReadEvent) => E;

export const convertGrpcEvent: ConvertGrpcEvent<ResolvedEvent> = (
  grpcEvent
) => {
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

export const convertAllStreamGrpcEvent: ConvertGrpcEvent<AllStreamResolvedEvent> =
  (grpcEvent) => {
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
    grpcRecord.getStreamIdentifier()!.getStreamname()
  ).toString("utf8");

  if (!grpcRecord.hasId()) {
    throw "Impossible situation where id is undefined in a recorded event";
  }
  const id = grpcRecord.getId()!.getString();
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
