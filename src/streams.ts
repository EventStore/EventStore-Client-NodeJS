import { StreamsClient } from "../generated/streams_grpc_pb";
import {
  AppendReq,
  DeleteReq,
  ReadReq,
  ReadResp,
  TombstoneReq,
} from "../generated/streams_pb";
import {
  AllPosition,
  Backward,
  Credentials,
  CurrentRevision,
  CurrentRevisionNoStream,
  CurrentStreamRevision,
  DeleteResult,
  Direction,
  EventData,
  ExpectedRevision,
  ExpectedRevisionAny,
  ExpectedRevisionExists,
  ExpectedStreamRevision,
  Filter,
  Forward,
  IRevision,
  Position,
  ReadStreamNotFound,
  ReadStreamResult,
  ReadStreamSuccess,
  RecordedEvent,
  ResolvedEvent,
  Revision,
  StreamEnd,
  StreamExact,
  StreamPosition,
  StreamRevision,
  StreamStart,
  SubscriptionHandler,
  WriteResult,
  WriteResultFailure,
  WriteResultSuccess,
  convertGrpcRecord,
  configureAuth,
  SubscriptionReport,
} from "./types";
import { Empty, StreamIdentifier, UUID } from "../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import * as grpc from "grpc";
import * as streams_pb from "../generated/streams_pb";
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;
import { CallOptions } from "grpc";

export class Streams {
  private readonly client: StreamsClient;

  constructor(uri: string, cert?: Buffer) {
    let creds: grpc.ChannelCredentials;

    if (cert) {
      creds = grpc.credentials.createSsl(cert);
    } else {
      creds = grpc.credentials.createInsecure();
    }

    this.client = new StreamsClient(uri, creds);
  }

  writeEvents(stream: string): WriteEvents {
    return new WriteEvents(this.client, stream);
  }

  delete(stream: string): DeleteStream {
    return new DeleteStream(this.client, stream);
  }

  tombstone(stream: string): TombstoneStream {
    return new TombstoneStream(this.client, stream);
  }

  readStream(stream: string): ReadStreamEvents {
    return new ReadStreamEvents(this.client, stream);
  }

  readAll(): ReadAllEvents {
    return new ReadAllEvents(this.client);
  }

  subscribe(stream: string): SubscribeToStream {
    return new SubscribeToStream(this.client, stream);
  }

  subscribeToAll(): SubscribeToAll {
    return new SubscribeToAll(this.client);
  }

  close(): void {
    this.client.close();
  }
}

export class WriteEvents {
  private client: StreamsClient;
  private readonly stream: string;
  private revision: IRevision;
  private credentials?: Credentials;

  constructor(client: StreamsClient, stream: string) {
    this.client = client;
    this.stream = stream;
    this.revision = Revision.Any;
  }

  expectedVersion(revision: IRevision): WriteEvents {
    this.revision = revision;
    return this;
  }

  authenticated(username: string, password: string): WriteEvents {
    this.credentials = Credentials(username, password);
    return this;
  }

