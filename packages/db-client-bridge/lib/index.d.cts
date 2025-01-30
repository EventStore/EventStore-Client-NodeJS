declare module "./load.cjs" {
    function createClient(connStr: string): RawClient;
}
export type Iterable = {
    next(): Promise<{
        value: ResolvedEvent;
        done: boolean;
    }>;
};
export type RustClient = {
    readStream(stream: string, options: ReadStreamOptions): Promise<AsyncIterable<ResolvedEvent>>;
};
export type RawClient = {
    readStream(stream: string, options: ReadStreamOptions): Promise<Iterable>;
};
export type ReadStreamOptions = {
    fromRevision: bigint;
    direction: string;
    maxCount: bigint;
    requiresLeader: boolean;
};
export type ResolvedEvent = {
    event?: RecordedEvent;
    link?: RecordedEvent;
    commitPosition?: bigint;
};
export type RecordedEvent = {
    streamId: string;
    id: string;
    type: string;
    isJson: boolean;
    revision: bigint;
    created: Date;
    data: Uint8Array;
    metadata: Uint8Array;
    position?: Position;
};
export type Position = {
    commit: bigint;
    prepare: bigint;
};
export type Greeting = {
    message: string;
};
export declare function createClient(connStr: string): RustClient;
