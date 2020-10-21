import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { ReadResp } from "../../generated/streams_pb";

import { convertToCommandError, StreamNotFoundError } from "./CommandError";

export const handleBatchRead = <T>(
  stream: ClientReadableStream<ReadResp>,
  convertGrpcEvent: (e: ReadResp.ReadEvent) => T
): Promise<T[]> =>
  new Promise<T[]>((resolve, reject) => {
    const resolvedEvents: T[] = [];
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
            streamNotFound.getStreamIdentifier()?.getStreamname()
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