  send(events: EventData[]): Promise<WriteResult> {
    const header = new AppendReq();
    const options = new AppendReq.Options();
    const identifier = new StreamIdentifier();

    identifier.setStreamname(Buffer.from(this.stream).toString("base64"));
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

    const metadata = new grpc.Metadata();
    if (this.credentials) configureAuth(this.credentials, metadata);

    return new Promise<WriteResult>((resolve) => {
      const sink = this.client.append(metadata, (error, resp) => {
        if (error != null) {
          const result: WriteResultFailure = {
            __typename: "failure",
            error,
          };

          resolve(result);
          return;
        }

        const success = resp.getSuccess();
        const grpcError = resp.getWrongExpectedVersion();
        if (resp.hasSuccess() && success) {
          const nextExpectedVersion = success.getCurrentRevision();
          const grpcPosition = success.getPosition();

          let position: Position | undefined;

          if (grpcPosition) {
            position = {
              commit: grpcPosition.getCommitPosition(),
              prepare: grpcPosition.getPreparePosition(),
            };
          }
          const result: WriteResultSuccess = {
            __typename: "success",
            nextExpectedVersion,
            position,
          };

          resolve(result);
        } else if (resp.hasWrongExpectedVersion() && grpcError) {
          let current: CurrentRevision = CurrentRevisionNoStream;
          let expected: ExpectedRevision = ExpectedRevisionAny;

          if (grpcError.hasCurrentRevision()) {
            current = CurrentStreamRevision(grpcError.getCurrentRevision());
          }

          if (grpcError.hasExpectedRevision()) {
            expected = ExpectedStreamRevision(grpcError.getExpectedRevision());
          } else if (grpcError.hasStreamExists()) {
            expected = ExpectedRevisionExists;
          }

          const failure: WriteResultFailure = {
            __typename: "failure",
            error: {
              current: current,
              expected: expected,
            },
          };

          resolve(failure);
        }
      });

      sink.write(header);

      for (const event of events) {
        const entry = new AppendReq();
        const message = new AppendReq.ProposedMessage();
        const id = new UUID();

        id.setString(event.id);

        message.setId(id);

        switch (event.payload.__typename) {
          case "json": {
            message.getMetadataMap().set("content-type", "application/json");
            const data = JSON.stringify(event.payload.payload);
            message.setData(Buffer.from(data, "binary").toString("base64"));
            break;
          }
          case "binary": {
            message
              .getMetadataMap()
              .set("content-type", "application/octet-stream");
            message.setData(event.payload.payload);
          }
        }
        message.getMetadataMap().set("type", event.eventType);
        entry.setProposedMessage(message);
        sink.write(entry);
      }
      sink.end();
    });
  }
}

export class DeleteStream {
  private _client: StreamsClient;
  private readonly _stream: string;
  private _revision: IRevision;
  private _credentials?: Credentials;

  constructor(client: StreamsClient, stream: string) {
    this._client = client;
    this._stream = stream;
    this._revision = Revision.Any;
  }

  authenticated(username: string, password: string): DeleteStream {
    this._credentials = Credentials(username, password);
    return this;
  }

  expectedVersion(revision: IRevision): DeleteStream {
    this._revision = revision;
    return this;
  }

