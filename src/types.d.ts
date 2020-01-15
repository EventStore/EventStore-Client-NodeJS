export declare class ResolvedEvent {
    event: EventRecord;
    link: EventRecord | null;
    originalEvent: EventRecord;
    originalPosition: Position | null;
    originalStreamId: string;
    originalEventNumber: StreamRevision;
    constructor(event: EventRecord, link: EventRecord | null, commitPosition: number | null);
}
export declare class StreamRevision {
}
export declare class EventRecord {
    eventStreamId: string;
    eventId: string;
    eventNumber: StreamRevision;
    eventType: string;
    data: Uint8Array;
    metadata: Uint8Array;
    created: Date;
    position: Position;
    isJson: boolean;
    constructor(eventStreamId: string, eventId: string, eventNumber: StreamRevision, eventType: string, data: Uint8Array, metadata: Uint8Array, created: Date, position: Position, isJson: boolean);
}
export declare class Position {
    commitPosition: number;
    preparePosition: number;
    static start: Position;
    static end: Position;
    constructor(commitPosition: number, preparePosition: number);
    isEnd(): boolean;
    isStart(): boolean;
}
export declare class Filter {
}
export interface UserCredentials {
    username: string;
    password: string;
}
export declare class ConnectionSettings {
    sslCertificate: string;
    constructor(sslCertificate: string);
}
export declare class EventData {
    eventId: string;
    metadata: Uint8Array;
    type: string;
    data: Uint8Array;
    isJson: boolean;
    constructor(eventId: string, type: string, data: Uint8Array, metaData?: Uint8Array, isJson?: boolean);
}
export declare enum AnyStreamRevision {
    NoStream = 1,
    Any = 2,
    StreamExists = 3
}
