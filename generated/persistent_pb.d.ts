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

        hasAll(): boolean;
        clearAll(): void;
        getAll(): shared_pb.Empty | undefined;
        setAll(value?: shared_pb.Empty): Options;
        getGroupName(): string;
        setGroupName(value: string): Options;
        getBufferSize(): number;
        setBufferSize(value: number): Options;

        hasUuidOption(): boolean;
        clearUuidOption(): void;
        getUuidOption(): ReadReq.Options.UUIDOption | undefined;
        setUuidOption(value?: ReadReq.Options.UUIDOption): Options;

        getStreamOptionCase(): Options.StreamOptionCase;

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
            all?: shared_pb.Empty.AsObject,
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


        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM_IDENTIFIER = 1,
            ALL = 5,
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
        getCommitPosition(): string;
        setCommitPosition(value: string): ReadEvent;

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
            commitPosition: string,
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
            getStreamRevision(): string;
            setStreamRevision(value: string): RecordedEvent;
            getPreparePosition(): string;
            setPreparePosition(value: string): RecordedEvent;
            getCommitPosition(): string;
            setCommitPosition(value: string): RecordedEvent;

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
                streamRevision: string,
                preparePosition: string,
                commitPosition: string,

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

        hasStream(): boolean;
        clearStream(): void;
        getStream(): CreateReq.StreamOptions | undefined;
        setStream(value?: CreateReq.StreamOptions): Options;

        hasAll(): boolean;
        clearAll(): void;
        getAll(): CreateReq.AllOptions | undefined;
        setAll(value?: CreateReq.AllOptions): Options;

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

        getStreamOptionCase(): Options.StreamOptionCase;

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
            stream?: CreateReq.StreamOptions.AsObject,
            all?: CreateReq.AllOptions.AsObject,
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            groupName: string,
            settings?: CreateReq.Settings.AsObject,
        }

        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM = 4,
            ALL = 5,
        }

    }

    export class StreamOptions extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): StreamOptions;

        hasRevision(): boolean;
        clearRevision(): void;
        getRevision(): string;
        setRevision(value: string): StreamOptions;

        hasStart(): boolean;
        clearStart(): void;
        getStart(): shared_pb.Empty | undefined;
        setStart(value?: shared_pb.Empty): StreamOptions;

        hasEnd(): boolean;
        clearEnd(): void;
        getEnd(): shared_pb.Empty | undefined;
        setEnd(value?: shared_pb.Empty): StreamOptions;

        getRevisionOptionCase(): StreamOptions.RevisionOptionCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): StreamOptions.AsObject;
        static toObject(includeInstance: boolean, msg: StreamOptions): StreamOptions.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: StreamOptions, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): StreamOptions;
        static deserializeBinaryFromReader(message: StreamOptions, reader: jspb.BinaryReader): StreamOptions;
    }

    export namespace StreamOptions {
        export type AsObject = {
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            revision: string,
            start?: shared_pb.Empty.AsObject,
            end?: shared_pb.Empty.AsObject,
        }

        export enum RevisionOptionCase {
            REVISION_OPTION_NOT_SET = 0,
            REVISION = 2,
            START = 3,
            END = 4,
        }

    }

    export class AllOptions extends jspb.Message { 

        hasPosition(): boolean;
        clearPosition(): void;
        getPosition(): CreateReq.Position | undefined;
        setPosition(value?: CreateReq.Position): AllOptions;

        hasStart(): boolean;
        clearStart(): void;
        getStart(): shared_pb.Empty | undefined;
        setStart(value?: shared_pb.Empty): AllOptions;

        hasEnd(): boolean;
        clearEnd(): void;
        getEnd(): shared_pb.Empty | undefined;
        setEnd(value?: shared_pb.Empty): AllOptions;

        hasFilter(): boolean;
        clearFilter(): void;
        getFilter(): CreateReq.AllOptions.FilterOptions | undefined;
        setFilter(value?: CreateReq.AllOptions.FilterOptions): AllOptions;

        hasNoFilter(): boolean;
        clearNoFilter(): void;
        getNoFilter(): shared_pb.Empty | undefined;
        setNoFilter(value?: shared_pb.Empty): AllOptions;

        getAllOptionCase(): AllOptions.AllOptionCase;
        getFilterOptionCase(): AllOptions.FilterOptionCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): AllOptions.AsObject;
        static toObject(includeInstance: boolean, msg: AllOptions): AllOptions.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: AllOptions, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): AllOptions;
        static deserializeBinaryFromReader(message: AllOptions, reader: jspb.BinaryReader): AllOptions;
    }

    export namespace AllOptions {
        export type AsObject = {
            position?: CreateReq.Position.AsObject,
            start?: shared_pb.Empty.AsObject,
            end?: shared_pb.Empty.AsObject,
            filter?: CreateReq.AllOptions.FilterOptions.AsObject,
            noFilter?: shared_pb.Empty.AsObject,
        }


        export class FilterOptions extends jspb.Message { 

            hasStreamIdentifier(): boolean;
            clearStreamIdentifier(): void;
            getStreamIdentifier(): CreateReq.AllOptions.FilterOptions.Expression | undefined;
            setStreamIdentifier(value?: CreateReq.AllOptions.FilterOptions.Expression): FilterOptions;

            hasEventType(): boolean;
            clearEventType(): void;
            getEventType(): CreateReq.AllOptions.FilterOptions.Expression | undefined;
            setEventType(value?: CreateReq.AllOptions.FilterOptions.Expression): FilterOptions;

            hasMax(): boolean;
            clearMax(): void;
            getMax(): number;
            setMax(value: number): FilterOptions;

            hasCount(): boolean;
            clearCount(): void;
            getCount(): shared_pb.Empty | undefined;
            setCount(value?: shared_pb.Empty): FilterOptions;
            getCheckpointintervalmultiplier(): number;
            setCheckpointintervalmultiplier(value: number): FilterOptions;

            getFilterCase(): FilterOptions.FilterCase;
            getWindowCase(): FilterOptions.WindowCase;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): FilterOptions.AsObject;
            static toObject(includeInstance: boolean, msg: FilterOptions): FilterOptions.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: FilterOptions, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): FilterOptions;
            static deserializeBinaryFromReader(message: FilterOptions, reader: jspb.BinaryReader): FilterOptions;
        }

        export namespace FilterOptions {
            export type AsObject = {
                streamIdentifier?: CreateReq.AllOptions.FilterOptions.Expression.AsObject,
                eventType?: CreateReq.AllOptions.FilterOptions.Expression.AsObject,
                max: number,
                count?: shared_pb.Empty.AsObject,
                checkpointintervalmultiplier: number,
            }


            export class Expression extends jspb.Message { 
                getRegex(): string;
                setRegex(value: string): Expression;
                clearPrefixList(): void;
                getPrefixList(): Array<string>;
                setPrefixList(value: Array<string>): Expression;
                addPrefix(value: string, index?: number): string;

                serializeBinary(): Uint8Array;
                toObject(includeInstance?: boolean): Expression.AsObject;
                static toObject(includeInstance: boolean, msg: Expression): Expression.AsObject;
                static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
                static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
                static serializeBinaryToWriter(message: Expression, writer: jspb.BinaryWriter): void;
                static deserializeBinary(bytes: Uint8Array): Expression;
                static deserializeBinaryFromReader(message: Expression, reader: jspb.BinaryReader): Expression;
            }

            export namespace Expression {
                export type AsObject = {
                    regex: string,
                    prefixList: Array<string>,
                }
            }


            export enum FilterCase {
                FILTER_NOT_SET = 0,
                STREAM_IDENTIFIER = 1,
                EVENT_TYPE = 2,
            }

            export enum WindowCase {
                WINDOW_NOT_SET = 0,
                MAX = 3,
                COUNT = 4,
            }

        }


        export enum AllOptionCase {
            ALL_OPTION_NOT_SET = 0,
            POSITION = 1,
            START = 2,
            END = 3,
        }

        export enum FilterOptionCase {
            FILTER_OPTION_NOT_SET = 0,
            FILTER = 4,
            NO_FILTER = 5,
        }

    }

    export class Position extends jspb.Message { 
        getCommitPosition(): string;
        setCommitPosition(value: string): Position;
        getPreparePosition(): string;
        setPreparePosition(value: string): Position;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Position.AsObject;
        static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Position;
        static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
    }

    export namespace Position {
        export type AsObject = {
            commitPosition: string,
            preparePosition: string,
        }
    }

    export class Settings extends jspb.Message { 
        getResolveLinks(): boolean;
        setResolveLinks(value: boolean): Settings;
        getRevision(): string;
        setRevision(value: string): Settings;
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
        getMessageTimeoutTicks(): string;
        setMessageTimeoutTicks(value: string): Settings;

        hasMessageTimeoutMs(): boolean;
        clearMessageTimeoutMs(): void;
        getMessageTimeoutMs(): number;
        setMessageTimeoutMs(value: number): Settings;

        hasCheckpointAfterTicks(): boolean;
        clearCheckpointAfterTicks(): void;
        getCheckpointAfterTicks(): string;
        setCheckpointAfterTicks(value: string): Settings;

        hasCheckpointAfterMs(): boolean;
        clearCheckpointAfterMs(): void;
        getCheckpointAfterMs(): number;
        setCheckpointAfterMs(value: number): Settings;
        getConsumerStrategy(): string;
        setConsumerStrategy(value: string): Settings;

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
            revision: string,
            extraStatistics: boolean,
            maxRetryCount: number,
            minCheckpointCount: number,
            maxCheckpointCount: number,
            maxSubscriberCount: number,
            liveBufferSize: number,
            readBatchSize: number,
            historyBufferSize: number,
            namedConsumerStrategy: CreateReq.ConsumerStrategy,
            messageTimeoutTicks: string,
            messageTimeoutMs: number,
            checkpointAfterTicks: string,
            checkpointAfterMs: number,
            consumerStrategy: string,
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

        hasStream(): boolean;
        clearStream(): void;
        getStream(): UpdateReq.StreamOptions | undefined;
        setStream(value?: UpdateReq.StreamOptions): Options;

        hasAll(): boolean;
        clearAll(): void;
        getAll(): UpdateReq.AllOptions | undefined;
        setAll(value?: UpdateReq.AllOptions): Options;

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

        getStreamOptionCase(): Options.StreamOptionCase;

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
            stream?: UpdateReq.StreamOptions.AsObject,
            all?: UpdateReq.AllOptions.AsObject,
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            groupName: string,
            settings?: UpdateReq.Settings.AsObject,
        }

        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM = 4,
            ALL = 5,
        }

    }

    export class StreamOptions extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): StreamOptions;

        hasRevision(): boolean;
        clearRevision(): void;
        getRevision(): string;
        setRevision(value: string): StreamOptions;

        hasStart(): boolean;
        clearStart(): void;
        getStart(): shared_pb.Empty | undefined;
        setStart(value?: shared_pb.Empty): StreamOptions;

        hasEnd(): boolean;
        clearEnd(): void;
        getEnd(): shared_pb.Empty | undefined;
        setEnd(value?: shared_pb.Empty): StreamOptions;

        getRevisionOptionCase(): StreamOptions.RevisionOptionCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): StreamOptions.AsObject;
        static toObject(includeInstance: boolean, msg: StreamOptions): StreamOptions.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: StreamOptions, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): StreamOptions;
        static deserializeBinaryFromReader(message: StreamOptions, reader: jspb.BinaryReader): StreamOptions;
    }

    export namespace StreamOptions {
        export type AsObject = {
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            revision: string,
            start?: shared_pb.Empty.AsObject,
            end?: shared_pb.Empty.AsObject,
        }

        export enum RevisionOptionCase {
            REVISION_OPTION_NOT_SET = 0,
            REVISION = 2,
            START = 3,
            END = 4,
        }

    }

    export class AllOptions extends jspb.Message { 

        hasPosition(): boolean;
        clearPosition(): void;
        getPosition(): UpdateReq.Position | undefined;
        setPosition(value?: UpdateReq.Position): AllOptions;

        hasStart(): boolean;
        clearStart(): void;
        getStart(): shared_pb.Empty | undefined;
        setStart(value?: shared_pb.Empty): AllOptions;

        hasEnd(): boolean;
        clearEnd(): void;
        getEnd(): shared_pb.Empty | undefined;
        setEnd(value?: shared_pb.Empty): AllOptions;

        getAllOptionCase(): AllOptions.AllOptionCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): AllOptions.AsObject;
        static toObject(includeInstance: boolean, msg: AllOptions): AllOptions.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: AllOptions, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): AllOptions;
        static deserializeBinaryFromReader(message: AllOptions, reader: jspb.BinaryReader): AllOptions;
    }

    export namespace AllOptions {
        export type AsObject = {
            position?: UpdateReq.Position.AsObject,
            start?: shared_pb.Empty.AsObject,
            end?: shared_pb.Empty.AsObject,
        }

        export enum AllOptionCase {
            ALL_OPTION_NOT_SET = 0,
            POSITION = 1,
            START = 2,
            END = 3,
        }

    }

    export class Position extends jspb.Message { 
        getCommitPosition(): string;
        setCommitPosition(value: string): Position;
        getPreparePosition(): string;
        setPreparePosition(value: string): Position;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Position.AsObject;
        static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Position;
        static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
    }

    export namespace Position {
        export type AsObject = {
            commitPosition: string,
            preparePosition: string,
        }
    }

    export class Settings extends jspb.Message { 
        getResolveLinks(): boolean;
        setResolveLinks(value: boolean): Settings;
        getRevision(): string;
        setRevision(value: string): Settings;
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
        getMessageTimeoutTicks(): string;
        setMessageTimeoutTicks(value: string): Settings;

        hasMessageTimeoutMs(): boolean;
        clearMessageTimeoutMs(): void;
        getMessageTimeoutMs(): number;
        setMessageTimeoutMs(value: number): Settings;

        hasCheckpointAfterTicks(): boolean;
        clearCheckpointAfterTicks(): void;
        getCheckpointAfterTicks(): string;
        setCheckpointAfterTicks(value: string): Settings;

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
            revision: string,
            extraStatistics: boolean,
            maxRetryCount: number,
            minCheckpointCount: number,
            maxCheckpointCount: number,
            maxSubscriberCount: number,
            liveBufferSize: number,
            readBatchSize: number,
            historyBufferSize: number,
            namedConsumerStrategy: UpdateReq.ConsumerStrategy,
            messageTimeoutTicks: string,
            messageTimeoutMs: number,
            checkpointAfterTicks: string,
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

        hasAll(): boolean;
        clearAll(): void;
        getAll(): shared_pb.Empty | undefined;
        setAll(value?: shared_pb.Empty): Options;
        getGroupName(): string;
        setGroupName(value: string): Options;

        getStreamOptionCase(): Options.StreamOptionCase;

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
            all?: shared_pb.Empty.AsObject,
            groupName: string,
        }

        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM_IDENTIFIER = 1,
            ALL = 3,
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

