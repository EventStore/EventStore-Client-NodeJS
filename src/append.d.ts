import { EventStoreConnection } from "../index";
import * as types from "./types";
export declare class Appends {
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: types.StreamRevision, eventData: Array<types.EventData>, userCredentials: types.UserCredentials): void;
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: types.AnyStreamRevision, eventData: Array<types.EventData>, userCredentials: types.UserCredentials): void;
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: types.StreamRevision, eventData: Array<types.EventData>): void;
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: types.AnyStreamRevision, eventData: Array<types.EventData>): void;
}
