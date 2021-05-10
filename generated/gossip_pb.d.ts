// package: event_store.client.gossip
// file: gossip.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as shared_pb from "./shared_pb";

export class ClusterInfo extends jspb.Message { 
    clearMembersList(): void;
    getMembersList(): Array<MemberInfo>;
    setMembersList(value: Array<MemberInfo>): ClusterInfo;
    addMembers(value?: MemberInfo, index?: number): MemberInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClusterInfo.AsObject;
    static toObject(includeInstance: boolean, msg: ClusterInfo): ClusterInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClusterInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClusterInfo;
    static deserializeBinaryFromReader(message: ClusterInfo, reader: jspb.BinaryReader): ClusterInfo;
}

export namespace ClusterInfo {
    export type AsObject = {
        membersList: Array<MemberInfo.AsObject>,
    }
}

export class EndPoint extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): EndPoint;
    getPort(): number;
    setPort(value: number): EndPoint;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EndPoint.AsObject;
    static toObject(includeInstance: boolean, msg: EndPoint): EndPoint.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EndPoint, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EndPoint;
    static deserializeBinaryFromReader(message: EndPoint, reader: jspb.BinaryReader): EndPoint;
}

export namespace EndPoint {
    export type AsObject = {
        address: string,
        port: number,
    }
}

export class MemberInfo extends jspb.Message { 

    hasInstanceId(): boolean;
    clearInstanceId(): void;
    getInstanceId(): shared_pb.UUID | undefined;
    setInstanceId(value?: shared_pb.UUID): MemberInfo;
    getTimeStamp(): string;
    setTimeStamp(value: string): MemberInfo;
    getState(): MemberInfo.VNodeState;
    setState(value: MemberInfo.VNodeState): MemberInfo;
    getIsAlive(): boolean;
    setIsAlive(value: boolean): MemberInfo;

    hasHttpEndPoint(): boolean;
    clearHttpEndPoint(): void;
    getHttpEndPoint(): EndPoint | undefined;
    setHttpEndPoint(value?: EndPoint): MemberInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MemberInfo.AsObject;
    static toObject(includeInstance: boolean, msg: MemberInfo): MemberInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MemberInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MemberInfo;
    static deserializeBinaryFromReader(message: MemberInfo, reader: jspb.BinaryReader): MemberInfo;
}

export namespace MemberInfo {
    export type AsObject = {
        instanceId?: shared_pb.UUID.AsObject,
        timeStamp: string,
        state: MemberInfo.VNodeState,
        isAlive: boolean,
        httpEndPoint?: EndPoint.AsObject,
    }

    export enum VNodeState {
    INITIALIZING = 0,
    DISCOVERLEADER = 1,
    UNKNOWN = 2,
    PREREPLICA = 3,
    CATCHINGUP = 4,
    CLONE = 5,
    FOLLOWER = 6,
    PRELEADER = 7,
    LEADER = 8,
    MANAGER = 9,
    SHUTTINGDOWN = 10,
    SHUTDOWN = 11,
    READONLYLEADERLESS = 12,
    PREREADONLYREPLICA = 13,
    READONLYREPLICA = 14,
    RESIGNINGLEADER = 15,
    }

}
