// package: event_store.client.monitoring
// file: monitoring.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as monitoring_pb from "./monitoring_pb";

interface IMonitoringService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    stats: IMonitoringService_IStats;
}

interface IMonitoringService_IStats extends grpc.MethodDefinition<monitoring_pb.StatsReq, monitoring_pb.StatsResp> {
    path: "/event_store.client.monitoring.Monitoring/Stats";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<monitoring_pb.StatsReq>;
    requestDeserialize: grpc.deserialize<monitoring_pb.StatsReq>;
    responseSerialize: grpc.serialize<monitoring_pb.StatsResp>;
    responseDeserialize: grpc.deserialize<monitoring_pb.StatsResp>;
}

export const MonitoringService: IMonitoringService;

export interface IMonitoringServer extends grpc.UntypedServiceImplementation {
    stats: grpc.handleServerStreamingCall<monitoring_pb.StatsReq, monitoring_pb.StatsResp>;
}

export interface IMonitoringClient {
    stats(request: monitoring_pb.StatsReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<monitoring_pb.StatsResp>;
    stats(request: monitoring_pb.StatsReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<monitoring_pb.StatsResp>;
}

export class MonitoringClient extends grpc.Client implements IMonitoringClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public stats(request: monitoring_pb.StatsReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<monitoring_pb.StatsResp>;
    public stats(request: monitoring_pb.StatsReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<monitoring_pb.StatsResp>;
}
