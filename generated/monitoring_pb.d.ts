// package: event_store.client.monitoring
// file: monitoring.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class StatsReq extends jspb.Message { 
    getUseMetadata(): boolean;
    setUseMetadata(value: boolean): StatsReq;
    getRefreshTimePeriodInMs(): string;
    setRefreshTimePeriodInMs(value: string): StatsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatsReq.AsObject;
    static toObject(includeInstance: boolean, msg: StatsReq): StatsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatsReq;
    static deserializeBinaryFromReader(message: StatsReq, reader: jspb.BinaryReader): StatsReq;
}

export namespace StatsReq {
    export type AsObject = {
        useMetadata: boolean,
        refreshTimePeriodInMs: string,
    }
}

export class StatsResp extends jspb.Message { 

    getStatsMap(): jspb.Map<string, string>;
    clearStatsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatsResp.AsObject;
    static toObject(includeInstance: boolean, msg: StatsResp): StatsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatsResp;
    static deserializeBinaryFromReader(message: StatsResp, reader: jspb.BinaryReader): StatsResp;
}

export namespace StatsResp {
    export type AsObject = {

        statsMap: Array<[string, string]>,
    }
}
