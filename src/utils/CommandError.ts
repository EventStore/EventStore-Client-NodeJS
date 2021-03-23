/* istanbul ignore file */

import { status as StatusCode, ServiceError } from "@grpc/grpc-js";
import { CurrentRevision, EndPoint, AppendExpectedRevision } from "../types";

export enum ErrorType {
  TIMEOUT = "timeout",
  UNAVAILABLE = "unavailable",
  UNKNOWN = "unknown",
  NOT_LEADER = "not-leader",
  STREAM_NOT_FOUND = "stream-not-found",
  NO_STREAM = "no-stream",
  ACCESS_DENIED = "access-denied",
  INVALID_TRANSACTION = "invalid-transaction",
  STREAM_DELETED = "stream-deleted",
  SCAVENGE_NOT_FOUND = "scavenge-not-found",
  WRONG_EXPECTED_VERSION = "wrong-expected-version",
  MAXIMUM_APPEND_SIZE_EXCEEDED = "maximum-append-size-exceeded",
  MISSING_REQUIRED_METADATA_PROPERTY = "missing-required-metadata-property",

  PERSISTENT_SUBSCRIPTION_FAILED = "persistent-subscription-failed",
  PERSISTENT_SUBSCRIPTION_DOES_NOT_EXIST = "persistent-subscription-does-not-exist",
  PERSISTENT_SUBSCRIPTION_EXISTS = "persistent-subscription-exists",
  PERSISTENT_SUBSCRIPTION_DROPPED = "persistent-subscription-dropped",
  MAXIMUM_SUBSCRIBERS_REACHED = "maximum-subscribers-reached",

  USER_NOT_FOUND = "user-not-found",
  USER_CONFLICT = "user-conflict",
}

abstract class CommandErrorBase extends Error {
  public abstract readonly type: ErrorType;
  public code?: StatusCode;
  public message: string;
  public _raw?: ServiceError;

  constructor(error?: ServiceError, message?: string) {
    super(error?.message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.code = error?.code;
    this.message = error?.message ?? message ?? "";
    this._raw = error;
  }
}

export class TimeoutError extends CommandErrorBase {
  public type: ErrorType.TIMEOUT = ErrorType.TIMEOUT;
}

export class UnavailableError extends CommandErrorBase {
  public type: ErrorType.UNAVAILABLE = ErrorType.UNAVAILABLE;
}

export class UnknownError extends CommandErrorBase {
  public type: ErrorType.UNKNOWN = ErrorType.UNKNOWN;
}

export class NotLeaderError extends CommandErrorBase {
  public type: ErrorType.NOT_LEADER = ErrorType.NOT_LEADER;
  public leader: EndPoint;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.leader = {
      address: metadata["leader-endpoint-host"].toString(),
      port: parseInt(metadata["leader-endpoint-port"].toString(), 10),
    };
  }
}

export class StreamNotFoundError extends CommandErrorBase {
  public type: ErrorType.STREAM_NOT_FOUND = ErrorType.STREAM_NOT_FOUND;
  public streamName: string;

  static nameToString = (
    error?: ServiceError,
    streamName?: string | Uint8Array
  ): string => {
    const name = streamName ?? error?.metadata?.getMap()["stream-name"] ?? "";
    if (typeof name === "string") return name;
    return Buffer.from(name).toString("utf8");
  };

  constructor(error?: ServiceError, streamName?: string | Uint8Array) {
    super(
      error,
      `${StreamNotFoundError.nameToString(error, streamName)} not found`
    );

    this.streamName = StreamNotFoundError.nameToString(error, streamName);
  }
}

export class NoStreamError extends CommandErrorBase {
  public type: ErrorType.NO_STREAM = ErrorType.NO_STREAM;
}

export class AccessDeniedError extends CommandErrorBase {
  public type: ErrorType.ACCESS_DENIED = ErrorType.ACCESS_DENIED;
}

export class InvalidTransactionError extends CommandErrorBase {
  public type: ErrorType.INVALID_TRANSACTION = ErrorType.INVALID_TRANSACTION;
}

