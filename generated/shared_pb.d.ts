// package: event_store.client
// file: shared.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class UUID extends jspb.Message { 

    hasStructured(): boolean;
    clearStructured(): void;
    getStructured(): UUID.Structured | undefined;
    setStructured(value?: UUID.Structured): UUID;

    hasString(): boolean;
    clearString(): void;
    getString(): string;
    setString(value: string): UUID;

    getValueCase(): UUID.ValueCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UUID.AsObject;
    static toObject(includeInstance: boolean, msg: UUID): UUID.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UUID, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UUID;
    static deserializeBinaryFromReader(message: UUID, reader: jspb.BinaryReader): UUID;
}

export namespace UUID {
    export type AsObject = {
        structured?: UUID.Structured.AsObject,
        string: string,
    }


    export class Structured extends jspb.Message { 
        getMostSignificantBits(): string;
        setMostSignificantBits(value: string): Structured;
        getLeastSignificantBits(): string;
        setLeastSignificantBits(value: string): Structured;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Structured.AsObject;
        static toObject(includeInstance: boolean, msg: Structured): Structured.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Structured, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Structured;
        static deserializeBinaryFromReader(message: Structured, reader: jspb.BinaryReader): Structured;
    }

    export namespace Structured {
        export type AsObject = {
            mostSignificantBits: string,
            leastSignificantBits: string,
        }
    }


    export enum ValueCase {
        VALUE_NOT_SET = 0,
        STRUCTURED = 1,
        STRING = 2,
    }

}

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class StreamIdentifier extends jspb.Message { 
    getStreamName(): Uint8Array | string;
    getStreamName_asU8(): Uint8Array;
    getStreamName_asB64(): string;
    setStreamName(value: Uint8Array | string): StreamIdentifier;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StreamIdentifier.AsObject;
    static toObject(includeInstance: boolean, msg: StreamIdentifier): StreamIdentifier.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StreamIdentifier, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StreamIdentifier;
    static deserializeBinaryFromReader(message: StreamIdentifier, reader: jspb.BinaryReader): StreamIdentifier;
}

export namespace StreamIdentifier {
    export type AsObject = {
        streamName: Uint8Array | string,
    }
}

export class AllStreamPosition extends jspb.Message { 
    getCommitPosition(): string;
    setCommitPosition(value: string): AllStreamPosition;
    getPreparePosition(): string;
    setPreparePosition(value: string): AllStreamPosition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AllStreamPosition.AsObject;
    static toObject(includeInstance: boolean, msg: AllStreamPosition): AllStreamPosition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AllStreamPosition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AllStreamPosition;
    static deserializeBinaryFromReader(message: AllStreamPosition, reader: jspb.BinaryReader): AllStreamPosition;
}

export namespace AllStreamPosition {
    export type AsObject = {
        commitPosition: string,
        preparePosition: string,
    }
}

export class WrongExpectedVersion extends jspb.Message { 

    hasCurrentStreamRevision(): boolean;
    clearCurrentStreamRevision(): void;
    getCurrentStreamRevision(): string;
    setCurrentStreamRevision(value: string): WrongExpectedVersion;

    hasCurrentNoStream(): boolean;
    clearCurrentNoStream(): void;
    getCurrentNoStream(): google_protobuf_empty_pb.Empty | undefined;
    setCurrentNoStream(value?: google_protobuf_empty_pb.Empty): WrongExpectedVersion;

    hasExpectedStreamPosition(): boolean;
    clearExpectedStreamPosition(): void;
    getExpectedStreamPosition(): string;
    setExpectedStreamPosition(value: string): WrongExpectedVersion;

    hasExpectedAny(): boolean;
    clearExpectedAny(): void;
    getExpectedAny(): google_protobuf_empty_pb.Empty | undefined;
    setExpectedAny(value?: google_protobuf_empty_pb.Empty): WrongExpectedVersion;

    hasExpectedStreamExists(): boolean;
    clearExpectedStreamExists(): void;
    getExpectedStreamExists(): google_protobuf_empty_pb.Empty | undefined;
    setExpectedStreamExists(value?: google_protobuf_empty_pb.Empty): WrongExpectedVersion;

    hasExpectedNoStream(): boolean;
    clearExpectedNoStream(): void;
    getExpectedNoStream(): google_protobuf_empty_pb.Empty | undefined;
    setExpectedNoStream(value?: google_protobuf_empty_pb.Empty): WrongExpectedVersion;

