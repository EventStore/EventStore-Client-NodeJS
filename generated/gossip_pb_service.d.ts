// package: event_store.client.gossip
// file: gossip.proto

import * as gossip_pb from "./gossip_pb";
import * as shared_pb from "./shared_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GossipRead = {
  readonly methodName: string;
  readonly service: typeof Gossip;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof shared_pb.Empty;
  readonly responseType: typeof gossip_pb.ClusterInfo;
};

export class Gossip {
  static readonly serviceName: string;
  static readonly Read: GossipRead;
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

export class GossipClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  read(
    requestMessage: shared_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: gossip_pb.ClusterInfo|null) => void
  ): UnaryResponse;
  read(
    requestMessage: shared_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: gossip_pb.ClusterInfo|null) => void
  ): UnaryResponse;
}

