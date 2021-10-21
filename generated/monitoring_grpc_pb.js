// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var monitoring_pb = require('./monitoring_pb.js');

function serialize_event_store_client_monitoring_StatsReq(arg) {
  if (!(arg instanceof monitoring_pb.StatsReq)) {
    throw new Error('Expected argument of type event_store.client.monitoring.StatsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_monitoring_StatsReq(buffer_arg) {
  return monitoring_pb.StatsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_monitoring_StatsResp(arg) {
  if (!(arg instanceof monitoring_pb.StatsResp)) {
    throw new Error('Expected argument of type event_store.client.monitoring.StatsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_monitoring_StatsResp(buffer_arg) {
  return monitoring_pb.StatsResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var MonitoringService = exports.MonitoringService = {
  stats: {
    path: '/event_store.client.monitoring.Monitoring/Stats',
    requestStream: false,
    responseStream: true,
    requestType: monitoring_pb.StatsReq,
    responseType: monitoring_pb.StatsResp,
    requestSerialize: serialize_event_store_client_monitoring_StatsReq,
    requestDeserialize: deserialize_event_store_client_monitoring_StatsReq,
    responseSerialize: serialize_event_store_client_monitoring_StatsResp,
    responseDeserialize: deserialize_event_store_client_monitoring_StatsResp,
  },
};

exports.MonitoringClient = grpc.makeGenericClientConstructor(MonitoringService);
