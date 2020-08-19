import * as grpc from "grpc";
import * as file from "fs";
import {PersistentSubscriptionsClient} from "../generated/persistent_grpc_pb";
import {CreateReq, DeleteReq, ReadReq, ReadResp, UpdateReq} from "../generated/persistent_pb";
import {Empty, StreamIdentifier, UUID} from "../generated/shared_pb";
import {
    configureAuth,
    ConsumerStrategy, convertGrpcRecord,
    Credentials,
    PersistentAction,
    PersistentReport, PersistentSubscriptionHandler, Position,
    RecordedEvent,
    ResolvedEvent,
    RoundRobin,
    SubscriptionHandler
} from "./types";
import UUIDOption = ReadReq.Options.UUIDOption;
import Action = ReadReq.Nack.Action;
import {CallOptions} from "grpc";

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

    create(stream: string, group: string): CreatePersistentSubscription {
        return new CreatePersistentSubscription(this.client, stream, group);
    }

    update(stream: string, group: string): UpdatePersistentSubscription {
        return new UpdatePersistentSubscription(this.client, stream, group);
    }

    delete(stream: string, group: string): DeletePersistentSubscription {
        return new DeletePersistentSubscription(this.client, stream, group);
    }

    subscribe(stream: string, group: string): ConnectToPersistentSubscription {
        return new ConnectToPersistentSubscription(this.client, stream, group);
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

    constructor(client: PersistentSubscriptionsClient, stream: string, group: string) {
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

    authenticated(username: string, password: string): CreatePersistentSubscription {
        this._credentials = Credentials(username, password);
        return this;
    }

    enableLinkResolution(): CreatePersistentSubscription {
        this._resolveLink = true;
        return this;
    }

    disableLinkResolution(): CreatePersistentSubscription {
        this.setExtraStats(false);
        return this;
    }

    setLinkResolution(value: boolean): void {
        this._resolveLink = value;
    }

    enableExtraStats(): CreatePersistentSubscription {
        this.setExtraStats(true);
        return this;
    }

    disableExtraStats(): CreatePersistentSubscription {
        this._extraStats = false;
        return this;
    }

    setExtraStats(value: boolean): void {
        this._extraStats = value;
    }

    fromStart(): CreatePersistentSubscription {
        return this.fromRevision(0);
    }

    fromRevision(value: number): CreatePersistentSubscription {
        this._revision = value;
        return this;
    }

    messageTimeout(value: number): CreatePersistentSubscription {
        this._messageTimeout = value;
        return this;
    }

    maxRetryCount(value: number): CreatePersistentSubscription {
        this._maxRetryCount = value;
        return this;
    }

    checkoutpointAfter(value: number): CreatePersistentSubscription {
        this._checkpointAfter = value;
        return this;
    }

    minCheckpointCount(value: number): CreatePersistentSubscription {
        this._minCheckpointCount = value;
        return this;
    }

    maxCheckpointCount(value: number): CreatePersistentSubscription {
        this._maxCheckpointCount = value;
        return this;
    }

    maxSubscriberCount(value: number): CreatePersistentSubscription {
        this._maxSubscriberCount = value;
        return this;
    }

    noSubscriberCountLimitation(): CreatePersistentSubscription {
        return this.maxCheckpointCount(0);
    }

    liveBufferSize(value: number): CreatePersistentSubscription {
        this._liveBufferSize = value;
        return this;
    }

    readBatchSize(value: number): CreatePersistentSubscription {
        this._readBatchSize = value;
        return this;
    }

    historyBufferSize(value: number): CreatePersistentSubscription {
        this._historyBufferSize = value;
        return this;
    }

    consumerStrategy(strategy: ConsumerStrategy): CreatePersistentSubscription {
        this._strategy = strategy;
        return this;
    }

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
                settings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.DISPATCHTOSINGLE);
                break;
            case "pinned":
                settings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.PINNED);
                break;
            default:
                settings.setNamedConsumerStrategy(CreateReq.ConsumerStrategy.ROUNDROBIN);
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
            this._client.create(req, metadata, (error, resp) => {
                if (error) reject(error);

                resolve();
            })
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

    constructor(client: PersistentSubscriptionsClient, stream: string, group: string) {
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

    authenticated(username: string, password: string): UpdatePersistentSubscription {
        this._credentials = Credentials(username, password);
        return this;
    }

    enableLinkResolution(): UpdatePersistentSubscription {
        this._resolveLink = true;
        return this;
    }

    disableLinkResolution(): UpdatePersistentSubscription {
        this.setExtraStats(false);
        return this;
    }

    setLinkResolution(value: boolean): void {
        this._resolveLink = value;
    }

    enableExtraStats(): UpdatePersistentSubscription {
        this.setExtraStats(true);
        return this;
    }

    disableExtraStats(): UpdatePersistentSubscription {
        this._extraStats = false;
        return this;
    }

    setExtraStats(value: boolean): void {
        this._extraStats = value;
    }

    fromStart(): UpdatePersistentSubscription {
        return this.fromRevision(0);
    }

    fromRevision(value: number): UpdatePersistentSubscription {
        this._revision = value;
        return this;
    }

    messageTimeout(value: number): UpdatePersistentSubscription {
        this._messageTimeout = value;
        return this;
    }

    maxRetryCount(value: number): UpdatePersistentSubscription {
        this._maxRetryCount = value;
        return this;
    }

    checkoutpointAfter(value: number): UpdatePersistentSubscription {
        this._checkpointAfter = value;
        return this;
    }

    minCheckpointCount(value: number): UpdatePersistentSubscription {
        this._minCheckpointCount = value;
        return this;
    }

    maxCheckpointCount(value: number): UpdatePersistentSubscription {
        this._maxCheckpointCount = value;
        return this;
    }

    maxSubscriberCount(value: number): UpdatePersistentSubscription {
        this._maxSubscriberCount = value;
        return this;
    }

    noSubscriberCountLimitation(): UpdatePersistentSubscription {
        return this.maxCheckpointCount(0);
    }

    liveBufferSize(value: number): UpdatePersistentSubscription {
        this._liveBufferSize = value;
        return this;
    }

    readBatchSize(value: number): UpdatePersistentSubscription {
        this._readBatchSize = value;
        return this;
    }

    historyBufferSize(value: number): UpdatePersistentSubscription {
        this._historyBufferSize = value;
        return this;
    }

    consumerStrategy(strategy: ConsumerStrategy): UpdatePersistentSubscription {
        this._strategy = strategy;
        return this;
    }

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
                settings.setNamedConsumerStrategy(UpdateReq.ConsumerStrategy.DISPATCHTOSINGLE);
                break;
            case "pinned":
                settings.setNamedConsumerStrategy(UpdateReq.ConsumerStrategy.PINNED);
                break;
            default:
                settings.setNamedConsumerStrategy(UpdateReq.ConsumerStrategy.ROUNDROBIN);
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
            this._client.update(req, metadata, (error, resp) => {
                if (error) reject(error);

                resolve();
            })
        });
    }
}

