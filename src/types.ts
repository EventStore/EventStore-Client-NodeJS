import { v4 as uuid } from "uuid";
import {ReadReq} from "../generated/streams_pb";
import FilterOptions = ReadReq.Options.FilterOptions;
import Expression = ReadReq.Options.FilterOptions.Expression;

export type IRevision =
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

export class Revision {
  static readonly Any: IRevision = {
    __typename: "any",
  };

  static readonly StreamExists: IRevision = {
    __typename: "stream_exists",
  };

  static readonly NoStream: IRevision = {
    __typename: "no_stream",
  };

  static exact(revision: number): IRevision {
    return {
      __typename: "exact",
      revision,
    };
  }
}

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

export class Credentials {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

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

  eventId(id: string): EventDataBuilder {
    this.id = id;
    return this;
  }

  build(): EventData {
    const id: string = this.id != null ? this.id : uuid();
    return new EventData(this.eventType, this.payload, id);
  }
}

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

  // eslint-disable-next-line
  static json(eventType: string, payload: any): EventDataBuilder {
    return EventDataBuilder.json(eventType, payload);
  }

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

export class ReadDirection {
  static readonly Forward: Forward = {
    __typename: "forward",
  };

  static readonly Backward: Backward = {
    __typename: "backward",
  };
}

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
  __typename: "success",
  nextExpectedVersion: number,
  position: Position,
};

export type WriteResultFailure = {
  __typename: "failure",
  error: WrongExpectedVersion | Error,
}

export type CurrentRevisionNoStream = {
  __typename: "no_stream",
};

export const CurrentRevisionNoStream : CurrentRevisionNoStream = {
  __typename: "no_stream",
};

export type CurrentStreamRevision = {
  __typename: "current",
  revision: number,
}

export const CurrentStreamRevision: (revision: number) => CurrentStreamRevision = revision => {
  return {
    __typename: "current",
    revision,
  };
};

export type CurrentRevision = CurrentStreamRevision | CurrentRevisionNoStream;

export type ExpectedStreamRevision = {
  __typename: "expected",
  revision: number,
};

export type ExpectedRevisionAny = {
  __typename: "any",
};

export type ExpectedRevisionExists = {
  __typename: "stream_exists",
};

export const ExpectedRevisionExists: ExpectedRevisionExists = {
  __typename: "stream_exists",
};

export const ExpectedRevisionAny: ExpectedRevisionAny = {
  __typename: "any",
};

export const ExpectedStreamRevision: (revision: number) => ExpectedStreamRevision = (revision) => {
  return {
    __typename: "expected",
    revision,
  };
}

export type ExpectedRevision = ExpectedStreamRevision | ExpectedRevisionAny | ExpectedRevisionExists;

export type WrongExpectedVersion = {
  current: CurrentRevision,
  expected: ExpectedRevision,
};

export type ResolvedEvent = {
  event: RecordedEvent | undefined,
  link: RecordedEvent | undefined,
  commit_position: number | undefined,
}

export type RecordedEvent = {
  streamId: string,
  id: string, // UUID
  revision: number,
  eventType: string,
  data: Uint8Array | Object,
  metadata: Uint8Array | Object,
  isJson: boolean,
  position: Position,
  created: number,
};

export type ReadStreamResult = ReadStreamSuccess | ReadStreamNotFound;

export type ReadStreamSuccess = {
  __typename: "success",
  events: ResolvedEvent[] | undefined, // always defined.
};

export type ReadStreamNotFound = {
  __typename: "not_found",
  events: ResolvedEvent[] | undefined,
};

export const ReadStreamNotFound: ReadStreamNotFound = {
  __typename: "not_found",
  events: undefined,
};

export type SubscriptionHandler = {
  onEvent: (event: ResolvedEvent) => void,
  onEnd: () => void,
  onConfirmation: () => void,
};

export class Filter {
  private baseOnStream: boolean
  private _max: number | undefined
  private _checkpointIntervalMul: number | undefined
  private _regex: string | undefined
  private _prefixes: string[] | undefined

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
