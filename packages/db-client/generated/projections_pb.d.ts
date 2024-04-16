// package: event_store.client.projections
// file: projections.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as shared_pb from "./shared_pb";

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

        hasOneTime(): boolean;
        clearOneTime(): void;
        getOneTime(): shared_pb.Empty | undefined;
        setOneTime(value?: shared_pb.Empty): Options;

        hasTransient(): boolean;
        clearTransient(): void;
        getTransient(): CreateReq.Options.Transient | undefined;
        setTransient(value?: CreateReq.Options.Transient): Options;

        hasContinuous(): boolean;
        clearContinuous(): void;
        getContinuous(): CreateReq.Options.Continuous | undefined;
        setContinuous(value?: CreateReq.Options.Continuous): Options;
        getQuery(): string;
        setQuery(value: string): Options;

        getModeCase(): Options.ModeCase;

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
            oneTime?: shared_pb.Empty.AsObject,
            pb_transient?: CreateReq.Options.Transient.AsObject,
            continuous?: CreateReq.Options.Continuous.AsObject,
            query: string,
        }


        export class Transient extends jspb.Message { 
            getName(): string;
            setName(value: string): Transient;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Transient.AsObject;
            static toObject(includeInstance: boolean, msg: Transient): Transient.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Transient, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Transient;
            static deserializeBinaryFromReader(message: Transient, reader: jspb.BinaryReader): Transient;
        }

        export namespace Transient {
            export type AsObject = {
                name: string,
            }
        }

        export class Continuous extends jspb.Message { 
            getName(): string;
            setName(value: string): Continuous;
            getEmitEnabled(): boolean;
            setEmitEnabled(value: boolean): Continuous;
            getTrackEmittedStreams(): boolean;
            setTrackEmittedStreams(value: boolean): Continuous;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Continuous.AsObject;
            static toObject(includeInstance: boolean, msg: Continuous): Continuous.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Continuous, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Continuous;
            static deserializeBinaryFromReader(message: Continuous, reader: jspb.BinaryReader): Continuous;
        }

        export namespace Continuous {
            export type AsObject = {
                name: string,
                emitEnabled: boolean,
                trackEmittedStreams: boolean,
            }
        }


        export enum ModeCase {
            MODE_NOT_SET = 0,
            ONE_TIME = 1,
            TRANSIENT = 2,
            CONTINUOUS = 3,
        }

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
        getName(): string;
        setName(value: string): Options;
        getQuery(): string;
        setQuery(value: string): Options;

        hasEmitEnabled(): boolean;
        clearEmitEnabled(): void;
        getEmitEnabled(): boolean;
        setEmitEnabled(value: boolean): Options;

        hasNoEmitOptions(): boolean;
        clearNoEmitOptions(): void;
        getNoEmitOptions(): shared_pb.Empty | undefined;
        setNoEmitOptions(value?: shared_pb.Empty): Options;

        getEmitOptionCase(): Options.EmitOptionCase;

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
            name: string,
            query: string,
            emitEnabled: boolean,
            noEmitOptions?: shared_pb.Empty.AsObject,
        }

        export enum EmitOptionCase {
            EMIT_OPTION_NOT_SET = 0,
            EMIT_ENABLED = 3,
            NO_EMIT_OPTIONS = 4,
        }

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
        getName(): string;
        setName(value: string): Options;
        getDeleteEmittedStreams(): boolean;
        setDeleteEmittedStreams(value: boolean): Options;
        getDeleteStateStream(): boolean;
        setDeleteStateStream(value: boolean): Options;
        getDeleteCheckpointStream(): boolean;
        setDeleteCheckpointStream(value: boolean): Options;

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
            name: string,
            deleteEmittedStreams: boolean,
            deleteStateStream: boolean,
            deleteCheckpointStream: boolean,
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

export class StatisticsReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): StatisticsReq.Options | undefined;
    setOptions(value?: StatisticsReq.Options): StatisticsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatisticsReq.AsObject;
    static toObject(includeInstance: boolean, msg: StatisticsReq): StatisticsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatisticsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatisticsReq;
    static deserializeBinaryFromReader(message: StatisticsReq, reader: jspb.BinaryReader): StatisticsReq;
}