export class GetInfoReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): GetInfoReq.Options | undefined;
    setOptions(value?: GetInfoReq.Options): GetInfoReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetInfoReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetInfoReq): GetInfoReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetInfoReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetInfoReq;
    static deserializeBinaryFromReader(message: GetInfoReq, reader: jspb.BinaryReader): GetInfoReq;
}

export namespace GetInfoReq {
    export type AsObject = {
        options?: GetInfoReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): Options;

        hasAll(): boolean;
        clearAll(): void;
        getAll(): shared_pb.Empty | undefined;
        setAll(value?: shared_pb.Empty): Options;
        getGroupName(): string;
        setGroupName(value: string): Options;

        getStreamOptionCase(): Options.StreamOptionCase;

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
            all?: shared_pb.Empty.AsObject,
            groupName: string,
        }

        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM_IDENTIFIER = 1,
            ALL = 2,
        }

    }

}

export class GetInfoResp extends jspb.Message { 

    hasSubscriptionInfo(): boolean;
    clearSubscriptionInfo(): void;
    getSubscriptionInfo(): SubscriptionInfo | undefined;
    setSubscriptionInfo(value?: SubscriptionInfo): GetInfoResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetInfoResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetInfoResp): GetInfoResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetInfoResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetInfoResp;
    static deserializeBinaryFromReader(message: GetInfoResp, reader: jspb.BinaryReader): GetInfoResp;
}

