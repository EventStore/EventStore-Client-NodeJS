// package: event_store.cluster
// file: cluster.proto

import * as jspb from "google-protobuf";
import * as shared_pb from "./shared_pb";

export class GossipRequest extends jspb.Message {
  hasInfo(): boolean;
  clearInfo(): void;
  getInfo(): ClusterInfo | undefined;
  setInfo(value?: ClusterInfo): void;

  hasServer(): boolean;
  clearServer(): void;
  getServer(): EndPoint | undefined;
  setServer(value?: EndPoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GossipRequest): GossipRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipRequest;
  static deserializeBinaryFromReader(message: GossipRequest, reader: jspb.BinaryReader): GossipRequest;
}

export namespace GossipRequest {
  export type AsObject = {
    info?: ClusterInfo.AsObject,
    server?: EndPoint.AsObject,
  }
}

export class ViewChangeRequest extends jspb.Message {
  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  getAttemptedView(): number;
  setAttemptedView(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ViewChangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ViewChangeRequest): ViewChangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ViewChangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ViewChangeRequest;
  static deserializeBinaryFromReader(message: ViewChangeRequest, reader: jspb.BinaryReader): ViewChangeRequest;
}

export namespace ViewChangeRequest {
  export type AsObject = {
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
    attemptedView: number,
  }
}

export class ViewChangeProofRequest extends jspb.Message {
  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  getInstalledView(): number;
  setInstalledView(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ViewChangeProofRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ViewChangeProofRequest): ViewChangeProofRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ViewChangeProofRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ViewChangeProofRequest;
  static deserializeBinaryFromReader(message: ViewChangeProofRequest, reader: jspb.BinaryReader): ViewChangeProofRequest;
}

export namespace ViewChangeProofRequest {
  export type AsObject = {
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
    installedView: number,
  }
}

export class PrepareRequest extends jspb.Message {
  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  getView(): number;
  setView(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrepareRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PrepareRequest): PrepareRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PrepareRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PrepareRequest;
  static deserializeBinaryFromReader(message: PrepareRequest, reader: jspb.BinaryReader): PrepareRequest;
}

export namespace PrepareRequest {
  export type AsObject = {
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
    view: number,
  }
}

export class PrepareOkRequest extends jspb.Message {
  getView(): number;
  setView(value: number): void;

  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  getEpochNumber(): number;
  setEpochNumber(value: number): void;

  getEpochPosition(): number;
  setEpochPosition(value: number): void;

  hasEpochId(): boolean;
  clearEpochId(): void;
  getEpochId(): shared_pb.UUID | undefined;
  setEpochId(value?: shared_pb.UUID): void;

  hasEpochLeaderInstanceId(): boolean;
  clearEpochLeaderInstanceId(): void;
  getEpochLeaderInstanceId(): shared_pb.UUID | undefined;
  setEpochLeaderInstanceId(value?: shared_pb.UUID): void;

  getLastCommitPosition(): number;
  setLastCommitPosition(value: number): void;

  getWriterCheckpoint(): number;
  setWriterCheckpoint(value: number): void;

  getChaserCheckpoint(): number;
  setChaserCheckpoint(value: number): void;

  getNodePriority(): number;
  setNodePriority(value: number): void;

  hasClusterInfo(): boolean;
  clearClusterInfo(): void;
  getClusterInfo(): ClusterInfo | undefined;
  setClusterInfo(value?: ClusterInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrepareOkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PrepareOkRequest): PrepareOkRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PrepareOkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PrepareOkRequest;
  static deserializeBinaryFromReader(message: PrepareOkRequest, reader: jspb.BinaryReader): PrepareOkRequest;
}

export namespace PrepareOkRequest {
  export type AsObject = {
    view: number,
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
    epochNumber: number,
    epochPosition: number,
    epochId?: shared_pb.UUID.AsObject,
    epochLeaderInstanceId?: shared_pb.UUID.AsObject,
    lastCommitPosition: number,
    writerCheckpoint: number,
    chaserCheckpoint: number,
    nodePriority: number,
    clusterInfo?: ClusterInfo.AsObject,
  }
}

export class ProposalRequest extends jspb.Message {
  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  hasLeaderId(): boolean;
  clearLeaderId(): void;
  getLeaderId(): shared_pb.UUID | undefined;
  setLeaderId(value?: shared_pb.UUID): void;

