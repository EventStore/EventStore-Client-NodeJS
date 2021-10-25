// package: event_store.client.projections
// file: projections.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as projections_pb from "./projections_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as shared_pb from "./shared_pb";

interface IProjectionsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IProjectionsService_ICreate;
    update: IProjectionsService_IUpdate;
    delete: IProjectionsService_IDelete;
    statistics: IProjectionsService_IStatistics;
    disable: IProjectionsService_IDisable;
    enable: IProjectionsService_IEnable;
    reset: IProjectionsService_IReset;
    state: IProjectionsService_IState;
    result: IProjectionsService_IResult;
    restartSubsystem: IProjectionsService_IRestartSubsystem;
}

interface IProjectionsService_ICreate extends grpc.MethodDefinition<projections_pb.CreateReq, projections_pb.CreateResp> {
    path: "/event_store.client.projections.Projections/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.CreateReq>;
    requestDeserialize: grpc.deserialize<projections_pb.CreateReq>;
    responseSerialize: grpc.serialize<projections_pb.CreateResp>;
    responseDeserialize: grpc.deserialize<projections_pb.CreateResp>;
}
interface IProjectionsService_IUpdate extends grpc.MethodDefinition<projections_pb.UpdateReq, projections_pb.UpdateResp> {
    path: "/event_store.client.projections.Projections/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.UpdateReq>;
    requestDeserialize: grpc.deserialize<projections_pb.UpdateReq>;
    responseSerialize: grpc.serialize<projections_pb.UpdateResp>;
    responseDeserialize: grpc.deserialize<projections_pb.UpdateResp>;
}
interface IProjectionsService_IDelete extends grpc.MethodDefinition<projections_pb.DeleteReq, projections_pb.DeleteResp> {
    path: "/event_store.client.projections.Projections/Delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.DeleteReq>;
    requestDeserialize: grpc.deserialize<projections_pb.DeleteReq>;
    responseSerialize: grpc.serialize<projections_pb.DeleteResp>;
    responseDeserialize: grpc.deserialize<projections_pb.DeleteResp>;
}
interface IProjectionsService_IStatistics extends grpc.MethodDefinition<projections_pb.StatisticsReq, projections_pb.StatisticsResp> {
    path: "/event_store.client.projections.Projections/Statistics";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<projections_pb.StatisticsReq>;
    requestDeserialize: grpc.deserialize<projections_pb.StatisticsReq>;
    responseSerialize: grpc.serialize<projections_pb.StatisticsResp>;
    responseDeserialize: grpc.deserialize<projections_pb.StatisticsResp>;
}
interface IProjectionsService_IDisable extends grpc.MethodDefinition<projections_pb.DisableReq, projections_pb.DisableResp> {
    path: "/event_store.client.projections.Projections/Disable";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.DisableReq>;
    requestDeserialize: grpc.deserialize<projections_pb.DisableReq>;
    responseSerialize: grpc.serialize<projections_pb.DisableResp>;
    responseDeserialize: grpc.deserialize<projections_pb.DisableResp>;
}
interface IProjectionsService_IEnable extends grpc.MethodDefinition<projections_pb.EnableReq, projections_pb.EnableResp> {
    path: "/event_store.client.projections.Projections/Enable";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.EnableReq>;
    requestDeserialize: grpc.deserialize<projections_pb.EnableReq>;
    responseSerialize: grpc.serialize<projections_pb.EnableResp>;
    responseDeserialize: grpc.deserialize<projections_pb.EnableResp>;
}
interface IProjectionsService_IReset extends grpc.MethodDefinition<projections_pb.ResetReq, projections_pb.ResetResp> {
    path: "/event_store.client.projections.Projections/Reset";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.ResetReq>;
    requestDeserialize: grpc.deserialize<projections_pb.ResetReq>;
    responseSerialize: grpc.serialize<projections_pb.ResetResp>;
    responseDeserialize: grpc.deserialize<projections_pb.ResetResp>;
}
interface IProjectionsService_IState extends grpc.MethodDefinition<projections_pb.StateReq, projections_pb.StateResp> {
    path: "/event_store.client.projections.Projections/State";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.StateReq>;
    requestDeserialize: grpc.deserialize<projections_pb.StateReq>;
    responseSerialize: grpc.serialize<projections_pb.StateResp>;
    responseDeserialize: grpc.deserialize<projections_pb.StateResp>;
}
interface IProjectionsService_IResult extends grpc.MethodDefinition<projections_pb.ResultReq, projections_pb.ResultResp> {
    path: "/event_store.client.projections.Projections/Result";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<projections_pb.ResultReq>;
    requestDeserialize: grpc.deserialize<projections_pb.ResultReq>;
    responseSerialize: grpc.serialize<projections_pb.ResultResp>;
    responseDeserialize: grpc.deserialize<projections_pb.ResultResp>;
}
interface IProjectionsService_IRestartSubsystem extends grpc.MethodDefinition<shared_pb.Empty, shared_pb.Empty> {
    path: "/event_store.client.projections.Projections/RestartSubsystem";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}