export class StreamDeletedError extends CommandErrorBase {
  public type: ErrorType.STREAM_DELETED = ErrorType.STREAM_DELETED;
  public streamName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.streamName = metadata["stream-name"].toString();
  }
}

export class ScavengeNotFoundError extends CommandErrorBase {
  public type: ErrorType.SCAVENGE_NOT_FOUND = ErrorType.SCAVENGE_NOT_FOUND;
  public scavengeId: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.scavengeId = metadata["scavenge-id"].toString();
  }
}

interface WrongExpectedVersion {
  streamName: string;
  expected: AppendExpectedRevision;
  current: CurrentRevision;
}

export class WrongExpectedVersionError extends CommandErrorBase {
  public type: ErrorType.WRONG_EXPECTED_VERSION =
    ErrorType.WRONG_EXPECTED_VERSION;
  public streamName: string;
  public expectedVersion: AppendExpectedRevision;
  public actualVersion: CurrentRevision;

  constructor(error?: ServiceError, versions?: WrongExpectedVersion) {
    super(error);

    if (error) {
      const metadata = error.metadata!.getMap();
      this.streamName = metadata["stream-name"].toString();
      this.expectedVersion = BigInt(metadata["expected-version"].toString());
      this.actualVersion = metadata["actual-version"]
        ? BigInt(metadata["actual-version"].toString())
        : "no_stream";
    } else {
      this.streamName = versions!.streamName;
      this.expectedVersion = versions!.expected;
      this.actualVersion = versions!.current;
    }
  }
}

export class MaxAppendSizeExceededError extends CommandErrorBase {
  public type: ErrorType.MAXIMUM_APPEND_SIZE_EXCEEDED =
    ErrorType.MAXIMUM_APPEND_SIZE_EXCEEDED;
  public maxAppendSize: number;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.maxAppendSize = parseInt(
      metadata["maximum-append-size"].toString(),
      10
    );
  }
}

export class RequiredMetadataPropertyMissingError extends CommandErrorBase {
  public type: ErrorType.MISSING_REQUIRED_METADATA_PROPERTY =
    ErrorType.MISSING_REQUIRED_METADATA_PROPERTY;
  public requiredMetadataProperties: string[];

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.requiredMetadataProperties = metadata["required-metadata-properties"]
      .toString()
      .split(",");
  }
}

export class PersistentSubscriptionFailedError extends CommandErrorBase {
  public type: ErrorType.PERSISTENT_SUBSCRIPTION_FAILED =
    ErrorType.PERSISTENT_SUBSCRIPTION_FAILED;
  public streamName: string;
  public groupName: string;
  public reason: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.streamName = metadata["stream-name"].toString();
    this.groupName = metadata["group-name"].toString();
    this.reason = metadata["reason"].toString();
  }
}

export class PersistentSubscriptionDoesNotExistError extends CommandErrorBase {
  public type: ErrorType.PERSISTENT_SUBSCRIPTION_DOES_NOT_EXIST =
    ErrorType.PERSISTENT_SUBSCRIPTION_DOES_NOT_EXIST;
  public streamName: string;
  public groupName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.streamName = metadata["stream-name"].toString();
    this.groupName = metadata["group-name"].toString();
  }
}

export class PersistentSubscriptionExistsError extends CommandErrorBase {
  public type: ErrorType.PERSISTENT_SUBSCRIPTION_EXISTS =
    ErrorType.PERSISTENT_SUBSCRIPTION_EXISTS;
  public streamName: string;
  public groupName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.streamName = metadata["stream-name"].toString();
    this.groupName = metadata["group-name"].toString();
  }
}

export class PersistentSubscriptionMaximumSubscribersReachedError extends CommandErrorBase {
  public type: ErrorType.MAXIMUM_SUBSCRIBERS_REACHED =
    ErrorType.MAXIMUM_SUBSCRIBERS_REACHED;
  public streamName: string;
  public groupName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.streamName = metadata["stream-name"].toString();
    this.groupName = metadata["group-name"].toString();
  }
}

