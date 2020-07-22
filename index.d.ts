import * as streams_service from './src/generated/streams_grpc_pb';
export declare class Credentials {
    username: string;
    password: string;
    constructor(username: string, password: string);
}
export declare class EventStoreConnectionBuilder {
    protected credentials: Credentials | null;
    constructor();
    authenticated(credentials: Credentials): EventStoreConnectionBuilder;
    build(uri: string): EventStoreConnection;
}
export declare class EventStoreConnection {
    private _uri;
    constructor(uri: string);
    static builder(): EventStoreConnectionBuilder;
    streams(): streams_service.StreamsClient;
}
