// package: event_store.grpc.streams
// file: streams.proto

import * as jspb from "google-protobuf";

export class ReadReq extends jspb.Message {
  hasOptions(): boolean;
  clearOptions(): void;
  getOptions(): ReadReq.Options | undefined;
  setOptions(value?: ReadReq.Options): void;

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
  }

  export class Options extends jspb.Message {
    hasStream(): boolean;
    clearStream(): void;
    getStream(): ReadReq.Options.StreamOptions | undefined;
    setStream(value?: ReadReq.Options.StreamOptions): void;

    hasAll(): boolean;
    clearAll(): void;
    getAll(): ReadReq.Options.AllOptions | undefined;
    setAll(value?: ReadReq.Options.AllOptions): void;

    getReadDirection(): ReadReq.Options.ReadDirectionMap[keyof ReadReq.Options.ReadDirectionMap];
    setReadDirection(value: ReadReq.Options.ReadDirectionMap[keyof ReadReq.Options.ReadDirectionMap]): void;

    getResolveLinks(): boolean;
    setResolveLinks(value: boolean): void;

    hasCount(): boolean;
    clearCount(): void;
    getCount(): number;
    setCount(value: number): void;

    hasSubscription(): boolean;
    clearSubscription(): void;
    getSubscription(): ReadReq.Options.SubscriptionOptions | undefined;
    setSubscription(value?: ReadReq.Options.SubscriptionOptions): void;

    hasFilter(): boolean;
    clearFilter(): void;
    getFilter(): ReadReq.Options.FilterOptions | undefined;
    setFilter(value?: ReadReq.Options.FilterOptions): void;

    hasNoFilter(): boolean;
    clearNoFilter(): void;
    getNoFilter(): ReadReq.Empty | undefined;
    setNoFilter(value?: ReadReq.Empty): void;

    hasUuidOption(): boolean;
    clearUuidOption(): void;
    getUuidOption(): ReadReq.Options.UUIDOption | undefined;
    setUuidOption(value?: ReadReq.Options.UUIDOption): void;

    getStreamOptionCase(): Options.StreamOptionCase;
    getCountOptionCase(): Options.CountOptionCase;
    getFilterOptionCase(): Options.FilterOptionCase;
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
      stream?: ReadReq.Options.StreamOptions.AsObject,
      all?: ReadReq.Options.AllOptions.AsObject,
      readDirection: ReadReq.Options.ReadDirectionMap[keyof ReadReq.Options.ReadDirectionMap],
      resolveLinks: boolean,
      count: number,
      subscription?: ReadReq.Options.SubscriptionOptions.AsObject,
      filter?: ReadReq.Options.FilterOptions.AsObject,
      noFilter?: ReadReq.Empty.AsObject,
      uuidOption?: ReadReq.Options.UUIDOption.AsObject,
    }

    export class StreamOptions extends jspb.Message {
      getStreamName(): string;
      setStreamName(value: string): void;

      hasRevision(): boolean;
      clearRevision(): void;
      getRevision(): number;
      setRevision(value: number): void;

      hasStart(): boolean;
      clearStart(): void;
      getStart(): ReadReq.Empty | undefined;
      setStart(value?: ReadReq.Empty): void;

      hasEnd(): boolean;
      clearEnd(): void;
      getEnd(): ReadReq.Empty | undefined;
      setEnd(value?: ReadReq.Empty): void;

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
        streamName: string,
        revision: number,
        start?: ReadReq.Empty.AsObject,
        end?: ReadReq.Empty.AsObject,
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
      getPosition(): ReadReq.Options.Position | undefined;
      setPosition(value?: ReadReq.Options.Position): void;

      hasStart(): boolean;
      clearStart(): void;
      getStart(): ReadReq.Empty | undefined;
      setStart(value?: ReadReq.Empty): void;

      hasEnd(): boolean;
      clearEnd(): void;
      getEnd(): ReadReq.Empty | undefined;
      setEnd(value?: ReadReq.Empty): void;

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
        position?: ReadReq.Options.Position.AsObject,
        start?: ReadReq.Empty.AsObject,
        end?: ReadReq.Empty.AsObject,
      }

      export enum AllOptionCase {
        ALL_OPTION_NOT_SET = 0,
        POSITION = 1,
        START = 2,
        END = 3,
      }
    }

    export class SubscriptionOptions extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): SubscriptionOptions.AsObject;
      static toObject(includeInstance: boolean, msg: SubscriptionOptions): SubscriptionOptions.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: SubscriptionOptions, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): SubscriptionOptions;
      static deserializeBinaryFromReader(message: SubscriptionOptions, reader: jspb.BinaryReader): SubscriptionOptions;
    }

    export namespace SubscriptionOptions {
      export type AsObject = {
      }
    }

    export class Position extends jspb.Message {
      getCommitPosition(): number;
      setCommitPosition(value: number): void;

      getPreparePosition(): number;
      setPreparePosition(value: number): void;

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
        commitPosition: number,
        preparePosition: number,
      }
    }

    export class FilterOptions extends jspb.Message {
      hasStreamName(): boolean;
      clearStreamName(): void;
      getStreamName(): ReadReq.Options.FilterOptions.Expression | undefined;
      setStreamName(value?: ReadReq.Options.FilterOptions.Expression): void;

      hasEventType(): boolean;
      clearEventType(): void;
      getEventType(): ReadReq.Options.FilterOptions.Expression | undefined;
      setEventType(value?: ReadReq.Options.FilterOptions.Expression): void;

      hasMax(): boolean;
      clearMax(): void;
      getMax(): number;
      setMax(value: number): void;

      hasCount(): boolean;
      clearCount(): void;
      getCount(): ReadReq.Empty | undefined;
      setCount(value?: ReadReq.Empty): void;

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
        streamName?: ReadReq.Options.FilterOptions.Expression.AsObject,
        eventType?: ReadReq.Options.FilterOptions.Expression.AsObject,
        max: number,
        count?: ReadReq.Empty.AsObject,
      }

      export class Expression extends jspb.Message {
        getRegex(): string;
        setRegex(value: string): void;

        clearPrefixList(): void;
        getPrefixList(): Array<string>;
        setPrefixList(value: Array<string>): void;
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
        STREAM_NAME = 1,
        EVENT_TYPE = 2,
      }

      export enum WindowCase {
        WINDOW_NOT_SET = 0,
        MAX = 3,
        COUNT = 4,
      }
    }

    export class UUIDOption extends jspb.Message {
      hasStructured(): boolean;
      clearStructured(): void;
      getStructured(): ReadReq.Empty | undefined;
      setStructured(value?: ReadReq.Empty): void;

      hasString(): boolean;
      clearString(): void;
      getString(): ReadReq.Empty | undefined;
      setString(value?: ReadReq.Empty): void;

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
        structured?: ReadReq.Empty.AsObject,
        string?: ReadReq.Empty.AsObject,
      }

      export enum ContentCase {
        CONTENT_NOT_SET = 0,
        STRUCTURED = 1,
        STRING = 2,
      }
    }

    export interface ReadDirectionMap {
      FORWARDS: 0;
      BACKWARDS: 1;
    }

    export const ReadDirection: ReadDirectionMap;

    export enum StreamOptionCase {
      STREAM_OPTION_NOT_SET = 0,
      STREAM = 1,
      ALL = 2,
    }

    export enum CountOptionCase {
      COUNT_OPTION_NOT_SET = 0,
      COUNT = 5,
      SUBSCRIPTION = 6,
    }

    export enum FilterOptionCase {
      FILTER_OPTION_NOT_SET = 0,
      FILTER = 7,
      NO_FILTER = 8,
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
}

