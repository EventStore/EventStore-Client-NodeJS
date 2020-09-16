import { ReadResp as StreamsReadResp } from "../../generated/streams_pb";
import { ReadResp as PersistentReadResp } from "../../generated/persistent_pb";
import StreamsEvent = StreamsReadResp.ReadEvent;
import PersistentEvent = PersistentReadResp.ReadEvent;

import { RecordedEvent, Position, ResolvedEvent } from "../types";

export const convertGrpcEvent = (
  grpcEvent: StreamsEvent | PersistentEvent
): ResolvedEvent => {
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

export const convertGrpcRecord = (
  grpcRecord: StreamsEvent.RecordedEvent | PersistentEvent.RecordedEvent
): RecordedEvent => {
  const metadataMap = grpcRecord.getMetadataMap();

  const eventType = metadataMap.get("type") ?? "<no-event-type-provided>";
  const contentType =
    metadataMap.get("content-type") ?? "application/octet-stream";
  const created = parseInt(metadataMap.get("created") ?? "0", 10);

  const position: Position = {
    commit: BigInt(grpcRecord.getCommitPosition()),
    prepare: BigInt(grpcRecord.getPreparePosition()),
  };

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
      position,
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
    position,
    created,
  };
};
