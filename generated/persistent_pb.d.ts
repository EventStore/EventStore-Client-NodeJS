// package: event_store.client.persistent_subscriptions
// file: persistent.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as shared_pb from "./shared_pb";

export class ReadReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ReadReq.Options | undefined;
    setOptions(value?: ReadReq.Options): ReadReq;


    hasAck(): boolean;
    clearAck(): void;
    getAck(): ReadReq.Ack | undefined;
    setAck(value?: ReadReq.Ack): ReadReq;


    hasNack(): boolean;
    clearNack(): void;
    getNack(): ReadReq.Nack | undefined;
    setNack(value?: ReadReq.Nack): ReadReq;


    getContentCase(): ReadReq.ContentCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadReq.AsObject;
    static toObject(includeInstance: boolean, msg: ReadReq): ReadReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadReq;
    static deserializeBinaryFromReader(message: ReadReq, reader: jspb.BinaryReader): ReadReq;
}

export namespace ReadReq {
    export type AsObject = {
        options?: ReadReq.Options.AsObject,
        ack?: ReadReq.Ack.AsObject,
        nack?: ReadReq.Nack.AsObject,
    }


    export class Options extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): Options;

        getGroupName(): string;
        setGroupName(value: string): Options;

        getBufferSize(): number;
        setBufferSize(value: number): Options;


        hasUuidOption(): boolean;
        clearUuidOption(): void;
        getUuidOption(): ReadReq.Options.UUIDOption | undefined;
        setUuidOption(value?: ReadReq.Options.UUIDOption): Options;


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
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            groupName: string,
            bufferSize: number,
            uuidOption?: ReadReq.Options.UUIDOption.AsObject,
        }


        export class UUIDOption extends jspb.Message { 

            hasStructured(): boolean;
            clearStructured(): void;
            getStructured(): shared_pb.Empty | undefined;
            setStructured(value?: shared_pb.Empty): UUIDOption;


            hasString(): boolean;
            clearString(): void;
            getString(): shared_pb.Empty | undefined;
            setString(value?: shared_pb.Empty): UUIDOption;


            getContentCase(): UUIDOption.ContentCase;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): UUIDOption.AsObject;
            static toObject(includeInstance: boolean, msg: UUIDOption): UUIDOption.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: UUIDOption, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): UUIDOption;
            static deserializeBinaryFromReader(message: UUIDOption, reader: jspb.BinaryReader): UUIDOption;
        }

        export namespace UUIDOption {
            export type AsObject = {
                structured?: shared_pb.Empty.AsObject,
                string?: shared_pb.Empty.AsObject,
            }

            export enum ContentCase {
                CONTENT_NOT_SET = 0,
            
    STRUCTURED = 1,

    STRING = 2,

            }

        }

    }

    export class Ack extends jspb.Message { 
        getId(): Uint8Array | string;
        getId_asU8(): Uint8Array;
        getId_asB64(): string;
        setId(value: Uint8Array | string): Ack;

        clearIdsList(): void;
        getIdsList(): Array<shared_pb.UUID>;
        setIdsList(value: Array<shared_pb.UUID>): Ack;
        addIds(value?: shared_pb.UUID, index?: number): shared_pb.UUID;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Ack.AsObject;
        static toObject(includeInstance: boolean, msg: Ack): Ack.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Ack, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Ack;
        static deserializeBinaryFromReader(message: Ack, reader: jspb.BinaryReader): Ack;
    }

    export namespace Ack {
        export type AsObject = {
            id: Uint8Array | string,
            idsList: Array<shared_pb.UUID.AsObject>,
        }
    }

    export class Nack extends jspb.Message { 
        getId(): Uint8Array | string;
        getId_asU8(): Uint8Array;
        getId_asB64(): string;
        setId(value: Uint8Array | string): Nack;

        clearIdsList(): void;
        getIdsList(): Array<shared_pb.UUID>;
        setIdsList(value: Array<shared_pb.UUID>): Nack;
        addIds(value?: shared_pb.UUID, index?: number): shared_pb.UUID;

        getAction(): ReadReq.Nack.Action;
        setAction(value: ReadReq.Nack.Action): Nack;

        getReason(): string;
        setReason(value: string): Nack;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Nack.AsObject;
        static toObject(includeInstance: boolean, msg: Nack): Nack.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Nack, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Nack;
        static deserializeBinaryFromReader(message: Nack, reader: jspb.BinaryReader): Nack;
    }

    export namespace Nack {
        export type AsObject = {
            id: Uint8Array | string,
            idsList: Array<shared_pb.UUID.AsObject>,
            action: ReadReq.Nack.Action,
            reason: string,
        }

        export enum Action {
    UNKNOWN = 0,
    PARK = 1,
    RETRY = 2,
    SKIP = 3,
    STOP = 4,
        }

    }


    export enum ContentCase {
        CONTENT_NOT_SET = 0,
    
    OPTIONS = 1,

    ACK = 2,

    NACK = 3,

    }

}