export namespace GetInfoResp {
    export type AsObject = {
        subscriptionInfo?: SubscriptionInfo.AsObject,
    }
}

export class SubscriptionInfo extends jspb.Message { 
    getEventSource(): string;
    setEventSource(value: string): SubscriptionInfo;
    getGroupName(): string;
    setGroupName(value: string): SubscriptionInfo;
    getStatus(): string;
    setStatus(value: string): SubscriptionInfo;
    clearConnectionsList(): void;
    getConnectionsList(): Array<SubscriptionInfo.ConnectionInfo>;
    setConnectionsList(value: Array<SubscriptionInfo.ConnectionInfo>): SubscriptionInfo;
    addConnections(value?: SubscriptionInfo.ConnectionInfo, index?: number): SubscriptionInfo.ConnectionInfo;
    getAveragePerSecond(): number;
    setAveragePerSecond(value: number): SubscriptionInfo;
    getTotalItems(): string;
    setTotalItems(value: string): SubscriptionInfo;
    getCountSinceLastMeasurement(): string;
    setCountSinceLastMeasurement(value: string): SubscriptionInfo;
    getLastCheckpointedEventPosition(): string;
    setLastCheckpointedEventPosition(value: string): SubscriptionInfo;
    getLastKnownEventPosition(): string;
    setLastKnownEventPosition(value: string): SubscriptionInfo;
    getResolveLinkTos(): boolean;
    setResolveLinkTos(value: boolean): SubscriptionInfo;
    getStartFrom(): string;
    setStartFrom(value: string): SubscriptionInfo;
    getMessageTimeoutMilliseconds(): number;
    setMessageTimeoutMilliseconds(value: number): SubscriptionInfo;
    getExtraStatistics(): boolean;
    setExtraStatistics(value: boolean): SubscriptionInfo;
    getMaxRetryCount(): number;
    setMaxRetryCount(value: number): SubscriptionInfo;
    getLiveBufferSize(): number;
    setLiveBufferSize(value: number): SubscriptionInfo;
    getBufferSize(): number;
    setBufferSize(value: number): SubscriptionInfo;
    getReadBatchSize(): number;
    setReadBatchSize(value: number): SubscriptionInfo;
    getCheckPointAfterMilliseconds(): number;
    setCheckPointAfterMilliseconds(value: number): SubscriptionInfo;
    getMinCheckPointCount(): number;
    setMinCheckPointCount(value: number): SubscriptionInfo;
    getMaxCheckPointCount(): number;
    setMaxCheckPointCount(value: number): SubscriptionInfo;
    getReadBufferCount(): number;
    setReadBufferCount(value: number): SubscriptionInfo;
    getLiveBufferCount(): string;
    setLiveBufferCount(value: string): SubscriptionInfo;
    getRetryBufferCount(): number;
    setRetryBufferCount(value: number): SubscriptionInfo;
    getTotalInFlightMessages(): number;
    setTotalInFlightMessages(value: number): SubscriptionInfo;
    getOutstandingMessagesCount(): number;
    setOutstandingMessagesCount(value: number): SubscriptionInfo;
    getNamedConsumerStrategy(): string;
    setNamedConsumerStrategy(value: string): SubscriptionInfo;
    getMaxSubscriberCount(): number;
    setMaxSubscriberCount(value: number): SubscriptionInfo;
    getParkedMessageCount(): string;
    setParkedMessageCount(value: string): SubscriptionInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscriptionInfo.AsObject;
    static toObject(includeInstance: boolean, msg: SubscriptionInfo): SubscriptionInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscriptionInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscriptionInfo;
    static deserializeBinaryFromReader(message: SubscriptionInfo, reader: jspb.BinaryReader): SubscriptionInfo;
}

