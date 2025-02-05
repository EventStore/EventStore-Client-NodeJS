// This module is the CJS entry point for the library.

// The Rust addon.
import * as addon from './load.cjs';

// Use this declaration to assign types to the addon's exports,
// which otherwise by default are `any`.
declare module "./load.cjs" {
  function createClient(connStr: string): RawClient;
}

export type Iterable = {
  next(): Promise<{ value: ResolvedEvent, done: boolean }>;
}

export type RustClient = {
  readStream(stream: string, options: RustReadStreamOptions): Promise<AsyncIterable<ResolvedEvent>>;
};

export type RawClient = {
  readStream(stream: string, options: RustReadStreamOptions): Promise<Iterable>;
}

export type RustReadStreamOptions = {
  fromRevision: bigint | string;
  direction: string;
  maxCount: bigint;
  requiresLeader: boolean;
  resolveLinks: boolean;
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

export function createClient(connStr: string): RustClient {
  const client = addon.createClient(connStr);

  return {
    async readStream(stream: string, options: RustReadStreamOptions): Promise<AsyncIterable<ResolvedEvent>> {
      const iterable = await client.readStream(stream, options);

      return {
        [Symbol.asyncIterator](): AsyncIterator<ResolvedEvent> {
          return {
            next() {
              return iterable.next();
            }
          };
        }
      };
    }
  };
}
