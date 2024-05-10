// package: event_store.client.operations
// file: operations.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as shared_pb from "./shared_pb";

export class StartScavengeReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): StartScavengeReq.Options | undefined;
    setOptions(value?: StartScavengeReq.Options): StartScavengeReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartScavengeReq.AsObject;
    static toObject(includeInstance: boolean, msg: StartScavengeReq): StartScavengeReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartScavengeReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartScavengeReq;
    static deserializeBinaryFromReader(message: StartScavengeReq, reader: jspb.BinaryReader): StartScavengeReq;
}

export namespace StartScavengeReq {
    export type AsObject = {
        options?: StartScavengeReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getThreadCount(): number;
        setThreadCount(value: number): Options;
        getStartFromChunk(): number;
        setStartFromChunk(value: number): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            threadCount: number,
            startFromChunk: number,
        }
    }

}

export class StopScavengeReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): StopScavengeReq.Options | undefined;
    setOptions(value?: StopScavengeReq.Options): StopScavengeReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopScavengeReq.AsObject;
    static toObject(includeInstance: boolean, msg: StopScavengeReq): StopScavengeReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopScavengeReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopScavengeReq;
    static deserializeBinaryFromReader(message: StopScavengeReq, reader: jspb.BinaryReader): StopScavengeReq;
}

export namespace StopScavengeReq {
    export type AsObject = {
        options?: StopScavengeReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getScavengeId(): string;
        setScavengeId(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            scavengeId: string,
        }
    }

}

export class ScavengeResp extends jspb.Message { 
    getScavengeId(): string;
    setScavengeId(value: string): ScavengeResp;
    getScavengeResult(): ScavengeResp.ScavengeResult;
    setScavengeResult(value: ScavengeResp.ScavengeResult): ScavengeResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScavengeResp.AsObject;
    static toObject(includeInstance: boolean, msg: ScavengeResp): ScavengeResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScavengeResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScavengeResp;
    static deserializeBinaryFromReader(message: ScavengeResp, reader: jspb.BinaryReader): ScavengeResp;
}

export namespace ScavengeResp {
    export type AsObject = {
        scavengeId: string,
        scavengeResult: ScavengeResp.ScavengeResult,
    }

    export enum ScavengeResult {
    STARTED = 0,
    INPROGRESS = 1,
    STOPPED = 2,
    }

}

export class SetNodePriorityReq extends jspb.Message { 
    getPriority(): number;
    setPriority(value: number): SetNodePriorityReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetNodePriorityReq.AsObject;
    static toObject(includeInstance: boolean, msg: SetNodePriorityReq): SetNodePriorityReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetNodePriorityReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetNodePriorityReq;
    static deserializeBinaryFromReader(message: SetNodePriorityReq, reader: jspb.BinaryReader): SetNodePriorityReq;
}

export namespace SetNodePriorityReq {
    export type AsObject = {
        priority: number,
    }
}
