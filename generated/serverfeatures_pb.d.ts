// package: event_store.client.server_features
// file: serverfeatures.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as shared_pb from "./shared_pb";

export class SupportedMethods extends jspb.Message { 
    clearMethodsList(): void;
    getMethodsList(): Array<SupportedMethod>;
    setMethodsList(value: Array<SupportedMethod>): SupportedMethods;
    addMethods(value?: SupportedMethod, index?: number): SupportedMethod;
    getEventStoreServerVersion(): string;
    setEventStoreServerVersion(value: string): SupportedMethods;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SupportedMethods.AsObject;
    static toObject(includeInstance: boolean, msg: SupportedMethods): SupportedMethods.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SupportedMethods, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SupportedMethods;
    static deserializeBinaryFromReader(message: SupportedMethods, reader: jspb.BinaryReader): SupportedMethods;
}

export namespace SupportedMethods {
    export type AsObject = {
        methodsList: Array<SupportedMethod.AsObject>,
        eventStoreServerVersion: string,
    }
}

export class SupportedMethod extends jspb.Message { 
    getMethodName(): string;
    setMethodName(value: string): SupportedMethod;
    getServiceName(): string;
    setServiceName(value: string): SupportedMethod;
    clearFeaturesList(): void;
    getFeaturesList(): Array<string>;
    setFeaturesList(value: Array<string>): SupportedMethod;
    addFeatures(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SupportedMethod.AsObject;
    static toObject(includeInstance: boolean, msg: SupportedMethod): SupportedMethod.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SupportedMethod, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SupportedMethod;
    static deserializeBinaryFromReader(message: SupportedMethod, reader: jspb.BinaryReader): SupportedMethod;
}

export namespace SupportedMethod {
    export type AsObject = {
        methodName: string,
        serviceName: string,
        featuresList: Array<string>,
    }
}
