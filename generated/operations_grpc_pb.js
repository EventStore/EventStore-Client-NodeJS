// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var operations_pb = require('./operations_pb.js');
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

function serialize_event_store_client_operations_ScavengeResp(arg) {
  if (!(arg instanceof operations_pb.ScavengeResp)) {
    throw new Error('Expected argument of type event_store.client.operations.ScavengeResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_operations_ScavengeResp(buffer_arg) {
  return operations_pb.ScavengeResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_operations_SetNodePriorityReq(arg) {
  if (!(arg instanceof operations_pb.SetNodePriorityReq)) {
    throw new Error('Expected argument of type event_store.client.operations.SetNodePriorityReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_operations_SetNodePriorityReq(buffer_arg) {
  return operations_pb.SetNodePriorityReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_operations_StartScavengeReq(arg) {
  if (!(arg instanceof operations_pb.StartScavengeReq)) {
    throw new Error('Expected argument of type event_store.client.operations.StartScavengeReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_operations_StartScavengeReq(buffer_arg) {
  return operations_pb.StartScavengeReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_operations_StopScavengeReq(arg) {
  if (!(arg instanceof operations_pb.StopScavengeReq)) {
    throw new Error('Expected argument of type event_store.client.operations.StopScavengeReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_operations_StopScavengeReq(buffer_arg) {
  return operations_pb.StopScavengeReq.deserializeBinary(new Uint8Array(buffer_arg));
}


var OperationsService = exports.OperationsService = {
  startScavenge: {
    path: '/event_store.client.operations.Operations/StartScavenge',
    requestStream: false,
    responseStream: false,
    requestType: operations_pb.StartScavengeReq,
    responseType: operations_pb.ScavengeResp,
    requestSerialize: serialize_event_store_client_operations_StartScavengeReq,
    requestDeserialize: deserialize_event_store_client_operations_StartScavengeReq,
    responseSerialize: serialize_event_store_client_operations_ScavengeResp,
    responseDeserialize: deserialize_event_store_client_operations_ScavengeResp,
  },
  stopScavenge: {
    path: '/event_store.client.operations.Operations/StopScavenge',
    requestStream: false,
    responseStream: false,
    requestType: operations_pb.StopScavengeReq,
    responseType: operations_pb.ScavengeResp,
    requestSerialize: serialize_event_store_client_operations_StopScavengeReq,
    requestDeserialize: deserialize_event_store_client_operations_StopScavengeReq,
    responseSerialize: serialize_event_store_client_operations_ScavengeResp,
    responseDeserialize: deserialize_event_store_client_operations_ScavengeResp,
  },
  shutdown: {
    path: '/event_store.client.operations.Operations/Shutdown',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  mergeIndexes: {
    path: '/event_store.client.operations.Operations/MergeIndexes',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  resignNode: {
    path: '/event_store.client.operations.Operations/ResignNode',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  setNodePriority: {
    path: '/event_store.client.operations.Operations/SetNodePriority',
    requestStream: false,
    responseStream: false,
    requestType: operations_pb.SetNodePriorityReq,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_client_operations_SetNodePriorityReq,
    requestDeserialize: deserialize_event_store_client_operations_SetNodePriorityReq,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
  restartPersistentSubscriptions: {
    path: '/event_store.client.operations.Operations/RestartPersistentSubscriptions',
    requestStream: false,
    responseStream: false,
    requestType: shared_pb.Empty,
    responseType: shared_pb.Empty,
    requestSerialize: serialize_event_store_client_Empty,
    requestDeserialize: deserialize_event_store_client_Empty,
    responseSerialize: serialize_event_store_client_Empty,
    responseDeserialize: deserialize_event_store_client_Empty,
  },
};

exports.OperationsClient = grpc.makeGenericClientConstructor(OperationsService);
