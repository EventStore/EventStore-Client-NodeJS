import { StreamsClient } from "../generated/streams_pb_service";
import {AppendReq} from "../generated/streams_pb";
import {Credentials, IRevision, Revision} from "./types";

export class Streams {
    private client: StreamsClient;

    constructor(uri: string) {
        this.client = new StreamsClient(uri);
    }
}

export class WriteEvents {
    private client: StreamsClient;
    private stream: string;
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

    execute() {
        let header = new AppendReq();
        let options = new AppendReq.Options();
        // this.client.append().write()
    }
}