export const ProjectionsService: IProjectionsService;

export interface IProjectionsServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<projections_pb.CreateReq, projections_pb.CreateResp>;
    update: grpc.handleUnaryCall<projections_pb.UpdateReq, projections_pb.UpdateResp>;
    delete: grpc.handleUnaryCall<projections_pb.DeleteReq, projections_pb.DeleteResp>;
    statistics: grpc.handleServerStreamingCall<projections_pb.StatisticsReq, projections_pb.StatisticsResp>;
    disable: grpc.handleUnaryCall<projections_pb.DisableReq, projections_pb.DisableResp>;
    enable: grpc.handleUnaryCall<projections_pb.EnableReq, projections_pb.EnableResp>;
    reset: grpc.handleUnaryCall<projections_pb.ResetReq, projections_pb.ResetResp>;
    state: grpc.handleUnaryCall<projections_pb.StateReq, projections_pb.StateResp>;
    result: grpc.handleUnaryCall<projections_pb.ResultReq, projections_pb.ResultResp>;
    restartSubsystem: grpc.handleUnaryCall<shared_pb.Empty, shared_pb.Empty>;
}

export interface IProjectionsClient {
    create(request: projections_pb.CreateReq, callback: (error: grpc.ServiceError | null, response: projections_pb.CreateResp) => void): grpc.ClientUnaryCall;
    create(request: projections_pb.CreateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.CreateResp) => void): grpc.ClientUnaryCall;
    create(request: projections_pb.CreateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.CreateResp) => void): grpc.ClientUnaryCall;
    update(request: projections_pb.UpdateReq, callback: (error: grpc.ServiceError | null, response: projections_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    update(request: projections_pb.UpdateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    update(request: projections_pb.UpdateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    delete(request: projections_pb.DeleteReq, callback: (error: grpc.ServiceError | null, response: projections_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    delete(request: projections_pb.DeleteReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    delete(request: projections_pb.DeleteReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    statistics(request: projections_pb.StatisticsReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<projections_pb.StatisticsResp>;
    statistics(request: projections_pb.StatisticsReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<projections_pb.StatisticsResp>;
    disable(request: projections_pb.DisableReq, callback: (error: grpc.ServiceError | null, response: projections_pb.DisableResp) => void): grpc.ClientUnaryCall;
    disable(request: projections_pb.DisableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.DisableResp) => void): grpc.ClientUnaryCall;
    disable(request: projections_pb.DisableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.DisableResp) => void): grpc.ClientUnaryCall;
    enable(request: projections_pb.EnableReq, callback: (error: grpc.ServiceError | null, response: projections_pb.EnableResp) => void): grpc.ClientUnaryCall;
    enable(request: projections_pb.EnableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.EnableResp) => void): grpc.ClientUnaryCall;
    enable(request: projections_pb.EnableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.EnableResp) => void): grpc.ClientUnaryCall;
    reset(request: projections_pb.ResetReq, callback: (error: grpc.ServiceError | null, response: projections_pb.ResetResp) => void): grpc.ClientUnaryCall;
    reset(request: projections_pb.ResetReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.ResetResp) => void): grpc.ClientUnaryCall;
    reset(request: projections_pb.ResetReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.ResetResp) => void): grpc.ClientUnaryCall;
    state(request: projections_pb.StateReq, callback: (error: grpc.ServiceError | null, response: projections_pb.StateResp) => void): grpc.ClientUnaryCall;
    state(request: projections_pb.StateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.StateResp) => void): grpc.ClientUnaryCall;
    state(request: projections_pb.StateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.StateResp) => void): grpc.ClientUnaryCall;
    result(request: projections_pb.ResultReq, callback: (error: grpc.ServiceError | null, response: projections_pb.ResultResp) => void): grpc.ClientUnaryCall;
    result(request: projections_pb.ResultReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.ResultResp) => void): grpc.ClientUnaryCall;
    result(request: projections_pb.ResultReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.ResultResp) => void): grpc.ClientUnaryCall;
    restartSubsystem(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class ProjectionsClient extends grpc.Client implements IProjectionsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public create(request: projections_pb.CreateReq, callback: (error: grpc.ServiceError | null, response: projections_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public create(request: projections_pb.CreateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public create(request: projections_pb.CreateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public update(request: projections_pb.UpdateReq, callback: (error: grpc.ServiceError | null, response: projections_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public update(request: projections_pb.UpdateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public update(request: projections_pb.UpdateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public delete(request: projections_pb.DeleteReq, callback: (error: grpc.ServiceError | null, response: projections_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public delete(request: projections_pb.DeleteReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public delete(request: projections_pb.DeleteReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public statistics(request: projections_pb.StatisticsReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<projections_pb.StatisticsResp>;
    public statistics(request: projections_pb.StatisticsReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<projections_pb.StatisticsResp>;
    public disable(request: projections_pb.DisableReq, callback: (error: grpc.ServiceError | null, response: projections_pb.DisableResp) => void): grpc.ClientUnaryCall;
    public disable(request: projections_pb.DisableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.DisableResp) => void): grpc.ClientUnaryCall;
    public disable(request: projections_pb.DisableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.DisableResp) => void): grpc.ClientUnaryCall;
    public enable(request: projections_pb.EnableReq, callback: (error: grpc.ServiceError | null, response: projections_pb.EnableResp) => void): grpc.ClientUnaryCall;
    public enable(request: projections_pb.EnableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.EnableResp) => void): grpc.ClientUnaryCall;
    public enable(request: projections_pb.EnableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.EnableResp) => void): grpc.ClientUnaryCall;
    public reset(request: projections_pb.ResetReq, callback: (error: grpc.ServiceError | null, response: projections_pb.ResetResp) => void): grpc.ClientUnaryCall;
    public reset(request: projections_pb.ResetReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.ResetResp) => void): grpc.ClientUnaryCall;
    public reset(request: projections_pb.ResetReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.ResetResp) => void): grpc.ClientUnaryCall;
    public state(request: projections_pb.StateReq, callback: (error: grpc.ServiceError | null, response: projections_pb.StateResp) => void): grpc.ClientUnaryCall;
    public state(request: projections_pb.StateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.StateResp) => void): grpc.ClientUnaryCall;
    public state(request: projections_pb.StateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.StateResp) => void): grpc.ClientUnaryCall;
    public result(request: projections_pb.ResultReq, callback: (error: grpc.ServiceError | null, response: projections_pb.ResultResp) => void): grpc.ClientUnaryCall;
    public result(request: projections_pb.ResultReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: projections_pb.ResultResp) => void): grpc.ClientUnaryCall;
    public result(request: projections_pb.ResultReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: projections_pb.ResultResp) => void): grpc.ClientUnaryCall;
    public restartSubsystem(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartSubsystem(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}
