import * as grpc from "grpc";
import { PersistentSubscriptionsClient } from "../generated/persistent_grpc_pb";
import {
  CreateReq,
  DeleteReq,
  ReadReq,
  ReadResp,
  UpdateReq,
} from "../generated/persistent_pb";
import { Empty, StreamIdentifier, UUID } from "../generated/shared_pb";
import {
  configureAuth,
  ConsumerStrategy,
  convertGrpcRecord,
  Credentials,
  PersistentAction,
  PersistentReport,
  PersistentSubscriptionHandler,
  RecordedEvent,
  ResolvedEvent,
  RoundRobin,
} from "./types";
import UUIDOption = ReadReq.Options.UUIDOption;
import Action = ReadReq.Nack.Action;
import { CallOptions } from "grpc";

export class Persistent {
  private readonly client: PersistentSubscriptionsClient;

  constructor(uri: string, cert?: Buffer) {
    let creds: grpc.ChannelCredentials;

    if (cert) {
      creds = grpc.credentials.createSsl(cert);
    } else {
      creds = grpc.credentials.createInsecure();
    }
    this.client = new PersistentSubscriptionsClient(uri, creds);
  }

  /**
   * Creates a persistent subscription on a stream. Persistent subscriptions are special kind of subscription where the
   * server remembers where the read offset is at. This allows for many different modes of operations compared to a
   * regular subscription where the client holds the read offset. The pair stream name and group must be unique.
   * @param stream A stream name.
   * @param group
   */
  create(stream: string, group: string): CreatePersistentSubscription {
    return new CreatePersistentSubscription(this.client, stream, group);
  }

  /**
   * Updates a persistent subscription configuration.
   * @param stream A stream name.
   * @param group
   */
  update(stream: string, group: string): UpdatePersistentSubscription {
    return new UpdatePersistentSubscription(this.client, stream, group);
  }

  /**
   * Deletes a persistent subscription.
   * @param stream A stream name.
   * @param group
   */
  delete(stream: string, group: string): DeletePersistentSubscription {
    return new DeletePersistentSubscription(this.client, stream, group);
  }

  /**
   * Connects to a persistent subscription.
   * @param stream A stream name.
   * @param group
   */
  subscribe(stream: string, group: string): ConnectToPersistentSubscription {
    return new ConnectToPersistentSubscription(this.client, stream, group);
  }

  /**
   * Closes the connection to the server.
   */
  close(): void {
    this.client.close();
  }
}

export class CreatePersistentSubscription {
  private _client: PersistentSubscriptionsClient;
  private _stream: string;
  private _group: string;
  private _resolveLink: boolean;
  private _revision: number;
  private _extraStats: boolean;
  private _messageTimeout: number;
  private _maxRetryCount: number;
  private _checkpointAfter: number;
  private _minCheckpointCount: number;
  private _maxCheckpointCount: number;
  private _maxSubscriberCount: number;
  private _liveBufferSize: number;
  private _readBatchSize: number;
  private _historyBufferSize: number;
  private _strategy: ConsumerStrategy;
  private _credentials?: Credentials;

