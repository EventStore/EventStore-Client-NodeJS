// package: event_store.client.users
// file: users.proto

import * as users_pb from "./users_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UsersCreate = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.CreateReq;
  readonly responseType: typeof users_pb.CreateResp;
};

type UsersUpdate = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.UpdateReq;
  readonly responseType: typeof users_pb.UpdateResp;
};

type UsersDelete = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.DeleteReq;
  readonly responseType: typeof users_pb.DeleteResp;
};

type UsersDisable = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.DisableReq;
  readonly responseType: typeof users_pb.DisableResp;
};

type UsersEnable = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.EnableReq;
  readonly responseType: typeof users_pb.EnableResp;
};

type UsersDetails = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof users_pb.DetailsReq;
  readonly responseType: typeof users_pb.DetailsResp;
};

type UsersChangePassword = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.ChangePasswordReq;
  readonly responseType: typeof users_pb.ChangePasswordResp;
};

type UsersResetPassword = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof users_pb.ResetPasswordReq;
  readonly responseType: typeof users_pb.ResetPasswordResp;
};

export class Users {
  static readonly serviceName: string;
  static readonly Create: UsersCreate;
  static readonly Update: UsersUpdate;
  static readonly Delete: UsersDelete;
  static readonly Disable: UsersDisable;
  static readonly Enable: UsersEnable;
  static readonly Details: UsersDetails;
  static readonly ChangePassword: UsersChangePassword;
  static readonly ResetPassword: UsersResetPassword;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class UsersClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  create(
    requestMessage: users_pb.CreateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.CreateResp|null) => void
  ): UnaryResponse;
  create(
    requestMessage: users_pb.CreateReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.CreateResp|null) => void
  ): UnaryResponse;
  update(
    requestMessage: users_pb.UpdateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.UpdateResp|null) => void
  ): UnaryResponse;
  update(
    requestMessage: users_pb.UpdateReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.UpdateResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: users_pb.DeleteReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.DeleteResp|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: users_pb.DeleteReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.DeleteResp|null) => void
  ): UnaryResponse;
  disable(
    requestMessage: users_pb.DisableReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.DisableResp|null) => void
  ): UnaryResponse;
  disable(
    requestMessage: users_pb.DisableReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.DisableResp|null) => void
  ): UnaryResponse;
  enable(
    requestMessage: users_pb.EnableReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.EnableResp|null) => void
  ): UnaryResponse;
  enable(
    requestMessage: users_pb.EnableReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.EnableResp|null) => void
  ): UnaryResponse;
  details(requestMessage: users_pb.DetailsReq, metadata?: grpc.Metadata): ResponseStream<users_pb.DetailsResp>;
  changePassword(
    requestMessage: users_pb.ChangePasswordReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.ChangePasswordResp|null) => void
  ): UnaryResponse;
  changePassword(
    requestMessage: users_pb.ChangePasswordReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.ChangePasswordResp|null) => void
  ): UnaryResponse;
  resetPassword(
    requestMessage: users_pb.ResetPasswordReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: users_pb.ResetPasswordResp|null) => void
  ): UnaryResponse;
  resetPassword(
    requestMessage: users_pb.ResetPasswordReq,
    callback: (error: ServiceError|null, responseMessage: users_pb.ResetPasswordResp|null) => void
  ): UnaryResponse;
}

