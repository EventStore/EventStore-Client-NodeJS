/** @jest-environment ./src/utils/enableVersionCheck.ts */
import type { Duplex } from "stream";

import {
  createTestNode,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";
import { EventStoreDBClient } from "@eventstore/db-client";
import { StreamsClient } from "@eventstore/db-client/generated/streams_grpc_pb";

describe("appendToStream - batch append", () => {
  const supported = matchServerVersion`>=21.10`;

  const node = createTestNode();
  let client!: EventStoreDBClient;
  let batchSpy!: jest.SpiedFunction<EventStoreDBClient["GRPCStreamCreator"]>;
  let executeSpy!: jest.SpiedFunction<EventStoreDBClient["execute"]>;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
    batchSpy = spyOn.call(client, "GRPCStreamCreator");
    executeSpy = spyOn.call(client, "execute");
  });

  afterAll(async () => {
    await node.down();
  });

  afterEach(() => {
    batchSpy.mockClear();
    executeSpy.mockClear();
  });

  optionalDescribe(!supported)("Not Supported (<21.10)", () => {
    test("Uses normal append", async () => {
      const STREAM_NAME = "uses_normal_append";

      const result = await client.appendToStream(STREAM_NAME, jsonTestEvents());
      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

      expect(batchSpy).not.toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalledWith(
        StreamsClient,
        "appendToStream",
        expect.any(Function)
      );
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("Uses batch append", async () => {
      const STREAM_NAME = "uses_batch_append";

      const result = await client.appendToStream(STREAM_NAME, jsonTestEvents());
      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

      expect(batchSpy).toHaveBeenCalledWith(
        StreamsClient,
        "appendToStream",
        expect.any(Function),
        expect.any(WeakMap)
      );
    });

    test("Uses normal append if a credentials are passed", async () => {
      const STREAM_NAME = "uses_normal_append_if_creds_are_passed";

      const result = await client.appendToStream(
        STREAM_NAME,
        jsonTestEvents(),
        { credentials: { username: "admin", password: "changeit" } }
      );
      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

      expect(batchSpy).not.toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalledWith(
        StreamsClient,
        "appendToStream",
        expect.any(Function)
      );
    });

    test("Batches events into batches", async () => {
      await client.appendToStream("open_stream", jsonTestEvents());

      const stream = await extractBatchStream.call(
        client,
        ...batchSpy.mock.calls[0]
      );

      const writeSpy = jest.spyOn(stream, "write");

      const result = await client.appendToStream(
        "small_batch_size",
        jsonTestEvents(5_000),
        { batchAppendSize: 1024 }
      );

      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

      expect(writeSpy).toHaveBeenCalledTimes(
        // (test event is 128 bytes)
        // (size * event count) / requested batch size
        (128 * 5_000) / 1024
      );
    });
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */

function spyOn(this: EventStoreDBClient, method: string) {
  return jest.spyOn(this, method as never) as any;
}

function extractBatchStream(
  this: EventStoreDBClient,
  clientConstructor: any,
  name: any,
  _: any,
  cache: any
): Promise<Duplex> {
  return this.GRPCStreamCreator(
    clientConstructor,
    name,
    () => {
      throw "Creator shouldn't be called as it will take the client from the cache";
    },
    cache
  )();
}
