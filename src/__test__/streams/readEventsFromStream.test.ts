import { createTestNode } from "../utils";

import {
  readEventsFromStream,
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
} from "../..";

describe("readEventsFromStream", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;
  const STREAM_NAME = "test_stream_name";
  const OUT_OF_STREAM_NAME = "out_of_stream_name";

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    const jsonEvents = Array.from({ length: 4 }, (_, i) =>
      EventData.json("json-test", { message: "test", index: i }).build()
    );

    const binaryEvents = Array.from({ length: 4 }, (_, i) =>
      EventData.binary(
        "binary-test",
        Uint8Array.from(Buffer.from(`hello: ${i}`))
      ).build()
    );

    await writeEventsToStream(STREAM_NAME)
      .send(...jsonEvents)
      .send(...binaryEvents)
      .execute(connection);

    const outOfStreamEvent = EventData.json("out-of-stream-test", {
      message: "outOfStream",
    }).build();

    await writeEventsToStream(OUT_OF_STREAM_NAME)
      .send(
        outOfStreamEvent,
        outOfStreamEvent,
        outOfStreamEvent,
        outOfStreamEvent,
        outOfStreamEvent
      )
      .execute(connection);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from stream", () => {
    describe("Event types", () => {
      test("json event", async () => {
        const [resolvedEvent] = await readEventsFromStream(STREAM_NAME)
          .fromRevision(BigInt(1))
          .count(1)
          .execute(connection);

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(true);
        expect(event.eventType).toBe("json-test");
        expect(event.data).toMatchObject({
          index: 1,
          message: "test",
        });
      });

      test("binary event", async () => {
        const [resolvedEvent] = await readEventsFromStream(STREAM_NAME)
          .fromRevision(BigInt(5))
          .count(1)
          .execute(connection);

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(false);
        expect(event.eventType).toBe("binary-test");

        expect(Buffer.from(event.data).toString()).toBe("hello: 1");
      });
    });

    describe("options", () => {
      test("from start", async () => {
        const events = await readEventsFromStream(STREAM_NAME)
          .fromStart()
          .count(Number.MAX_SAFE_INTEGER)
          .execute(connection);

        expect(events.length).toBe(8);
      });

      test("from revision", async () => {
        const events = await readEventsFromStream(STREAM_NAME)
          .fromRevision(BigInt(1))
          .count(Number.MAX_SAFE_INTEGER)
          .execute(connection);

        expect(events.length).toBe(7);
      });

      test("backward from end", async () => {
        const events = await readEventsFromStream(STREAM_NAME)
          .fromEnd()
          .backward()
          .count(Number.MAX_SAFE_INTEGER)
          .execute(connection);

        expect(events.length).toBe(8);
      });

      test("backward from revision", async () => {
        const events = await readEventsFromStream(STREAM_NAME)
          .fromRevision(BigInt(1))
          .backward()
          .count(Number.MAX_SAFE_INTEGER)
          .execute(connection);

        expect(events.length).toBe(2);
      });

      test("count", async () => {
        const events = await readEventsFromStream(STREAM_NAME)
          .count(2)
          .execute(connection);

        expect(events.length).toBe(2);
      });
    });
  });
});
