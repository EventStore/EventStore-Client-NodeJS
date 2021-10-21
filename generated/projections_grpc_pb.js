// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var projections_pb = require('./projections_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
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

function serialize_event_store_client_projections_CreateReq(arg) {
  if (!(arg instanceof projections_pb.CreateReq)) {
    throw new Error('Expected argument of type event_store.client.projections.CreateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_CreateReq(buffer_arg) {
  return projections_pb.CreateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_CreateResp(arg) {
  if (!(arg instanceof projections_pb.CreateResp)) {
    throw new Error('Expected argument of type event_store.client.projections.CreateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_CreateResp(buffer_arg) {
  return projections_pb.CreateResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_DeleteReq(arg) {
  if (!(arg instanceof projections_pb.DeleteReq)) {
    throw new Error('Expected argument of type event_store.client.projections.DeleteReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_DeleteReq(buffer_arg) {
  return projections_pb.DeleteReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_DeleteResp(arg) {
  if (!(arg instanceof projections_pb.DeleteResp)) {
    throw new Error('Expected argument of type event_store.client.projections.DeleteResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_DeleteResp(buffer_arg) {
  return projections_pb.DeleteResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_DisableReq(arg) {
  if (!(arg instanceof projections_pb.DisableReq)) {
    throw new Error('Expected argument of type event_store.client.projections.DisableReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_DisableReq(buffer_arg) {
  return projections_pb.DisableReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_DisableResp(arg) {
  if (!(arg instanceof projections_pb.DisableResp)) {
    throw new Error('Expected argument of type event_store.client.projections.DisableResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_DisableResp(buffer_arg) {
  return projections_pb.DisableResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_EnableReq(arg) {
  if (!(arg instanceof projections_pb.EnableReq)) {
    throw new Error('Expected argument of type event_store.client.projections.EnableReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_EnableReq(buffer_arg) {
  return projections_pb.EnableReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_EnableResp(arg) {
  if (!(arg instanceof projections_pb.EnableResp)) {
    throw new Error('Expected argument of type event_store.client.projections.EnableResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_EnableResp(buffer_arg) {
  return projections_pb.EnableResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_ResetReq(arg) {
  if (!(arg instanceof projections_pb.ResetReq)) {
    throw new Error('Expected argument of type event_store.client.projections.ResetReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_ResetReq(buffer_arg) {
  return projections_pb.ResetReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_ResetResp(arg) {
  if (!(arg instanceof projections_pb.ResetResp)) {
    throw new Error('Expected argument of type event_store.client.projections.ResetResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_ResetResp(buffer_arg) {
  return projections_pb.ResetResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_ResultReq(arg) {
  if (!(arg instanceof projections_pb.ResultReq)) {
    throw new Error('Expected argument of type event_store.client.projections.ResultReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_ResultReq(buffer_arg) {
  return projections_pb.ResultReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_ResultResp(arg) {
  if (!(arg instanceof projections_pb.ResultResp)) {
    throw new Error('Expected argument of type event_store.client.projections.ResultResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_ResultResp(buffer_arg) {
  return projections_pb.ResultResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_StateReq(arg) {
  if (!(arg instanceof projections_pb.StateReq)) {
    throw new Error('Expected argument of type event_store.client.projections.StateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_StateReq(buffer_arg) {
  return projections_pb.StateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_StateResp(arg) {
  if (!(arg instanceof projections_pb.StateResp)) {
    throw new Error('Expected argument of type event_store.client.projections.StateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_StateResp(buffer_arg) {
  return projections_pb.StateResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_StatisticsReq(arg) {
  if (!(arg instanceof projections_pb.StatisticsReq)) {
    throw new Error('Expected argument of type event_store.client.projections.StatisticsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_StatisticsReq(buffer_arg) {
  return projections_pb.StatisticsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_StatisticsResp(arg) {
  if (!(arg instanceof projections_pb.StatisticsResp)) {
    throw new Error('Expected argument of type event_store.client.projections.StatisticsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_StatisticsResp(buffer_arg) {
  return projections_pb.StatisticsResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_UpdateReq(arg) {
  if (!(arg instanceof projections_pb.UpdateReq)) {
    throw new Error('Expected argument of type event_store.client.projections.UpdateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_UpdateReq(buffer_arg) {
  return projections_pb.UpdateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_projections_UpdateResp(arg) {
  if (!(arg instanceof projections_pb.UpdateResp)) {
    throw new Error('Expected argument of type event_store.client.projections.UpdateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_projections_UpdateResp(buffer_arg) {
  return projections_pb.UpdateResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProjectionsService = exports.ProjectionsService = {
  create: {
    path: '/event_store.client.projections.Projections/Create',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.CreateReq,
    responseType: projections_pb.CreateResp,
    requestSerialize: serialize_event_store_client_projections_CreateReq,
    requestDeserialize: deserialize_event_store_client_projections_CreateReq,
    responseSerialize: serialize_event_store_client_projections_CreateResp,
    responseDeserialize: deserialize_event_store_client_projections_CreateResp,
  },
  update: {
    path: '/event_store.client.projections.Projections/Update',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.UpdateReq,
    responseType: projections_pb.UpdateResp,
    requestSerialize: serialize_event_store_client_projections_UpdateReq,
    requestDeserialize: deserialize_event_store_client_projections_UpdateReq,
    responseSerialize: serialize_event_store_client_projections_UpdateResp,
    responseDeserialize: deserialize_event_store_client_projections_UpdateResp,
  },
  delete: {
    path: '/event_store.client.projections.Projections/Delete',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.DeleteReq,
    responseType: projections_pb.DeleteResp,
    requestSerialize: serialize_event_store_client_projections_DeleteReq,
    requestDeserialize: deserialize_event_store_client_projections_DeleteReq,
    responseSerialize: serialize_event_store_client_projections_DeleteResp,
    responseDeserialize: deserialize_event_store_client_projections_DeleteResp,
  },
  statistics: {
    path: '/event_store.client.projections.Projections/Statistics',
    requestStream: false,
    responseStream: true,
    requestType: projections_pb.StatisticsReq,
    responseType: projections_pb.StatisticsResp,
    requestSerialize: serialize_event_store_client_projections_StatisticsReq,
    requestDeserialize: deserialize_event_store_client_projections_StatisticsReq,
    responseSerialize: serialize_event_store_client_projections_StatisticsResp,
    responseDeserialize: deserialize_event_store_client_projections_StatisticsResp,
  },
  disable: {
    path: '/event_store.client.projections.Projections/Disable',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.DisableReq,
    responseType: projections_pb.DisableResp,
    requestSerialize: serialize_event_store_client_projections_DisableReq,
    requestDeserialize: deserialize_event_store_client_projections_DisableReq,
    responseSerialize: serialize_event_store_client_projections_DisableResp,
    responseDeserialize: deserialize_event_store_client_projections_DisableResp,
  },
  enable: {
    path: '/event_store.client.projections.Projections/Enable',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.EnableReq,
    responseType: projections_pb.EnableResp,
    requestSerialize: serialize_event_store_client_projections_EnableReq,
    requestDeserialize: deserialize_event_store_client_projections_EnableReq,
    responseSerialize: serialize_event_store_client_projections_EnableResp,
    responseDeserialize: deserialize_event_store_client_projections_EnableResp,
  },
  reset: {
    path: '/event_store.client.projections.Projections/Reset',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.ResetReq,
    responseType: projections_pb.ResetResp,
    requestSerialize: serialize_event_store_client_projections_ResetReq,
    requestDeserialize: deserialize_event_store_client_projections_ResetReq,
    responseSerialize: serialize_event_store_client_projections_ResetResp,
    responseDeserialize: deserialize_event_store_client_projections_ResetResp,
  },
  state: {
    path: '/event_store.client.projections.Projections/State',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.StateReq,
    responseType: projections_pb.StateResp,
    requestSerialize: serialize_event_store_client_projections_StateReq,
    requestDeserialize: deserialize_event_store_client_projections_StateReq,
    responseSerialize: serialize_event_store_client_projections_StateResp,
    responseDeserialize: deserialize_event_store_client_projections_StateResp,
  },
  result: {
    path: '/event_store.client.projections.Projections/Result',
    requestStream: false,
    responseStream: false,
    requestType: projections_pb.ResultReq,
    responseType: projections_pb.ResultResp,
    requestSerialize: serialize_event_store_client_projections_ResultReq,
    requestDeserialize: deserialize_event_store_client_projections_ResultReq,
    responseSerialize: serialize_event_store_client_projections_ResultResp,
    responseDeserialize: deserialize_event_store_client_projections_ResultResp,
  },
  restartSubsystem: {
    path: '/event_store.client.projections.Projections/RestartSubsystem',
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

exports.ProjectionsClient = grpc.makeGenericClientConstructor(ProjectionsService);