export namespace SubscriptionInfo {
    export type AsObject = {
        eventSource: string,
        groupName: string,
        status: string,
        connectionsList: Array<SubscriptionInfo.ConnectionInfo.AsObject>,
        averagePerSecond: number,
        totalItems: string,
        countSinceLastMeasurement: string,
        lastCheckpointedEventPosition: string,
        lastKnownEventPosition: string,
        resolveLinkTos: boolean,
        startFrom: string,
        messageTimeoutMilliseconds: number,
        extraStatistics: boolean,
        maxRetryCount: number,
        liveBufferSize: number,
        bufferSize: number,
        readBatchSize: number,
        checkPointAfterMilliseconds: number,
        minCheckPointCount: number,
        maxCheckPointCount: number,
        readBufferCount: number,
        liveBufferCount: string,
        retryBufferCount: number,
        totalInFlightMessages: number,
        outstandingMessagesCount: number,
        namedConsumerStrategy: string,
        maxSubscriberCount: number,
        parkedMessageCount: string,
    }


    export class ConnectionInfo extends jspb.Message { 
        getFrom(): string;
        setFrom(value: string): ConnectionInfo;
        getUsername(): string;
        setUsername(value: string): ConnectionInfo;
        getAverageItemsPerSecond(): number;
        setAverageItemsPerSecond(value: number): ConnectionInfo;
        getTotalItems(): string;
        setTotalItems(value: string): ConnectionInfo;
        getCountSinceLastMeasurement(): string;
        setCountSinceLastMeasurement(value: string): ConnectionInfo;
        clearObservedMeasurementsList(): void;
        getObservedMeasurementsList(): Array<SubscriptionInfo.Measurement>;
        setObservedMeasurementsList(value: Array<SubscriptionInfo.Measurement>): ConnectionInfo;
        addObservedMeasurements(value?: SubscriptionInfo.Measurement, index?: number): SubscriptionInfo.Measurement;
        getAvailableSlots(): number;
        setAvailableSlots(value: number): ConnectionInfo;
        getInFlightMessages(): number;
        setInFlightMessages(value: number): ConnectionInfo;
        getConnectionName(): string;
        setConnectionName(value: string): ConnectionInfo;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ConnectionInfo.AsObject;
        static toObject(includeInstance: boolean, msg: ConnectionInfo): ConnectionInfo.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ConnectionInfo, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ConnectionInfo;
        static deserializeBinaryFromReader(message: ConnectionInfo, reader: jspb.BinaryReader): ConnectionInfo;
    }