    getCurrentStreamRevisionOptionCase(): WrongExpectedVersion.CurrentStreamRevisionOptionCase;
    getExpectedStreamPositionOptionCase(): WrongExpectedVersion.ExpectedStreamPositionOptionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WrongExpectedVersion.AsObject;
    static toObject(includeInstance: boolean, msg: WrongExpectedVersion): WrongExpectedVersion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WrongExpectedVersion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WrongExpectedVersion;
    static deserializeBinaryFromReader(message: WrongExpectedVersion, reader: jspb.BinaryReader): WrongExpectedVersion;
}

export namespace WrongExpectedVersion {
    export type AsObject = {
        currentStreamRevision: string,
        currentNoStream?: google_protobuf_empty_pb.Empty.AsObject,
        expectedStreamPosition: string,
        expectedAny?: google_protobuf_empty_pb.Empty.AsObject,
        expectedStreamExists?: google_protobuf_empty_pb.Empty.AsObject,
        expectedNoStream?: google_protobuf_empty_pb.Empty.AsObject,
    }

    export enum CurrentStreamRevisionOptionCase {
        CURRENT_STREAM_REVISION_OPTION_NOT_SET = 0,
        CURRENT_STREAM_REVISION = 1,
        CURRENT_NO_STREAM = 2,
    }

    export enum ExpectedStreamPositionOptionCase {
        EXPECTED_STREAM_POSITION_OPTION_NOT_SET = 0,
        EXPECTED_STREAM_POSITION = 3,
        EXPECTED_ANY = 4,
        EXPECTED_STREAM_EXISTS = 5,
        EXPECTED_NO_STREAM = 6,
    }

}

export class AccessDenied extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessDenied.AsObject;
    static toObject(includeInstance: boolean, msg: AccessDenied): AccessDenied.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessDenied, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessDenied;
    static deserializeBinaryFromReader(message: AccessDenied, reader: jspb.BinaryReader): AccessDenied;
}

export namespace AccessDenied {
    export type AsObject = {
    }
}

export class StreamDeleted extends jspb.Message { 

    hasStreamIdentifier(): boolean;
    clearStreamIdentifier(): void;
    getStreamIdentifier(): StreamIdentifier | undefined;
    setStreamIdentifier(value?: StreamIdentifier): StreamDeleted;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StreamDeleted.AsObject;
    static toObject(includeInstance: boolean, msg: StreamDeleted): StreamDeleted.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StreamDeleted, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StreamDeleted;
    static deserializeBinaryFromReader(message: StreamDeleted, reader: jspb.BinaryReader): StreamDeleted;
}

export namespace StreamDeleted {
    export type AsObject = {
        streamIdentifier?: StreamIdentifier.AsObject,
    }
}

export class Timeout extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Timeout.AsObject;
    static toObject(includeInstance: boolean, msg: Timeout): Timeout.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Timeout, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Timeout;
    static deserializeBinaryFromReader(message: Timeout, reader: jspb.BinaryReader): Timeout;
}

export namespace Timeout {
    export type AsObject = {
    }
}

export class Unknown extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Unknown.AsObject;
    static toObject(includeInstance: boolean, msg: Unknown): Unknown.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Unknown, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Unknown;
    static deserializeBinaryFromReader(message: Unknown, reader: jspb.BinaryReader): Unknown;
}

export namespace Unknown {
    export type AsObject = {
    }
}

export class InvalidTransaction extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvalidTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: InvalidTransaction): InvalidTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvalidTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvalidTransaction;
    static deserializeBinaryFromReader(message: InvalidTransaction, reader: jspb.BinaryReader): InvalidTransaction;
}

export namespace InvalidTransaction {
    export type AsObject = {
    }
}

export class MaximumAppendSizeExceeded extends jspb.Message { 
    getMaxappendsize(): number;
    setMaxappendsize(value: number): MaximumAppendSizeExceeded;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MaximumAppendSizeExceeded.AsObject;
    static toObject(includeInstance: boolean, msg: MaximumAppendSizeExceeded): MaximumAppendSizeExceeded.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MaximumAppendSizeExceeded, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MaximumAppendSizeExceeded;
    static deserializeBinaryFromReader(message: MaximumAppendSizeExceeded, reader: jspb.BinaryReader): MaximumAppendSizeExceeded;
}

export namespace MaximumAppendSizeExceeded {
    export type AsObject = {
        maxappendsize: number,
    }
}

export class BadRequest extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): BadRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BadRequest): BadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BadRequest;
    static deserializeBinaryFromReader(message: BadRequest, reader: jspb.BinaryReader): BadRequest;
}

export namespace BadRequest {
    export type AsObject = {
        message: string,
    }
}