  hasLeaderHttp(): boolean;
  clearLeaderHttp(): void;
  getLeaderHttp(): EndPoint | undefined;
  setLeaderHttp(value?: EndPoint): void;

  getView(): number;
  setView(value: number): void;

  getEpochNumber(): number;
  setEpochNumber(value: number): void;

  getEpochPosition(): number;
  setEpochPosition(value: number): void;

  hasEpochId(): boolean;
  clearEpochId(): void;
  getEpochId(): shared_pb.UUID | undefined;
  setEpochId(value?: shared_pb.UUID): void;

  hasEpochLeaderInstanceId(): boolean;
  clearEpochLeaderInstanceId(): void;
  getEpochLeaderInstanceId(): shared_pb.UUID | undefined;
  setEpochLeaderInstanceId(value?: shared_pb.UUID): void;

  getLastCommitPosition(): number;
  setLastCommitPosition(value: number): void;

  getWriterCheckpoint(): number;
  setWriterCheckpoint(value: number): void;

  getChaserCheckpoint(): number;
  setChaserCheckpoint(value: number): void;

  getNodePriority(): number;
  setNodePriority(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProposalRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProposalRequest): ProposalRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProposalRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProposalRequest;
  static deserializeBinaryFromReader(message: ProposalRequest, reader: jspb.BinaryReader): ProposalRequest;
}

export namespace ProposalRequest {
  export type AsObject = {
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
    leaderId?: shared_pb.UUID.AsObject,
    leaderHttp?: EndPoint.AsObject,
    view: number,
    epochNumber: number,
    epochPosition: number,
    epochId?: shared_pb.UUID.AsObject,
    epochLeaderInstanceId?: shared_pb.UUID.AsObject,
    lastCommitPosition: number,
    writerCheckpoint: number,
    chaserCheckpoint: number,
    nodePriority: number,
  }
}

export class AcceptRequest extends jspb.Message {
  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  hasLeaderId(): boolean;
  clearLeaderId(): void;
  getLeaderId(): shared_pb.UUID | undefined;
  setLeaderId(value?: shared_pb.UUID): void;

  hasLeaderHttp(): boolean;
  clearLeaderHttp(): void;
  getLeaderHttp(): EndPoint | undefined;
  setLeaderHttp(value?: EndPoint): void;

  getView(): number;
  setView(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AcceptRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AcceptRequest): AcceptRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AcceptRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AcceptRequest;
  static deserializeBinaryFromReader(message: AcceptRequest, reader: jspb.BinaryReader): AcceptRequest;
}

export namespace AcceptRequest {
  export type AsObject = {
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
    leaderId?: shared_pb.UUID.AsObject,
    leaderHttp?: EndPoint.AsObject,
    view: number,
  }
}

export class LeaderIsResigningRequest extends jspb.Message {
  hasLeaderId(): boolean;
  clearLeaderId(): void;
  getLeaderId(): shared_pb.UUID | undefined;
  setLeaderId(value?: shared_pb.UUID): void;

  hasLeaderHttp(): boolean;
  clearLeaderHttp(): void;
  getLeaderHttp(): EndPoint | undefined;
  setLeaderHttp(value?: EndPoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaderIsResigningRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LeaderIsResigningRequest): LeaderIsResigningRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LeaderIsResigningRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaderIsResigningRequest;
  static deserializeBinaryFromReader(message: LeaderIsResigningRequest, reader: jspb.BinaryReader): LeaderIsResigningRequest;
}

export namespace LeaderIsResigningRequest {
  export type AsObject = {
    leaderId?: shared_pb.UUID.AsObject,
    leaderHttp?: EndPoint.AsObject,
  }
}

export class LeaderIsResigningOkRequest extends jspb.Message {
  hasLeaderId(): boolean;
  clearLeaderId(): void;
  getLeaderId(): shared_pb.UUID | undefined;
  setLeaderId(value?: shared_pb.UUID): void;

  hasLeaderHttp(): boolean;
  clearLeaderHttp(): void;
  getLeaderHttp(): EndPoint | undefined;
  setLeaderHttp(value?: EndPoint): void;

  hasServerId(): boolean;
  clearServerId(): void;
  getServerId(): shared_pb.UUID | undefined;
  setServerId(value?: shared_pb.UUID): void;

