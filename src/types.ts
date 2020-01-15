export class ResolvedEvent {
    event: EventRecord;
    link: EventRecord | null;
    originalEvent: EventRecord;
    originalPosition: Position | null;
    originalStreamId: string;
    originalEventNumber: StreamRevision;

    constructor(event: EventRecord, link: EventRecord | null, commitPosition: number | null) {
        this.event = event;
        this.link = link;
        
        this.originalEvent = this.event ?? this.link;
        this.originalStreamId = this.originalEvent.eventStreamId;
        this.originalEventNumber = this.originalEvent.eventNumber;

        if (commitPosition !== null) {
            this.originalPosition = new Position(commitPosition, this.originalEvent.position.preparePosition)
        } else {
            this.originalPosition = null;
        }
    }
}

export class StreamRevision {
}

export class EventRecord {
    eventStreamId: string;
    eventId: string;
    eventNumber: StreamRevision;
    eventType: string;
    data: Uint8Array;
    metadata: Uint8Array;
    created: Date;
    position: Position;
    isJson: boolean;

    constructor(eventStreamId: string, eventId: string, eventNumber: StreamRevision, eventType: string, data: Uint8Array, metadata: Uint8Array, created: Date, position: Position, isJson: boolean) {
        this.eventStreamId = eventStreamId;
        this.eventId = eventId;
        this.eventNumber = eventNumber;
        this.eventType = eventType;
        this.data = data;
        this.metadata = metadata;
        this.created = created;
        this.position = position;
        this.isJson = isJson;
    }
}

export class Position {
    commitPosition: number;
    preparePosition: number;
    static start = new Position(0, 0);
    static end = new Position(Number.MAX_VALUE, Number.MAX_VALUE);

    constructor(commitPosition: number, preparePosition: number) {
        if (commitPosition < preparePosition) {
            throw Error('The commit position cannot be less than the prepare position');
        }

        this.commitPosition = commitPosition;
        this.preparePosition = preparePosition;
    }

    isEnd() {
        return this.commitPosition == Number.MAX_VALUE && this.preparePosition === Number.MAX_VALUE;
    }

    isStart() {
        return this.commitPosition == 0 && this.preparePosition === 0;
    }
}

export class Filter {

}

export interface UserCredentials {
    username: string;
    password: string;
}

export class ConnectionSettings {
    sslCertificate: string;

    constructor(sslCertificate: string) {
        this.sslCertificate = sslCertificate;
    }
}

export class EventData {
    eventId: string;
    metadata: Uint8Array;
    type: string;
    data: Uint8Array;
    isJson: boolean;

    constructor(eventId: string, type: string, data: Uint8Array, metaData: Uint8Array = new Uint8Array(), isJson: boolean = true) {
        this.eventId = eventId;
        this.type = type;
        this.data = data;
        this.metadata = metaData;
        this.isJson = isJson;
    }
}

export enum AnyStreamRevision {
    NoStream = 1,
    Any = 2,
    StreamExists = 3
}