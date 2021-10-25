// package: event_store.client.users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as users_pb from "./users_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IUsersService_ICreate;
    update: IUsersService_IUpdate;
    delete: IUsersService_IDelete;
    disable: IUsersService_IDisable;
    enable: IUsersService_IEnable;
    details: IUsersService_IDetails;
    changePassword: IUsersService_IChangePassword;
    resetPassword: IUsersService_IResetPassword;
}

interface IUsersService_ICreate extends grpc.MethodDefinition<users_pb.CreateReq, users_pb.CreateResp> {
    path: "/event_store.client.users.Users/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.CreateReq>;
    requestDeserialize: grpc.deserialize<users_pb.CreateReq>;
    responseSerialize: grpc.serialize<users_pb.CreateResp>;
    responseDeserialize: grpc.deserialize<users_pb.CreateResp>;
}
interface IUsersService_IUpdate extends grpc.MethodDefinition<users_pb.UpdateReq, users_pb.UpdateResp> {
    path: "/event_store.client.users.Users/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.UpdateReq>;
    requestDeserialize: grpc.deserialize<users_pb.UpdateReq>;
    responseSerialize: grpc.serialize<users_pb.UpdateResp>;
    responseDeserialize: grpc.deserialize<users_pb.UpdateResp>;
}
interface IUsersService_IDelete extends grpc.MethodDefinition<users_pb.DeleteReq, users_pb.DeleteResp> {
    path: "/event_store.client.users.Users/Delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.DeleteReq>;
    requestDeserialize: grpc.deserialize<users_pb.DeleteReq>;
    responseSerialize: grpc.serialize<users_pb.DeleteResp>;
    responseDeserialize: grpc.deserialize<users_pb.DeleteResp>;
}
interface IUsersService_IDisable extends grpc.MethodDefinition<users_pb.DisableReq, users_pb.DisableResp> {
    path: "/event_store.client.users.Users/Disable";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.DisableReq>;
    requestDeserialize: grpc.deserialize<users_pb.DisableReq>;
    responseSerialize: grpc.serialize<users_pb.DisableResp>;
    responseDeserialize: grpc.deserialize<users_pb.DisableResp>;
}
interface IUsersService_IEnable extends grpc.MethodDefinition<users_pb.EnableReq, users_pb.EnableResp> {
    path: "/event_store.client.users.Users/Enable";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.EnableReq>;
    requestDeserialize: grpc.deserialize<users_pb.EnableReq>;
    responseSerialize: grpc.serialize<users_pb.EnableResp>;
    responseDeserialize: grpc.deserialize<users_pb.EnableResp>;
}
interface IUsersService_IDetails extends grpc.MethodDefinition<users_pb.DetailsReq, users_pb.DetailsResp> {
    path: "/event_store.client.users.Users/Details";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<users_pb.DetailsReq>;
    requestDeserialize: grpc.deserialize<users_pb.DetailsReq>;
    responseSerialize: grpc.serialize<users_pb.DetailsResp>;
    responseDeserialize: grpc.deserialize<users_pb.DetailsResp>;
}
interface IUsersService_IChangePassword extends grpc.MethodDefinition<users_pb.ChangePasswordReq, users_pb.ChangePasswordResp> {
    path: "/event_store.client.users.Users/ChangePassword";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.ChangePasswordReq>;
    requestDeserialize: grpc.deserialize<users_pb.ChangePasswordReq>;
    responseSerialize: grpc.serialize<users_pb.ChangePasswordResp>;
    responseDeserialize: grpc.deserialize<users_pb.ChangePasswordResp>;
}
interface IUsersService_IResetPassword extends grpc.MethodDefinition<users_pb.ResetPasswordReq, users_pb.ResetPasswordResp> {
    path: "/event_store.client.users.Users/ResetPassword";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.ResetPasswordReq>;
    requestDeserialize: grpc.deserialize<users_pb.ResetPasswordReq>;
    responseSerialize: grpc.serialize<users_pb.ResetPasswordResp>;
    responseDeserialize: grpc.deserialize<users_pb.ResetPasswordResp>;
}

export const UsersService: IUsersService;

export interface IUsersServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<users_pb.CreateReq, users_pb.CreateResp>;
    update: grpc.handleUnaryCall<users_pb.UpdateReq, users_pb.UpdateResp>;
    delete: grpc.handleUnaryCall<users_pb.DeleteReq, users_pb.DeleteResp>;
    disable: grpc.handleUnaryCall<users_pb.DisableReq, users_pb.DisableResp>;
    enable: grpc.handleUnaryCall<users_pb.EnableReq, users_pb.EnableResp>;
    details: grpc.handleServerStreamingCall<users_pb.DetailsReq, users_pb.DetailsResp>;
    changePassword: grpc.handleUnaryCall<users_pb.ChangePasswordReq, users_pb.ChangePasswordResp>;
    resetPassword: grpc.handleUnaryCall<users_pb.ResetPasswordReq, users_pb.ResetPasswordResp>;
}

