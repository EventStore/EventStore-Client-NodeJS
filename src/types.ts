import { v4 as uuid } from "uuid";
import { ReadReq } from "../generated/streams_pb";
import FilterOptions = ReadReq.Options.FilterOptions;
import Expression = ReadReq.Options.FilterOptions.Expression;
import * as grpc from "grpc";
import * as streams_pb from "../generated/streams_pb";
import * as persistent_pb from "../generated/persistent_pb";
import { MemberInfo as GrpcMemberInfo } from "../generated/gossip_pb";
import VNodeState = GrpcMemberInfo.VNodeState;

export { VNodeState };
/**
 * Constants used for expected version control. The use of expected version can be a bit tricky especially when
 * discussing assurances given by the EventStoreDB server.
 *
 * The EventStoreDB server will assure idempotency for all operations using any value in ExpectedVersion except
 * {@link Revision.Any}. When using {@link Revision.Any}., the EventStoreDB server will do its best to assure
 * idempotency but will not guarantee idempotency.
 */
export type Revision =
  | AnyRevision
  | StreamExistsRevision
  | NoStreamRevision
  | ExactRevision;

export type AnyRevision = {
  __typename: "any";
};

export type StreamExistsRevision = {
  __typename: "stream_exists";
};

export type NoStreamRevision = {
  __typename: "no_stream";
};

export type ExactRevision = {
  __typename: "exact";
  revision: number;
};

export type RevisionObj = {
  Any: AnyRevision;
  StreamExists: StreamExistsRevision;
  NoStream: NoStreamRevision;
  exact: (revision: number) => ExactRevision;
};

export const Revision: RevisionObj = {
  /**
   * This write should not conflict with anything and should always succeed.
   */
  Any: {
    __typename: "any",
  },

  /**
   * The stream should exist. If it or a metadata stream does not exist, treats that as a concurrency problem.
   */
  StreamExists: {
    __typename: "stream_exists",
  },

  /**
   * The stream being written to should not yet exist. If it does exist, treats that as a concurrency problem.
   */
  NoStream: {
    __typename: "no_stream",
  },

  /**
   * States that the last event written to the stream should have an event number matching your expected value.
   * @param revision
   */
  exact: (revision: number) => {
    return {
      __typename: "exact",
      revision,
    };
  },
};

export type Payload = JsonPayload | BinaryPayload;

export type JsonPayload = {
  __typename: "json";
  // eslint-disable-next-line
  payload: any;
};

export type BinaryPayload = {
  __typename: "binary";
  payload: Uint8Array;
};

export type Credentials = {
  username: string;
  password: string;
};

export const Credentials: (
  username: string,
  password: string
) => Credentials = (username, password) => {
  return {
    username,
    password,
  };
};

export class EventDataBuilder {
  eventType: string;
  payload: JsonPayload | BinaryPayload;
  id: string | null;

  private constructor(
    eventType: string,
    payload: JsonPayload | BinaryPayload,
    id: string | null
  ) {
    this.eventType = eventType;
    this.payload = payload;
    this.id = id;
  }

  // eslint-disable-next-line
  static json(eventType: string, obj: any): EventDataBuilder {
    const payload: JsonPayload = {
      __typename: "json",
      payload: obj,
    };

    return new EventDataBuilder(eventType, payload, null);
  }

  static binary(eventType: string, buffer: Uint8Array): EventDataBuilder {
    const payload: BinaryPayload = {
      __typename: "binary",
      payload: buffer,
    };

    return new EventDataBuilder(eventType, payload, null);
  }

  /**
   * Set an id to this event. By default, the id will be generated.
   * @param id
   */
  eventId(id: string): EventDataBuilder {
    this.id = id;
    return this;
  }

  build(): EventData {
    const id: string = this.id != null ? this.id : uuid();
    return new EventData(this.eventType, this.payload, id);
  }
}

/**
 * Holds data of event about to be sent to the server.
 */
export class EventData {
  eventType: string;
  payload: JsonPayload | BinaryPayload;
  id: string;