export class ReadResp extends jspb.Message {
  hasEvent(): boolean;
  clearEvent(): void;
  getEvent(): ReadResp.ReadEvent | undefined;
  setEvent(value?: ReadResp.ReadEvent): void;

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

    getPositionCase(): ReadEvent.PositionCase;
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
}

export class AppendReq extends jspb.Message {
  hasOptions(): boolean;
  clearOptions(): void;
  getOptions(): AppendReq.Options | undefined;
  setOptions(value?: AppendReq.Options): void;

  hasProposedMessage(): boolean;
  clearProposedMessage(): void;
  getProposedMessage(): AppendReq.ProposedMessage | undefined;
  setProposedMessage(value?: AppendReq.ProposedMessage): void;

  getContentCase(): AppendReq.ContentCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppendReq.AsObject;
  static toObject(includeInstance: boolean, msg: AppendReq): AppendReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppendReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppendReq;
  static deserializeBinaryFromReader(message: AppendReq, reader: jspb.BinaryReader): AppendReq;
}

export namespace AppendReq {
  export type AsObject = {
    options?: AppendReq.Options.AsObject,
    proposedMessage?: AppendReq.ProposedMessage.AsObject,
  }

  export class Options extends jspb.Message {
    getStreamName(): string;
    setStreamName(value: string): void;

    hasRevision(): boolean;
    clearRevision(): void;
    getRevision(): number;
    setRevision(value: number): void;

