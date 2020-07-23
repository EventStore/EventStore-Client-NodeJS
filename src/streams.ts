import {
  RequestStream,
  ResponseStream,
  Status,
  StreamsClient,
} from "../generated/streams_pb_service";
import { AppendReq, ReadReq, ReadResp } from "../generated/streams_pb";
import {
  Backward,
  Credentials,
  Direction,
  EventData,
  Forward,
  IRevision,
  Position,
  Revision,
  StreamEnd,
  StreamExact,
  StreamPosition,
  StreamRevision,
  StreamStart,
} from "./types";
import { Empty, StreamIdentifier, UUID } from "../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

export class Streams {
  private readonly client: StreamsClient;

  constructor(uri: string) {
    this.client = new StreamsClient(uri);
  }

  writeEvents(stream: string): WriteEvents {
    return new WriteEvents(this.client, stream);
  }

  readStream(stream: string): ReadStreamEvents {
    return new ReadStreamEvents(this.client, stream);
  }

  readAll(): ReadAllEvents {
    return new ReadAllEvents(this.client);
  }
}

export class WriteEvents {
  private client: StreamsClient;
  private readonly stream: string;
  private revision: IRevision;
  private credentials: Credentials | null;

  constructor(client: StreamsClient, stream: string) {
    this.client = client;
    this.stream = stream;
    this.revision = Revision.Any;
    this.credentials = null;
  }

  expectedVersion(revision: IRevision): WriteEvents {
    this.revision = revision;
    return this;
  }

  authenticated(credentials: Credentials): WriteEvents {
    this.credentials = credentials;
    return this;
  }

  start(): AppendStream {
    const header = new AppendReq();
    const options = new AppendReq.Options();
    const identifier = new StreamIdentifier();

    identifier.setStreamname(this.stream);
    options.setStreamIdentifier(identifier);

    switch (this.revision.__typename) {
      case "exact": {
        options.setRevision(this.revision.revision);
        break;
      }

      case "no_stream": {
        options.setNoStream(new Empty());
        break;
      }

      case "stream_exists": {
        options.setStreamExists(new Empty());
        break;
      }

      case "any": {
        options.setAny(new Empty());
        break;
      }
    }
    header.setOptions(options);

    return new AppendStream(this.client.append().write(header));
  }
}

export class AppendStream {
  private requestStream: RequestStream<AppendReq>;

  constructor(requestStream: RequestStream<AppendReq>) {
    this.requestStream = requestStream;
  }

  send(item: EventData): void {
    const req = new AppendReq();
    const message = new AppendReq.ProposedMessage();
    const uuid = new UUID();

    uuid.setString(item.id);
    message.setId(uuid);
    message.getMetadataMap().set("type", item.eventType);

    switch (item.payload.__typename) {
      case "binary": {
        message
          .getMetadataMap()
          .set("content-type", "application/octet-stream");
        break;
      }

      case "json": {
        const buffer = Buffer.from(JSON.stringify(item.payload));
        message.getMetadataMap().set("content-type", "application/json");
        message.setData(buffer.toString("base64"));
        break;
      }
    }

    req.setProposedMessage(message);
    this.requestStream.write(req);
  }

  end(): Promise<Status> {
    this.requestStream.end();
    return new Promise<Status>((resolve) => {
      this.requestStream.on("end", (status) => resolve(status));
    });
  }

  cancel(): void {
    this.requestStream.cancel();
  }
}

export class AppendResponse {
  private requestStream: RequestStream<AppendReq>;

  constructor(requestStream: RequestStream<AppendReq>) {
    this.requestStream = requestStream;
  }

  onEnd(cb: (status?: Status) => void): void {
    this.requestStream.on("end", cb);
  }

  onStatus(cb: (status: Status) => void): void {
    this.requestStream.on("status", cb);
  }
}

export class ReadStreamEvents {
  private client: StreamsClient;
  private stream: string;
  private revision: StreamRevision;
  private resolveLinkTos: boolean;
  private direction: Direction;
  private credentials: Credentials | null;

  constructor(client: StreamsClient, stream: string) {
    this.client = client;
    this.stream = stream;
    this.revision = StreamStart;
    this.credentials = null;
    this.resolveLinkTos = false;
    this.direction = Forward;
  }

  forward(): ReadStreamEvents {
    this.direction = Forward;
    return this;
  }