  execute(): Promise<DeleteResult> {
    const req = new DeleteReq();
    const options = new DeleteReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    options.setStreamIdentifier(identifier);

    switch (this._revision.__typename) {
      case "exact": {
        options.setRevision(this._revision.revision);
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

    req.setOptions(options);
    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    return new Promise<DeleteResult>((resolve, reject) => {
      this._client.delete(req, metadata, (error, resp) => {
        if (error) {
          reject(error);
        }

        const result: DeleteResult = {};
        const grpcPos = resp.getPosition();

        if (resp.hasPosition() && grpcPos) {
          const pos: Position = {
            commit: grpcPos.getCommitPosition(),
            prepare: grpcPos.getPreparePosition(),
          };

          result.position = pos;
        }

        resolve(result);
      });
    });
  }
}

export class TombstoneStream {
  private _client: StreamsClient;
  private readonly _stream: string;
  private _revision: IRevision;
  private _credentials?: Credentials;

  constructor(client: StreamsClient, stream: string) {
    this._client = client;
    this._stream = stream;
    this._revision = Revision.Any;
  }

  authenticated(username: string, password: string): TombstoneStream {
    this._credentials = Credentials(username, password);
    return this;
  }

  expectedVersion(revision: IRevision): TombstoneStream {
    this._revision = revision;
    return this;
  }

  execute(): Promise<DeleteResult> {
    const req = new TombstoneReq();
    const options = new TombstoneReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    options.setStreamIdentifier(identifier);

    switch (this._revision.__typename) {
      case "exact": {
        options.setRevision(this._revision.revision);
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

    req.setOptions(options);
    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    return new Promise<DeleteResult>((resolve, reject) => {
      this._client.tombstone(req, metadata, (error, resp) => {
        if (error) {
          reject(error);
        }

        const result: DeleteResult = {};
        const grpcPos = resp.getPosition();

        if (resp.hasPosition() && grpcPos) {
          const pos: Position = {
            commit: grpcPos.getCommitPosition(),
            prepare: grpcPos.getPreparePosition(),
          };

          result.position = pos;
        }

        resolve(result);
      });
    });
  }
}

export class ReadStreamEvents {
  private client: StreamsClient;
  private stream: string;
  private revision: StreamRevision;
  private resolveLinkTos: boolean;
  private direction: Direction;
  private credentials?: Credentials;

  constructor(client: StreamsClient, stream: string) {
    this.client = client;
    this.stream = stream;
    this.revision = StreamStart;
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

  authenticated(username: string, password: string): ReadStreamEvents {
    this.credentials = Credentials(username, password);
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

  execute(count: number): Promise<ReadStreamResult> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this.stream).toString("base64"));

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
    options.setNoFilter(new Empty());

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
    const metadata = new grpc.Metadata();
    if (this.credentials) configureAuth(this.credentials, metadata);

    const stream = this.client.read(req, metadata);
    return handleBatchRead(stream);
  }
}

export class ReadAllEvents {
  private client: StreamsClient;
  private position: StreamPosition | StreamStart | StreamEnd;
  private direction: Direction;
  private credentials?: Credentials;

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

  authenticated(username: string, password: string): ReadAllEvents {
    this.credentials = Credentials(username, password);
    return this;
  }

  execute(count: number): Promise<ReadStreamResult> {
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
    options.setNoFilter(new Empty());

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

    const metadata = new grpc.Metadata();
    if (this.credentials) configureAuth(this.credentials, metadata);

    const stream = this.client.read(req, metadata);
    return handleBatchRead(stream);
  }
}

class SubscriptionReportImpl implements SubscriptionReport {
  private _stream: grpc.ClientReadableStream<streams_pb.ReadResp>;

  constructor(stream: grpc.ClientReadableStream<streams_pb.ReadResp>) {
    this._stream = stream;
  }
  unsubcribe(): void {
    this._stream.cancel();
  }
}

export class SubscribeToStream {
  private client: StreamsClient;
  private stream: string;
  private revision: StreamRevision;
  private resolveLinkTos: boolean;
  private credentials?: Credentials;

  constructor(client: StreamsClient, stream: string) {
    this.client = client;
    this.stream = stream;
    this.revision = StreamEnd;
    this.resolveLinkTos = false;
  }

  fromRevision(revision: number): SubscribeToStream {
    this.revision = StreamExact(revision);
    return this;
  }

  fromStart(): SubscribeToStream {
    this.revision = StreamStart;
    return this;
  }

  fromEnd(): SubscribeToStream {
    this.revision = StreamEnd;
    return this;
  }

  authenticated(credentials: Credentials): SubscribeToStream {
    this.credentials = credentials;
    return this;
  }

  resolveLink(): SubscribeToStream {
    this.resolveLinkTos = true;
    return this;
  }

  doNotResolveLink(): SubscribeToStream {
    this.resolveLinkTos = false;
    return this;
  }

  execute(handler: SubscriptionHandler): void {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this.stream).toString("base64"));

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

      default: {
        streamOptions.setEnd(new Empty());
        break;
      }
    }

    options.setStream(streamOptions);
    options.setResolveLinks(this.resolveLinkTos);
    options.setSubscription(new SubscriptionOptions());
    options.setUuidOption(uuidOption);
    options.setNoFilter(new Empty());

    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this.credentials) configureAuth(this.credentials, metadata);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const stream = this.client.read(req, metadata, callOptions);
    handleOneWaySubscription(stream, handler);
  }
}

