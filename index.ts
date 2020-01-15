import * as fs from "fs";
import * as streamsService from './src/generated/streams_grpc_pb';
import * as streams from './src/generated/streams_pb';
import * as grpc from "grpc";
import * as types from "./src/types";
import {ReadReq, ReadResp} from "./src/generated/streams_pb";
import {Appends} from "./src/append";
import {Reads} from "./src/reads";

type Nullable<T> = T | null;

export class EventStoreConnection {

    // TODO: We need to handle logging levels
    private _uri: string;
    private _connectionSettings: Nullable<types.ConnectionSettings>;

    protected username: string;
    protected password: string;
    protected service: streamsService.StreamsClient;

    appendToStream = Appends.prototype.appendToStream;

    readAllForwards = Reads.prototype.readAllForwards;

    constructor(uri: string, username: string, password: string, connectionSettings: types.ConnectionSettings | null) {
        this._uri = uri;
        this.username = username;
        this.password = password;
        this._connectionSettings = connectionSettings;

        let credentials = grpc.credentials.createInsecure();
        if (connectionSettings !== null) {
            if (connectionSettings.sslCertificate !== null) {
                let cert = fs.readFileSync(connectionSettings.sslCertificate);
                credentials = grpc.credentials.createSsl(cert);
            }
        }

        this.service = new streamsService.StreamsClient("localhost:2113", credentials);
    }
}

export * from './src/types'