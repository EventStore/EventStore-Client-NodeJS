import { binaryTestEvents, createTestNode, jsonTestEvents } from "../utils";

import { EventStoreDBClient, BACKWARDS, END } from "../..";
import { ResolvedEvent } from "../../types";
import { StreamDeletedError, StreamNotFoundError } from "../../utils";

describe("readStream", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;
  const STREAM_NAME = "test_stream_name";
  const OUT_OF_STREAM_NAME = "out_of_stream_name";

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(4, "json-test"),
      ...binaryTestEvents(4, "binary-test"),
    ]);

    await client.appendToStream(
      OUT_OF_STREAM_NAME,
      jsonTestEvents(5, "out-of-stream-test")
    );
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from stream", () => {
    describe("Event types", () => {
      test("json event", async () => {
        let resolvedEvent!: ResolvedEvent;

        for await (const event of client.readStream(STREAM_NAME, {
          maxCount: 1,
          fromRevision: BigInt(1),
        })) {
          resolvedEvent = event;
        }

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(true);
        expect(event.type).toBe("json-test");
        expect(event.data).toMatchObject({
          index: 1,
          message: "test",
        });
      });

      test("binary event", async () => {
        let resolvedEvent!: ResolvedEvent;

        for await (const event of client.readStream(STREAM_NAME, {
          maxCount: 1,
          fromRevision: BigInt(5),
        })) {
          resolvedEvent = event;
        }

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(false);
        expect(event.type).toBe("binary-test");

        expect(Buffer.from(event.data as string).toString()).toBe("hello: 1");
      });
    });

    describe("options", () => {
      test("from start", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME)) {
          count++;
        }

        expect(count).toBe(8);
      });

      test("from revision", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, {
          fromRevision: BigInt(1),
        })) {
          count++;
        }

        expect(count).toBe(7);
      });

      test("backwards from end", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, {
          direction: BACKWARDS,
          fromRevision: END,
        })) {
          count++;
        }

        expect(count).toBe(8);
      });

      test("backwards from revision", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, {
          direction: BACKWARDS,
          fromRevision: BigInt(1),
        })) {
          count++;
        }

        expect(count).toBe(2);
      });

      test("maxCount", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, { maxCount: 2 })) {
          count++;
        }

        expect(count).toBe(2);
      });
    });

    describe("errors", () => {
      test("stream not found", async () => {
        const NO_STREAM_NAME = "this_is_not_a_stream";

        try {
          for await (const e of client.readStream(NO_STREAM_NAME)) {
            expect(e).toBe("UNREACHABLE");
          }
        } catch (error) {
          expect(error).toBeInstanceOf(StreamNotFoundError);

          if (error instanceof StreamNotFoundError) {
            expect(error.streamName).toBe(NO_STREAM_NAME);
          }
        }
      });

      test("stream deleted", async () => {
        const DELETE_STREAM_NAME = "this_stream_will_be_deleted";

        await client.appendToStream(DELETE_STREAM_NAME, jsonTestEvents());

        const result = await client.tombstoneStream(DELETE_STREAM_NAME);
        expect(result).toBeDefined();

        try {
          for await (const event of client.readStream(DELETE_STREAM_NAME, {
            maxCount: 10,
          })) {
            expect(event).toBe("Unreachable");
          }
        } catch (error) {
          expect(error).toBeInstanceOf(StreamDeletedError);

          if (error instanceof StreamDeletedError) {
            expect(error.streamName).toBe(DELETE_STREAM_NAME);
          }
        }
      });
    });
  });
});
