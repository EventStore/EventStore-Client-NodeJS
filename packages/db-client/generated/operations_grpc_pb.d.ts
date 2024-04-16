// package: event_store.client.operations
// file: operations.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as operations_pb from "./operations_pb";
import * as shared_pb from "./shared_pb";

interface IOperationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    startScavenge: IOperationsService_IStartScavenge;
    stopScavenge: IOperationsService_IStopScavenge;
    shutdown: IOperationsService_IShutdown;
    mergeIndexes: IOperationsService_IMergeIndexes;
    resignNode: IOperationsService_IResignNode;
    setNodePriority: IOperationsService_ISetNodePriority;
    restartPersistentSubscriptions: IOperationsService_IRestartPersistentSubscriptions;
}

interface IOperationsService_IStartScavenge extends grpc.MethodDefinition<operations_pb.StartScavengeReq, operations_pb.ScavengeResp> {
    path: "/event_store.client.operations.Operations/StartScavenge";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<operations_pb.StartScavengeReq>;
    requestDeserialize: grpc.deserialize<operations_pb.StartScavengeReq>;
    responseSerialize: grpc.serialize<operations_pb.ScavengeResp>;
    responseDeserialize: grpc.deserialize<operations_pb.ScavengeResp>;
}
interface IOperationsService_IStopScavenge extends grpc.MethodDefinition<operations_pb.StopScavengeReq, operations_pb.ScavengeResp> {
    path: "/event_store.client.operations.Operations/StopScavenge";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<operations_pb.StopScavengeReq>;
    requestDeserialize: grpc.deserialize<operations_pb.StopScavengeReq>;
    responseSerialize: grpc.serialize<operations_pb.ScavengeResp>;
    responseDeserialize: grpc.deserialize<operations_pb.ScavengeResp>;
}
interface IOperationsService_IShutdown extends grpc.MethodDefinition<shared_pb.Empty, shared_pb.Empty> {
    path: "/event_store.client.operations.Operations/Shutdown";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IOperationsService_IMergeIndexes extends grpc.MethodDefinition<shared_pb.Empty, shared_pb.Empty> {
    path: "/event_store.client.operations.Operations/MergeIndexes";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IOperationsService_IResignNode extends grpc.MethodDefinition<shared_pb.Empty, shared_pb.Empty> {
    path: "/event_store.client.operations.Operations/ResignNode";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IOperationsService_ISetNodePriority extends grpc.MethodDefinition<operations_pb.SetNodePriorityReq, shared_pb.Empty> {
    path: "/event_store.client.operations.Operations/SetNodePriority";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<operations_pb.SetNodePriorityReq>;
    requestDeserialize: grpc.deserialize<operations_pb.SetNodePriorityReq>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}
interface IOperationsService_IRestartPersistentSubscriptions extends grpc.MethodDefinition<shared_pb.Empty, shared_pb.Empty> {
    path: "/event_store.client.operations.Operations/RestartPersistentSubscriptions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shared_pb.Empty>;
    requestDeserialize: grpc.deserialize<shared_pb.Empty>;
    responseSerialize: grpc.serialize<shared_pb.Empty>;
    responseDeserialize: grpc.deserialize<shared_pb.Empty>;
}

export const OperationsService: IOperationsService;

export interface IOperationsServer extends grpc.UntypedServiceImplementation {
    startScavenge: grpc.handleUnaryCall<operations_pb.StartScavengeReq, operations_pb.ScavengeResp>;
    stopScavenge: grpc.handleUnaryCall<operations_pb.StopScavengeReq, operations_pb.ScavengeResp>;
    shutdown: grpc.handleUnaryCall<shared_pb.Empty, shared_pb.Empty>;
    mergeIndexes: grpc.handleUnaryCall<shared_pb.Empty, shared_pb.Empty>;
    resignNode: grpc.handleUnaryCall<shared_pb.Empty, shared_pb.Empty>;
    setNodePriority: grpc.handleUnaryCall<operations_pb.SetNodePriorityReq, shared_pb.Empty>;
    restartPersistentSubscriptions: grpc.handleUnaryCall<shared_pb.Empty, shared_pb.Empty>;
}

export interface IOperationsClient {
    startScavenge(request: operations_pb.StartScavengeReq, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    startScavenge(request: operations_pb.StartScavengeReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    startScavenge(request: operations_pb.StartScavengeReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    stopScavenge(request: operations_pb.StopScavengeReq, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    stopScavenge(request: operations_pb.StopScavengeReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    stopScavenge(request: operations_pb.StopScavengeReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    shutdown(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    shutdown(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    shutdown(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    mergeIndexes(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    mergeIndexes(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    mergeIndexes(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    resignNode(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    resignNode(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    resignNode(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    setNodePriority(request: operations_pb.SetNodePriorityReq, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    setNodePriority(request: operations_pb.SetNodePriorityReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    setNodePriority(request: operations_pb.SetNodePriorityReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartPersistentSubscriptions(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartPersistentSubscriptions(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    restartPersistentSubscriptions(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class OperationsClient extends grpc.Client implements IOperationsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public startScavenge(request: operations_pb.StartScavengeReq, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    public startScavenge(request: operations_pb.StartScavengeReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    public startScavenge(request: operations_pb.StartScavengeReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    public stopScavenge(request: operations_pb.StopScavengeReq, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    public stopScavenge(request: operations_pb.StopScavengeReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    public stopScavenge(request: operations_pb.StopScavengeReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: operations_pb.ScavengeResp) => void): grpc.ClientUnaryCall;
    public shutdown(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public shutdown(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public shutdown(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public mergeIndexes(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public mergeIndexes(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public mergeIndexes(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public resignNode(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public resignNode(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public resignNode(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public setNodePriority(request: operations_pb.SetNodePriorityReq, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public setNodePriority(request: operations_pb.SetNodePriorityReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public setNodePriority(request: operations_pb.SetNodePriorityReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartPersistentSubscriptions(request: shared_pb.Empty, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartPersistentSubscriptions(request: shared_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
    public restartPersistentSubscriptions(request: shared_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shared_pb.Empty) => void): grpc.ClientUnaryCall;
}