export class ReadResp extends jspb.Message { 

    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): ReadResp.ReadEvent | undefined;
    setEvent(value?: ReadResp.ReadEvent): ReadResp;


    hasSubscriptionConfirmation(): boolean;
    clearSubscriptionConfirmation(): void;
    getSubscriptionConfirmation(): ReadResp.SubscriptionConfirmation | undefined;
    setSubscriptionConfirmation(value?: ReadResp.SubscriptionConfirmation): ReadResp;


    getContentCase(): ReadResp.ContentCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadResp.AsObject;
    static toObject(includeInstance: boolean, msg: ReadResp): ReadResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadResp;
    static deserializeBinaryFromReader(message: ReadResp, reader: jspb.BinaryReader): ReadResp;
}

export namespace ReadResp {
    export type AsObject = {
        event?: ReadResp.ReadEvent.AsObject,
        subscriptionConfirmation?: ReadResp.SubscriptionConfirmation.AsObject,
    }


    export class ReadEvent extends jspb.Message { 

        hasEvent(): boolean;
        clearEvent(): void;
        getEvent(): ReadResp.ReadEvent.RecordedEvent | undefined;
        setEvent(value?: ReadResp.ReadEvent.RecordedEvent): ReadEvent;


        hasLink(): boolean;
        clearLink(): void;
        getLink(): ReadResp.ReadEvent.RecordedEvent | undefined;
        setLink(value?: ReadResp.ReadEvent.RecordedEvent): ReadEvent;


        hasCommitPosition(): boolean;
        clearCommitPosition(): void;
        getCommitPosition(): number;
        setCommitPosition(value: number): ReadEvent;


        hasNoPosition(): boolean;
        clearNoPosition(): void;
        getNoPosition(): shared_pb.Empty | undefined;
        setNoPosition(value?: shared_pb.Empty): ReadEvent;


        hasRetryCount(): boolean;
        clearRetryCount(): void;
        getRetryCount(): number;
        setRetryCount(value: number): ReadEvent;


        hasNoRetryCount(): boolean;
        clearNoRetryCount(): void;
        getNoRetryCount(): shared_pb.Empty | undefined;
        setNoRetryCount(value?: shared_pb.Empty): ReadEvent;


        getPositionCase(): ReadEvent.PositionCase;
        getCountCase(): ReadEvent.CountCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ReadEvent.AsObject;
        static toObject(includeInstance: boolean, msg: ReadEvent): ReadEvent.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ReadEvent, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ReadEvent;
        static deserializeBinaryFromReader(message: ReadEvent, reader: jspb.BinaryReader): ReadEvent;
    }

    export namespace ReadEvent {
        export type AsObject = {
            event?: ReadResp.ReadEvent.RecordedEvent.AsObject,
            link?: ReadResp.ReadEvent.RecordedEvent.AsObject,
            commitPosition: number,
            noPosition?: shared_pb.Empty.AsObject,
            retryCount: number,
            noRetryCount?: shared_pb.Empty.AsObject,
        }


        export class RecordedEvent extends jspb.Message { 

            hasId(): boolean;
            clearId(): void;
            getId(): shared_pb.UUID | undefined;
            setId(value?: shared_pb.UUID): RecordedEvent;


            hasStreamIdentifier(): boolean;
            clearStreamIdentifier(): void;
            getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
            setStreamIdentifier(value?: shared_pb.StreamIdentifier): RecordedEvent;

