// package: event_store.client.server_features
// file: serverfeatures.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as serverfeatures_pb from "./serverfeatures_pb";
import * as shared_pb from "./shared_pb";

interface IServerFeaturesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSupportedMethods: IServerFeaturesService_IGetSupportedMethods;
}

interface IServerFeaturesService_IGetSupportedMethods extends grpc.MethodDefinition<shared_pb.Empty, serverfeatures_pb.SupportedMethods> {
    path: "/event_store.client.server_features.ServerFeatures/GetSupportedMethods";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<serverfeatures_pb.SupportedMethods>;
    responseDeserialize: grpc.deserialize<serverfeatures_pb.SupportedMethods>;
}

export const ServerFeaturesService: IServerFeaturesService;

export interface IServerFeaturesServer extends grpc.UntypedServiceImplementation {
    getSupportedMethods: grpc.handleUnaryCall<shared_pb.Empty, serverfeatures_pb.SupportedMethods>;
}

export interface IServerFeaturesClient {
    getSupportedMethods(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: serverfeatures_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: serverfeatures_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: serverfeatures_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
}

export class ServerFeaturesClient extends grpc.Client implements IServerFeaturesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getSupportedMethods(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: serverfeatures_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    public getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: serverfeatures_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    public getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: serverfeatures_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
}
