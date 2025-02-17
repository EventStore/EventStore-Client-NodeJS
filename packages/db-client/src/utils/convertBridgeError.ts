import {
  NotLeaderError,
  StreamNotFoundError,
  StreamDeletedError,
} from "./CommandError";
import { ServiceError } from "@grpc/grpc-js";

export const convertBridgeError = (
  error: ServiceError,
  streamName?: string
) => {
  const stream = streamName ?? "unknown stream";

  switch (error.name) {
    case StreamNotFoundError.name:
      throw new StreamNotFoundError(error, stream);
    case StreamDeletedError.name:
      throw StreamDeletedError.fromStreamName(stream);
    case NotLeaderError.name:
        throw new NotLeaderError(error);
    default:
      throw error;
  }
};