  public constructor(
    eventType: string,
    payload: JsonPayload | BinaryPayload,
    id: string
  ) {
    this.eventType = eventType;
    this.payload = payload;
    this.id = id;
  }

  /**
   * Creates an event with a JSON payload.
   * @param eventType
   * @param payload An object.
   */
  // eslint-disable-next-line
  static json(eventType: string, payload: any): EventDataBuilder {
    return EventDataBuilder.json(eventType, payload);
  }

  /**
   * Creates an event with a raw binary payload.
   * @param eventType
   * @param payload
   */
  static binary(eventType: string, payload: Uint8Array): EventDataBuilder {
    return EventDataBuilder.binary(eventType, payload);
  }
}

export type Direction = Forward | Backward;

export type Forward = {
  __typename: "forward";
};

export const Forward: Forward = {
  __typename: "forward",
};

export type Backward = {
  __typename: "backward";
};

export const Backward: Backward = {
  __typename: "backward",
};

export type ReadDirectionObj = {
  Forward: Forward;
  Backward: Backward;
};

/**
 * Represents the direction of read operation (both from '$all' and a regular stream).
 */
export const ReadDirection: ReadDirectionObj = {
  Forward: {
    __typename: "forward",
  },

  Backward: {
    __typename: "backward",
  },
};

export type StreamRevision = StreamStart | StreamEnd | StreamExact;
export type AllPosition = StreamStart | StreamEnd | StreamPosition;

export type StreamStart = {
  __typename: "start";
};

export type StreamEnd = {
  __typename: "end";
};

export type StreamExact = {
  __typename: "exact";
  revision: number;
};

export const StreamStart: StreamStart = {
  __typename: "start",
};

export const StreamEnd: StreamEnd = {
  __typename: "end",
};

export const StreamExact = (revision: number): StreamExact => {
  return {
    __typename: "exact",
    revision,
  };
};

/**
 * A structure referring to a potential logical record position in the EventStoreDB transaction file.
 */
export type Position = {
  commit: number;
  prepare: number;
};

export type StreamPosition = {
  __typename: "position";
  position: Position;
};

export const StreamPosition: (pos: Position) => StreamPosition = (pos) => {
  return {
    __typename: "position",
    position: pos,
  };
};

export type WriteResult = WriteResultSuccess | WriteResultFailure;

export type WriteResultSuccess = {
  __typename: "success";
  nextExpectedVersion: number;
  position?: Position;
};

export type WriteResultFailure = {
  __typename: "failure";
  error: WrongExpectedVersion | Error;
};

export type CurrentRevisionNoStream = {
  __typename: "no_stream";
};

export const CurrentRevisionNoStream: CurrentRevisionNoStream = {
  __typename: "no_stream",
};

export type CurrentStreamRevision = {
  __typename: "current";
  revision: number;
};

export const CurrentStreamRevision: (
  revision: number
) => CurrentStreamRevision = (revision) => {
  return {
    __typename: "current",
    revision,
  };
};

export type CurrentRevision = CurrentStreamRevision | CurrentRevisionNoStream;

export type ExpectedStreamRevision = {
  __typename: "expected";
  revision: number;
};

export type ExpectedRevisionAny = {
  __typename: "any";
};

export type ExpectedRevisionExists = {
  __typename: "stream_exists";
};

export const ExpectedRevisionExists: ExpectedRevisionExists = {
  __typename: "stream_exists",
};

export const ExpectedRevisionAny: ExpectedRevisionAny = {
  __typename: "any",
};

export const ExpectedStreamRevision: (
  revision: number
) => ExpectedStreamRevision = (revision) => {
  return {
    __typename: "expected",
    revision,
  };
};

export type ExpectedRevision =
  | ExpectedStreamRevision
  | ExpectedRevisionAny
  | ExpectedRevisionExists;

export type WrongExpectedVersion = {
  current: CurrentRevision;
  expected: ExpectedRevision;
};

/**
 * A structure representing a single event or an resolved link event.
 */
