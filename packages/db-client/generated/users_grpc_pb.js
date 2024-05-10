// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var users_pb = require('./users_pb.js');

function serialize_event_store_client_users_ChangePasswordReq(arg) {
  if (!(arg instanceof users_pb.ChangePasswordReq)) {
    throw new Error('Expected argument of type event_store.client.users.ChangePasswordReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_ChangePasswordReq(buffer_arg) {
  return users_pb.ChangePasswordReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_ChangePasswordResp(arg) {
  if (!(arg instanceof users_pb.ChangePasswordResp)) {
    throw new Error('Expected argument of type event_store.client.users.ChangePasswordResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_ChangePasswordResp(buffer_arg) {
  return users_pb.ChangePasswordResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_CreateReq(arg) {
  if (!(arg instanceof users_pb.CreateReq)) {
    throw new Error('Expected argument of type event_store.client.users.CreateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_CreateReq(buffer_arg) {
  return users_pb.CreateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_CreateResp(arg) {
  if (!(arg instanceof users_pb.CreateResp)) {
    throw new Error('Expected argument of type event_store.client.users.CreateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_CreateResp(buffer_arg) {
  return users_pb.CreateResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_DeleteReq(arg) {
  if (!(arg instanceof users_pb.DeleteReq)) {
    throw new Error('Expected argument of type event_store.client.users.DeleteReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_DeleteReq(buffer_arg) {
  return users_pb.DeleteReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_DeleteResp(arg) {
  if (!(arg instanceof users_pb.DeleteResp)) {
    throw new Error('Expected argument of type event_store.client.users.DeleteResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_DeleteResp(buffer_arg) {
  return users_pb.DeleteResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_DetailsReq(arg) {
  if (!(arg instanceof users_pb.DetailsReq)) {
    throw new Error('Expected argument of type event_store.client.users.DetailsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_DetailsReq(buffer_arg) {
  return users_pb.DetailsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_DetailsResp(arg) {
  if (!(arg instanceof users_pb.DetailsResp)) {
    throw new Error('Expected argument of type event_store.client.users.DetailsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_DetailsResp(buffer_arg) {
  return users_pb.DetailsResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_DisableReq(arg) {
  if (!(arg instanceof users_pb.DisableReq)) {
    throw new Error('Expected argument of type event_store.client.users.DisableReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_DisableReq(buffer_arg) {
  return users_pb.DisableReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_DisableResp(arg) {
  if (!(arg instanceof users_pb.DisableResp)) {
    throw new Error('Expected argument of type event_store.client.users.DisableResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_DisableResp(buffer_arg) {
  return users_pb.DisableResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_EnableReq(arg) {
  if (!(arg instanceof users_pb.EnableReq)) {
    throw new Error('Expected argument of type event_store.client.users.EnableReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_EnableReq(buffer_arg) {
  return users_pb.EnableReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_EnableResp(arg) {
  if (!(arg instanceof users_pb.EnableResp)) {
    throw new Error('Expected argument of type event_store.client.users.EnableResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_EnableResp(buffer_arg) {
  return users_pb.EnableResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_ResetPasswordReq(arg) {
  if (!(arg instanceof users_pb.ResetPasswordReq)) {
    throw new Error('Expected argument of type event_store.client.users.ResetPasswordReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_ResetPasswordReq(buffer_arg) {
  return users_pb.ResetPasswordReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_ResetPasswordResp(arg) {
  if (!(arg instanceof users_pb.ResetPasswordResp)) {
    throw new Error('Expected argument of type event_store.client.users.ResetPasswordResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_ResetPasswordResp(buffer_arg) {
  return users_pb.ResetPasswordResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_UpdateReq(arg) {
  if (!(arg instanceof users_pb.UpdateReq)) {
    throw new Error('Expected argument of type event_store.client.users.UpdateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_UpdateReq(buffer_arg) {
  return users_pb.UpdateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_event_store_client_users_UpdateResp(arg) {
  if (!(arg instanceof users_pb.UpdateResp)) {
    throw new Error('Expected argument of type event_store.client.users.UpdateResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_event_store_client_users_UpdateResp(buffer_arg) {
  return users_pb.UpdateResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  create: {
    path: '/event_store.client.users.Users/Create',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.CreateReq,
    responseType: users_pb.CreateResp,
    requestSerialize: serialize_event_store_client_users_CreateReq,
    requestDeserialize: deserialize_event_store_client_users_CreateReq,
    responseSerialize: serialize_event_store_client_users_CreateResp,
    responseDeserialize: deserialize_event_store_client_users_CreateResp,
  },
  update: {
    path: '/event_store.client.users.Users/Update',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UpdateReq,
    responseType: users_pb.UpdateResp,
    requestSerialize: serialize_event_store_client_users_UpdateReq,
    requestDeserialize: deserialize_event_store_client_users_UpdateReq,
    responseSerialize: serialize_event_store_client_users_UpdateResp,
    responseDeserialize: deserialize_event_store_client_users_UpdateResp,
  },
  delete: {
    path: '/event_store.client.users.Users/Delete',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.DeleteReq,
    responseType: users_pb.DeleteResp,
    requestSerialize: serialize_event_store_client_users_DeleteReq,
    requestDeserialize: deserialize_event_store_client_users_DeleteReq,
    responseSerialize: serialize_event_store_client_users_DeleteResp,
    responseDeserialize: deserialize_event_store_client_users_DeleteResp,
  },
  disable: {
    path: '/event_store.client.users.Users/Disable',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.DisableReq,
    responseType: users_pb.DisableResp,
    requestSerialize: serialize_event_store_client_users_DisableReq,
    requestDeserialize: deserialize_event_store_client_users_DisableReq,
    responseSerialize: serialize_event_store_client_users_DisableResp,
    responseDeserialize: deserialize_event_store_client_users_DisableResp,
  },
  enable: {
    path: '/event_store.client.users.Users/Enable',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.EnableReq,
    responseType: users_pb.EnableResp,
    requestSerialize: serialize_event_store_client_users_EnableReq,
    requestDeserialize: deserialize_event_store_client_users_EnableReq,
    responseSerialize: serialize_event_store_client_users_EnableResp,
    responseDeserialize: deserialize_event_store_client_users_EnableResp,
  },
  details: {
    path: '/event_store.client.users.Users/Details',
    requestStream: false,
    responseStream: true,
    requestType: users_pb.DetailsReq,
    responseType: users_pb.DetailsResp,
    requestSerialize: serialize_event_store_client_users_DetailsReq,
    requestDeserialize: deserialize_event_store_client_users_DetailsReq,
    responseSerialize: serialize_event_store_client_users_DetailsResp,
    responseDeserialize: deserialize_event_store_client_users_DetailsResp,
  },
  changePassword: {
    path: '/event_store.client.users.Users/ChangePassword',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.ChangePasswordReq,
    responseType: users_pb.ChangePasswordResp,
    requestSerialize: serialize_event_store_client_users_ChangePasswordReq,
    requestDeserialize: deserialize_event_store_client_users_ChangePasswordReq,
    responseSerialize: serialize_event_store_client_users_ChangePasswordResp,
    responseDeserialize: deserialize_event_store_client_users_ChangePasswordResp,
  },
  resetPassword: {
    path: '/event_store.client.users.Users/ResetPassword',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.ResetPasswordReq,
    responseType: users_pb.ResetPasswordResp,
    requestSerialize: serialize_event_store_client_users_ResetPasswordReq,
    requestDeserialize: deserialize_event_store_client_users_ResetPasswordReq,
    responseSerialize: serialize_event_store_client_users_ResetPasswordResp,
    responseDeserialize: deserialize_event_store_client_users_ResetPasswordResp,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