export interface IUsersClient {
    create(request: users_pb.CreateReq, callback: (error: grpc.ServiceError | null, response: users_pb.CreateResp) => void): grpc.ClientUnaryCall;
    create(request: users_pb.CreateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.CreateResp) => void): grpc.ClientUnaryCall;
    create(request: users_pb.CreateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.CreateResp) => void): grpc.ClientUnaryCall;
    update(request: users_pb.UpdateReq, callback: (error: grpc.ServiceError | null, response: users_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    update(request: users_pb.UpdateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    update(request: users_pb.UpdateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    delete(request: users_pb.DeleteReq, callback: (error: grpc.ServiceError | null, response: users_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    delete(request: users_pb.DeleteReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    delete(request: users_pb.DeleteReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    disable(request: users_pb.DisableReq, callback: (error: grpc.ServiceError | null, response: users_pb.DisableResp) => void): grpc.ClientUnaryCall;
    disable(request: users_pb.DisableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DisableResp) => void): grpc.ClientUnaryCall;
    disable(request: users_pb.DisableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DisableResp) => void): grpc.ClientUnaryCall;
    enable(request: users_pb.EnableReq, callback: (error: grpc.ServiceError | null, response: users_pb.EnableResp) => void): grpc.ClientUnaryCall;
    enable(request: users_pb.EnableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.EnableResp) => void): grpc.ClientUnaryCall;
    enable(request: users_pb.EnableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.EnableResp) => void): grpc.ClientUnaryCall;
    details(request: users_pb.DetailsReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<users_pb.DetailsResp>;
    details(request: users_pb.DetailsReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<users_pb.DetailsResp>;
    changePassword(request: users_pb.ChangePasswordReq, callback: (error: grpc.ServiceError | null, response: users_pb.ChangePasswordResp) => void): grpc.ClientUnaryCall;
    changePassword(request: users_pb.ChangePasswordReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.ChangePasswordResp) => void): grpc.ClientUnaryCall;
    changePassword(request: users_pb.ChangePasswordReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.ChangePasswordResp) => void): grpc.ClientUnaryCall;
    resetPassword(request: users_pb.ResetPasswordReq, callback: (error: grpc.ServiceError | null, response: users_pb.ResetPasswordResp) => void): grpc.ClientUnaryCall;
    resetPassword(request: users_pb.ResetPasswordReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.ResetPasswordResp) => void): grpc.ClientUnaryCall;
    resetPassword(request: users_pb.ResetPasswordReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.ResetPasswordResp) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public create(request: users_pb.CreateReq, callback: (error: grpc.ServiceError | null, response: users_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public create(request: users_pb.CreateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public create(request: users_pb.CreateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.CreateResp) => void): grpc.ClientUnaryCall;
    public update(request: users_pb.UpdateReq, callback: (error: grpc.ServiceError | null, response: users_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public update(request: users_pb.UpdateReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public update(request: users_pb.UpdateReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UpdateResp) => void): grpc.ClientUnaryCall;
    public delete(request: users_pb.DeleteReq, callback: (error: grpc.ServiceError | null, response: users_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public delete(request: users_pb.DeleteReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public delete(request: users_pb.DeleteReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DeleteResp) => void): grpc.ClientUnaryCall;
    public disable(request: users_pb.DisableReq, callback: (error: grpc.ServiceError | null, response: users_pb.DisableResp) => void): grpc.ClientUnaryCall;
    public disable(request: users_pb.DisableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DisableResp) => void): grpc.ClientUnaryCall;
    public disable(request: users_pb.DisableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DisableResp) => void): grpc.ClientUnaryCall;
    public enable(request: users_pb.EnableReq, callback: (error: grpc.ServiceError | null, response: users_pb.EnableResp) => void): grpc.ClientUnaryCall;
    public enable(request: users_pb.EnableReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.EnableResp) => void): grpc.ClientUnaryCall;
    public enable(request: users_pb.EnableReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.EnableResp) => void): grpc.ClientUnaryCall;
    public details(request: users_pb.DetailsReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<users_pb.DetailsResp>;
    public details(request: users_pb.DetailsReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<users_pb.DetailsResp>;
    public changePassword(request: users_pb.ChangePasswordReq, callback: (error: grpc.ServiceError | null, response: users_pb.ChangePasswordResp) => void): grpc.ClientUnaryCall;
    public changePassword(request: users_pb.ChangePasswordReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.ChangePasswordResp) => void): grpc.ClientUnaryCall;
    public changePassword(request: users_pb.ChangePasswordReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.ChangePasswordResp) => void): grpc.ClientUnaryCall;
    public resetPassword(request: users_pb.ResetPasswordReq, callback: (error: grpc.ServiceError | null, response: users_pb.ResetPasswordResp) => void): grpc.ClientUnaryCall;
    public resetPassword(request: users_pb.ResetPasswordReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.ResetPasswordResp) => void): grpc.ClientUnaryCall;
    public resetPassword(request: users_pb.ResetPasswordReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.ResetPasswordResp) => void): grpc.ClientUnaryCall;
}
