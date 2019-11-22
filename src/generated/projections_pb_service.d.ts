// package: event_store.grpc.projections
// file: projections.proto

import * as projections_pb from "./projections_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ProjectionsCreate = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.CreateReq;
  readonly responseType: typeof projections_pb.CreateResp;
};

type ProjectionsUpdate = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.UpdateReq;
  readonly responseType: typeof projections_pb.UpdateResp;
};

type ProjectionsDelete = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.DeleteReq;
  readonly responseType: typeof projections_pb.DeleteResp;
};

type ProjectionsStatistics = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof projections_pb.StatisticsReq;
  readonly responseType: typeof projections_pb.StatisticsResp;
};

type ProjectionsDisable = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.DisableReq;
  readonly responseType: typeof projections_pb.DisableResp;
};

type ProjectionsEnable = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.EnableReq;
  readonly responseType: typeof projections_pb.EnableResp;
};

type ProjectionsReset = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.ResetReq;
  readonly responseType: typeof projections_pb.ResetResp;
};

type ProjectionsState = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.StateReq;
  readonly responseType: typeof projections_pb.StateResp;
};

type ProjectionsResult = {
  readonly methodName: string;
  readonly service: typeof Projections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof projections_pb.ResultReq;
  readonly responseType: typeof projections_pb.ResultResp;
};

export class Projections {
  static readonly serviceName: string;
  static readonly Create: ProjectionsCreate;
  static readonly Update: ProjectionsUpdate;
  static readonly Delete: ProjectionsDelete;
  static readonly Statistics: ProjectionsStatistics;
  static readonly Disable: ProjectionsDisable;
  static readonly Enable: ProjectionsEnable;
  static readonly Reset: ProjectionsReset;
  static readonly State: ProjectionsState;
  static readonly Result: ProjectionsResult;
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

export class ProjectionsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  create(
    requestMessage: projections_pb.CreateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.CreateResp|null) => void
  ): UnaryResponse;
  create(
    requestMessage: projections_pb.CreateReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.CreateResp|null) => void
  ): UnaryResponse;
  update(
    requestMessage: projections_pb.UpdateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.UpdateResp|null) => void
  ): UnaryResponse;
  update(
    requestMessage: projections_pb.UpdateReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.UpdateResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: projections_pb.DeleteReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.DeleteResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: projections_pb.DeleteReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.DeleteResp|null) => void
  ): UnaryResponse;
  statistics(requestMessage: projections_pb.StatisticsReq, metadata?: grpc.Metadata): ResponseStream<projections_pb.StatisticsResp>;
  disable(
    requestMessage: projections_pb.DisableReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.DisableResp|null) => void
  ): UnaryResponse;
  disable(
    requestMessage: projections_pb.DisableReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.DisableResp|null) => void
  ): UnaryResponse;
  enable(
    requestMessage: projections_pb.EnableReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.EnableResp|null) => void
  ): UnaryResponse;
  enable(
    requestMessage: projections_pb.EnableReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.EnableResp|null) => void
  ): UnaryResponse;
  reset(
    requestMessage: projections_pb.ResetReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.ResetResp|null) => void
  ): UnaryResponse;
  reset(
    requestMessage: projections_pb.ResetReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.ResetResp|null) => void
  ): UnaryResponse;
  state(
    requestMessage: projections_pb.StateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.StateResp|null) => void
  ): UnaryResponse;
  state(
    requestMessage: projections_pb.StateReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.StateResp|null) => void
  ): UnaryResponse;
  result(
    requestMessage: projections_pb.ResultReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: projections_pb.ResultResp|null) => void
  ): UnaryResponse;
  result(
    requestMessage: projections_pb.ResultReq,
    callback: (error: ServiceError|null, responseMessage: projections_pb.ResultResp|null) => void
  ): UnaryResponse;
}

