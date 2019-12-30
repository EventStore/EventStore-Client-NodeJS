// GENERATED CODE -- DO NOT EDIT!

// package: event_store.grpc.streams
// file: streams.proto

import * as streams_pb from "./streams_pb";
import * as grpc from "grpc";

interface IStreamsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  read: grpc.MethodDefinition<streams_pb.ReadReq, streams_pb.ReadResp>;
  append: grpc.MethodDefinition<streams_pb.AppendReq, streams_pb.AppendResp>;
  delete: grpc.MethodDefinition<streams_pb.DeleteReq, streams_pb.DeleteResp>;
  tombstone: grpc.MethodDefinition<streams_pb.TombstoneReq, streams_pb.TombstoneResp>;
}

export const StreamsService: IStreamsService;

export class StreamsClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  read(argument: streams_pb.ReadReq, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<streams_pb.ReadResp>;
  read(argument: streams_pb.ReadReq, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<streams_pb.ReadResp>;
  append(callback: grpc.requestCallback<streams_pb.AppendResp>): grpc.ClientWritableStream<streams_pb.AppendReq>;
  append(metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<streams_pb.AppendResp>): grpc.ClientWritableStream<streams_pb.AppendReq>;
  append(metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<streams_pb.AppendResp>): grpc.ClientWritableStream<streams_pb.AppendReq>;
  delete(argument: streams_pb.DeleteReq, callback: grpc.requestCallback<streams_pb.DeleteResp>): grpc.ClientUnaryCall;
  delete(argument: streams_pb.DeleteReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<streams_pb.DeleteResp>): grpc.ClientUnaryCall;
  delete(argument: streams_pb.DeleteReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<streams_pb.DeleteResp>): grpc.ClientUnaryCall;
  tombstone(argument: streams_pb.TombstoneReq, callback: grpc.requestCallback<streams_pb.TombstoneResp>): grpc.ClientUnaryCall;
  tombstone(argument: streams_pb.TombstoneReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<streams_pb.TombstoneResp>): grpc.ClientUnaryCall;
  tombstone(argument: streams_pb.TombstoneReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<streams_pb.TombstoneResp>): grpc.ClientUnaryCall;
}
