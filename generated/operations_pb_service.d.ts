// package: event_store.client.operations
// file: operations.proto

import * as operations_pb from "./operations_pb";
import * as shared_pb from "./shared_pb";
import {grpc} from "@improbable-eng/grpc-web";

type OperationsStartScavenge = {
  readonly methodName: string;
  readonly service: typeof Operations;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof operations_pb.StartScavengeReq;
  readonly responseType: typeof operations_pb.ScavengeResp;
};

type OperationsStopScavenge = {
  readonly methodName: string;
  readonly service: typeof Operations;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof operations_pb.StopScavengeReq;
  readonly responseType: typeof operations_pb.ScavengeResp;
};

type OperationsShutdown = {
  readonly methodName: string;
  readonly service: typeof Operations;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof shared_pb.Empty;
  readonly responseType: typeof shared_pb.Empty;
};

type OperationsMergeIndexes = {
  readonly methodName: string;
  readonly service: typeof Operations;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof shared_pb.Empty;
  readonly responseType: typeof shared_pb.Empty;
};

type OperationsResignNode = {
  readonly methodName: string;
  readonly service: typeof Operations;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof shared_pb.Empty;
  readonly responseType: typeof shared_pb.Empty;
};

type OperationsSetNodePriority = {
  readonly methodName: string;
  readonly service: typeof Operations;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof operations_pb.SetNodePriorityReq;
  readonly responseType: typeof shared_pb.Empty;
};

export class Operations {
  static readonly serviceName: string;
  static readonly StartScavenge: OperationsStartScavenge;
  static readonly StopScavenge: OperationsStopScavenge;
  static readonly Shutdown: OperationsShutdown;
  static readonly MergeIndexes: OperationsMergeIndexes;
  static readonly ResignNode: OperationsResignNode;
  static readonly SetNodePriority: OperationsSetNodePriority;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class OperationsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  startScavenge(
    requestMessage: operations_pb.StartScavengeReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: operations_pb.ScavengeResp|null) => void
  ): UnaryResponse;
  startScavenge(
    requestMessage: operations_pb.StartScavengeReq,
    callback: (error: ServiceError|null, responseMessage: operations_pb.ScavengeResp|null) => void
  ): UnaryResponse;
  stopScavenge(
    requestMessage: operations_pb.StopScavengeReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: operations_pb.ScavengeResp|null) => void
  ): UnaryResponse;
  stopScavenge(
    requestMessage: operations_pb.StopScavengeReq,
    callback: (error: ServiceError|null, responseMessage: operations_pb.ScavengeResp|null) => void
  ): UnaryResponse;
  shutdown(
    requestMessage: shared_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  shutdown(
    requestMessage: shared_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  mergeIndexes(
    requestMessage: shared_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  mergeIndexes(
    requestMessage: shared_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  resignNode(
    requestMessage: shared_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  resignNode(
    requestMessage: shared_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  setNodePriority(
    requestMessage: operations_pb.SetNodePriorityReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  setNodePriority(
    requestMessage: operations_pb.SetNodePriorityReq,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
}

