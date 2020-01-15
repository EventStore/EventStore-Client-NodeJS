import * as streamsService from './src/generated/streams_grpc_pb';
import * as types from "./src/types";
export declare class EventStoreConnection {
    private _uri;
    private _connectionSettings;
    protected username: string;
    protected password: string;
    protected service: streamsService.StreamsClient;
    appendToStream: {
        (this: EventStoreConnection, streamName: string, expectedRevision: types.StreamRevision, eventData: types.EventData[], userCredentials: types.UserCredentials): void;
        (this: EventStoreConnection, streamName: string, expectedRevision: types.AnyStreamRevision, eventData: types.EventData[], userCredentials: types.UserCredentials): void;
        (this: EventStoreConnection, streamName: string, expectedRevision: types.StreamRevision, eventData: types.EventData[]): void;
        (this: EventStoreConnection, streamName: string, expectedRevision: types.AnyStreamRevision, eventData: types.EventData[]): void;
    };
    readAllForwards: (this: EventStoreConnection, position: types.Position, maxCount: number, resolveLinksTo: boolean, filter: types.Filter, userCredentials?: types.UserCredentials | undefined) => Promise<types.ResolvedEvent[]>;
    constructor(uri: string, username: string, password: string, connectionSettings: types.ConnectionSettings | null);
}
export * from './src/types';
