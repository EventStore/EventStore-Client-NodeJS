// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var clientcapabilities_pb = require('./clientcapabilities_pb.js');
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

function serialize_event_store_client_client_capabilities_SupportedMethods(arg) {
  if (!(arg instanceof clientcapabilities_pb.SupportedMethods)) {
    throw new Error('Expected argument of type event_store.client.client_capabilities.SupportedMethods');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_client_capabilities_SupportedMethods(buffer_arg) {
  return clientcapabilities_pb.SupportedMethods.deserializeBinary(new Uint8Array(buffer_arg));
}


var ClientCapabilitiesService = exports.ClientCapabilitiesService = {
  getSupportedMethods: {
    path: '/event_store.client.client_capabilities.ClientCapabilities/GetSupportedMethods',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: clientcapabilities_pb.SupportedMethods,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_client_capabilities_SupportedMethods,
    responseDeserialize: deserialize_event_store_client_client_capabilities_SupportedMethods,
  },
};

exports.ClientCapabilitiesClient = grpc.makeGenericClientConstructor(ClientCapabilitiesService);
