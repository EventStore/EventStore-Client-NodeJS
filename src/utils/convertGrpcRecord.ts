import * as streams_pb from "../../generated/streams_pb";
import * as persistent_pb from "../../generated/persistent_pb";
import { RecordedEvent, Position } from "../types";

export const convertGrpcRecord: (
  grpcRecord:
    | streams_pb.ReadResp.ReadEvent.RecordedEvent
    | persistent_pb.ReadResp.ReadEvent.RecordedEvent
) => RecordedEvent = (grpcRecord) => {
  const eventType =
    grpcRecord.getMetadataMap().get("type") || "<no-event-type-provided>";
  let isJson = false;

  const contentType =
    grpcRecord.getMetadataMap().get("content-type") ||
    "application/octet-stream";
  const createdStr = grpcRecord.getMetadataMap().get("created") || "0";
  const created = parseInt(createdStr);

  if (contentType === "application/json") {
    isJson = true;
  }

  const position: Position = {
    commit: grpcRecord.getCommitPosition(),
    prepare: grpcRecord.getPreparePosition(),
  };

  let data: RecordedEvent["data"];

  if (isJson) {
    data = JSON.parse(Buffer.from(grpcRecord.getData()).toString("binary"));
  } else {
    data = grpcRecord.getData_asU8();
  }

  let customMetadata: RecordedEvent["metadata"];

  if (isJson) {
    const metadataStr = Buffer.from(grpcRecord.getCustomMetadata()).toString(
      "binary"
    );
    if (metadataStr.length > 0) {
      customMetadata = JSON.parse(metadataStr);
    } else {
      customMetadata = {};
    }
  } else {
    customMetadata = new Uint8Array();
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

  return {
    streamId,
    id,
    revision: grpcRecord.getStreamRevision(),
    eventType,
    data: data,
    metadata: customMetadata,
    isJson,
    position,
    created,
  };
};
