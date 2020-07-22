import {RequestStream, Status, StreamsClient} from "../generated/streams_pb_service";
import {AppendReq} from "../generated/streams_pb";
import {Credentials, EventData, IRevision, Revision} from "./types";
import {Empty, StreamIdentifier, UUID} from "../generated/shared_pb";

export class Streams {
    private client: StreamsClient;

    constructor(uri: string) {
        this.client = new StreamsClient(uri);
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
        let header = new AppendReq();
        let options = new AppendReq.Options();
        let identifier = new StreamIdentifier();

        identifier.setStreamname(this.stream);
        options.setStreamIdentifier(identifier);

        switch (this.revision.__typename) {
            case "exact": {
                options.setRevision(this.revision.revision);
            }

            case "no_stream": {
                options.setNoStream(new Empty());
            }

            case "stream_exists": {
                options.setStreamExists(new Empty());
            }

            case "any": {
                options.setAny(new Empty());
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

    send(item: EventData) {
        let req = new AppendReq();
        let message = new AppendReq.ProposedMessage();
        let uuid = new UUID();

        uuid.setString(item.id);
        message.setId(uuid);
        message.getMetadataMap().set("type", item.eventType);

        switch (item.payload.__typename) {
            case "binary": {
                message.getMetadataMap().set("content-type", "application/octet-stream");
            }

            case "json": {
                message.getMetadataMap().set("content-type", "application/json");
                message.setData(JSON.stringify(item.payload));
            }
        }

        req.setProposedMessage(message);
        this.requestStream.write(req);
    }

    end(): AppendResponse {
        this.requestStream.end();
        return new AppendResponse(this.requestStream);
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

