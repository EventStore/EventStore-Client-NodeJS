// package: event_store.cluster
// file: cluster.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as cluster_pb from "./cluster_pb";
import * as shared_pb from "./shared_pb";

interface IGossipService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    update: IGossipService_IUpdate;
    read: IGossipService_IRead;
}

interface IGossipService_IUpdate extends grpc.MethodDefinition<cluster_pb.GossipRequest, cluster_pb.ClusterInfo> {
    path: "/event_store.cluster.Gossip/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.GossipRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.GossipRequest>;
    responseSerialize: grpc.serialize<cluster_pb.ClusterInfo>;
    responseDeserialize: grpc.deserialize<cluster_pb.ClusterInfo>;
}
interface IGossipService_IRead extends grpc.MethodDefinition<shared_pb.Empty, cluster_pb.ClusterInfo> {
    path: "/event_store.cluster.Gossip/Read";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<cluster_pb.ClusterInfo>;
    responseDeserialize: grpc.deserialize<cluster_pb.ClusterInfo>;
}

export const GossipService: IGossipService;

export interface IGossipServer extends grpc.UntypedServiceImplementation {
    update: grpc.handleUnaryCall<cluster_pb.GossipRequest, cluster_pb.ClusterInfo>;
    read: grpc.handleUnaryCall<shared_pb.Empty, cluster_pb.ClusterInfo>;
}

