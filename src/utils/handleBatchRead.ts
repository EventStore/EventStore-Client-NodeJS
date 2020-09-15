import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { ReadResp } from "../../generated/streams_pb";

import { RecordedEvent, ResolvedEvent } from "../types";
import { convertToCommandError, StreamNotFoundError } from "./CommandError";
import { convertGrpcRecord } from "./convertGrpcRecord";

export function handleBatchRead(
  stream: ClientReadableStream<ReadResp>
): Promise<ResolvedEvent[]> {
  return new Promise<ResolvedEvent[]>((resolve, reject) => {
    const resolvedEvents: ResolvedEvent[] = [];
    let streamNotFound: ReadResp.StreamNotFound | undefined;

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasStreamNotFound()) {
        streamNotFound = resp.getStreamNotFound();
      } else {
        let event: RecordedEvent | undefined;
        let link: RecordedEvent | undefined;

        const grpcEvent = resp.getEvent();
        if (resp.hasEvent() && grpcEvent) {
          let grpcRecordedEvent = grpcEvent.getEvent();

          if (grpcEvent.hasEvent() && grpcRecordedEvent) {
            event = convertGrpcRecord(grpcRecordedEvent);
          }

          grpcRecordedEvent = grpcEvent.getLink();
          if (grpcEvent.hasLink() && grpcRecordedEvent) {
            link = convertGrpcRecord(grpcRecordedEvent);
          }

          const resolved: ResolvedEvent = {
            event,
            link,
            commit_position: grpcEvent.getCommitPosition(),
          };

          resolvedEvents.push(resolved);
        }
      }
    });

    stream.on("end", () => {
      if (streamNotFound) {
        return reject(
          new StreamNotFoundError(
            null as never,
            streamNotFound.getStreamIdentifier()?.getStreamname().toString()
          )
        );
      } else {
        return resolve(resolvedEvents);
      }
    });

    stream.on("error", (error: ServiceError) => {
      return reject(convertToCommandError(error));
    });
  });
}
