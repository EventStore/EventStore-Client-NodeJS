// package: google.rpc
// file: status.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as code_pb from "./code_pb";

export class Status extends jspb.Message { 
    getCode(): code_pb.Code;
    setCode(value: code_pb.Code): Status;
    getMessage(): string;
    setMessage(value: string): Status;

    hasDetails(): boolean;
    clearDetails(): void;
    getDetails(): google_protobuf_any_pb.Any | undefined;
    setDetails(value?: google_protobuf_any_pb.Any): Status;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Status.AsObject;
    static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Status;
    static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
    export type AsObject = {
        code: code_pb.Code,
        message: string,
        details?: google_protobuf_any_pb.Any.AsObject,
    }
}