export type ResolvedEvent = {
  /**
   * The event, or the resolved link event if this {@link ResolvedEvent} is a link event.
   */
  event?: RecordedEvent;

  /**
   *
   The link event if this ResolvedEvent is a link event.
   */
  link?: RecordedEvent;

  /**
   * Commit position of the record.
   */
  commit_position?: number;
};

/**
 * Represents a previously written event.
 */
export type RecordedEvent = {
  /**
   * The event stream that events belongs to.
   */
  streamId: string;

  /**
   * Unique identifier representing this event. UUID format.
   */
  id: string;

  /**
   * Number of this event in the stream.
   */
  revision: number;

  /**
   * Type of this event.
   */
  eventType: string;

  /**
   * Payload of this event.
   */
  // eslint-disable-next-line
  data: Uint8Array | Object;

  /**
   * Representing the metadata associated with this event.
   */
  // eslint-disable-next-line
  metadata: Uint8Array | Object;

  /**
   * Indicates wheter the content is internally marked as JSON.
   */
  isJson: boolean;

  /**
   * Position of this event in the transaction log.
   */
  position: Position;

  /**
   * Representing when this event was created in the database system.
   */
  created: number;
};

export type ReadStreamResult = ReadStreamSuccess | ReadStreamNotFound;

export type ReadStreamSuccess = {
  __typename: "success";
  events: ResolvedEvent[] | undefined; // always defined.
};

export type ReadStreamNotFound = {
  __typename: "not_found";
  events: ResolvedEvent[] | undefined;
};

export const ReadStreamNotFound: ReadStreamNotFound = {
  __typename: "not_found",
  events: undefined,
};

export type SubscriptionHandler = {
  onEvent: (report: SubscriptionReport, event: ResolvedEvent) => void;
  onEnd?: () => void;
  onConfirmation?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
};

export type PersistentSubscriptionHandler = {
  onEvent: (report: PersistentReport, event: ResolvedEvent) => void;
  onEnd?: () => void;
  onConfirmation?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
};

export class Filter {
  private baseOnStream: boolean;
  private _max: number | undefined;
  private _checkpointIntervalMul: number | undefined;
  private _regex: string | undefined;
  private _prefixes: string[] | undefined;

  private constructor(baseOnStream: boolean) {
    this.baseOnStream = baseOnStream;
  }

  static basedOnStreamName(): Filter {
    return new Filter(true);
  }

  static basedOnEventType(): Filter {
    return new Filter(false);
  }

  regex(value: string): Filter {
    this._regex = value;
    return this;
  }

  max(value: number): Filter {
    this._max = value;
    return this;
  }

  checkpointIntervalMultiplier(value: number): Filter {
    this._checkpointIntervalMul = value;
    return this;
  }

  addPrefix(value: string): Filter {
    this._prefixes = this._prefixes ?? [];
    this._prefixes.push(value);
    return this;
  }

  prefixes(value: string[]): Filter {
    this._prefixes = value;
    return this;
  }

  toGrpc(): FilterOptions {
    const options = new FilterOptions();
    const expr = new Expression();

    if (this._prefixes) {
      expr.setPrefixList(this._prefixes);
    }

    if (this._regex) {
      expr.setRegex(this._regex);
    }

    if (this._max) {
      options.setMax(this._max);
    }

    if (this._checkpointIntervalMul) {
      options.setCheckpointintervalmultiplier(this._checkpointIntervalMul);
    }

    if (this.baseOnStream) {
      options.setStreamIdentifier(expr);
    } else {
      options.setEventType(expr);
    }

    return options;
  }
}

export type DeleteResult = {
  position?: Position;
};

export type ConsumerStrategy = DispatchToSingle | RoundRobin | Pinned;

export type DispatchToSingle = {
  __typename: "dispatch_to_single";
};

export const DispatchToSingle: DispatchToSingle = {
  __typename: "dispatch_to_single",
};

export type RoundRobin = {
  __typename: "round-robin";
};

export const RoundRobin: RoundRobin = {
  __typename: "round-robin",
};

export type Pinned = {
  __typename: "pinned";
};

