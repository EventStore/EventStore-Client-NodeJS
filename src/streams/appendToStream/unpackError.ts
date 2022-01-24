import { Status } from "../../../generated/status_pb";
import {
  AccessDenied,
  MaximumAppendSizeExceeded,
  StreamDeleted,
  Timeout,
  Unknown,
  WrongExpectedVersion,
} from "../../../generated/shared_pb";
import {
  AccessDeniedError,
  MaxAppendSizeExceededError,
  StreamDeletedError,
  DeadlineExceededError,
  UnknownError,
  WrongExpectedVersionError,
} from "../..";

export const unpackWrongExpectedVersion = (grpcError: Status) =>
  grpcError
    .getDetails()
    ?.unpack(
      WrongExpectedVersion.deserializeBinary,
      "event_store.client.WrongExpectedVersion"
    ) ?? null;

export const unpackToCommandError = (grpcError: Status, streamName: string) => {
  const details = grpcError.getDetails()!;
  const typename = details.getTypeName();

  switch (typename) {
    case "event_store.client.WrongExpectedVersion": {
      const unpacked = details.unpack(
        WrongExpectedVersion.deserializeBinary,
        typename
      );
      if (!unpacked) break;
      return WrongExpectedVersionError.fromWrongExpectedVersion(
        unpacked,
        streamName
      );
    }
    case "event_store.client.StreamDeleted": {
      const unpacked = details.unpack(
        StreamDeleted.deserializeBinary,
        typename
      );
      if (!unpacked) break;
      return StreamDeletedError.fromStreamName(streamName);
    }
    case "event_store.client.AccessDenied": {
      const unpacked = details.unpack(AccessDenied.deserializeBinary, typename);
      if (!unpacked) break;
      return new AccessDeniedError();
    }
    case "event_store.client.Timeout": {
      const unpacked = details.unpack(Timeout.deserializeBinary, typename);
      if (!unpacked) break;
      return new DeadlineExceededError();
    }
    case "event_store.client.Unknown": {
      const unpacked = details.unpack(Unknown.deserializeBinary, typename);
      if (!unpacked) break;
      return new UnknownError();
    }
    case "event_store.client.MaximumAppendSizeExceeded": {
      const unpacked = details.unpack(
        MaximumAppendSizeExceeded.deserializeBinary,
        typename
      );
      if (!unpacked) break;
      return MaxAppendSizeExceededError.fromMaxAppendSize(
        unpacked.getMaxappendsize()
      );
    }
  }
  return new UnknownError(
    undefined,
    `Could not recognize ${grpcError.getMessage()}`
  );
};
