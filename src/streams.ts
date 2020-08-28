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
  ESDBConnection,
} from "./types";
import { Empty, StreamIdentifier, UUID } from "../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import * as grpc from "grpc";
import * as streams_pb from "../generated/streams_pb";
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;
import { CallOptions } from "grpc";

/**
 * Streams API. You can write, read, delete and subscribe to streams.
 */
export class Streams {
  private readonly _connection: ESDBConnection;

  constructor(connection: ESDBConnection) {
    this._connection = connection;
  }

  /**
   * Sends events to a given stream.
   * @param stream A stream name.
   */
  writeEvents(stream: string): WriteEvents {
    return new WriteEvents(this._connection, stream);
  }

  /**
   * Soft-deletes a stream.
   * @param stream A Stream name.
   */
  delete(stream: string): DeleteStream {
    return new DeleteStream(this._connection, stream);
  }

  /**
   * Hard-deletes a stream.
   * @param stream A stream name.
   */
  tombstone(stream: string): TombstoneStream {
    return new TombstoneStream(this._connection, stream);
  }

  /**
   * Reads events from a stream. You can read forward or backward.
   * @param stream A Stream name.
   */
  readStream(stream: string): ReadStreamEvents {
    return new ReadStreamEvents(this._connection, stream);
  }

  /**
   * Reads events from the $all. You can read forward or backward. You might need to be authenticated to execute
   * that command successfully.
   */
  readAll(): ReadAllEvents {
    return new ReadAllEvents(this._connection);
  }

  /**
   * Subscribes to a stream. You can specify a starting point, from the beginning, a specific revision or be at the
   * end of a stream. You will be notified of incoming events in a push fashion.
   * @param stream A stream name.
   */
  subscribe(stream: string): SubscribeToStream {
    return new SubscribeToStream(this._connection, stream);
  }

  /**
   * Same as {@link subscribe} but targets $all stream instead. You might need to be authenticated to execute that
   * command successfully.
   */
  subscribeToAll(): SubscribeToAll {
    return new SubscribeToAll(this._connection);
  }

  /**
   * Closes the connection to the server.
   */
  close(): void {
    this._connection.close();
  }
}

export class WriteEvents {
  private readonly _connection: ESDBConnection;
  private readonly _stream: string;
  private _revision: Revision;
  private _credentials?: Credentials;