            getStreamRevision(): number;
            setStreamRevision(value: number): RecordedEvent;

            getPreparePosition(): number;
            setPreparePosition(value: number): RecordedEvent;

            getCommitPosition(): number;
            setCommitPosition(value: number): RecordedEvent;


            getMetadataMap(): jspb.Map<string, string>;
            clearMetadataMap(): void;

            getCustomMetadata(): Uint8Array | string;
            getCustomMetadata_asU8(): Uint8Array;
            getCustomMetadata_asB64(): string;
            setCustomMetadata(value: Uint8Array | string): RecordedEvent;

            getData(): Uint8Array | string;
            getData_asU8(): Uint8Array;
            getData_asB64(): string;
            setData(value: Uint8Array | string): RecordedEvent;


            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): RecordedEvent.AsObject;
            static toObject(includeInstance: boolean, msg: RecordedEvent): RecordedEvent.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: RecordedEvent, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): RecordedEvent;
            static deserializeBinaryFromReader(message: RecordedEvent, reader: jspb.BinaryReader): RecordedEvent;
        }

        export namespace RecordedEvent {
            export type AsObject = {
                id?: shared_pb.UUID.AsObject,
                streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
                streamRevision: number,
                preparePosition: number,
                commitPosition: number,

                metadataMap: Array<[string, string]>,
                customMetadata: Uint8Array | string,
                data: Uint8Array | string,
            }
        }


        export enum PositionCase {
            POSITION_NOT_SET = 0,
        
    COMMIT_POSITION = 3,

    NO_POSITION = 4,

        }

        export enum CountCase {
            COUNT_NOT_SET = 0,
        
    RETRY_COUNT = 5,

    NO_RETRY_COUNT = 6,

        }

    }

    export class SubscriptionConfirmation extends jspb.Message { 
        getSubscriptionId(): string;
        setSubscriptionId(value: string): SubscriptionConfirmation;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): SubscriptionConfirmation.AsObject;
        static toObject(includeInstance: boolean, msg: SubscriptionConfirmation): SubscriptionConfirmation.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: SubscriptionConfirmation, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): SubscriptionConfirmation;
        static deserializeBinaryFromReader(message: SubscriptionConfirmation, reader: jspb.BinaryReader): SubscriptionConfirmation;
    }

    export namespace SubscriptionConfirmation {
        export type AsObject = {
            subscriptionId: string,
        }
    }


    export enum ContentCase {
        CONTENT_NOT_SET = 0,
    
    EVENT = 1,

    SUBSCRIPTION_CONFIRMATION = 2,

    }

}

export class CreateReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): CreateReq.Options | undefined;
    setOptions(value?: CreateReq.Options): CreateReq;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateReq.AsObject;
    static toObject(includeInstance: boolean, msg: CreateReq): CreateReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateReq;
    static deserializeBinaryFromReader(message: CreateReq, reader: jspb.BinaryReader): CreateReq;
}

export namespace CreateReq {
    export type AsObject = {
        options?: CreateReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): Options;

        getGroupName(): string;
        setGroupName(value: string): Options;


