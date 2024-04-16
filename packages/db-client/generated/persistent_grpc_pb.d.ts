// package: event_store.client.persistent_subscriptions
// file: persistent.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as persistent_pb from "./persistent_pb";
import * as shared_pb from "./shared_pb";

interface IPersistentSubscriptionsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IPersistentSubscriptionsService_ICreate;
    update: IPersistentSubscriptionsService_IUpdate;
    delete: IPersistentSubscriptionsService_IDelete;
    read: IPersistentSubscriptionsService_IRead;
    getInfo: IPersistentSubscriptionsService_IGetInfo;
    replayParked: IPersistentSubscriptionsService_IReplayParked;
    list: IPersistentSubscriptionsService_IList;
    restartSubsystem: IPersistentSubscriptionsService_IRestartSubsystem;
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
interface IPersistentSubscriptionsService_IGetInfo extends grpc.MethodDefinition<persistent_pb.GetInfoReq, persistent_pb.GetInfoResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/GetInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<persistent_pb.GetInfoReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.GetInfoReq>;
    responseSerialize: grpc.serialize<persistent_pb.GetInfoResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.GetInfoResp>;
}
interface IPersistentSubscriptionsService_IReplayParked extends grpc.MethodDefinition<persistent_pb.ReplayParkedReq, persistent_pb.ReplayParkedResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/ReplayParked";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<persistent_pb.ReplayParkedReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.ReplayParkedReq>;
    responseSerialize: grpc.serialize<persistent_pb.ReplayParkedResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.ReplayParkedResp>;
}
interface IPersistentSubscriptionsService_IList extends grpc.MethodDefinition<persistent_pb.ListReq, persistent_pb.ListResp> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/List";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<persistent_pb.ListReq>;
    requestDeserialize: grpc.deserialize<persistent_pb.ListReq>;
    responseSerialize: grpc.serialize<persistent_pb.ListResp>;
    responseDeserialize: grpc.deserialize<persistent_pb.ListResp>;
}
interface IPersistentSubscriptionsService_IRestartSubsystem extends grpc.MethodDefinition<shared_pb.Empty, shared_pb.Empty> {
    path: "/event_store.client.persistent_subscriptions.PersistentSubscriptions/RestartSubsystem";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}

export const PersistentSubscriptionsService: IPersistentSubscriptionsService;

export interface IPersistentSubscriptionsServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<persistent_pb.CreateReq, persistent_pb.CreateResp>;
    update: grpc.handleUnaryCall<persistent_pb.UpdateReq, persistent_pb.UpdateResp>;
    delete: grpc.handleUnaryCall<persistent_pb.DeleteReq, persistent_pb.DeleteResp>;
    read: grpc.handleBidiStreamingCall<persistent_pb.ReadReq, persistent_pb.ReadResp>;
    getInfo: grpc.handleUnaryCall<persistent_pb.GetInfoReq, persistent_pb.GetInfoResp>;
    replayParked: grpc.handleUnaryCall<persistent_pb.ReplayParkedReq, persistent_pb.ReplayParkedResp>;
    list: grpc.handleUnaryCall<persistent_pb.ListReq, persistent_pb.ListResp>;
    restartSubsystem: grpc.handleUnaryCall<shared_pb.Empty, shared_pb.Empty>;
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
    getInfo(request: persistent_pb.GetInfoReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.GetInfoResp) => void): grpc.ClientUnaryCall;
    getInfo(request: persistent_pb.GetInfoReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.GetInfoResp) => void): grpc.ClientUnaryCall;
    getInfo(request: persistent_pb.GetInfoReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.GetInfoResp) => void): grpc.ClientUnaryCall;
    replayParked(request: persistent_pb.ReplayParkedReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.ReplayParkedResp) => void): grpc.ClientUnaryCall;
    replayParked(request: persistent_pb.ReplayParkedReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.ReplayParkedResp) => void): grpc.ClientUnaryCall;
    replayParked(request: persistent_pb.ReplayParkedReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.ReplayParkedResp) => void): grpc.ClientUnaryCall;
    list(request: persistent_pb.ListReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.ListResp) => void): grpc.ClientUnaryCall;
    list(request: persistent_pb.ListReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.ListResp) => void): grpc.ClientUnaryCall;
    list(request: persistent_pb.ListReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.ListResp) => void): grpc.ClientUnaryCall;
    restartSubsystem(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
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
    public getInfo(request: persistent_pb.GetInfoReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.GetInfoResp) => void): grpc.ClientUnaryCall;
    public getInfo(request: persistent_pb.GetInfoReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.GetInfoResp) => void): grpc.ClientUnaryCall;
    public getInfo(request: persistent_pb.GetInfoReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.GetInfoResp) => void): grpc.ClientUnaryCall;
    public replayParked(request: persistent_pb.ReplayParkedReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.ReplayParkedResp) => void): grpc.ClientUnaryCall;
    public replayParked(request: persistent_pb.ReplayParkedReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.ReplayParkedResp) => void): grpc.ClientUnaryCall;
    public replayParked(request: persistent_pb.ReplayParkedReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.ReplayParkedResp) => void): grpc.ClientUnaryCall;
    public list(request: persistent_pb.ListReq, callback: (error: grpc.ServiceError | null, response: persistent_pb.ListResp) => void): grpc.ClientUnaryCall;
    public list(request: persistent_pb.ListReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: persistent_pb.ListResp) => void): grpc.ClientUnaryCall;
    public list(request: persistent_pb.ListReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: persistent_pb.ListResp) => void): grpc.ClientUnaryCall;
    public restartSubsystem(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}
