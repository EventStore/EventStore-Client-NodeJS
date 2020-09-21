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
  const eventType =
    grpcRecord.getMetadataMap().get("type") || "<no-event-type-provided>";

  const contentType =
    grpcRecord.getMetadataMap().get("content-type") ||
    "application/octet-stream";
  const createdStr = grpcRecord.getMetadataMap().get("created") || "0";
  const created = parseInt(createdStr);
  const isJson = contentType === "application/json";

  const position: Position = {
    commit: BigInt(grpcRecord.getCommitPosition()),
    prepare: BigInt(grpcRecord.getPreparePosition()),
  };

  let data: RecordedEvent["data"];

  if (isJson) {
    data = JSON.parse(Buffer.from(grpcRecord.getData()).toString("binary"));
  } else {
    data = grpcRecord.getData_asU8();
  }

  let metadata: RecordedEvent["metadata"];

  if (isJson) {
    const metadataStr = Buffer.from(grpcRecord.getCustomMetadata()).toString(
      "binary"
    );
    if (metadataStr.length > 0) {
      metadata = JSON.parse(metadataStr);
    } else {
      metadata = {};
    }
  } else {
    metadata = new Uint8Array();
  }

  const identifier = grpcRecord.getStreamIdentifier();
  const eventId = grpcRecord.getId();

  let streamId: string;
  let id: string;

  if (identifier) {
    streamId = Buffer.from(identifier.getStreamname()).toString("binary");
  } else {
    throw "Impossible situation where streamIdentifier is undefined in a recorded event";
  }

  if (eventId) {
    id = eventId.getString();
  } else {
    throw "Impossible situation where event id is undefined in a recorded event";
  }

  const revision = BigInt(grpcRecord.getStreamRevision());

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
