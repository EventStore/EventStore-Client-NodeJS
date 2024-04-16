// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var serverfeatures_pb = require('./serverfeatures_pb.js');
var shared_pb = require('./shared_pb.js');

function serialize_event_store_client_Empty(arg) {
  if (!(arg instanceof shared_pb.Empty)) {
    throw new Error('Expected argument of type event_store.client.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_Empty(buffer_arg) {
  return shared_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_server_features_SupportedMethods(arg) {
  if (!(arg instanceof serverfeatures_pb.SupportedMethods)) {
    throw new Error('Expected argument of type event_store.client.server_features.SupportedMethods');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_server_features_SupportedMethods(buffer_arg) {
  return serverfeatures_pb.SupportedMethods.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServerFeaturesService = exports.ServerFeaturesService = {
  getSupportedMethods: {
    path: '/event_store.client.server_features.ServerFeatures/GetSupportedMethods',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: serverfeatures_pb.SupportedMethods,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_server_features_SupportedMethods,
    responseDeserialize: deserialize_event_store_client_server_features_SupportedMethods,
  },
};

exports.ServerFeaturesClient = grpc.makeGenericClientConstructor(ServerFeaturesService);