    hasNoStream(): boolean;
    clearNoStream(): void;
    getNoStream(): AppendReq.Empty | undefined;
    setNoStream(value?: AppendReq.Empty): void;

    hasAny(): boolean;
    clearAny(): void;
    getAny(): AppendReq.Empty | undefined;
    setAny(value?: AppendReq.Empty): void;

    hasStreamExists(): boolean;
    clearStreamExists(): void;
    getStreamExists(): AppendReq.Empty | undefined;
    setStreamExists(value?: AppendReq.Empty): void;

    getExpectedStreamRevisionCase(): Options.ExpectedStreamRevisionCase;
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
      revision: number,
      noStream?: AppendReq.Empty.AsObject,
      any?: AppendReq.Empty.AsObject,
      streamExists?: AppendReq.Empty.AsObject,
    }

    export enum ExpectedStreamRevisionCase {
      EXPECTED_STREAM_REVISION_NOT_SET = 0,
      REVISION = 2,
      NO_STREAM = 3,
      ANY = 4,
      STREAM_EXISTS = 5,
    }
  }

  export class ProposedMessage extends jspb.Message {
    hasId(): boolean;
    clearId(): void;
    getId(): UUID | undefined;
    setId(value?: UUID): void;

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
    toObject(includeInstance?: boolean): ProposedMessage.AsObject;
    static toObject(includeInstance: boolean, msg: ProposedMessage): ProposedMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProposedMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProposedMessage;
    static deserializeBinaryFromReader(message: ProposedMessage, reader: jspb.BinaryReader): ProposedMessage;
  }

  export namespace ProposedMessage {
    export type AsObject = {
      id?: UUID.AsObject,
      metadataMap: Array<[string, string]>,
      customMetadata: Uint8Array | string,
      data: Uint8Array | string,
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
    OPTIONS = 1,
    PROPOSED_MESSAGE = 2,
  }
}

export class AppendResp extends jspb.Message {
  hasCurrentRevision(): boolean;
  clearCurrentRevision(): void;
  getCurrentRevision(): number;
  setCurrentRevision(value: number): void;

  hasNoStream(): boolean;
  clearNoStream(): void;
  getNoStream(): AppendResp.Empty | undefined;
  setNoStream(value?: AppendResp.Empty): void;

  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): AppendResp.Position | undefined;
  setPosition(value?: AppendResp.Position): void;

  hasEmpty(): boolean;
  clearEmpty(): void;
  getEmpty(): AppendResp.Empty | undefined;
  setEmpty(value?: AppendResp.Empty): void;

  getCurrentRevisionOptionCase(): AppendResp.CurrentRevisionOptionCase;
  getPositionOptionCase(): AppendResp.PositionOptionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppendResp.AsObject;
  static toObject(includeInstance: boolean, msg: AppendResp): AppendResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppendResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppendResp;
  static deserializeBinaryFromReader(message: AppendResp, reader: jspb.BinaryReader): AppendResp;
}

export namespace AppendResp {
  export type AsObject = {
    currentRevision: number,
    noStream?: AppendResp.Empty.AsObject,
    position?: AppendResp.Position.AsObject,
    empty?: AppendResp.Empty.AsObject,
  }

  export class Position extends jspb.Message {
    getCommitPosition(): number;
    setCommitPosition(value: number): void;

    getPreparePosition(): number;
    setPreparePosition(value: number): void;

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
      commitPosition: number,
      preparePosition: number,
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

  export enum CurrentRevisionOptionCase {
    CURRENT_REVISION_OPTION_NOT_SET = 0,
    CURRENT_REVISION = 1,
    NO_STREAM = 2,
  }

  export enum PositionOptionCase {
    POSITION_OPTION_NOT_SET = 0,
    POSITION = 3,
    EMPTY = 4,
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

    hasRevision(): boolean;
    clearRevision(): void;
    getRevision(): number;
    setRevision(value: number): void;

    hasNoStream(): boolean;
    clearNoStream(): void;
    getNoStream(): DeleteReq.Empty | undefined;
    setNoStream(value?: DeleteReq.Empty): void;

    hasAny(): boolean;
    clearAny(): void;
    getAny(): DeleteReq.Empty | undefined;
    setAny(value?: DeleteReq.Empty): void;

    hasStreamExists(): boolean;
    clearStreamExists(): void;
    getStreamExists(): DeleteReq.Empty | undefined;
    setStreamExists(value?: DeleteReq.Empty): void;