        hasSettings(): boolean;
        clearSettings(): void;
        getSettings(): CreateReq.Settings | undefined;
        setSettings(value?: CreateReq.Settings): Options;


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
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            groupName: string,
            settings?: CreateReq.Settings.AsObject,
        }
    }

    export class Settings extends jspb.Message { 
        getResolveLinks(): boolean;
        setResolveLinks(value: boolean): Settings;

        getRevision(): number;
        setRevision(value: number): Settings;

        getExtraStatistics(): boolean;
        setExtraStatistics(value: boolean): Settings;

        getMaxRetryCount(): number;
        setMaxRetryCount(value: number): Settings;

        getMinCheckpointCount(): number;
        setMinCheckpointCount(value: number): Settings;

        getMaxCheckpointCount(): number;
        setMaxCheckpointCount(value: number): Settings;

        getMaxSubscriberCount(): number;
        setMaxSubscriberCount(value: number): Settings;

        getLiveBufferSize(): number;
        setLiveBufferSize(value: number): Settings;

        getReadBatchSize(): number;
        setReadBatchSize(value: number): Settings;

        getHistoryBufferSize(): number;
        setHistoryBufferSize(value: number): Settings;

        getNamedConsumerStrategy(): CreateReq.ConsumerStrategy;
        setNamedConsumerStrategy(value: CreateReq.ConsumerStrategy): Settings;


        hasMessageTimeoutTicks(): boolean;
        clearMessageTimeoutTicks(): void;
        getMessageTimeoutTicks(): number;
        setMessageTimeoutTicks(value: number): Settings;


        hasMessageTimeoutMs(): boolean;
        clearMessageTimeoutMs(): void;
        getMessageTimeoutMs(): number;
        setMessageTimeoutMs(value: number): Settings;


        hasCheckpointAfterTicks(): boolean;
        clearCheckpointAfterTicks(): void;
        getCheckpointAfterTicks(): number;
        setCheckpointAfterTicks(value: number): Settings;


        hasCheckpointAfterMs(): boolean;
        clearCheckpointAfterMs(): void;
        getCheckpointAfterMs(): number;
        setCheckpointAfterMs(value: number): Settings;


        getMessageTimeoutCase(): Settings.MessageTimeoutCase;
        getCheckpointAfterCase(): Settings.CheckpointAfterCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Settings.AsObject;
        static toObject(includeInstance: boolean, msg: Settings): Settings.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Settings, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Settings;
        static deserializeBinaryFromReader(message: Settings, reader: jspb.BinaryReader): Settings;
    }

    export namespace Settings {
        export type AsObject = {
            resolveLinks: boolean,
            revision: number,
            extraStatistics: boolean,
            maxRetryCount: number,
            minCheckpointCount: number,
            maxCheckpointCount: number,
            maxSubscriberCount: number,
            liveBufferSize: number,
            readBatchSize: number,
            historyBufferSize: number,
            namedConsumerStrategy: CreateReq.ConsumerStrategy,
            messageTimeoutTicks: number,
            messageTimeoutMs: number,
            checkpointAfterTicks: number,
            checkpointAfterMs: number,
        }

        export enum MessageTimeoutCase {
            MESSAGE_TIMEOUT_NOT_SET = 0,
        
    MESSAGE_TIMEOUT_TICKS = 4,

    MESSAGE_TIMEOUT_MS = 14,

        }

        export enum CheckpointAfterCase {
            CHECKPOINT_AFTER_NOT_SET = 0,
        
    CHECKPOINT_AFTER_TICKS = 6,

    CHECKPOINT_AFTER_MS = 15,

        }

    }


    export enum ConsumerStrategy {
    DISPATCHTOSINGLE = 0,
    ROUNDROBIN = 1,
    PINNED = 2,
    }

}

export class CreateResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateResp.AsObject;
    static toObject(includeInstance: boolean, msg: CreateResp): CreateResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateResp;
    static deserializeBinaryFromReader(message: CreateResp, reader: jspb.BinaryReader): CreateResp;
}

export namespace CreateResp {
    export type AsObject = {
    }
}

export class UpdateReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): UpdateReq.Options | undefined;
    setOptions(value?: UpdateReq.Options): UpdateReq;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateReq.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateReq): UpdateReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateReq;
    static deserializeBinaryFromReader(message: UpdateReq, reader: jspb.BinaryReader): UpdateReq;
}

export namespace UpdateReq {
    export type AsObject = {
        options?: UpdateReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): Options;

        getGroupName(): string;
        setGroupName(value: string): Options;