  constructor(connection: ESDBConnection, stream: string) {
    this._connection = connection;
    this._stream = stream;
    this._revision = Revision.Any;
  }

  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @param revision
   */
  expectedRevision(revision: Revision): WriteEvents {
    this._revision = revision;
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string): WriteEvents {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * Sends asynchronously events to the server.
   * @param events Events sent to the server.
   */
  async send(events: EventData[]): Promise<WriteResult> {
    const header = new AppendReq();
    const options = new AppendReq.Options();
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
    header.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    const client = await this._connection._client(StreamsClient);

    return new Promise<WriteResult>((resolve) => {
      const sink = client.append(metadata, (error, resp) => {
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
  private readonly _connection: ESDBConnection;
  private readonly _stream: string;
  private _revision: Revision;
  private _credentials?: Credentials;

  constructor(connection: ESDBConnection, stream: string) {
    this._connection = connection;
    this._stream = stream;
    this._revision = Revision.Any;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string): DeleteStream {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @param revision
   */
  expectedRevision(revision: Revision): DeleteStream {
    this._revision = revision;
    return this;
  }

  /**
   * Sends asynchronously the delete command to the server.
   */
  async execute(): Promise<DeleteResult> {
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
    const client = await this._connection._client(StreamsClient);
    return new Promise<DeleteResult>((resolve, reject) => {
      client.delete(req, metadata, (error, resp) => {
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
  private _connection: ESDBConnection;
  private readonly _stream: string;
  private _revision: Revision;
  private _credentials?: Credentials;

  constructor(connection: ESDBConnection, stream: string) {
    this._connection = connection;
    this._stream = stream;
    this._revision = Revision.Any;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string): TombstoneStream {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * Asks the server to check the stream is at specific revision before writing events.
   * @param revision
   */
  expectedRevision(revision: Revision): TombstoneStream {
    this._revision = revision;
    return this;
  }

  /**
   * Sends asynchronously the tombstone command to the server.
   */
  async execute(): Promise<DeleteResult> {
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

    const client = await this._connection._client(StreamsClient);

    return new Promise<DeleteResult>((resolve, reject) => {
      client.tombstone(req, metadata, (error, resp) => {
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
  private _connection: ESDBConnection;
  private _stream: string;
  private _revision: StreamRevision;
  private _resolveLinkTos: boolean;
  private _direction: Direction;
  private _credentials?: Credentials;

  constructor(connection: ESDBConnection, stream: string) {
    this._connection = connection;
    this._stream = stream;
    this._revision = StreamStart;
    this._resolveLinkTos = false;
    this._direction = Forward;
  }

  /**
   * Asks the command to read forward (toward the end of the stream). Default behavior.
   */
  forward(): ReadStreamEvents {
    this._direction = Forward;
    return this;
  }

  /**
   * Asks the command to read backward (toward the beginning of the stream).
   */
  backward(): ReadStreamEvents {
    this._direction = Backward;
    return this;
  }

  /**
   * Asks the command to read in a specific direction.
   * @param direction
   */
  readDirection(direction: Direction): ReadStreamEvents {
    this._direction = direction;
    return this;
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(revision: number): ReadStreamEvents {
    this._revision = StreamExact(revision);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): ReadStreamEvents {
    this._revision = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): ReadStreamEvents {
    this._revision = StreamEnd;
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string): ReadStreamEvents {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  resolveLink(): ReadStreamEvents {
    this._resolveLinkTos = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  doNotResolveLink(): ReadStreamEvents {
    this._resolveLinkTos = false;
    return this;
  }

  /**
   * Sends asynchronously the read command to the server.
   * @param count Max number of events to read.
   */
  async execute(count: number): Promise<ReadStreamResult> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const streamOptions = new ReadReq.Options.StreamOptions();
    streamOptions.setStreamIdentifier(identifier);

    switch (this._revision.__typename) {
      case "exact": {
        streamOptions.setRevision(this._revision.revision);
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
    options.setResolveLinks(this._resolveLinkTos);
    options.setCount(count);
    options.setUuidOption(uuidOption);
    options.setNoFilter(new Empty());

    switch (this._direction.__typename) {
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
    if (this._credentials) configureAuth(this._credentials, metadata);

    const client = await this._connection._client(StreamsClient);
    const stream = client.read(req, metadata);
    return handleBatchRead(stream);
  }
}

export class ReadAllEvents {
  private _connection: ESDBConnection;
  private _position: StreamPosition | StreamStart | StreamEnd;
  private _direction: Direction;
  private _credentials?: Credentials;

  constructor(connection: ESDBConnection) {
    this._connection = connection;
    this._direction = Forward;
    this._position = StreamStart;
  }

  /**
   * Asks the command to read forward (toward the end of the stream). Default behavior.
   */
  forward(): ReadAllEvents {
    this._direction = Forward;
    return this;
  }

  /**
   * Asks the command to read backward (toward the beginning of the stream).
   */
  backward(): ReadAllEvents {
    this._direction = Backward;
    return this;
  }

  /**
   * Asks the command to read in a specific direction.
   * @param direction
   */
  readDirection(direction: Direction): ReadAllEvents {
    this._direction = direction;
    return this;
  }

  /**
   * Starts the read at the given position in $all.
   * @param position
   */
  fromPosition(position: Position): ReadAllEvents {
    this._position = StreamPosition(position);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): ReadAllEvents {
    this._position = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): ReadAllEvents {
    this._position = StreamEnd;
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string): ReadAllEvents {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * Sends asynchronously the read command to the server.
   * @param count Max number of events to read.
   */
  async execute(count: number): Promise<ReadStreamResult> {
    const req = new ReadReq();
    const options = new ReadReq.Options();

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this._position.__typename) {
      case "position": {
        const pos = new ReadReq.Options.Position();
        pos.setCommitPosition(this._position.position.commit);
        pos.setPreparePosition(this._position.position.prepare);
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

    switch (this._direction.__typename) {
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
    if (this._credentials) configureAuth(this._credentials, metadata);

    const client = await this._connection._client(StreamsClient);
    const stream = client.read(req, metadata);
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
  private _connection: ESDBConnection;
  private _stream: string;
  private _revision: StreamRevision;
  private _resolveLinkTos: boolean;
  private _credentials?: Credentials;

  constructor(connection: ESDBConnection, stream: string) {
    this._connection = connection;
    this._stream = stream;
    this._revision = StreamEnd;
    this._resolveLinkTos = false;
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(revision: number): SubscribeToStream {
    this._revision = StreamExact(revision);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): SubscribeToStream {
    this._revision = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): SubscribeToStream {
    this._revision = StreamEnd;
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(credentials: Credentials): SubscribeToStream {
    this._credentials = credentials;
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  resolveLink(): SubscribeToStream {
    this._resolveLinkTos = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  doNotResolveLink(): SubscribeToStream {
    this._resolveLinkTos = false;
    return this;
  }

  /**
   * Starts the subscription immediately.
   * @param handler Set of callbacks used during the subscription lifecycle.
   */
  async execute(handler: SubscriptionHandler): Promise<void> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const streamOptions = new ReadReq.Options.StreamOptions();
    streamOptions.setStreamIdentifier(identifier);

    switch (this._revision.__typename) {
      case "exact": {
        streamOptions.setRevision(this._revision.revision);
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
    options.setResolveLinks(this._resolveLinkTos);
    options.setSubscription(new SubscriptionOptions());
    options.setUuidOption(uuidOption);
    options.setNoFilter(new Empty());

    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const client = await this._connection._client(StreamsClient);
    const stream = client.read(req, metadata, callOptions);
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
  private _connection: ESDBConnection;
  private _position: AllPosition;
  private _resolveLinkTos: boolean;
  private _credentials?: Credentials;
  private _filter?: Filter;

  constructor(connection: ESDBConnection) {
    this._connection = connection;
    this._position = StreamEnd;
    this._resolveLinkTos = false;
  }

  /**
   * Starts the read at the given position in $all.
   * @param position
   */
  fromPosition(position: Position): SubscribeToAll {
    this._position = StreamPosition(position);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): SubscribeToAll {
    this._position = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): SubscribeToAll {
    this._position = StreamEnd;
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string): SubscribeToAll {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  resolveLink(): SubscribeToAll {
    this._resolveLinkTos = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  doNotResolveLink(): SubscribeToAll {
    this._resolveLinkTos = false;
    return this;
  }

  /**
   * Filters events or streams based upon a predicate.
   * @param value
   */
  filter(value: Filter): SubscribeToAll {
    this._filter = value;
    return this;
  }

  /**
   * Starts the subscription immediately.
   * @param handler Set of callbacks used during the subscription lifecycle.
   */
  async execute(handler: SubscriptionHandler): Promise<void> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this._position.__typename) {
      case "position": {
        const grpcPos = new ReadReq.Options.Position();
        grpcPos.setCommitPosition(this._position.position.commit);
        grpcPos.setPreparePosition(this._position.position.prepare);
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
    options.setResolveLinks(this._resolveLinkTos);
    options.setSubscription(new SubscriptionOptions());
    options.setUuidOption(uuidOption);

    if (this._filter) {
      options.setFilter(this._filter.toGrpc());
    } else {
      options.setNoFilter(new Empty());
    }

    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const client = await this._connection._client(StreamsClient);
    const stream = client.read(req, metadata, callOptions);
    handleOneWaySubscription(stream, handler);
  }
}
