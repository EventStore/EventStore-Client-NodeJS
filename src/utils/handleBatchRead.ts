import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { ReadResp } from "../../generated/streams_pb";

import { ResolvedEvent } from "../types";
import { convertToCommandError, StreamNotFoundError } from "./CommandError";
import { convertGrpcEvent } from "./convertGrpcEvent";

export function handleBatchRead(
  stream: ClientReadableStream<ReadResp>
): Promise<ResolvedEvent[]> {
  return new Promise<ResolvedEvent[]>((resolve, reject) => {
    const resolvedEvents: ResolvedEvent[] = [];
    let streamNotFound: ReadResp.StreamNotFound | undefined;

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasStreamNotFound()) {
        streamNotFound = resp.getStreamNotFound();
      } else if (resp.hasEvent()) {
        const resolved = convertGrpcEvent(resp.getEvent()!);
        resolvedEvents.push(resolved);
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
