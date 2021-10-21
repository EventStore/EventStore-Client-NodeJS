// package: event_store.client.client_capabilities
// file: clientcapabilities.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as clientcapabilities_pb from "./clientcapabilities_pb";
import * as shared_pb from "./shared_pb";

interface IClientCapabilitiesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSupportedMethods: IClientCapabilitiesService_IGetSupportedMethods;
}

interface IClientCapabilitiesService_IGetSupportedMethods extends grpc.MethodDefinition<shared_pb.Empty, clientcapabilities_pb.SupportedMethods> {
    path: "/event_store.client.client_capabilities.ClientCapabilities/GetSupportedMethods";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<clientcapabilities_pb.SupportedMethods>;
    responseDeserialize: grpc.deserialize<clientcapabilities_pb.SupportedMethods>;
}

export const ClientCapabilitiesService: IClientCapabilitiesService;

export interface IClientCapabilitiesServer extends grpc.UntypedServiceImplementation {
    getSupportedMethods: grpc.handleUnaryCall<shared_pb.Empty, clientcapabilities_pb.SupportedMethods>;
}

export interface IClientCapabilitiesClient {
    getSupportedMethods(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: clientcapabilities_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: clientcapabilities_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: clientcapabilities_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
}

export class ClientCapabilitiesClient extends grpc.Client implements IClientCapabilitiesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getSupportedMethods(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: clientcapabilities_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    public getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: clientcapabilities_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
    public getSupportedMethods(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: clientcapabilities_pb.SupportedMethods) => void): grpc.ClientUnaryCall;
}