    export namespace ConnectionInfo {
        export type AsObject = {
            from: string,
            username: string,
            averageItemsPerSecond: number,
            totalItems: string,
            countSinceLastMeasurement: string,
            observedMeasurementsList: Array<SubscriptionInfo.Measurement.AsObject>,
            availableSlots: number,
            inFlightMessages: number,
            connectionName: string,
        }
    }

    export class Measurement extends jspb.Message { 
        getKey(): string;
        setKey(value: string): Measurement;
        getValue(): string;
        setValue(value: string): Measurement;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Measurement.AsObject;
        static toObject(includeInstance: boolean, msg: Measurement): Measurement.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Measurement, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Measurement;
        static deserializeBinaryFromReader(message: Measurement, reader: jspb.BinaryReader): Measurement;
    }

    export namespace Measurement {
        export type AsObject = {
            key: string,
            value: string,
        }
    }

}

export class ReplayParkedReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ReplayParkedReq.Options | undefined;
    setOptions(value?: ReplayParkedReq.Options): ReplayParkedReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReplayParkedReq.AsObject;
    static toObject(includeInstance: boolean, msg: ReplayParkedReq): ReplayParkedReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReplayParkedReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReplayParkedReq;
    static deserializeBinaryFromReader(message: ReplayParkedReq, reader: jspb.BinaryReader): ReplayParkedReq;
}

