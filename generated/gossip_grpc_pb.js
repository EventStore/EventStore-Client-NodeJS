// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var gossip_pb = require('./gossip_pb.js');
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

function serialize_event_store_client_gossip_ClusterInfo(arg) {
  if (!(arg instanceof gossip_pb.ClusterInfo)) {
    throw new Error('Expected argument of type event_store.client.gossip.ClusterInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_gossip_ClusterInfo(buffer_arg) {
  return gossip_pb.ClusterInfo.deserializeBinary(new Uint8Array(buffer_arg));
}


var GossipService = exports.GossipService = {
  read: {
    path: '/event_store.client.gossip.Gossip/Read',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: gossip_pb.ClusterInfo,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_gossip_ClusterInfo,
    responseDeserialize: deserialize_event_store_client_gossip_ClusterInfo,
  },
};

exports.GossipClient = grpc.makeGenericClientConstructor(GossipService);