export class DeletePersistentSubscription {
    private _client: PersistentSubscriptionsClient;
    private _stream: string;
    private _group: string;
    private _credentials?: Credentials;

    constructor(client: PersistentSubscriptionsClient, stream: string, group: string) {
        this._client = client;
        this._stream = stream;
        this._group = group;
    }

    authenticated(username: string, password: string): DeletePersistentSubscription {
        this._credentials = Credentials(username, password);
        return this;
    }

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
            this._client.delete(req, metadata, (error, resp) => {
                if(error) reject(error);

                resolve();
            })
        });
    }
}

class PersistentReportImpl implements PersistentReport {
    private _duplexStream: grpc.ClientDuplexStream<ReadReq, ReadResp>;
    private _id?: Uint8Array | string;
    private _buffer: number;
    private _stream: string;
    private _group: string;

    constructor(buffer: number, stream: string, group: string, duplexStream: grpc.ClientDuplexStream<ReadReq, ReadResp>) {
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
            let uuid = new UUID();
            uuid.setString(id);
            ackedIds.push(uuid);
        }

        ack.setId(this._id!);
        req.setAck(ack);
        req.setOptions(options);
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
            let uuid = new UUID();
            uuid.setString(id);
            nackedIds.push(uuid);
        }

        nack.setId(this._id!);
        nack.setReason(reason);

        req.setNack(nack);
        req.setOptions(options);
    }
}

export class ConnectToPersistentSubscription {
    private client: PersistentSubscriptionsClient;
    private stream: string;
    private group: string;
    private _bufferSize: number;
    private credentials?: Credentials;

    constructor(client: PersistentSubscriptionsClient, stream: string, group: string) {
        this.client = client;
        this.stream = stream;
        this.group = group;
        this._bufferSize = 10;
    }

    bufferSize(value: number): ConnectToPersistentSubscription {
        this._bufferSize = value;
        return this;
    }

    authenticated(username: string, password: string): ConnectToPersistentSubscription {
        this.credentials = Credentials(username, password);
        return this;
    }

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
        const report = new PersistentReportImpl(this._bufferSize, this.stream, this.group, stream);
        stream.write(req);
        stream.on("error", error => {
            handler.onError(error);
        });

        stream.on("data", (resp: ReadResp) => {
            if (resp.hasSubscriptionConfirmation()) {
                const confirmation = resp.getSubscriptionConfirmation()!;
                report.setId(confirmation.getSubscriptionId());
                handler.onConfirmation();
            }

            if (resp.hasEvent()) {
                let event: RecordedEvent | undefined;
                let link: RecordedEvent | undefined;

                if (resp.hasEvent()) {
                    const grpcEvent = resp.getEvent()!;

                    if (grpcEvent.hasEvent()) {
                        event = convertGrpcRecord(grpcEvent.getEvent()!);
                    }

                    if (grpcEvent.hasLink()) {
                        link = convertGrpcRecord(grpcEvent.getLink()!);
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

        stream.on("end", handler.onEnd);
        stream.on("status", (status) => {
            console.log(status);
        });
        stream.on("close", () => {
            console.log("Close");
        })
    }
}