  backward(): ReadStreamEvents {
    this.direction = Backward;
    return this;
  }

  readDirection(direction: Direction): ReadStreamEvents {
    this.direction = direction;
    return this;
  }

  fromRevision(revision: number): ReadStreamEvents {
    this.revision = StreamExact(revision);
    return this;
  }

  fromStart(): ReadStreamEvents {
    this.revision = StreamStart;
    return this;
  }

  fromEnd(): ReadStreamEvents {
    this.revision = StreamEnd;
    return this;
  }

  authenticated(credentials: Credentials): ReadStreamEvents {
    this.credentials = credentials;
    return this;
  }

  resolveLink(): ReadStreamEvents {
    this.resolveLinkTos = true;
    return this;
  }

  doNotResolveLink(): ReadStreamEvents {
    this.resolveLinkTos = false;
    return this;
  }

  execute(count: number): ReadStreamResponse {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(this.stream);

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const streamOptions = new ReadReq.Options.StreamOptions();
    streamOptions.setStreamIdentifier(identifier);

    switch (this.revision.__typename) {
      case "exact": {
        streamOptions.setRevision(this.revision.revision);
        break;
      }

      case "start": {
        streamOptions.setStart(new Empty());
        break;
      }

      case "end": {
        streamOptions.setEnd(new Empty());
        break;
      }
    }

    options.setStream(streamOptions);
    options.setResolveLinks(this.resolveLinkTos);
    options.setCount(count);
    options.setUuidOption(uuidOption);

    switch (this.direction.__typename) {
      case "forward": {
        options.setReadDirection(0);
        break;
      }

      case "backward": {
        options.setReadDirection(1);
        break;
      }
    }

    req.setOptions(options);

    return new ReadStreamResponse(this.client.read(req));
  }
}

export class ReadAllEvents {
  private client: StreamsClient;
  private position: StreamPosition | StreamStart | StreamEnd;
  private direction: Direction;
  private credentials: Credentials | undefined;

  constructor(client: StreamsClient) {
    this.client = client;
    this.direction = Forward;
    this.position = StreamStart;
  }

  forward(): ReadAllEvents {
    this.direction = Forward;
    return this;
  }

  backward(): ReadAllEvents {
    this.direction = Backward;
    return this;
  }

  readDirection(direction: Direction): ReadAllEvents {
    this.direction = direction;
    return this;
  }

  fromPosition(position: Position): ReadAllEvents {
    this.position = StreamPosition(position);
    return this;
  }

  fromStart(): ReadAllEvents {
    this.position = StreamStart;
    return this;
  }

  fromEnd(): ReadAllEvents {
    this.position = StreamEnd;
    return this;
  }

  authenticated(credentials: Credentials): ReadAllEvents {
    this.credentials = credentials;
    return this;
  }

  execute(count: number): ReadStreamResponse {
    const req = new ReadReq();
    const options = new ReadReq.Options();

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this.position.__typename) {
      case "position": {
        const pos = new ReadReq.Options.Position();
        pos.setCommitPosition(this.position.position.commit);
        pos.setPreparePosition(this.position.position.prepare);
        allOptions.setPosition(pos);
        break;
      }

      case "start": {
        allOptions.setStart(new Empty());
        break;
      }

      case "end": {
        allOptions.setEnd(new Empty());
        break;
      }
    }
    options.setCount(count);
    options.setAll(allOptions);
    options.setUuidOption(uuidOption);

    switch (this.direction.__typename) {
      case "forward": {
        options.setReadDirection(0);
        break;
      }

      case "backward": {
        options.setReadDirection(1);
        break;
      }
    }

    req.setOptions(options);

    return new ReadStreamResponse(this.client.read(req));
  }
}

export class ReadStreamResponse {
  private readResponse: ResponseStream<ReadResp>;

  constructor(readResponse: ResponseStream<ReadResp>) {
    this.readResponse = readResponse;
  }

  cancel(): void {
    this.readResponse.cancel();
  }

  onEvent(cb: (resp: ReadResp) => void): void {
    this.readResponse.on("data", cb);
  }

  onEnd(cb: (status?: Status) => void): void {
    this.readResponse.on("end", cb);
  }

  onStatus(cb: (status: Status) => void): void {
    this.readResponse.on("status", cb);
  }
}
