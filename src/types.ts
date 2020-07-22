import { v4 as uuid } from 'uuid';

export interface IRevision {
    accept(visitor: RevisionVisitor): void;
}

export interface RevisionVisitor {
    onAny(): void;
    onStreamExists(): void;
    onNoStream(): void;
    onExact(revision: number): void;
}

export class AnyRevision implements IRevision {
    accept(visitor: RevisionVisitor): void {
        visitor.onAny();
    }
}

export class StreamExistRevision implements IRevision {
    accept(visitor: RevisionVisitor): void {
        visitor.onStreamExists();
    }
}

export class NoStreamRevision implements IRevision {
    accept(visitor: RevisionVisitor): void {
        visitor.onNoStream();
    }
}

export class ExactRevision implements IRevision {
    revision: number;

    constructor(revision: number) {
        this.revision = revision;
    }

    accept(visitor: RevisionVisitor): void {
        visitor.onExact(this.revision);
    }
}

export class Revision {
    static readonly Any: IRevision = new AnyRevision();
    static readonly StreamExist: IRevision = new StreamExistRevision();
    static readonly NoStream: IRevision = new NoStreamRevision();
    static exact(revision: number): IRevision {
        return new ExactRevision(revision);
    }
}

export class Credentials {
    username: string;
    paswword: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.paswword = password;
    }
}

export class EventDataBuilder {
    eventType: string;
    payload: any;
    id: string | null;
    isJson: boolean;

    private constructor(eventType: string, payload: any, id: string | null, isJson: boolean) {
        this.eventType = eventType;
        this.payload = payload;
        this.id = id;
        this.isJson = isJson;
    }

    static json(eventType: string, payload: any): EventDataBuilder {
        let builder = new EventDataBuilder(eventType, payload, null, true);
        return builder;
    }

    static binary(eventType: string, payload: Uint8Array): EventDataBuilder {
        let builder = new EventDataBuilder(eventType, payload, null, false);
        return builder;
    }

    eventId(id: string): EventDataBuilder {
        this.id = id;
        return this;
    }

    build(): EventData {
        let id: string = this.id != null ? this.id : uuid();
        return new EventData(this.eventType, this.payload, id, this.isJson);
    }
}

export class EventData {
    eventType: string;
    payload: any;
    id: string;
    isJson: boolean;

    public constructor(eventType: string, payload: any, id: string, isJson: boolean) {
        this.eventType = eventType;
        this.payload = payload;
        this.id = id;
        this.isJson = isJson;
    }

    static json(eventType: string, payload: any): EventDataBuilder {
        return EventDataBuilder.json(eventType, payload);
    }

    static binary(eventType: string, payload: Uint8Array): EventDataBuilder {
        return EventDataBuilder.binary(eventType, payload);
    }
}