export const Pinned: Pinned = {
  __typename: "pinned",
};

export interface PersistentReport {
  ack(ids: string[]): void;
  nack(action: PersistentAction, reason: string, ids: string[]): void;
  unsubscribe(): void;
}

export interface SubscriptionReport {
  unsubcribe(): void;
}

export type ParkAction = {
  __typename: "park";
};

export const Park: ParkAction = {
  __typename: "park",
};

export type RetryAction = {
  __typename: "retry";
};

export const Retry: RetryAction = {
  __typename: "retry",
};

export type SkipAction = {
  __typename: "skip";
};

export const Skip: SkipAction = {
  __typename: "skip",
};

export type StopAction = {
  __typename: "stop";
};

export const Stop: StopAction = {
  __typename: "stop",
};

export type PersistentAction =
  | ParkAction
  | RetryAction
  | SkipAction
  | StopAction;

export const convertGrpcRecord: (
  grpcRecord:
    | streams_pb.ReadResp.ReadEvent.RecordedEvent
    | persistent_pb.ReadResp.ReadEvent.RecordedEvent
) => RecordedEvent = (grpcRecord) => {
  const eventType =
    grpcRecord.getMetadataMap().get("type") || "<no-event-type-provided>";
  let isJson = false;

  const contentType =
    grpcRecord.getMetadataMap().get("content-type") ||
    "application/octet-stream";
  const createdStr = grpcRecord.getMetadataMap().get("created") || "0";
  const created = parseInt(createdStr);

  if (contentType === "application/json") {
    isJson = true;
  }

  const position: Position = {
    commit: grpcRecord.getCommitPosition(),
    prepare: grpcRecord.getPreparePosition(),
  };

  // eslint-disable-next-line
  let data: Uint8Array | Object;

  if (isJson) {
    data = JSON.parse(Buffer.from(grpcRecord.getData()).toString("binary"));
  } else {
    data = grpcRecord.getData_asU8();
  }

  // eslint-disable-next-line
  let customMetadata: Uint8Array | Object;

  if (isJson) {
    const metadataStr = Buffer.from(grpcRecord.getCustomMetadata()).toString(
      "binary"
    );
    if (metadataStr.length > 0) {
      customMetadata = JSON.parse(metadataStr);
    } else {
      customMetadata = metadataStr;
    }
  } else {
    customMetadata = new Uint8Array();
  }

  const identifier = grpcRecord.getStreamIdentifier();
  const eventId = grpcRecord.getId();

  let streamId: string;
  let id: string;

  if (identifier) {
    streamId = Buffer.from(identifier.getStreamname()).toString("binary");
  } else {
    throw "Impossible situation where streamIdentifier is undefined in a recorded event";
  }

  if (eventId) {
    id = eventId.getString();
  } else {
    throw "Impossible situation where event id is undefined in a recorded event";
  }

  return {
    streamId,
    id,
    revision: grpcRecord.getStreamRevision(),
    eventType,
    data: data,
    metadata: customMetadata,
    isJson,
    position,
    created,
  };
};

export type EndPoint = {
  address: string;
  port: number;
};

export function Endpoint(address: string, port: number): EndPoint {
  return {
    address,
    port,
  };
}

export type MemberInfo = {
  instanceId?: string;
  timeStamp: number;
  state: VNodeState;
  isAlive: boolean;
  httpEndpoint?: EndPoint;
};

export type GossipSeed = {
  hostname: string;
  port: number;
};

export type ClusterSettings = {
  gossipSeeds?: GossipSeed[];
  domain?: string;
  nodePreference?: NodePreference;
};

export enum NodePreference {
  Random = "random",
  Follower = "follower",
  Leader = "leader",
}

export type ClientConstructor<T extends grpc.Client> = new (
  address: string,
  credentials: grpc.ChannelCredentials,
  // eslint-disable-next-line @typescript-eslint/ban-types
  options?: object
) => T;

export interface ESDBConnection {
  close(): Promise<void>;
  _client<T extends grpc.Client>(c: ClientConstructor<T>): Promise<T>;
}