export namespace ReplayParkedReq {
    export type AsObject = {
        options?: ReplayParkedReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getGroupName(): string;
        setGroupName(value: string): Options;

        hasStreamIdentifier(): boolean;
        clearStreamIdentifier(): void;
        getStreamIdentifier(): shared_pb.StreamIdentifier | undefined;
        setStreamIdentifier(value?: shared_pb.StreamIdentifier): Options;

        hasAll(): boolean;
        clearAll(): void;
        getAll(): shared_pb.Empty | undefined;
        setAll(value?: shared_pb.Empty): Options;

        hasStopAt(): boolean;
        clearStopAt(): void;
        getStopAt(): string;
        setStopAt(value: string): Options;

        hasNoLimit(): boolean;
        clearNoLimit(): void;
        getNoLimit(): shared_pb.Empty | undefined;
        setNoLimit(value?: shared_pb.Empty): Options;

        getStreamOptionCase(): Options.StreamOptionCase;
        getStopAtOptionCase(): Options.StopAtOptionCase;

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
            groupName: string,
            streamIdentifier?: shared_pb.StreamIdentifier.AsObject,
            all?: shared_pb.Empty.AsObject,
            stopAt: string,
            noLimit?: shared_pb.Empty.AsObject,
        }

        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM_IDENTIFIER = 2,
            ALL = 3,
        }

        export enum StopAtOptionCase {
            STOP_AT_OPTION_NOT_SET = 0,
            STOP_AT = 4,
            NO_LIMIT = 5,
        }

    }

}

