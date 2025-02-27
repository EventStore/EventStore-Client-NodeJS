import {
  NotLeaderError,
  StreamNotFoundError,
  StreamDeletedError,
  AccessDeniedError,
} from "./CommandError";
import { ServiceError } from "@grpc/grpc-js";

// export const convertBridgeError = (
//   error: ServiceError,
//   streamName?: string
// ) => {
//   const stream = streamName ?? "unknown stream";
//
//   switch (error.name) {
//     case StreamNotFoundError.name:
//       throw new StreamNotFoundError(error, stream);
//     case StreamDeletedError.name:
//       throw StreamDeletedError.fromStreamName(stream);
//     case NotLeaderError.name:
//       throw new NotLeaderError(error);
//     case AccessDeniedError.name:
//       throw new AccessDeniedError(error);
//     default:
//       throw error;
//   }
// };

export const convertBridgeError = (error: Error, streamName?: string) => {
  const stream = streamName ?? "unknown stream";
  const serviceError = error as ServiceError;

  switch (error.name) {
    case StreamNotFoundError.name:
      return new StreamNotFoundError(serviceError, stream);
    case StreamDeletedError.name:
      return StreamDeletedError.fromStreamName(stream);
    case NotLeaderError.name:
      return new NotLeaderError(serviceError);
    case AccessDeniedError.name:
      return new AccessDeniedError(serviceError);
    default:
      return error;
  }
};