export namespace StatisticsReq {
    export type AsObject = {
        options?: StatisticsReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 

        hasName(): boolean;
        clearName(): void;
        getName(): string;
        setName(value: string): Options;

        hasAll(): boolean;
        clearAll(): void;
        getAll(): shared_pb.Empty | undefined;
        setAll(value?: shared_pb.Empty): Options;

        hasTransient(): boolean;
        clearTransient(): void;
        getTransient(): shared_pb.Empty | undefined;
        setTransient(value?: shared_pb.Empty): Options;

        hasContinuous(): boolean;
        clearContinuous(): void;
        getContinuous(): shared_pb.Empty | undefined;
        setContinuous(value?: shared_pb.Empty): Options;

        hasOneTime(): boolean;
        clearOneTime(): void;
        getOneTime(): shared_pb.Empty | undefined;
        setOneTime(value?: shared_pb.Empty): Options;

        getModeCase(): Options.ModeCase;

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
            name: string,
            all?: shared_pb.Empty.AsObject,
            pb_transient?: shared_pb.Empty.AsObject,
            continuous?: shared_pb.Empty.AsObject,
            oneTime?: shared_pb.Empty.AsObject,
        }

        export enum ModeCase {
            MODE_NOT_SET = 0,
            NAME = 1,
            ALL = 2,
            TRANSIENT = 3,
            CONTINUOUS = 4,
            ONE_TIME = 5,
        }

    }

}

export class StatisticsResp extends jspb.Message { 

    hasDetails(): boolean;
    clearDetails(): void;
    getDetails(): StatisticsResp.Details | undefined;
    setDetails(value?: StatisticsResp.Details): StatisticsResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatisticsResp.AsObject;
    static toObject(includeInstance: boolean, msg: StatisticsResp): StatisticsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatisticsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatisticsResp;
    static deserializeBinaryFromReader(message: StatisticsResp, reader: jspb.BinaryReader): StatisticsResp;
}

export namespace StatisticsResp {
    export type AsObject = {
        details?: StatisticsResp.Details.AsObject,
    }


    export class Details extends jspb.Message { 
        getCoreprocessingtime(): string;
        setCoreprocessingtime(value: string): Details;
        getVersion(): string;
        setVersion(value: string): Details;
        getEpoch(): string;
        setEpoch(value: string): Details;
        getEffectivename(): string;
        setEffectivename(value: string): Details;
        getWritesinprogress(): number;
        setWritesinprogress(value: number): Details;
        getReadsinprogress(): number;
        setReadsinprogress(value: number): Details;
        getPartitionscached(): number;
        setPartitionscached(value: number): Details;
        getStatus(): string;
        setStatus(value: string): Details;
        getStatereason(): string;
        setStatereason(value: string): Details;
        getName(): string;
        setName(value: string): Details;
        getMode(): string;
        setMode(value: string): Details;
        getPosition(): string;
        setPosition(value: string): Details;
        getProgress(): number;
        setProgress(value: number): Details;
        getLastcheckpoint(): string;
        setLastcheckpoint(value: string): Details;
        getEventsprocessedafterrestart(): string;
        setEventsprocessedafterrestart(value: string): Details;
        getCheckpointstatus(): string;
        setCheckpointstatus(value: string): Details;
        getBufferedevents(): string;
        setBufferedevents(value: string): Details;
        getWritependingeventsbeforecheckpoint(): number;
        setWritependingeventsbeforecheckpoint(value: number): Details;
        getWritependingeventsaftercheckpoint(): number;
        setWritependingeventsaftercheckpoint(value: number): Details;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Details.AsObject;
        static toObject(includeInstance: boolean, msg: Details): Details.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Details, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Details;
        static deserializeBinaryFromReader(message: Details, reader: jspb.BinaryReader): Details;
    }

    export namespace Details {
        export type AsObject = {
            coreprocessingtime: string,
            version: string,
            epoch: string,
            effectivename: string,
            writesinprogress: number,
            readsinprogress: number,
            partitionscached: number,
            status: string,
            statereason: string,
            name: string,
            mode: string,
            position: string,
            progress: number,
            lastcheckpoint: string,
            eventsprocessedafterrestart: string,
            checkpointstatus: string,
            bufferedevents: string,
            writependingeventsbeforecheckpoint: number,
            writependingeventsaftercheckpoint: number,
        }
    }

}

export class StateReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): StateReq.Options | undefined;
    setOptions(value?: StateReq.Options): StateReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StateReq.AsObject;
    static toObject(includeInstance: boolean, msg: StateReq): StateReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StateReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StateReq;
    static deserializeBinaryFromReader(message: StateReq, reader: jspb.BinaryReader): StateReq;
}

export namespace StateReq {
    export type AsObject = {
        options?: StateReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getName(): string;
        setName(value: string): Options;
        getPartition(): string;
        setPartition(value: string): Options;

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
            name: string,
            partition: string,
        }
    }

}

