// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var persistent_pb = require('./persistent_pb.js');
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

function serialize_event_store_client_persistent_subscriptions_CreateReq(arg) {
  if (!(arg instanceof persistent_pb.CreateReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.CreateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_CreateReq(buffer_arg) {
  return persistent_pb.CreateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_CreateResp(arg) {
  if (!(arg instanceof persistent_pb.CreateResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.CreateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_CreateResp(buffer_arg) {
  return persistent_pb.CreateResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_DeleteReq(arg) {
  if (!(arg instanceof persistent_pb.DeleteReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.DeleteReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_DeleteReq(buffer_arg) {
  return persistent_pb.DeleteReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_DeleteResp(arg) {
  if (!(arg instanceof persistent_pb.DeleteResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.DeleteResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_DeleteResp(buffer_arg) {
  return persistent_pb.DeleteResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_GetInfoReq(arg) {
  if (!(arg instanceof persistent_pb.GetInfoReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.GetInfoReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_GetInfoReq(buffer_arg) {
  return persistent_pb.GetInfoReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_GetInfoResp(arg) {
  if (!(arg instanceof persistent_pb.GetInfoResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.GetInfoResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_GetInfoResp(buffer_arg) {
  return persistent_pb.GetInfoResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_ListReq(arg) {
  if (!(arg instanceof persistent_pb.ListReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.ListReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_ListReq(buffer_arg) {
  return persistent_pb.ListReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_ListResp(arg) {
  if (!(arg instanceof persistent_pb.ListResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.ListResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_ListResp(buffer_arg) {
  return persistent_pb.ListResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_ReadReq(arg) {
  if (!(arg instanceof persistent_pb.ReadReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.ReadReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_ReadReq(buffer_arg) {
  return persistent_pb.ReadReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_ReadResp(arg) {
  if (!(arg instanceof persistent_pb.ReadResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.ReadResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_ReadResp(buffer_arg) {
  return persistent_pb.ReadResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_ReplayParkedReq(arg) {
  if (!(arg instanceof persistent_pb.ReplayParkedReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.ReplayParkedReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_ReplayParkedReq(buffer_arg) {
  return persistent_pb.ReplayParkedReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_ReplayParkedResp(arg) {
  if (!(arg instanceof persistent_pb.ReplayParkedResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.ReplayParkedResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_ReplayParkedResp(buffer_arg) {
  return persistent_pb.ReplayParkedResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_UpdateReq(arg) {
  if (!(arg instanceof persistent_pb.UpdateReq)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.UpdateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_UpdateReq(buffer_arg) {
  return persistent_pb.UpdateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_persistent_subscriptions_UpdateResp(arg) {
  if (!(arg instanceof persistent_pb.UpdateResp)) {
    throw new Error('Expected argument of type event_store.client.persistent_subscriptions.UpdateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_persistent_subscriptions_UpdateResp(buffer_arg) {
  return persistent_pb.UpdateResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var PersistentSubscriptionsService = exports.PersistentSubscriptionsService = {
  create: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/Create',
    requestStream: false,
    responseStream: false,
    requestType: persistent_pb.CreateReq,
    responseType: persistent_pb.CreateResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_CreateReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_CreateReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_CreateResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_CreateResp,
  },
  update: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/Update',
    requestStream: false,
    responseStream: false,
    requestType: persistent_pb.UpdateReq,
    responseType: persistent_pb.UpdateResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_UpdateReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_UpdateReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_UpdateResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_UpdateResp,
  },
  delete: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/Delete',
    requestStream: false,
    responseStream: false,
    requestType: persistent_pb.DeleteReq,
    responseType: persistent_pb.DeleteResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_DeleteReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_DeleteReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_DeleteResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_DeleteResp,
  },
  read: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/Read',
    requestStream: true,
    responseStream: true,
    requestType: persistent_pb.ReadReq,
    responseType: persistent_pb.ReadResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_ReadReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_ReadReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_ReadResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_ReadResp,
  },
  getInfo: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/GetInfo',
    requestStream: false,
    responseStream: false,
    requestType: persistent_pb.GetInfoReq,
    responseType: persistent_pb.GetInfoResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_GetInfoReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_GetInfoReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_GetInfoResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_GetInfoResp,
  },
  replayParked: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/ReplayParked',
    requestStream: false,
    responseStream: false,
    requestType: persistent_pb.ReplayParkedReq,
    responseType: persistent_pb.ReplayParkedResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_ReplayParkedReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_ReplayParkedReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_ReplayParkedResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_ReplayParkedResp,
  },
  list: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/List',
    requestStream: false,
    responseStream: false,
    requestType: persistent_pb.ListReq,
    responseType: persistent_pb.ListResp,
    requestSerialize: serialize_event_store_client_persistent_subscriptions_ListReq,
    requestDeserialize: deserialize_event_store_client_persistent_subscriptions_ListReq,
    responseSerialize: serialize_event_store_client_persistent_subscriptions_ListResp,
    responseDeserialize: deserialize_event_store_client_persistent_subscriptions_ListResp,
  },
  restartSubsystem: {
    path: '/event_store.client.persistent_subscriptions.PersistentSubscriptions/RestartSubsystem',
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

exports.PersistentSubscriptionsClient = grpc.makeGenericClientConstructor(PersistentSubscriptionsService);