export class ReplayParkedResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReplayParkedResp.AsObject;
    static toObject(includeInstance: boolean, msg: ReplayParkedResp): ReplayParkedResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReplayParkedResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReplayParkedResp;
    static deserializeBinaryFromReader(message: ReplayParkedResp, reader: jspb.BinaryReader): ReplayParkedResp;
}

export namespace ReplayParkedResp {
    export type AsObject = {
    }
}

export class ListReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ListReq.Options | undefined;
    setOptions(value?: ListReq.Options): ListReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListReq): ListReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListReq;
    static deserializeBinaryFromReader(message: ListReq, reader: jspb.BinaryReader): ListReq;
}

export namespace ListReq {
    export type AsObject = {
        options?: ListReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 

        hasListAllSubscriptions(): boolean;
        clearListAllSubscriptions(): void;
        getListAllSubscriptions(): shared_pb.Empty | undefined;
        setListAllSubscriptions(value?: shared_pb.Empty): Options;

        hasListForStream(): boolean;
        clearListForStream(): void;
        getListForStream(): ListReq.StreamOption | undefined;
        setListForStream(value?: ListReq.StreamOption): Options;

        getListOptionCase(): Options.ListOptionCase;

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
            listAllSubscriptions?: shared_pb.Empty.AsObject,
            listForStream?: ListReq.StreamOption.AsObject,
        }

        export enum ListOptionCase {
            LIST_OPTION_NOT_SET = 0,
            LIST_ALL_SUBSCRIPTIONS = 1,
            LIST_FOR_STREAM = 2,
        }

    }

    export class StreamOption extends jspb.Message { 

        hasStream(): boolean;
        clearStream(): void;
        getStream(): shared_pb.StreamIdentifier | undefined;
        setStream(value?: shared_pb.StreamIdentifier): StreamOption;

        hasAll(): boolean;
        clearAll(): void;
        getAll(): shared_pb.Empty | undefined;
        setAll(value?: shared_pb.Empty): StreamOption;

        getStreamOptionCase(): StreamOption.StreamOptionCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): StreamOption.AsObject;
        static toObject(includeInstance: boolean, msg: StreamOption): StreamOption.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: StreamOption, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): StreamOption;
        static deserializeBinaryFromReader(message: StreamOption, reader: jspb.BinaryReader): StreamOption;
    }

    export namespace StreamOption {
        export type AsObject = {
            stream?: shared_pb.StreamIdentifier.AsObject,
            all?: shared_pb.Empty.AsObject,
        }

        export enum StreamOptionCase {
            STREAM_OPTION_NOT_SET = 0,
            STREAM = 1,
            ALL = 2,
        }

    }

}

export class ListResp extends jspb.Message { 
    clearSubscriptionsList(): void;
    getSubscriptionsList(): Array<SubscriptionInfo>;
    setSubscriptionsList(value: Array<SubscriptionInfo>): ListResp;
    addSubscriptions(value?: SubscriptionInfo, index?: number): SubscriptionInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListResp): ListResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListResp;
    static deserializeBinaryFromReader(message: ListResp, reader: jspb.BinaryReader): ListResp;
}

export namespace ListResp {
    export type AsObject = {
        subscriptionsList: Array<SubscriptionInfo.AsObject>,
    }
}
