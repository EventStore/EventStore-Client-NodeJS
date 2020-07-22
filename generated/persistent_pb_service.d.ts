// package: event_store.client.persistent_subscriptions
// file: persistent.proto

import * as persistent_pb from "./persistent_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PersistentSubscriptionsCreate = {
  readonly methodName: string;
  readonly service: typeof PersistentSubscriptions;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof persistent_pb.CreateReq;
  readonly responseType: typeof persistent_pb.CreateResp;
};

type PersistentSubscriptionsUpdate = {
  readonly methodName: string;
  readonly service: typeof PersistentSubscriptions;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof persistent_pb.UpdateReq;
  readonly responseType: typeof persistent_pb.UpdateResp;
};

type PersistentSubscriptionsDelete = {
  readonly methodName: string;
  readonly service: typeof PersistentSubscriptions;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof persistent_pb.DeleteReq;
  readonly responseType: typeof persistent_pb.DeleteResp;
};

type PersistentSubscriptionsRead = {
  readonly methodName: string;
  readonly service: typeof PersistentSubscriptions;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof persistent_pb.ReadReq;
  readonly responseType: typeof persistent_pb.ReadResp;
};

export class PersistentSubscriptions {
  static readonly serviceName: string;
  static readonly Create: PersistentSubscriptionsCreate;
  static readonly Update: PersistentSubscriptionsUpdate;
  static readonly Delete: PersistentSubscriptionsDelete;
  static readonly Read: PersistentSubscriptionsRead;
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

export class PersistentSubscriptionsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  create(
    requestMessage: persistent_pb.CreateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: persistent_pb.CreateResp|null) => void
  ): UnaryResponse;
  create(
    requestMessage: persistent_pb.CreateReq,
    callback: (error: ServiceError|null, responseMessage: persistent_pb.CreateResp|null) => void
  ): UnaryResponse;
  update(
    requestMessage: persistent_pb.UpdateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: persistent_pb.UpdateResp|null) => void
  ): UnaryResponse;
  update(
    requestMessage: persistent_pb.UpdateReq,
    callback: (error: ServiceError|null, responseMessage: persistent_pb.UpdateResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: persistent_pb.DeleteReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: persistent_pb.DeleteResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: persistent_pb.DeleteReq,
    callback: (error: ServiceError|null, responseMessage: persistent_pb.DeleteResp|null) => void
  ): UnaryResponse;
  read(metadata?: grpc.Metadata): BidirectionalStream<persistent_pb.ReadReq, persistent_pb.ReadResp>;
}

