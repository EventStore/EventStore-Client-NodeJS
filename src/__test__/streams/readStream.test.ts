import { binaryTestEvents, createTestNode, jsonTestEvents } from "../utils";

import { EventStoreDBClient, BACKWARDS, END } from "../..";

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
        const [resolvedEvent] = await client.readStream(STREAM_NAME, 1, {
          fromRevision: BigInt(1),
        });

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(true);
        expect(event.type).toBe("json-test");
        expect(event.data).toMatchObject({
          index: 1,
          message: "test",
        });
      });

      test("binary event", async () => {
        const [resolvedEvent] = await client.readStream(STREAM_NAME, 1, {
          fromRevision: BigInt(5),
        });

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(false);
        expect(event.type).toBe("binary-test");

        expect(Buffer.from(event.data as string).toString()).toBe("hello: 1");
      });
    });

    describe("options", () => {
      test("from start", async () => {
        const events = await client.readStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER
        );

        expect(events.length).toBe(8);
      });

      test("from revision", async () => {
        const events = await client.readStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER,
          {
            fromRevision: BigInt(1),
          }
        );

        expect(events.length).toBe(7);
      });

      test("backwards from end", async () => {
        const events = await client.readStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER,
          {
            direction: BACKWARDS,
            fromRevision: END,
          }
        );

        expect(events.length).toBe(8);
      });

      test("backwards from revision", async () => {
        const events = await client.readStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER,
          {
            direction: BACKWARDS,
            fromRevision: BigInt(1),
          }
        );

        expect(events.length).toBe(2);
      });

      test("count", async () => {
        const events = await client.readStream(STREAM_NAME, 2);

        expect(events.length).toBe(2);
      });
    });
  });
});
