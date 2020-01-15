import { EventStoreConnection } from "../index";
import * as types from "./types";
import { ReadResp } from "./generated/streams_pb";
export declare class Reads {
    readAllForwards(this: EventStoreConnection, position: types.Position, maxCount: number, resolveLinksTo: boolean, filter: types.Filter, userCredentials?: types.UserCredentials): Promise<types.ResolvedEvent[]>;
    static convertToEventRecord(event: ReadResp.ReadEvent.RecordedEvent | undefined): types.EventRecord | null;
}
