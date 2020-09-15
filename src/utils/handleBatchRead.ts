import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { ReadResp } from "../../generated/streams_pb";

import {
  RecordedEvent,
  ResolvedEvent,
  ReadStreamResult,
  ReadStreamSuccess,
  ReadStreamNotFound,
} from "../types";
import { convertToCommandError } from "./CommandError";
import { convertGrpcRecord } from "./convertGrpcRecord";

export function handleBatchRead(
  stream: ClientReadableStream<ReadResp>
): Promise<ReadStreamResult> {
  return new Promise<ReadStreamResult>((resolve, reject) => {
    const buffer: ResolvedEvent[] = [];
    let found = true;

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasStreamNotFound()) {
        found = false;
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

          buffer.push(resolved);
        }
      }
    });

    stream.on("end", () => {
      if (found) {
        const result: ReadStreamSuccess = {
          __typename: "success",
          events: buffer,
        };

        resolve(result);
      } else {
        const result: ReadStreamNotFound = {
          __typename: "not_found",
          events: undefined,
        };
        resolve(result);
      }
    });

    stream.on("error", (error: ServiceError) => {
      reject(convertToCommandError(error));
    });
  });
}
