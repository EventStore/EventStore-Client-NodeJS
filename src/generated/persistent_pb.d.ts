// package: event_store.grpc.persistent_subscriptions
// file: persistent.proto

import * as jspb from "google-protobuf";

export class ReadReq extends jspb.Message {
  hasOptions(): boolean;
  clearOptions(): void;
  getOptions(): ReadReq.Options | undefined;
  setOptions(value?: ReadReq.Options): void;

  hasAck(): boolean;
  clearAck(): void;
  getAck(): ReadReq.Ack | undefined;
  setAck(value?: ReadReq.Ack): void;

  hasNack(): boolean;
  clearNack(): void;
  getNack(): ReadReq.Nack | undefined;
  setNack(value?: ReadReq.Nack): void;

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
    getStreamName(): string;
    setStreamName(value: string): void;

    getGroupName(): string;
    setGroupName(value: string): void;

    getBufferSize(): number;
    setBufferSize(value: number): void;

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
      streamName: string,
      groupName: string,
      bufferSize: number,
    }
  }

  export class Ack extends jspb.Message {
    getId(): Uint8Array | string;
    getId_asU8(): Uint8Array;
    getId_asB64(): string;
    setId(value: Uint8Array | string): void;

    clearIdsList(): void;
    getIdsList(): Array<UUID>;
    setIdsList(value: Array<UUID>): void;
    addIds(value?: UUID, index?: number): UUID;

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
      idsList: Array<UUID.AsObject>,
    }
  }

  export class Nack extends jspb.Message {
    getId(): Uint8Array | string;
    getId_asU8(): Uint8Array;
    getId_asB64(): string;
    setId(value: Uint8Array | string): void;

    clearIdsList(): void;
    getIdsList(): Array<UUID>;
    setIdsList(value: Array<UUID>): void;
    addIds(value?: UUID, index?: number): UUID;

    getAction(): ReadReq.Nack.ActionMap[keyof ReadReq.Nack.ActionMap];
    setAction(value: ReadReq.Nack.ActionMap[keyof ReadReq.Nack.ActionMap]): void;

    getReason(): string;
    setReason(value: string): void;

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
      idsList: Array<UUID.AsObject>,
      action: ReadReq.Nack.ActionMap[keyof ReadReq.Nack.ActionMap],
      reason: string,
    }

    export interface ActionMap {
      UNKNOWN: 0;
      PARK: 1;
      RETRY: 2;
      SKIP: 3;
      STOP: 4;
    }

    export const Action: ActionMap;
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
  setEvent(value?: ReadResp.ReadEvent): void;

  hasEmpty(): boolean;
  clearEmpty(): void;
  getEmpty(): ReadResp.Empty | undefined;
  setEmpty(value?: ReadResp.Empty): void;

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
    empty?: ReadResp.Empty.AsObject,
  }

  export class ReadEvent extends jspb.Message {
    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): ReadResp.ReadEvent.RecordedEvent | undefined;
    setEvent(value?: ReadResp.ReadEvent.RecordedEvent): void;

    hasLink(): boolean;
    clearLink(): void;
    getLink(): ReadResp.ReadEvent.RecordedEvent | undefined;
    setLink(value?: ReadResp.ReadEvent.RecordedEvent): void;

    hasCommitPosition(): boolean;
    clearCommitPosition(): void;
    getCommitPosition(): number;
    setCommitPosition(value: number): void;

    hasNoPosition(): boolean;
    clearNoPosition(): void;
    getNoPosition(): ReadResp.Empty | undefined;
    setNoPosition(value?: ReadResp.Empty): void;

    hasRetryCount(): boolean;
    clearRetryCount(): void;
    getRetryCount(): number;
    setRetryCount(value: number): void;

    hasEmpty(): boolean;
    clearEmpty(): void;
    getEmpty(): ReadResp.Empty | undefined;
    setEmpty(value?: ReadResp.Empty): void;

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
      noPosition?: ReadResp.Empty.AsObject,
      retryCount: number,
      empty?: ReadResp.Empty.AsObject,
    }

    export class RecordedEvent extends jspb.Message {
      hasId(): boolean;
      clearId(): void;
      getId(): UUID | undefined;
      setId(value?: UUID): void;

      getStreamName(): string;
      setStreamName(value: string): void;

      getStreamRevision(): number;
      setStreamRevision(value: number): void;

      getPreparePosition(): number;
      setPreparePosition(value: number): void;

      getCommitPosition(): number;
      setCommitPosition(value: number): void;

      getMetadataMap(): jspb.Map<string, string>;
      clearMetadataMap(): void;
      getCustomMetadata(): Uint8Array | string;
      getCustomMetadata_asU8(): Uint8Array;
      getCustomMetadata_asB64(): string;
      setCustomMetadata(value: Uint8Array | string): void;

      getData(): Uint8Array | string;
      getData_asU8(): Uint8Array;
      getData_asB64(): string;
      setData(value: Uint8Array | string): void;

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
        id?: UUID.AsObject,
        streamName: string,
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
      EMPTY = 6,
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

  export enum ContentCase {
    CONTENT_NOT_SET = 0,
    EVENT = 1,
    EMPTY = 2,
  }
}

export class CreateReq extends jspb.Message {
  hasOptions(): boolean;
  clearOptions(): void;
  getOptions(): CreateReq.Options | undefined;
  setOptions(value?: CreateReq.Options): void;

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
    getStreamName(): string;
    setStreamName(value: string): void;

    getGroupName(): string;
    setGroupName(value: string): void;

