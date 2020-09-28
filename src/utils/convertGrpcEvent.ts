import { ReadResp as StreamsReadResp } from "../../generated/streams_pb";
import { ReadResp as PersistentReadResp } from "../../generated/persistent_pb";
import StreamsEvent = StreamsReadResp.ReadEvent;
import PersistentEvent = PersistentReadResp.ReadEvent;

import {
  RecordedEvent,
  Position,
  ResolvedEvent,
  AllStreamResolvedEvent,
} from "../types";

type GRPCReadEvent = StreamsEvent | PersistentEvent;

export const convertGrpcEvent = (grpcEvent: GRPCReadEvent): ResolvedEvent => {
  const resolved: ResolvedEvent = {};

  if (grpcEvent.hasEvent()) {
    resolved.event = convertGrpcRecord(grpcEvent.getEvent()!);
  }

  if (grpcEvent.hasLink()) {
    resolved.link = convertGrpcRecord(grpcEvent.getLink()!);
  }

  if (grpcEvent.hasCommitPosition()) {
    resolved.commitPosition = BigInt(grpcEvent.getCommitPosition()!);
  }

  return resolved;
};

export const convertAllStreamGrpcEvent = (
  grpcEvent: GRPCReadEvent
): AllStreamResolvedEvent => {
  const resolved: AllStreamResolvedEvent = {};

  if (grpcEvent.hasEvent()) {
    const event = grpcEvent.getEvent()!;
    resolved.event = {
      ...convertGrpcRecord(event),
      position: extractPosition(event),
    };
  }

  if (grpcEvent.hasLink()) {
    const link = grpcEvent.getEvent()!;
    resolved.link = {
      ...convertGrpcRecord(link),
      position: extractPosition(link),
    };
  }

  if (grpcEvent.hasCommitPosition()) {
    resolved.commitPosition = BigInt(grpcEvent.getCommitPosition()!);
  }

  return resolved;
};

type GRPCRecordedEvent =
  | StreamsEvent.RecordedEvent
  | PersistentEvent.RecordedEvent;

const extractPosition = (grpcRecord: GRPCRecordedEvent): Position => ({
  commit: BigInt(grpcRecord.getCommitPosition()),
  prepare: BigInt(grpcRecord.getPreparePosition()),
});

export const convertGrpcRecord = (
  grpcRecord: GRPCRecordedEvent
): RecordedEvent => {
  const metadataMap = grpcRecord.getMetadataMap();

  const eventType = metadataMap.get("type") ?? "<no-event-type-provided>";
  const contentType =
    metadataMap.get("content-type") ?? "application/octet-stream";
  const created = parseInt(metadataMap.get("created") ?? "0", 10);

  if (!grpcRecord.hasStreamIdentifier()) {
    throw "Impossible situation where streamIdentifier is undefined in a recorded event";
  }
  const streamId = Buffer.from(
    grpcRecord.getStreamIdentifier()!.getStreamname()
  ).toString("binary");

  if (!grpcRecord.hasId()) {
    throw "Impossible situation where id is undefined in a recorded event";
  }
  const id = grpcRecord.getId()!.getString();

  const revision = BigInt(grpcRecord.getStreamRevision());

  const isJson = contentType === "application/json";

  if (isJson) {
    const data = JSON.parse(
      Buffer.from(grpcRecord.getData()).toString("binary")
    );
    const metadataStr = Buffer.from(grpcRecord.getCustomMetadata()).toString(
      "binary"
    );
    const metadata = metadataStr.length > 0 ? JSON.parse(metadataStr) : {};

    return {
      streamId,
      id,
      revision,
      eventType,
      data,
      metadata,
      isJson,
      created,
    };
  }

  const data = grpcRecord.getData_asU8();
  const metadata = grpcRecord.getCustomMetadata_asU8();

  return {
    streamId,
    id,
    revision,
    eventType,
    data,
    metadata,
    isJson,
    created,
  };
};
