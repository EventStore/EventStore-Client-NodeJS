// package: event_store.cluster
// file: cluster.proto

import * as cluster_pb from "./cluster_pb";
import * as shared_pb from "./shared_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GossipUpdate = {
  readonly methodName: string;
  readonly service: typeof Gossip;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.GossipRequest;
  readonly responseType: typeof cluster_pb.ClusterInfo;
};

type GossipRead = {
  readonly methodName: string;
  readonly service: typeof Gossip;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof shared_pb.Empty;
  readonly responseType: typeof cluster_pb.ClusterInfo;
};

export class Gossip {
  static readonly serviceName: string;
  static readonly Update: GossipUpdate;
  static readonly Read: GossipRead;
}

type ElectionsViewChange = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.ViewChangeRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsViewChangeProof = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.ViewChangeProofRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsPrepare = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.PrepareRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsPrepareOk = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.PrepareOkRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsProposal = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.ProposalRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsAccept = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.AcceptRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsLeaderIsResigning = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.LeaderIsResigningRequest;
  readonly responseType: typeof shared_pb.Empty;
};

type ElectionsLeaderIsResigningOk = {
  readonly methodName: string;
  readonly service: typeof Elections;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cluster_pb.LeaderIsResigningOkRequest;
  readonly responseType: typeof shared_pb.Empty;
};

export class Elections {
  static readonly serviceName: string;
  static readonly ViewChange: ElectionsViewChange;
  static readonly ViewChangeProof: ElectionsViewChangeProof;
  static readonly Prepare: ElectionsPrepare;
  static readonly PrepareOk: ElectionsPrepareOk;
  static readonly Proposal: ElectionsProposal;
  static readonly Accept: ElectionsAccept;
  static readonly LeaderIsResigning: ElectionsLeaderIsResigning;
  static readonly LeaderIsResigningOk: ElectionsLeaderIsResigningOk;
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
  update(
    requestMessage: cluster_pb.GossipRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: cluster_pb.ClusterInfo|null) => void
  ): UnaryResponse;
  update(
    requestMessage: cluster_pb.GossipRequest,
    callback: (error: ServiceError|null, responseMessage: cluster_pb.ClusterInfo|null) => void
  ): UnaryResponse;
  read(
    requestMessage: shared_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: cluster_pb.ClusterInfo|null) => void
  ): UnaryResponse;
  read(
    requestMessage: shared_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: cluster_pb.ClusterInfo|null) => void
  ): UnaryResponse;
}

export class ElectionsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  viewChange(
    requestMessage: cluster_pb.ViewChangeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  viewChange(
    requestMessage: cluster_pb.ViewChangeRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  viewChangeProof(
    requestMessage: cluster_pb.ViewChangeProofRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  viewChangeProof(
    requestMessage: cluster_pb.ViewChangeProofRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  prepare(
    requestMessage: cluster_pb.PrepareRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  prepare(
    requestMessage: cluster_pb.PrepareRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  prepareOk(
    requestMessage: cluster_pb.PrepareOkRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  prepareOk(
    requestMessage: cluster_pb.PrepareOkRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  proposal(
    requestMessage: cluster_pb.ProposalRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  proposal(
    requestMessage: cluster_pb.ProposalRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  accept(
    requestMessage: cluster_pb.AcceptRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  accept(
    requestMessage: cluster_pb.AcceptRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  leaderIsResigning(
    requestMessage: cluster_pb.LeaderIsResigningRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  leaderIsResigning(
    requestMessage: cluster_pb.LeaderIsResigningRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  leaderIsResigningOk(
    requestMessage: cluster_pb.LeaderIsResigningOkRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
  leaderIsResigningOk(
    requestMessage: cluster_pb.LeaderIsResigningOkRequest,
    callback: (error: ServiceError|null, responseMessage: shared_pb.Empty|null) => void
  ): UnaryResponse;
}

