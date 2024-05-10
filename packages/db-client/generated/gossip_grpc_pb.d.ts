// package: event_store.client.gossip
// file: gossip.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as gossip_pb from "./gossip_pb";
import * as shared_pb from "./shared_pb";

interface IGossipService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    read: IGossipService_IRead;
}

interface IGossipService_IRead extends grpc.MethodDefinition<shared_pb.Empty, gossip_pb.ClusterInfo> {
    path: "/event_store.client.gossip.Gossip/Read";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<gossip_pb.ClusterInfo>;
    responseDeserialize: grpc.deserialize<gossip_pb.ClusterInfo>;
}

export const GossipService: IGossipService;

export interface IGossipServer extends grpc.UntypedServiceImplementation {
    read: grpc.handleUnaryCall<shared_pb.Empty, gossip_pb.ClusterInfo>;
}

export interface IGossipClient {
    read(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: gossip_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    read(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: gossip_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    read(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: gossip_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
}

export class GossipClient extends grpc.Client implements IGossipClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public read(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: gossip_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public read(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: gossip_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
    public read(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: gossip_pb.ClusterInfo) => void): grpc.ClientUnaryCall;
}