export class PersistentSubscriptionDroppedError extends CommandErrorBase {
  public type: ErrorType.PERSISTENT_SUBSCRIPTION_DROPPED =
    ErrorType.PERSISTENT_SUBSCRIPTION_DROPPED;
  public streamName: string;
  public groupName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.streamName = metadata["stream-name"].toString();
    this.groupName = metadata["group-name"].toString();
  }
}

export class LoginNotFoundError extends CommandErrorBase {
  public type: ErrorType.USER_NOT_FOUND = ErrorType.USER_NOT_FOUND;
  public LoginName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.LoginName = metadata["login-name"].toString();
  }
}

export class LoginConflictError extends CommandErrorBase {
  public type: ErrorType.USER_CONFLICT = ErrorType.USER_CONFLICT;
  public LoginName: string;

  constructor(error: ServiceError) {
    super(error);
    const metadata = error.metadata!.getMap();
    this.LoginName = metadata["login-name"].toString();
  }
}

export type CommandError =
  | NotLeaderError
  | StreamNotFoundError
  | NoStreamError
  | AccessDeniedError
  | InvalidTransactionError
  | StreamDeletedError
  | ScavengeNotFoundError
  | WrongExpectedVersionError
  | MaxAppendSizeExceededError
  | RequiredMetadataPropertyMissingError
  | PersistentSubscriptionFailedError
  | PersistentSubscriptionDoesNotExistError
  | PersistentSubscriptionExistsError
  | PersistentSubscriptionDroppedError
  | PersistentSubscriptionMaximumSubscribersReachedError
  | LoginNotFoundError
  | LoginConflictError
  | TimeoutError
  | UnavailableError
  | UnknownError;

export const convertToCommandError = (error: ServiceError): CommandError => {
  const exeption = error.metadata?.getMap()["exception"]?.toString();

  switch (exeption) {
    case ErrorType.NOT_LEADER:
      return new NotLeaderError(error);
    case ErrorType.STREAM_NOT_FOUND:
      return new StreamNotFoundError(error);
    case ErrorType.NO_STREAM:
      return new NoStreamError(error);
    case ErrorType.ACCESS_DENIED:
      return new AccessDeniedError(error);
    case ErrorType.INVALID_TRANSACTION:
      return new InvalidTransactionError(error);
    case ErrorType.STREAM_DELETED:
      return new StreamDeletedError(error);
    case ErrorType.SCAVENGE_NOT_FOUND:
      return new ScavengeNotFoundError(error);
    case ErrorType.WRONG_EXPECTED_VERSION:
      return new WrongExpectedVersionError(error);
    case ErrorType.MAXIMUM_APPEND_SIZE_EXCEEDED:
      return new MaxAppendSizeExceededError(error);
    case ErrorType.MISSING_REQUIRED_METADATA_PROPERTY:
      return new RequiredMetadataPropertyMissingError(error);
    case ErrorType.PERSISTENT_SUBSCRIPTION_FAILED:
      return new PersistentSubscriptionFailedError(error);
    case ErrorType.PERSISTENT_SUBSCRIPTION_DOES_NOT_EXIST:
      return new PersistentSubscriptionDoesNotExistError(error);
    case ErrorType.PERSISTENT_SUBSCRIPTION_EXISTS:
      return new PersistentSubscriptionExistsError(error);
    case ErrorType.PERSISTENT_SUBSCRIPTION_DROPPED:
      return new PersistentSubscriptionDroppedError(error);
    case ErrorType.MAXIMUM_SUBSCRIBERS_REACHED:
      return new PersistentSubscriptionMaximumSubscribersReachedError(error);
    case ErrorType.USER_NOT_FOUND:
      return new LoginNotFoundError(error);
    case ErrorType.USER_CONFLICT:
      return new LoginConflictError(error);
  }

  switch (error.code) {
    case StatusCode.ABORTED:
      return new TimeoutError(error);
    case StatusCode.UNAVAILABLE:
      return new UnavailableError(error);
    case StatusCode.UNAUTHENTICATED:
      return new AccessDeniedError(error);
  }

  return new UnknownError(error);
};

export const isCommandError = (error: Error): error is CommandError => {
  return error instanceof CommandErrorBase;
};
