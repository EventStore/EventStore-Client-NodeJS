// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cluster_pb = require('./cluster_pb.js');
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

function serialize_event_store_cluster_AcceptRequest(arg) {
  if (!(arg instanceof cluster_pb.AcceptRequest)) {
    throw new Error('Expected argument of type event_store.cluster.AcceptRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_AcceptRequest(buffer_arg) {
  return cluster_pb.AcceptRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_ClusterInfo(arg) {
  if (!(arg instanceof cluster_pb.ClusterInfo)) {
    throw new Error('Expected argument of type event_store.cluster.ClusterInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_ClusterInfo(buffer_arg) {
  return cluster_pb.ClusterInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_GossipRequest(arg) {
  if (!(arg instanceof cluster_pb.GossipRequest)) {
    throw new Error('Expected argument of type event_store.cluster.GossipRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_GossipRequest(buffer_arg) {
  return cluster_pb.GossipRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_LeaderIsResigningOkRequest(arg) {
  if (!(arg instanceof cluster_pb.LeaderIsResigningOkRequest)) {
    throw new Error('Expected argument of type event_store.cluster.LeaderIsResigningOkRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_LeaderIsResigningOkRequest(buffer_arg) {
  return cluster_pb.LeaderIsResigningOkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_LeaderIsResigningRequest(arg) {
  if (!(arg instanceof cluster_pb.LeaderIsResigningRequest)) {
    throw new Error('Expected argument of type event_store.cluster.LeaderIsResigningRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_LeaderIsResigningRequest(buffer_arg) {
  return cluster_pb.LeaderIsResigningRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_PrepareOkRequest(arg) {
  if (!(arg instanceof cluster_pb.PrepareOkRequest)) {
    throw new Error('Expected argument of type event_store.cluster.PrepareOkRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_PrepareOkRequest(buffer_arg) {
  return cluster_pb.PrepareOkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_PrepareRequest(arg) {
  if (!(arg instanceof cluster_pb.PrepareRequest)) {
    throw new Error('Expected argument of type event_store.cluster.PrepareRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_PrepareRequest(buffer_arg) {
  return cluster_pb.PrepareRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_ProposalRequest(arg) {
  if (!(arg instanceof cluster_pb.ProposalRequest)) {
    throw new Error('Expected argument of type event_store.cluster.ProposalRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_ProposalRequest(buffer_arg) {
  return cluster_pb.ProposalRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_ViewChangeProofRequest(arg) {
  if (!(arg instanceof cluster_pb.ViewChangeProofRequest)) {
    throw new Error('Expected argument of type event_store.cluster.ViewChangeProofRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_ViewChangeProofRequest(buffer_arg) {
  return cluster_pb.ViewChangeProofRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_cluster_ViewChangeRequest(arg) {
  if (!(arg instanceof cluster_pb.ViewChangeRequest)) {
    throw new Error('Expected argument of type event_store.cluster.ViewChangeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_cluster_ViewChangeRequest(buffer_arg) {
  return cluster_pb.ViewChangeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GossipService = exports.GossipService = {
  update: {
    path: '/event_store.cluster.Gossip/Update',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.GossipRequest,
    responseType: cluster_pb.ClusterInfo,
    requestSerialize: serialize_event_store_cluster_GossipRequest,
    requestDeserialize: deserialize_event_store_cluster_GossipRequest,
    responseSerialize: serialize_event_store_cluster_ClusterInfo,
    responseDeserialize: deserialize_event_store_cluster_ClusterInfo,
  },
  read: {
    path: '/event_store.cluster.Gossip/Read',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: cluster_pb.ClusterInfo,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_cluster_ClusterInfo,
    responseDeserialize: deserialize_event_store_cluster_ClusterInfo,
  },
};

exports.GossipClient = grpc.makeGenericClientConstructor(GossipService);
var ElectionsService = exports.ElectionsService = {
  viewChange: {
    path: '/event_store.cluster.Elections/ViewChange',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.ViewChangeRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_ViewChangeRequest,
    requestDeserialize: deserialize_event_store_cluster_ViewChangeRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  viewChangeProof: {
    path: '/event_store.cluster.Elections/ViewChangeProof',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.ViewChangeProofRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_ViewChangeProofRequest,
    requestDeserialize: deserialize_event_store_cluster_ViewChangeProofRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  prepare: {
    path: '/event_store.cluster.Elections/Prepare',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.PrepareRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_PrepareRequest,
    requestDeserialize: deserialize_event_store_cluster_PrepareRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  prepareOk: {
    path: '/event_store.cluster.Elections/PrepareOk',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.PrepareOkRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_PrepareOkRequest,
    requestDeserialize: deserialize_event_store_cluster_PrepareOkRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  proposal: {
    path: '/event_store.cluster.Elections/Proposal',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.ProposalRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_ProposalRequest,
    requestDeserialize: deserialize_event_store_cluster_ProposalRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  accept: {
    path: '/event_store.cluster.Elections/Accept',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.AcceptRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_AcceptRequest,
    requestDeserialize: deserialize_event_store_cluster_AcceptRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  leaderIsResigning: {
    path: '/event_store.cluster.Elections/LeaderIsResigning',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.LeaderIsResigningRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_LeaderIsResigningRequest,
    requestDeserialize: deserialize_event_store_cluster_LeaderIsResigningRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  leaderIsResigningOk: {
    path: '/event_store.cluster.Elections/LeaderIsResigningOk',
    requestStream: false,
    responseStream: false,
    requestType: cluster_pb.LeaderIsResigningOkRequest,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_cluster_LeaderIsResigningOkRequest,
    requestDeserialize: deserialize_event_store_cluster_LeaderIsResigningOkRequest,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
};

exports.ElectionsClient = grpc.makeGenericClientConstructor(ElectionsService);
