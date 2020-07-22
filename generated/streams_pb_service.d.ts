// package: event_store.client.streams
// file: streams.proto

import * as streams_pb from "./streams_pb";
import {grpc} from "@improbable-eng/grpc-web";

type StreamsRead = {
  readonly methodName: string;
  readonly service: typeof Streams;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof streams_pb.ReadReq;
  readonly responseType: typeof streams_pb.ReadResp;
};

type StreamsAppend = {
  readonly methodName: string;
  readonly service: typeof Streams;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof streams_pb.AppendReq;
  readonly responseType: typeof streams_pb.AppendResp;
};

type StreamsDelete = {
  readonly methodName: string;
  readonly service: typeof Streams;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof streams_pb.DeleteReq;
  readonly responseType: typeof streams_pb.DeleteResp;
};

type StreamsTombstone = {
  readonly methodName: string;
  readonly service: typeof Streams;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof streams_pb.TombstoneReq;
  readonly responseType: typeof streams_pb.TombstoneResp;
};

export class Streams {
  static readonly serviceName: string;
  static readonly Read: StreamsRead;
  static readonly Append: StreamsAppend;
  static readonly Delete: StreamsDelete;
  static readonly Tombstone: StreamsTombstone;
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

export class StreamsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  read(requestMessage: streams_pb.ReadReq, metadata?: grpc.Metadata): ResponseStream<streams_pb.ReadResp>;
  append(metadata?: grpc.Metadata): RequestStream<streams_pb.AppendReq>;
  delete(
    requestMessage: streams_pb.DeleteReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: streams_pb.DeleteResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: streams_pb.DeleteReq,
    callback: (error: ServiceError|null, responseMessage: streams_pb.DeleteResp|null) => void
  ): UnaryResponse;
  tombstone(
    requestMessage: streams_pb.TombstoneReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: streams_pb.TombstoneResp|null) => void
  ): UnaryResponse;
  tombstone(
    requestMessage: streams_pb.TombstoneReq,
    callback: (error: ServiceError|null, responseMessage: streams_pb.TombstoneResp|null) => void
  ): UnaryResponse;
}