function handleOneWaySubscription(
  stream: grpc.ClientReadableStream<streams_pb.ReadResp>,
  handler: SubscriptionHandler
): void {
  const report = new SubscriptionReportImpl(stream);

  stream.on("data", (resp: ReadResp) => {
    if (resp.hasConfirmation() && handler.onConfirmation)
      handler.onConfirmation();

    if (resp.hasEvent()) {
      let event: RecordedEvent | undefined;
      let link: RecordedEvent | undefined;

      const grpcEvent = resp.getEvent();
      if (resp.hasEvent() && grpcEvent) {
        let grpcRecordedEvent = grpcEvent.getEvent();
        if (grpcEvent.hasEvent() && grpcRecordedEvent) {
          event = convertGrpcRecord(grpcRecordedEvent);
        }

        grpcRecordedEvent = grpcEvent.getLink();
        if (grpcEvent.hasLink() && grpcRecordedEvent) {
          link = convertGrpcRecord(grpcRecordedEvent);
        }

        const resolved: ResolvedEvent = {
          event,
          link,
          commit_position: grpcEvent.getCommitPosition(),
        };

        handler.onEvent(report, resolved);
      }
    }
  });

  stream.on("end", () => {
    if (handler.onEnd) handler.onEnd();
  });
  stream.on("error", (error) => {
    if (handler.onError) handler.onError(error);
  });
}

function handleBatchRead(
  stream: grpc.ClientReadableStream<streams_pb.ReadResp>
): Promise<ReadStreamResult> {
  return new Promise<ReadStreamResult>((resolve, reject) => {
    const buffer: ResolvedEvent[] = [];
    let found = true;

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasStreamNotFound()) {
        found = false;
      } else {
        let event: RecordedEvent | undefined;
        let link: RecordedEvent | undefined;

        const grpcEvent = resp.getEvent();
        if (resp.hasEvent() && grpcEvent) {
          let grpcRecordedEvent = grpcEvent.getEvent();

          if (grpcEvent.hasEvent() && grpcRecordedEvent) {
            event = convertGrpcRecord(grpcRecordedEvent);
          }

          grpcRecordedEvent = grpcEvent.getLink();
          if (grpcEvent.hasLink() && grpcRecordedEvent) {
            link = convertGrpcRecord(grpcRecordedEvent);
          }

          const resolved: ResolvedEvent = {
            event,
            link,
            commit_position: grpcEvent.getCommitPosition(),
          };

          buffer.push(resolved);
        }
      }
    });

    stream.on("end", () => {
      if (found) {
        const result: ReadStreamSuccess = {
          __typename: "success",
          events: buffer,
        };

        resolve(result);
      } else {
        resolve(ReadStreamNotFound);
      }
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
}

export class SubscribeToAll {
  private client: StreamsClient;
  private position: AllPosition;
  private resolveLinkTos: boolean;
  private credentials?: Credentials;
  private _filter?: Filter;

  constructor(client: StreamsClient) {
    this.client = client;
    this.position = StreamEnd;
    this.resolveLinkTos = false;
  }

  fromPosition(position: Position): SubscribeToAll {
    this.position = StreamPosition(position);
    return this;
  }

  fromStart(): SubscribeToAll {
    this.position = StreamStart;
    return this;
  }

  fromEnd(): SubscribeToAll {
    this.position = StreamEnd;
    return this;
  }

  authenticated(username: string, password: string): SubscribeToAll {
    this.credentials = Credentials(username, password);
    return this;
  }

  resolveLink(): SubscribeToAll {
    this.resolveLinkTos = true;
    return this;
  }

  doNotResolveLink(): SubscribeToAll {
    this.resolveLinkTos = false;
    return this;
  }

  filter(value: Filter): SubscribeToAll {
    this._filter = value;
    return this;
  }

  execute(handler: SubscriptionHandler): void {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this.position.__typename) {
      case "position": {
        const grpcPos = new ReadReq.Options.Position();
        grpcPos.setCommitPosition(this.position.position.commit);
        grpcPos.setPreparePosition(this.position.position.prepare);
        allOptions.setPosition(grpcPos);
        break;
      }

      case "start": {
        allOptions.setStart(new Empty());
        break;
      }

      default: {
        allOptions.setEnd(new Empty());
        break;
      }
    }

    options.setAll(allOptions);
    options.setResolveLinks(this.resolveLinkTos);
    options.setSubscription(new SubscriptionOptions());
    options.setUuidOption(uuidOption);

    if (this._filter) {
      options.setFilter(this._filter.toGrpc());
    } else {
      options.setNoFilter(new Empty());
    }

    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this.credentials) configureAuth(this.credentials, metadata);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const stream = this.client.read(req, metadata, callOptions);
    handleOneWaySubscription(stream, handler);
  }
}