        hasSettings(): boolean;
        clearSettings(): void;
        getSettings(): UpdateReq.Settings | undefined;
        setSettings(value?: UpdateReq.Settings): Options;


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
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            groupName: string,
            settings?: UpdateReq.Settings.AsObject,
        }
    }

    export class Settings extends jspb.Message { 
        getResolveLinks(): boolean;
        setResolveLinks(value: boolean): Settings;

        getRevision(): number;
        setRevision(value: number): Settings;

        getExtraStatistics(): boolean;
        setExtraStatistics(value: boolean): Settings;

        getMaxRetryCount(): number;
        setMaxRetryCount(value: number): Settings;

        getMinCheckpointCount(): number;
        setMinCheckpointCount(value: number): Settings;

        getMaxCheckpointCount(): number;
        setMaxCheckpointCount(value: number): Settings;

        getMaxSubscriberCount(): number;
        setMaxSubscriberCount(value: number): Settings;

        getLiveBufferSize(): number;
        setLiveBufferSize(value: number): Settings;

        getReadBatchSize(): number;
        setReadBatchSize(value: number): Settings;

        getHistoryBufferSize(): number;
        setHistoryBufferSize(value: number): Settings;

        getNamedConsumerStrategy(): UpdateReq.ConsumerStrategy;
        setNamedConsumerStrategy(value: UpdateReq.ConsumerStrategy): Settings;


        hasMessageTimeoutTicks(): boolean;
        clearMessageTimeoutTicks(): void;
        getMessageTimeoutTicks(): number;
        setMessageTimeoutTicks(value: number): Settings;


        hasMessageTimeoutMs(): boolean;
        clearMessageTimeoutMs(): void;
        getMessageTimeoutMs(): number;
        setMessageTimeoutMs(value: number): Settings;


        hasCheckpointAfterTicks(): boolean;
        clearCheckpointAfterTicks(): void;
        getCheckpointAfterTicks(): number;
        setCheckpointAfterTicks(value: number): Settings;


        hasCheckpointAfterMs(): boolean;
        clearCheckpointAfterMs(): void;
        getCheckpointAfterMs(): number;
        setCheckpointAfterMs(value: number): Settings;


        getMessageTimeoutCase(): Settings.MessageTimeoutCase;
        getCheckpointAfterCase(): Settings.CheckpointAfterCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Settings.AsObject;
        static toObject(includeInstance: boolean, msg: Settings): Settings.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Settings, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Settings;
        static deserializeBinaryFromReader(message: Settings, reader: jspb.BinaryReader): Settings;
    }

    export namespace Settings {
        export type AsObject = {
            resolveLinks: boolean,
            revision: number,
            extraStatistics: boolean,
            maxRetryCount: number,
            minCheckpointCount: number,
            maxCheckpointCount: number,
            maxSubscriberCount: number,
            liveBufferSize: number,
            readBatchSize: number,
            historyBufferSize: number,
            namedConsumerStrategy: UpdateReq.ConsumerStrategy,
            messageTimeoutTicks: number,
            messageTimeoutMs: number,
            checkpointAfterTicks: number,
            checkpointAfterMs: number,
        }

        export enum MessageTimeoutCase {
            MESSAGE_TIMEOUT_NOT_SET = 0,
        
    MESSAGE_TIMEOUT_TICKS = 4,

    MESSAGE_TIMEOUT_MS = 14,

        }

        export enum CheckpointAfterCase {
            CHECKPOINT_AFTER_NOT_SET = 0,
        
    CHECKPOINT_AFTER_TICKS = 6,

    CHECKPOINT_AFTER_MS = 15,

        }

    }


    export enum ConsumerStrategy {
    DISPATCHTOSINGLE = 0,
    ROUNDROBIN = 1,
    PINNED = 2,
    }

}

export class UpdateResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateResp): UpdateResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateResp;
    static deserializeBinaryFromReader(message: UpdateResp, reader: jspb.BinaryReader): UpdateResp;
}

export namespace UpdateResp {
    export type AsObject = {
    }
}

export class DeleteReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): DeleteReq.Options | undefined;
    setOptions(value?: DeleteReq.Options): DeleteReq;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteReq.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteReq): DeleteReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteReq;
    static deserializeBinaryFromReader(message: DeleteReq, reader: jspb.BinaryReader): DeleteReq;
}

export namespace DeleteReq {
    export type AsObject = {
        options?: DeleteReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): Options;

        getGroupName(): string;
        setGroupName(value: string): Options;


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
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            groupName: string,
        }
    }

}

export class DeleteResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteResp): DeleteResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteResp;
    static deserializeBinaryFromReader(message: DeleteResp, reader: jspb.BinaryReader): DeleteResp;
}

export namespace DeleteResp {
    export type AsObject = {
    }
}
