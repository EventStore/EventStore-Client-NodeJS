// package: event_store.client.persistent_subscriptions
// file: persistent.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as persistent_pb from "./persistent_pb";
import * as shared_pb from "./shared_pb";

interface IPersistentSubscriptionsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IPersistentSubscriptionsService_ICreate;
    update: IPersistentSubscriptionsService_IUpdate;
    delete: IPersistentSubscriptionsService_IDelete;
    read: IPersistentSubscriptionsService_IRead;
}

interface IPersistentSubscriptionsService_ICreate extends grpc.MethodDefinition<persistent_pb.CreateReq, persistent_pb.CreateResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<persistent_pb.CreateReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.CreateReq>;
    responseSerialize: grpc.serialize<persistent_pb.CreateResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.CreateResp>;
}
interface IPersistentSubscriptionsService_IUpdate extends grpc.MethodDefinition<persistent_pb.UpdateReq, persistent_pb.UpdateResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<persistent_pb.UpdateReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.UpdateReq>;
    responseSerialize: grpc.serialize<persistent_pb.UpdateResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.UpdateResp>;
}
interface IPersistentSubscriptionsService_IDelete extends grpc.MethodDefinition<persistent_pb.DeleteReq, persistent_pb.DeleteResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/Delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<persistent_pb.DeleteReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.DeleteReq>;
    responseSerialize: grpc.serialize<persistent_pb.DeleteResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.DeleteResp>;
}
interface IPersistentSubscriptionsService_IRead extends grpc.MethodDefinition<persistent_pb.ReadReq, persistent_pb.ReadResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/Read";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<persistent_pb.ReadReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.ReadReq>;
    responseSerialize: grpc.serialize<persistent_pb.ReadResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.ReadResp>;
}

export const PersistentSubscriptionsService: IPersistentSubscriptionsService;

export interface IPersistentSubscriptionsServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<persistent_pb.CreateReq, persistent_pb.CreateResp>;
    update: grpc.handleUnaryCall<persistent_pb.UpdateReq, persistent_pb.UpdateResp>;
    delete: grpc.handleUnaryCall<persistent_pb.DeleteReq, persistent_pb.DeleteResp>;
    read: grpc.handleBidiStreamingCall<persistent_pb.ReadReq, persistent_pb.ReadResp>;
}

export interface IPersistentSubscriptionsClient {
    create(request: persistent_pb.CreateReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.CreateResp) => void): grpc.ClientUnaryCall;
    create(request: persistent_pb.CreateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.CreateResp) => void): grpc.ClientUnaryCall;
    create(request: persistent_pb.CreateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.CreateResp) => void): grpc.ClientUnaryCall;
    update(request: persistent_pb.UpdateReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    update(request: persistent_pb.UpdateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    update(request: persistent_pb.UpdateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    delete(request: persistent_pb.DeleteReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    delete(request: persistent_pb.DeleteReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    delete(request: persistent_pb.DeleteReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    read(): grpc.ClientDuplexStream<persistent_pb.ReadReq, persistent_pb.ReadResp>;
    read(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<persistent_pb.ReadReq, persistent_pb.ReadResp>;
    read(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<persistent_pb.ReadReq, persistent_pb.ReadResp>;
}

export class PersistentSubscriptionsClient extends grpc.Client implements IPersistentSubscriptionsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public create(request: persistent_pb.CreateReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public create(request: persistent_pb.CreateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public create(request: persistent_pb.CreateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public update(request: persistent_pb.UpdateReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public update(request: persistent_pb.UpdateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public update(request: persistent_pb.UpdateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public delete(request: persistent_pb.DeleteReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public delete(request: persistent_pb.DeleteReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public delete(request: persistent_pb.DeleteReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public read(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<persistent_pb.ReadReq, persistent_pb.ReadResp>;
    public read(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<persistent_pb.ReadReq, persistent_pb.ReadResp>;
}