  hasServerHttp(): boolean;
  clearServerHttp(): void;
  getServerHttp(): EndPoint | undefined;
  setServerHttp(value?: EndPoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaderIsResigningOkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LeaderIsResigningOkRequest): LeaderIsResigningOkRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LeaderIsResigningOkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaderIsResigningOkRequest;
  static deserializeBinaryFromReader(message: LeaderIsResigningOkRequest, reader: jspb.BinaryReader): LeaderIsResigningOkRequest;
}

export namespace LeaderIsResigningOkRequest {
  export type AsObject = {
    leaderId?: shared_pb.UUID.AsObject,
    leaderHttp?: EndPoint.AsObject,
    serverId?: shared_pb.UUID.AsObject,
    serverHttp?: EndPoint.AsObject,
  }
}

export class ClusterInfo extends jspb.Message {
  clearMembersList(): void;
  getMembersList(): Array<MemberInfo>;
  setMembersList(value: Array<MemberInfo>): void;
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
  setAddress(value: string): void;

  getPort(): number;
  setPort(value: number): void;

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
  setInstanceId(value?: shared_pb.UUID): void;

  getTimeStamp(): number;
  setTimeStamp(value: number): void;

  getState(): MemberInfo.VNodeStateMap[keyof MemberInfo.VNodeStateMap];
  setState(value: MemberInfo.VNodeStateMap[keyof MemberInfo.VNodeStateMap]): void;

  getIsAlive(): boolean;
  setIsAlive(value: boolean): void;

  hasHttpEndPoint(): boolean;
  clearHttpEndPoint(): void;
  getHttpEndPoint(): EndPoint | undefined;
  setHttpEndPoint(value?: EndPoint): void;

  hasInternalTcp(): boolean;
  clearInternalTcp(): void;
  getInternalTcp(): EndPoint | undefined;
  setInternalTcp(value?: EndPoint): void;

  hasExternalTcp(): boolean;
  clearExternalTcp(): void;
  getExternalTcp(): EndPoint | undefined;
  setExternalTcp(value?: EndPoint): void;

  getInternalTcpUsesTls(): boolean;
  setInternalTcpUsesTls(value: boolean): void;

  getExternalTcpUsesTls(): boolean;
  setExternalTcpUsesTls(value: boolean): void;

  getLastCommitPosition(): number;
  setLastCommitPosition(value: number): void;

  getWriterCheckpoint(): number;
  setWriterCheckpoint(value: number): void;

  getChaserCheckpoint(): number;
  setChaserCheckpoint(value: number): void;

  getEpochPosition(): number;
  setEpochPosition(value: number): void;

  getEpochNumber(): number;
  setEpochNumber(value: number): void;

  hasEpochId(): boolean;
  clearEpochId(): void;
  getEpochId(): shared_pb.UUID | undefined;
  setEpochId(value?: shared_pb.UUID): void;

  getNodePriority(): number;
  setNodePriority(value: number): void;

  getIsReadOnlyReplica(): boolean;
  setIsReadOnlyReplica(value: boolean): void;

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
    timeStamp: number,
    state: MemberInfo.VNodeStateMap[keyof MemberInfo.VNodeStateMap],
    isAlive: boolean,
    httpEndPoint?: EndPoint.AsObject,
    internalTcp?: EndPoint.AsObject,
    externalTcp?: EndPoint.AsObject,
    internalTcpUsesTls: boolean,
    externalTcpUsesTls: boolean,
    lastCommitPosition: number,
    writerCheckpoint: number,
    chaserCheckpoint: number,
    epochPosition: number,
    epochNumber: number,
    epochId?: shared_pb.UUID.AsObject,
    nodePriority: number,
    isReadOnlyReplica: boolean,
  }

  export interface VNodeStateMap {
    INITIALIZING: 0;
    DISCOVERLEADER: 1;
    UNKNOWN: 2;
    PREREPLICA: 3;
    CATCHINGUP: 4;
    CLONE: 5;
    FOLLOWER: 6;
    PRELEADER: 7;
    LEADER: 8;
    MANAGER: 9;
    SHUTTINGDOWN: 10;
    SHUTDOWN: 11;
    READONLYLEADERLESS: 12;
    PREREADONLYREPLICA: 13;
    READONLYREPLICA: 14;
    RESIGNINGLEADER: 15;
  }

  export const VNodeState: VNodeStateMap;
}

