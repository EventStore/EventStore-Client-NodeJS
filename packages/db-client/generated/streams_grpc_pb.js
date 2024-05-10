// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var streams_pb = require('./streams_pb.js');
var shared_pb = require('./shared_pb.js');
var status_pb = require('./status_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_event_store_client_streams_AppendReq(arg) {
  if (!(arg instanceof streams_pb.AppendReq)) {
    throw new Error('Expected argument of type event_store.client.streams.AppendReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_AppendReq(buffer_arg) {
  return streams_pb.AppendReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_AppendResp(arg) {
  if (!(arg instanceof streams_pb.AppendResp)) {
    throw new Error('Expected argument of type event_store.client.streams.AppendResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_AppendResp(buffer_arg) {
  return streams_pb.AppendResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_BatchAppendReq(arg) {
  if (!(arg instanceof streams_pb.BatchAppendReq)) {
    throw new Error('Expected argument of type event_store.client.streams.BatchAppendReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_BatchAppendReq(buffer_arg) {
  return streams_pb.BatchAppendReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_BatchAppendResp(arg) {
  if (!(arg instanceof streams_pb.BatchAppendResp)) {
    throw new Error('Expected argument of type event_store.client.streams.BatchAppendResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_BatchAppendResp(buffer_arg) {
  return streams_pb.BatchAppendResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_DeleteReq(arg) {
  if (!(arg instanceof streams_pb.DeleteReq)) {
    throw new Error('Expected argument of type event_store.client.streams.DeleteReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_DeleteReq(buffer_arg) {
  return streams_pb.DeleteReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_DeleteResp(arg) {
  if (!(arg instanceof streams_pb.DeleteResp)) {
    throw new Error('Expected argument of type event_store.client.streams.DeleteResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_DeleteResp(buffer_arg) {
  return streams_pb.DeleteResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_ReadReq(arg) {
  if (!(arg instanceof streams_pb.ReadReq)) {
    throw new Error('Expected argument of type event_store.client.streams.ReadReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_ReadReq(buffer_arg) {
  return streams_pb.ReadReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_ReadResp(arg) {
  if (!(arg instanceof streams_pb.ReadResp)) {
    throw new Error('Expected argument of type event_store.client.streams.ReadResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_ReadResp(buffer_arg) {
  return streams_pb.ReadResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_TombstoneReq(arg) {
  if (!(arg instanceof streams_pb.TombstoneReq)) {
    throw new Error('Expected argument of type event_store.client.streams.TombstoneReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_TombstoneReq(buffer_arg) {
  return streams_pb.TombstoneReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_streams_TombstoneResp(arg) {
  if (!(arg instanceof streams_pb.TombstoneResp)) {
    throw new Error('Expected argument of type event_store.client.streams.TombstoneResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_streams_TombstoneResp(buffer_arg) {
  return streams_pb.TombstoneResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var StreamsService = exports.StreamsService = {
  read: {
    path: '/event_store.client.streams.Streams/Read',
    requestStream: false,
    responseStream: true,
    requestType: streams_pb.ReadReq,
    responseType: streams_pb.ReadResp,
    requestSerialize: serialize_event_store_client_streams_ReadReq,
    requestDeserialize: deserialize_event_store_client_streams_ReadReq,
    responseSerialize: serialize_event_store_client_streams_ReadResp,
    responseDeserialize: deserialize_event_store_client_streams_ReadResp,
  },
  append: {
    path: '/event_store.client.streams.Streams/Append',
    requestStream: true,
    responseStream: false,
    requestType: streams_pb.AppendReq,
    responseType: streams_pb.AppendResp,
    requestSerialize: serialize_event_store_client_streams_AppendReq,
    requestDeserialize: deserialize_event_store_client_streams_AppendReq,
    responseSerialize: serialize_event_store_client_streams_AppendResp,
    responseDeserialize: deserialize_event_store_client_streams_AppendResp,
  },
  delete: {
    path: '/event_store.client.streams.Streams/Delete',
    requestStream: false,
    responseStream: false,
    requestType: streams_pb.DeleteReq,
    responseType: streams_pb.DeleteResp,
    requestSerialize: serialize_event_store_client_streams_DeleteReq,
    requestDeserialize: deserialize_event_store_client_streams_DeleteReq,
    responseSerialize: serialize_event_store_client_streams_DeleteResp,
    responseDeserialize: deserialize_event_store_client_streams_DeleteResp,
  },
  tombstone: {
    path: '/event_store.client.streams.Streams/Tombstone',
    requestStream: false,
    responseStream: false,
    requestType: streams_pb.TombstoneReq,
    responseType: streams_pb.TombstoneResp,
    requestSerialize: serialize_event_store_client_streams_TombstoneReq,
    requestDeserialize: deserialize_event_store_client_streams_TombstoneReq,
    responseSerialize: serialize_event_store_client_streams_TombstoneResp,
    responseDeserialize: deserialize_event_store_client_streams_TombstoneResp,
  },
  batchAppend: {
    path: '/event_store.client.streams.Streams/BatchAppend',
    requestStream: true,
    responseStream: true,
    requestType: streams_pb.BatchAppendReq,
    responseType: streams_pb.BatchAppendResp,
    requestSerialize: serialize_event_store_client_streams_BatchAppendReq,
    requestDeserialize: deserialize_event_store_client_streams_BatchAppendReq,
    responseSerialize: serialize_event_store_client_streams_BatchAppendResp,
    responseDeserialize: deserialize_event_store_client_streams_BatchAppendResp,
  },
};

exports.StreamsClient = grpc.makeGenericClientConstructor(StreamsService);