    getExpectedStreamRevisionCase(): Options.ExpectedStreamRevisionCase;
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
      revision: number,
      noStream?: DeleteReq.Empty.AsObject,
      any?: DeleteReq.Empty.AsObject,
      streamExists?: DeleteReq.Empty.AsObject,
    }

    export enum ExpectedStreamRevisionCase {
      EXPECTED_STREAM_REVISION_NOT_SET = 0,
      REVISION = 2,
      NO_STREAM = 3,
      ANY = 4,
      STREAM_EXISTS = 5,
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
}

export class DeleteResp extends jspb.Message {
  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): DeleteResp.Position | undefined;
  setPosition(value?: DeleteResp.Position): void;

  hasEmpty(): boolean;
  clearEmpty(): void;
  getEmpty(): DeleteResp.Empty | undefined;
  setEmpty(value?: DeleteResp.Empty): void;

  getPositionOptionCase(): DeleteResp.PositionOptionCase;
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
    position?: DeleteResp.Position.AsObject,
    empty?: DeleteResp.Empty.AsObject,
  }

  export class Position extends jspb.Message {
    getCommitPosition(): number;
    setCommitPosition(value: number): void;

    getPreparePosition(): number;
    setPreparePosition(value: number): void;

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
      commitPosition: number,
      preparePosition: number,
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

  export enum PositionOptionCase {
    POSITION_OPTION_NOT_SET = 0,
    POSITION = 1,
    EMPTY = 2,
  }
}

export class TombstoneReq extends jspb.Message {
  hasOptions(): boolean;
  clearOptions(): void;
  getOptions(): TombstoneReq.Options | undefined;
  setOptions(value?: TombstoneReq.Options): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TombstoneReq.AsObject;
  static toObject(includeInstance: boolean, msg: TombstoneReq): TombstoneReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TombstoneReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TombstoneReq;
  static deserializeBinaryFromReader(message: TombstoneReq, reader: jspb.BinaryReader): TombstoneReq;
}

export namespace TombstoneReq {
  export type AsObject = {
    options?: TombstoneReq.Options.AsObject,
  }

  export class Options extends jspb.Message {
    getStreamName(): string;
    setStreamName(value: string): void;

    hasRevision(): boolean;
    clearRevision(): void;
    getRevision(): number;
    setRevision(value: number): void;

    hasNoStream(): boolean;
    clearNoStream(): void;
    getNoStream(): TombstoneReq.Empty | undefined;
    setNoStream(value?: TombstoneReq.Empty): void;

    hasAny(): boolean;
    clearAny(): void;
    getAny(): TombstoneReq.Empty | undefined;
    setAny(value?: TombstoneReq.Empty): void;

    hasStreamExists(): boolean;
    clearStreamExists(): void;
    getStreamExists(): TombstoneReq.Empty | undefined;
    setStreamExists(value?: TombstoneReq.Empty): void;

    getExpectedStreamRevisionCase(): Options.ExpectedStreamRevisionCase;
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
      revision: number,
      noStream?: TombstoneReq.Empty.AsObject,
      any?: TombstoneReq.Empty.AsObject,
      streamExists?: TombstoneReq.Empty.AsObject,
    }

    export enum ExpectedStreamRevisionCase {
      EXPECTED_STREAM_REVISION_NOT_SET = 0,
      REVISION = 2,
      NO_STREAM = 3,
      ANY = 4,
      STREAM_EXISTS = 5,
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
}

export class TombstoneResp extends jspb.Message {
  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): TombstoneResp.Position | undefined;
  setPosition(value?: TombstoneResp.Position): void;

  hasEmpty(): boolean;
  clearEmpty(): void;
  getEmpty(): TombstoneResp.Empty | undefined;
  setEmpty(value?: TombstoneResp.Empty): void;

  getPositionOptionCase(): TombstoneResp.PositionOptionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TombstoneResp.AsObject;
  static toObject(includeInstance: boolean, msg: TombstoneResp): TombstoneResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TombstoneResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TombstoneResp;
  static deserializeBinaryFromReader(message: TombstoneResp, reader: jspb.BinaryReader): TombstoneResp;
}

export namespace TombstoneResp {
  export type AsObject = {
    position?: TombstoneResp.Position.AsObject,
    empty?: TombstoneResp.Empty.AsObject,
  }

  export class Position extends jspb.Message {
    getCommitPosition(): number;
    setCommitPosition(value: number): void;

    getPreparePosition(): number;
    setPreparePosition(value: number): void;

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
      commitPosition: number,
      preparePosition: number,
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

  export enum PositionOptionCase {
    POSITION_OPTION_NOT_SET = 0,
    POSITION = 1,
    EMPTY = 2,
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