export interface IGossipClient {
    update(request: cluster_pb.GossipRequest, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    update(request: cluster_pb.GossipRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    update(request: cluster_pb.GossipRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    read(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    read(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    read(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
}

export class GossipClient extends grpc.Client implements IGossipClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public update(request: cluster_pb.GossipRequest, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public update(request: cluster_pb.GossipRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public update(request: cluster_pb.GossipRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public read(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public read(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public read(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cluster_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
}

interface IElectionsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    viewChange: IElectionsService_IViewChange;
    viewChangeProof: IElectionsService_IViewChangeProof;
    prepare: IElectionsService_IPrepare;
    prepareOk: IElectionsService_IPrepareOk;
    proposal: IElectionsService_IProposal;
    accept: IElectionsService_IAccept;
    leaderIsResigning: IElectionsService_ILeaderIsResigning;
    leaderIsResigningOk: IElectionsService_ILeaderIsResigningOk;
}

interface IElectionsService_IViewChange extends grpc.MethodDefinition<cluster_pb.ViewChangeRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/ViewChange";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.ViewChangeRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.ViewChangeRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_IViewChangeProof extends grpc.MethodDefinition<cluster_pb.ViewChangeProofRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/ViewChangeProof";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.ViewChangeProofRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.ViewChangeProofRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_IPrepare extends grpc.MethodDefinition<cluster_pb.PrepareRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/Prepare";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.PrepareRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.PrepareRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_IPrepareOk extends grpc.MethodDefinition<cluster_pb.PrepareOkRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/PrepareOk";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.PrepareOkRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.PrepareOkRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_IProposal extends grpc.MethodDefinition<cluster_pb.ProposalRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/Proposal";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.ProposalRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.ProposalRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_IAccept extends grpc.MethodDefinition<cluster_pb.AcceptRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/Accept";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.AcceptRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.AcceptRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_ILeaderIsResigning extends grpc.MethodDefinition<cluster_pb.LeaderIsResigningRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/LeaderIsResigning";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.LeaderIsResigningRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.LeaderIsResigningRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IElectionsService_ILeaderIsResigningOk extends grpc.MethodDefinition<cluster_pb.LeaderIsResigningOkRequest, shared_pb.Empty> {
    path: "/event_store.cluster.Elections/LeaderIsResigningOk";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cluster_pb.LeaderIsResigningOkRequest>;
    requestDeserialize: grpc.deserialize<cluster_pb.LeaderIsResigningOkRequest>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}

export const ElectionsService: IElectionsService;

export interface IElectionsServer extends grpc.UntypedServiceImplementation {
    viewChange: grpc.handleUnaryCall<cluster_pb.ViewChangeRequest, shared_pb.Empty>;
    viewChangeProof: grpc.handleUnaryCall<cluster_pb.ViewChangeProofRequest, shared_pb.Empty>;
    prepare: grpc.handleUnaryCall<cluster_pb.PrepareRequest, shared_pb.Empty>;
    prepareOk: grpc.handleUnaryCall<cluster_pb.PrepareOkRequest, shared_pb.Empty>;
    proposal: grpc.handleUnaryCall<cluster_pb.ProposalRequest, shared_pb.Empty>;
    accept: grpc.handleUnaryCall<cluster_pb.AcceptRequest, shared_pb.Empty>;
    leaderIsResigning: grpc.handleUnaryCall<cluster_pb.LeaderIsResigningRequest, shared_pb.Empty>;
    leaderIsResigningOk: grpc.handleUnaryCall<cluster_pb.LeaderIsResigningOkRequest, shared_pb.Empty>;
}

export interface IElectionsClient {
    viewChange(request: cluster_pb.ViewChangeRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    viewChange(request: cluster_pb.ViewChangeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    viewChange(request: cluster_pb.ViewChangeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    viewChangeProof(request: cluster_pb.ViewChangeProofRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    viewChangeProof(request: cluster_pb.ViewChangeProofRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    viewChangeProof(request: cluster_pb.ViewChangeProofRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    prepare(request: cluster_pb.PrepareRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    prepare(request: cluster_pb.PrepareRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    prepare(request: cluster_pb.PrepareRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    prepareOk(request: cluster_pb.PrepareOkRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    prepareOk(request: cluster_pb.PrepareOkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    prepareOk(request: cluster_pb.PrepareOkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    proposal(request: cluster_pb.ProposalRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    proposal(request: cluster_pb.ProposalRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    proposal(request: cluster_pb.ProposalRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    accept(request: cluster_pb.AcceptRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    accept(request: cluster_pb.AcceptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    accept(request: cluster_pb.AcceptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    leaderIsResigning(request: cluster_pb.LeaderIsResigningRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    leaderIsResigning(request: cluster_pb.LeaderIsResigningRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    leaderIsResigning(request: cluster_pb.LeaderIsResigningRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    leaderIsResigningOk(request: cluster_pb.LeaderIsResigningOkRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    leaderIsResigningOk(request: cluster_pb.LeaderIsResigningOkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    leaderIsResigningOk(request: cluster_pb.LeaderIsResigningOkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class ElectionsClient extends grpc.Client implements IElectionsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public viewChange(request: cluster_pb.ViewChangeRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public viewChange(request: cluster_pb.ViewChangeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public viewChange(request: cluster_pb.ViewChangeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public viewChangeProof(request: cluster_pb.ViewChangeProofRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public viewChangeProof(request: cluster_pb.ViewChangeProofRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public viewChangeProof(request: cluster_pb.ViewChangeProofRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public prepare(request: cluster_pb.PrepareRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public prepare(request: cluster_pb.PrepareRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public prepare(request: cluster_pb.PrepareRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public prepareOk(request: cluster_pb.PrepareOkRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public prepareOk(request: cluster_pb.PrepareOkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public prepareOk(request: cluster_pb.PrepareOkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public proposal(request: cluster_pb.ProposalRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public proposal(request: cluster_pb.ProposalRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public proposal(request: cluster_pb.ProposalRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public accept(request: cluster_pb.AcceptRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public accept(request: cluster_pb.AcceptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public accept(request: cluster_pb.AcceptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public leaderIsResigning(request: cluster_pb.LeaderIsResigningRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public leaderIsResigning(request: cluster_pb.LeaderIsResigningRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public leaderIsResigning(request: cluster_pb.LeaderIsResigningRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public leaderIsResigningOk(request: cluster_pb.LeaderIsResigningOkRequest, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public leaderIsResigningOk(request: cluster_pb.LeaderIsResigningOkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public leaderIsResigningOk(request: cluster_pb.LeaderIsResigningOkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}
