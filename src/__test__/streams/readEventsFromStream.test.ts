import { binaryTestEvents, createTestNode, jsonTestEvents } from "../utils";

import { EventStoreDBClient, BACKWARD, END } from "../..";

describe("readEventsFromStream", () => {
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

    await client.appendEventsToStream(STREAM_NAME, [
      ...jsonTestEvents(4, "json-test"),
      ...binaryTestEvents(4, "binary-test"),
    ]);

    await client.appendEventsToStream(
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
        const [resolvedEvent] = await client.readEventsFromStream(
          STREAM_NAME,
          1,
          { fromRevision: BigInt(1) }
        );

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(true);
        expect(event.eventType).toBe("json-test");
        expect(event.data).toMatchObject({
          index: 1,
          message: "test",
        });
      });

      test("binary event", async () => {
        const [resolvedEvent] = await client.readEventsFromStream(
          STREAM_NAME,
          1,
          { fromRevision: BigInt(5) }
        );

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(false);
        expect(event.eventType).toBe("binary-test");

        expect(Buffer.from(event.data as string).toString()).toBe("hello: 1");
      });
    });

    describe("options", () => {
      test("from start", async () => {
        const events = await client.readEventsFromStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER
        );

        expect(events.length).toBe(8);
      });

      test("from revision", async () => {
        const events = await client.readEventsFromStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER,
          {
            fromRevision: BigInt(1),
          }
        );

        expect(events.length).toBe(7);
      });

      test("backward from end", async () => {
        const events = await client.readEventsFromStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER,
          {
            direction: BACKWARD,
            fromRevision: END,
          }
        );

        expect(events.length).toBe(8);
      });

      test("backward from revision", async () => {
        const events = await client.readEventsFromStream(
          STREAM_NAME,
          Number.MAX_SAFE_INTEGER,
          {
            direction: BACKWARD,
            fromRevision: BigInt(1),
          }
        );

        expect(events.length).toBe(2);
      });

      test("count", async () => {
        const events = await client.readEventsFromStream(STREAM_NAME, 2);

        expect(events.length).toBe(2);
      });
    });
  });
});