export class StateResp extends jspb.Message { 

    hasState(): boolean;
    clearState(): void;
    getState(): google_protobuf_struct_pb.Value | undefined;
    setState(value?: google_protobuf_struct_pb.Value): StateResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StateResp.AsObject;
    static toObject(includeInstance: boolean, msg: StateResp): StateResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StateResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StateResp;
    static deserializeBinaryFromReader(message: StateResp, reader: jspb.BinaryReader): StateResp;
}

export namespace StateResp {
    export type AsObject = {
        state?: google_protobuf_struct_pb.Value.AsObject,
    }
}

export class ResultReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ResultReq.Options | undefined;
    setOptions(value?: ResultReq.Options): ResultReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultReq.AsObject;
    static toObject(includeInstance: boolean, msg: ResultReq): ResultReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultReq;
    static deserializeBinaryFromReader(message: ResultReq, reader: jspb.BinaryReader): ResultReq;
}

export namespace ResultReq {
    export type AsObject = {
        options?: ResultReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getName(): string;
        setName(value: string): Options;
        getPartition(): string;
        setPartition(value: string): Options;

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
            name: string,
            partition: string,
        }
    }

}

export class ResultResp extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): google_protobuf_struct_pb.Value | undefined;
    setResult(value?: google_protobuf_struct_pb.Value): ResultResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResultResp.AsObject;
    static toObject(includeInstance: boolean, msg: ResultResp): ResultResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResultResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResultResp;
    static deserializeBinaryFromReader(message: ResultResp, reader: jspb.BinaryReader): ResultResp;
}

export namespace ResultResp {
    export type AsObject = {
        result?: google_protobuf_struct_pb.Value.AsObject,
    }
}

export class ResetReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ResetReq.Options | undefined;
    setOptions(value?: ResetReq.Options): ResetReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetReq.AsObject;
    static toObject(includeInstance: boolean, msg: ResetReq): ResetReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetReq;
    static deserializeBinaryFromReader(message: ResetReq, reader: jspb.BinaryReader): ResetReq;
}

export namespace ResetReq {
    export type AsObject = {
        options?: ResetReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getName(): string;
        setName(value: string): Options;
        getWriteCheckpoint(): boolean;
        setWriteCheckpoint(value: boolean): Options;

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
            name: string,
            writeCheckpoint: boolean,
        }
    }

}

export class ResetResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetResp.AsObject;
    static toObject(includeInstance: boolean, msg: ResetResp): ResetResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetResp;
    static deserializeBinaryFromReader(message: ResetResp, reader: jspb.BinaryReader): ResetResp;
}

export namespace ResetResp {
    export type AsObject = {
    }
}

export class EnableReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): EnableReq.Options | undefined;
    setOptions(value?: EnableReq.Options): EnableReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EnableReq.AsObject;
    static toObject(includeInstance: boolean, msg: EnableReq): EnableReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EnableReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EnableReq;
    static deserializeBinaryFromReader(message: EnableReq, reader: jspb.BinaryReader): EnableReq;
}

export namespace EnableReq {
    export type AsObject = {
        options?: EnableReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getName(): string;
        setName(value: string): Options;

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
            name: string,
        }
    }

}

export class EnableResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EnableResp.AsObject;
    static toObject(includeInstance: boolean, msg: EnableResp): EnableResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EnableResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EnableResp;
    static deserializeBinaryFromReader(message: EnableResp, reader: jspb.BinaryReader): EnableResp;
}

export namespace EnableResp {
    export type AsObject = {
    }
}

export class DisableReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): DisableReq.Options | undefined;
    setOptions(value?: DisableReq.Options): DisableReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisableReq.AsObject;
    static toObject(includeInstance: boolean, msg: DisableReq): DisableReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisableReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisableReq;
    static deserializeBinaryFromReader(message: DisableReq, reader: jspb.BinaryReader): DisableReq;
}

export namespace DisableReq {
    export type AsObject = {
        options?: DisableReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getName(): string;
        setName(value: string): Options;
        getWriteCheckpoint(): boolean;
        setWriteCheckpoint(value: boolean): Options;

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
            name: string,
            writeCheckpoint: boolean,
        }
    }

}

export class DisableResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisableResp.AsObject;
    static toObject(includeInstance: boolean, msg: DisableResp): DisableResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisableResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisableResp;
    static deserializeBinaryFromReader(message: DisableResp, reader: jspb.BinaryReader): DisableResp;
}

export namespace DisableResp {
    export type AsObject = {
    }
}