  constructor(
    client: PersistentSubscriptionsClient,
    stream: string,
    group: string
  ) {
    this._client = client;
    this._stream = stream;
    this._group = group;
    this._resolveLink = false;
    this._extraStats = false;
    this._revision = 0;
    this._messageTimeout = 30_000;
    this._maxRetryCount = 10;
    this._checkpointAfter = 2_000;
    this._minCheckpointCount = 10;
    this._maxCheckpointCount = 1_000;
    this._maxSubscriberCount = 0;
    this._liveBufferSize = 500;
    this._readBatchSize = 20;
    this._historyBufferSize = 500;
    this._strategy = RoundRobin;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(
    username: string,
    password: string
  ): CreatePersistentSubscription {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  enableLinkResolution(): CreatePersistentSubscription {
    this._resolveLink = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  disableLinkResolution(): CreatePersistentSubscription {
    this.setExtraStats(false);
    return this;
  }

  /**
   * See {@link enableLinkResolution} or {@link disableLinkResolution}.
   * @param value
   */
  setLinkResolution(value: boolean): void {
    this._resolveLink = value;
  }

  /**
   * Enables in depth latency statistics should be tracked on this subscription.
   */
  enableExtraStats(): CreatePersistentSubscription {
    this.setExtraStats(true);
    return this;
  }

  /**
   * See {@link enableExtraStats}
   */
  disableExtraStats(): CreatePersistentSubscription {
    this._extraStats = false;
    return this;
  }

  /**
   * See {@link enableExtraStats}
   * @param value
   */
  setExtraStats(value: boolean): void {
    this._extraStats = value;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): CreatePersistentSubscription {
    return this.fromRevision(0);
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(value: number): CreatePersistentSubscription {
    this._revision = value;
    return this;
  }

  /**
   * The amount of time after which a message should be considered to be timeout and retried.
   * @param value timeout in milliseconds.
   */
  messageTimeout(value: number): CreatePersistentSubscription {
    this._messageTimeout = value;
    return this;
  }

  /**
   * The maximum number of retries (due to timeout) before a message get considered to be parked.
   * @param value
   */
  maxRetryCount(value: number): CreatePersistentSubscription {
    this._maxRetryCount = value;
    return this;
  }

  /**
   * The amount of time to try checkpoint after.
   * @param value amount of time in milliseconds.
   */
  checkpointAfter(value: number): CreatePersistentSubscription {
    this._checkpointAfter = value;
    return this;
  }

  /**
   * The minimum number of messages to checkpoint.
   * @param value
   */
  minCheckpointCount(value: number): CreatePersistentSubscription {
    this._minCheckpointCount = value;
    return this;
  }

  /**
   * The maximum number of messages to checkpoint. If this number is reached , a checkpoint will be forced.
   * @param value
   */
  maxCheckpointCount(value: number): CreatePersistentSubscription {
    this._maxCheckpointCount = value;
    return this;
  }

  /**
   * The maximum number of subscribers allowed.
   * @param value
   */
  maxSubscriberCount(value: number): CreatePersistentSubscription {
    this._maxSubscriberCount = value;
    return this;
  }

  /**
   * Set no restriction of the number of subscriber that subscription can support.
   * See {@link maxSubscriberCount}
   */
  noSubscriberCountLimitation(): CreatePersistentSubscription {
    return this.maxCheckpointCount(0);
  }

  /**
   * The size of the buffer listening to live messages as they happen.
   * @param value
   */
  liveBufferSize(value: number): CreatePersistentSubscription {
    this._liveBufferSize = value;
    return this;
  }

  /**
   * The number of events read at a time when paging in history.
   * @param value
   */
  readBatchSize(value: number): CreatePersistentSubscription {
    this._readBatchSize = value;
    return this;
  }

  /**
   * The number of events to cache when paging through history.
   * @param value
   */
  historyBufferSize(value: number): CreatePersistentSubscription {
    this._historyBufferSize = value;
    return this;
  }

  /**
   * The strategy to use for distributing events to client consumers.
   * @param strategy
   */
  consumerStrategy(strategy: ConsumerStrategy): CreatePersistentSubscription {
    this._strategy = strategy;
    return this;
  }

  /**
   * Creates a persistent subscription asynchronously.
   */
  execute(): Promise<void> {
    const req = new CreateReq();
    const options = new CreateReq.Options();
    const identifier = new StreamIdentifier();
    const settings = new CreateReq.Settings();

    settings.setResolveLinks(this._resolveLink);
    settings.setRevision(this._revision);
    settings.setExtraStatistics(this._extraStats);
    settings.setMessageTimeout(this._messageTimeout);
    settings.setCheckpointAfter(this._checkpointAfter);
    settings.setMaxRetryCount(this._maxRetryCount);
    settings.setMinCheckpointCount(this._minCheckpointCount);
    settings.setMaxCheckpointCount(this._maxSubscriberCount);
    settings.setLiveBufferSize(this._liveBufferSize);
    settings.setReadBatchSize(this._readBatchSize);
    settings.setHistoryBufferSize(this._historyBufferSize);

    switch (this._strategy.__typename) {
      case "dispatch_to_single":
        settings.setNamedConsumerStrategy(
          CreateReq.ConsumerStrategy.DISPATCHTOSINGLE
        );
        break;
      case "pinned":
        settings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.PINNED);
        break;
      default:
        settings.setNamedConsumerStrategy(
          CreateReq.ConsumerStrategy.ROUNDROBIN
        );
        break;
    }

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setSettings(settings);

    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    return new Promise<void>((resolve, reject) => {
      this._client.create(req, metadata, (error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }
}

export class UpdatePersistentSubscription {
  private _client: PersistentSubscriptionsClient;
  private _stream: string;
  private _group: string;
  private _resolveLink: boolean;
  private _revision: number;
  private _extraStats: boolean;
  private _messageTimeout: number;
  private _maxRetryCount: number;
  private _checkpointAfter: number;
  private _minCheckpointCount: number;
  private _maxCheckpointCount: number;
  private _maxSubscriberCount: number;
  private _liveBufferSize: number;
  private _readBatchSize: number;
  private _historyBufferSize: number;
  private _strategy: ConsumerStrategy;
  private _credentials?: Credentials;

  constructor(
    client: PersistentSubscriptionsClient,
    stream: string,
    group: string
  ) {
    this._client = client;
    this._stream = stream;
    this._group = group;
    this._resolveLink = false;
    this._extraStats = false;
    this._revision = 0;
    this._messageTimeout = 30_000;
    this._maxRetryCount = 10;
    this._checkpointAfter = 2_000;
    this._minCheckpointCount = 10;
    this._maxCheckpointCount = 1_000;
    this._maxSubscriberCount = 0;
    this._liveBufferSize = 500;
    this._readBatchSize = 20;
    this._historyBufferSize = 500;
    this._strategy = RoundRobin;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(
    username: string,
    password: string
  ): UpdatePersistentSubscription {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  enableLinkResolution(): UpdatePersistentSubscription {
    this._resolveLink = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  disableLinkResolution(): UpdatePersistentSubscription {
    this.setExtraStats(false);
    return this;
  }

  /**
   * See {@link enableLinkResolution} or {@link disableLinkResolution}.
   * @param value
   */
  setLinkResolution(value: boolean): void {
    this._resolveLink = value;
  }

  /**
   * Enables in depth latency statistics should be tracked on this subscription.
   */
  enableExtraStats(): UpdatePersistentSubscription {
    this.setExtraStats(true);
    return this;
  }

  /**
   * See {@link enableExtraStats}
   */
  disableExtraStats(): UpdatePersistentSubscription {
    this._extraStats = false;
    return this;
  }

  /**
   * See {@link enableExtraStats}
   * @param value
   */
  setExtraStats(value: boolean): void {
    this._extraStats = value;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): UpdatePersistentSubscription {
    return this.fromRevision(0);
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(value: number): UpdatePersistentSubscription {
    this._revision = value;
    return this;
  }

  /**
   * The amount of time after which a message should be considered to be timeout and retried.
   * @param value timeout in milliseconds.
   */
  messageTimeout(value: number): UpdatePersistentSubscription {
    this._messageTimeout = value;
    return this;
  }

  /**
   * The maximum number of retries (due to timeout) before a message get considered to be parked.
   * @param value
   */
  maxRetryCount(value: number): UpdatePersistentSubscription {
    this._maxRetryCount = value;
    return this;
  }

  /**
   * The amount of time to try checkpoint after.
   * @param value amount of time in milliseconds.
   */
  checkpointAfter(value: number): UpdatePersistentSubscription {
    this._checkpointAfter = value;
    return this;
  }

  /**
   * The minimum number of messages to checkpoint.
   * @param value
   */
  minCheckpointCount(value: number): UpdatePersistentSubscription {
    this._minCheckpointCount = value;
    return this;
  }

  /**
   * The maximum number of messages to checkpoint. If this number is reached , a checkpoint will be forced.
   * @param value
   */
  maxCheckpointCount(value: number): UpdatePersistentSubscription {
    this._maxCheckpointCount = value;
    return this;
  }

  /**
   * The maximum number of subscribers allowed.
   * @param value
   */
  maxSubscriberCount(value: number): UpdatePersistentSubscription {
    this._maxSubscriberCount = value;
    return this;
  }

  /**
   * Set no restriction of the number of subscriber that subscription can support.
   * See {@link maxSubscriberCount}
   */
  noSubscriberCountLimitation(): UpdatePersistentSubscription {
    return this.maxCheckpointCount(0);
  }

  /**
   * The size of the buffer listening to live messages as they happen.
   * @param value
   */
  liveBufferSize(value: number): UpdatePersistentSubscription {
    this._liveBufferSize = value;
    return this;
  }

  /**
   * The number of events read at a time when paging in history.
   * @param value
   */
  readBatchSize(value: number): UpdatePersistentSubscription {
    this._readBatchSize = value;
    return this;
  }

  /**
   * The number of events to cache when paging through history.
   * @param value
   */
  historyBufferSize(value: number): UpdatePersistentSubscription {
    this._historyBufferSize = value;
    return this;
  }

  /**
   * The strategy to use for distributing events to client consumers.
   * @param strategy
   */
  consumerStrategy(strategy: ConsumerStrategy): UpdatePersistentSubscription {
    this._strategy = strategy;
    return this;
  }

  /**
   * Updates a persistent subscription asynchronously.
   */
  execute(): Promise<void> {
    const req = new UpdateReq();
    const options = new UpdateReq.Options();
    const identifier = new StreamIdentifier();
    const settings = new UpdateReq.Settings();

    settings.setResolveLinks(this._resolveLink);
    settings.setRevision(this._revision);
    settings.setExtraStatistics(this._extraStats);
    settings.setMessageTimeout(this._messageTimeout);
    settings.setCheckpointAfter(this._checkpointAfter);
    settings.setMaxRetryCount(this._maxRetryCount);
    settings.setMinCheckpointCount(this._minCheckpointCount);
    settings.setMaxCheckpointCount(this._maxSubscriberCount);
    settings.setLiveBufferSize(this._liveBufferSize);
    settings.setReadBatchSize(this._readBatchSize);
    settings.setHistoryBufferSize(this._historyBufferSize);

    switch (this._strategy.__typename) {
      case "dispatch_to_single":
        settings.setNamedConsumerStrategy(
          UpdateReq.ConsumerStrategy.DISPATCHTOSINGLE
        );
        break;
      case "pinned":
        settings.setNamedConsumerStrategy(UpdateReq.ConsumerStrategy.PINNED);
        break;
      default:
        settings.setNamedConsumerStrategy(
          UpdateReq.ConsumerStrategy.ROUNDROBIN
        );
        break;
    }

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setSettings(settings);

    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    return new Promise<void>((resolve, reject) => {
      this._client.update(req, metadata, (error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }
}

export class DeletePersistentSubscription {
  private _client: PersistentSubscriptionsClient;
  private _stream: string;
  private _group: string;
  private _credentials?: Credentials;

  constructor(
    client: PersistentSubscriptionsClient,
    stream: string,
    group: string
  ) {
    this._client = client;
    this._stream = stream;
    this._group = group;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(
    username: string,
    password: string
  ): DeletePersistentSubscription {
    this._credentials = Credentials(username, password);
    return this;
  }

  /**
   * Deletes a persistent subscription asynchronously.
   */
  execute(): Promise<void> {
    const req = new DeleteReq();
    const options = new DeleteReq.Options();
    const identifier = new StreamIdentifier();

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    options.setStreamIdentifier(identifier);
    options.setGroupName(this._group);
    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this._credentials) configureAuth(this._credentials, metadata);

    return new Promise<void>((resolve, reject) => {
      this._client.delete(req, metadata, (error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }
}

class PersistentReportImpl implements PersistentReport {
  private _duplexStream: grpc.ClientDuplexStream<ReadReq, ReadResp>;
  private _id?: Uint8Array | string;
  private _buffer: number;
  private _stream: string;
  private _group: string;

  constructor(
    buffer: number,
    stream: string,
    group: string,
    duplexStream: grpc.ClientDuplexStream<ReadReq, ReadResp>
  ) {
    this._buffer = buffer;
    this._duplexStream = duplexStream;
    this._stream = stream;
    this._group = group;
  }

  setId(value: Uint8Array | string): void {
    this._id = value;
  }

  ack(ids: string[]): void {
    const req = new ReadReq();
    const ack = new ReadReq.Ack();
    const options = new ReadReq.Options();
    const ackedIds: UUID[] = [];
    const identifier = new StreamIdentifier();
    const uuidOption = new UUIDOption();

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    uuidOption.setString(new Empty());
    options.setBufferSize(this._buffer);
    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setUuidOption(uuidOption);

    for (const id of ids) {
      const uuid = new UUID();
      uuid.setString(id);
      ackedIds.push(uuid);
    }

    if (this._id) ack.setId(this._id);
    else throw "Unexpected undefined subscription id";

    req.setAck(ack);
    req.setOptions(options);

    this._duplexStream.write(req);
  }

  nack(action: PersistentAction, reason: string, ids: string[]): void {
    const req = new ReadReq();
    const nack = new ReadReq.Nack();
    const options = new ReadReq.Options();
    const nackedIds: UUID[] = [];
    const identifier = new StreamIdentifier();
    const uuidOption = new UUIDOption();

    switch (action.__typename) {
      case "park":
        nack.setAction(Action.PARK);
        break;
      case "retry":
        nack.setAction(Action.RETRY);
        break;
      case "skip":
        nack.setAction(Action.SKIP);
        break;
      case "stop":
        nack.setAction(Action.STOP);
        break;
    }

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    uuidOption.setString(new Empty());
    options.setBufferSize(this._buffer);
    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setUuidOption(uuidOption);

    for (const id of ids) {
      const uuid = new UUID();
      uuid.setString(id);
      nackedIds.push(uuid);
    }

    if (this._id) nack.setId(this._id);
    else throw "Unexpected undefined subpscription id";

    nack.setReason(reason);

    req.setNack(nack);
    req.setOptions(options);

    this._duplexStream.write(req);
  }

  unsubscribe(): void {
    this._duplexStream.end();
    this._duplexStream.cancel();
  }
}

export class ConnectToPersistentSubscription {
  private client: PersistentSubscriptionsClient;
  private stream: string;
  private group: string;
  private _bufferSize: number;
  private credentials?: Credentials;

  constructor(
    client: PersistentSubscriptionsClient,
    stream: string,
    group: string
  ) {
    this.client = client;
    this.stream = stream;
    this.group = group;
    this._bufferSize = 10;
  }

  /**
   * The buffer size to use for the persistent subscription.
   * @param value
   */
  bufferSize(value: number): ConnectToPersistentSubscription {
    this._bufferSize = value;
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(
    username: string,
    password: string
  ): ConnectToPersistentSubscription {
    this.credentials = Credentials(username, password);
    return this;
  }

  /**
   * Starts the subscription immediately.
   * @param handler Set of callbacks used during the subscription lifecycle.
   */
  execute(handler: PersistentSubscriptionHandler): void {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this.stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());
    options.setStreamIdentifier(identifier);
    options.setGroupName(this.group);
    options.setBufferSize(this._bufferSize);
    options.setUuidOption(uuidOption);
    req.setOptions(options);

    const metadata = new grpc.Metadata();
    if (this.credentials) configureAuth(this.credentials, metadata);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const stream = this.client.read(metadata, callOptions);
    const report = new PersistentReportImpl(
      this._bufferSize,
      this.stream,
      this.group,
      stream
    );
    stream.write(req);
    stream.on("error", (error) => {
      if (handler.onError) handler.onError(error);
    });

    stream.on("data", (resp: ReadResp) => {
      const confirmation = resp.getSubscriptionConfirmation();
      if (resp.hasSubscriptionConfirmation() && confirmation) {
        report.setId(confirmation.getSubscriptionId());

        if (handler.onConfirmation) handler.onConfirmation();
      }

      if (resp.hasEvent()) {
        let event: RecordedEvent | undefined;
        let link: RecordedEvent | undefined;
        const grpcEvent = resp.getEvent();

        if (resp.hasEvent() && grpcEvent) {
          let recorded = grpcEvent.getEvent();
          if (grpcEvent.hasEvent() && recorded) {
            event = convertGrpcRecord(recorded);
          }

          recorded = grpcEvent.getLink();
          if (grpcEvent.hasLink() && recorded) {
            link = convertGrpcRecord(recorded);
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

    stream.on("close", () => {
      if (handler.onClose) handler.onClose();
    });
  }
}