    hasSettings(): boolean;
    clearSettings(): void;
    getSettings(): CreateReq.Settings | undefined;
    setSettings(value?: CreateReq.Settings): void;

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
      streamName: string,
      groupName: string,
      settings?: CreateReq.Settings.AsObject,
    }
  }

  export class Settings extends jspb.Message {
    getResolveLinks(): boolean;
    setResolveLinks(value: boolean): void;

    getRevision(): number;
    setRevision(value: number): void;

    getExtraStatistics(): boolean;
    setExtraStatistics(value: boolean): void;

    getMessageTimeout(): number;
    setMessageTimeout(value: number): void;

    getMaxRetryCount(): number;
    setMaxRetryCount(value: number): void;

    getCheckpointAfter(): number;
    setCheckpointAfter(value: number): void;

    getMinCheckpointCount(): number;
    setMinCheckpointCount(value: number): void;

    getMaxCheckpointCount(): number;
    setMaxCheckpointCount(value: number): void;

    getMaxSubscriberCount(): number;
    setMaxSubscriberCount(value: number): void;

    getLiveBufferSize(): number;
    setLiveBufferSize(value: number): void;

    getReadBatchSize(): number;
    setReadBatchSize(value: number): void;

    getHistoryBufferSize(): number;
    setHistoryBufferSize(value: number): void;

    getNamedConsumerStrategy(): CreateReq.ConsumerStrategyMap[keyof CreateReq.ConsumerStrategyMap];
    setNamedConsumerStrategy(value: CreateReq.ConsumerStrategyMap[keyof CreateReq.ConsumerStrategyMap]): void;

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
      messageTimeout: number,
      maxRetryCount: number,
      checkpointAfter: number,
      minCheckpointCount: number,
      maxCheckpointCount: number,
      maxSubscriberCount: number,
      liveBufferSize: number,
      readBatchSize: number,
      historyBufferSize: number,
      namedConsumerStrategy: CreateReq.ConsumerStrategyMap[keyof CreateReq.ConsumerStrategyMap],
    }
  }

  export interface ConsumerStrategyMap {
    DISPATCHTOSINGLE: 0;
    ROUNDROBIN: 1;
    PINNED: 2;
  }

  export const ConsumerStrategy: ConsumerStrategyMap;
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
  setOptions(value?: UpdateReq.Options): void;

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
    getStreamName(): string;
    setStreamName(value: string): void;

    getGroupName(): string;
    setGroupName(value: string): void;

    hasSettings(): boolean;
    clearSettings(): void;
    getSettings(): UpdateReq.Settings | undefined;
    setSettings(value?: UpdateReq.Settings): void;

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
      streamName: string,
      groupName: string,
      settings?: UpdateReq.Settings.AsObject,
    }
  }

  export class Settings extends jspb.Message {
    getResolveLinks(): boolean;
    setResolveLinks(value: boolean): void;

    getRevision(): number;
    setRevision(value: number): void;

    getExtraStatistics(): boolean;
    setExtraStatistics(value: boolean): void;

    getMessageTimeout(): number;
    setMessageTimeout(value: number): void;

    getMaxRetryCount(): number;
    setMaxRetryCount(value: number): void;

    getCheckpointAfter(): number;
    setCheckpointAfter(value: number): void;

    getMinCheckpointCount(): number;
    setMinCheckpointCount(value: number): void;

    getMaxCheckpointCount(): number;
    setMaxCheckpointCount(value: number): void;

    getMaxSubscriberCount(): number;
    setMaxSubscriberCount(value: number): void;

    getLiveBufferSize(): number;
    setLiveBufferSize(value: number): void;

    getReadBatchSize(): number;
    setReadBatchSize(value: number): void;

    getHistoryBufferSize(): number;
    setHistoryBufferSize(value: number): void;

    getNamedConsumerStrategy(): UpdateReq.ConsumerStrategyMap[keyof UpdateReq.ConsumerStrategyMap];
    setNamedConsumerStrategy(value: UpdateReq.ConsumerStrategyMap[keyof UpdateReq.ConsumerStrategyMap]): void;

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
      messageTimeout: number,
      maxRetryCount: number,
      checkpointAfter: number,
      minCheckpointCount: number,
      maxCheckpointCount: number,
      maxSubscriberCount: number,
      liveBufferSize: number,
      readBatchSize: number,
      historyBufferSize: number,
      namedConsumerStrategy: UpdateReq.ConsumerStrategyMap[keyof UpdateReq.ConsumerStrategyMap],
    }
  }

  export interface ConsumerStrategyMap {
    DISPATCHTOSINGLE: 0;
    ROUNDROBIN: 1;
    PINNED: 2;
  }

  export const ConsumerStrategy: ConsumerStrategyMap;
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
  setOptions(value?: DeleteReq.Options): void;

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
    getStreamName(): string;
    setStreamName(value: string): void;

    getGroupName(): string;
    setGroupName(value: string): void;

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
      streamName: string,
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

export class UUID extends jspb.Message {
  hasStructured(): boolean;
  clearStructured(): void;
  getStructured(): UUID.Structured | undefined;
  setStructured(value?: UUID.Structured): void;

  hasString(): boolean;
  clearString(): void;
  getString(): string;
  setString(value: string): void;

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
    getMostSignificantBits(): number;
    setMostSignificantBits(value: number): void;

    getLeastSignificantBits(): number;
    setLeastSignificantBits(value: number): void;

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
      mostSignificantBits: number,
      leastSignificantBits: number,
    }
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    STRUCTURED = 1,
    STRING = 2,
  }
}

