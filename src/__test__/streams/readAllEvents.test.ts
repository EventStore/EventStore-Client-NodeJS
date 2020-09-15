import { createTestNode } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  readAllEvents,
  readEventsFromStream,
} from "../..";

describe("readAllEvents", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;
  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    const event = EventData.json("an_event", {
      message: "test",
    }).build();

    await writeEventsToStream(STREAM_NAME_A)
      .send(event, event, event, event)
      .execute(connection);

    await writeEventsToStream(STREAM_NAME_B)
      .send(event, event, event, event)
      .execute(connection);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from $all", () => {
    test("from start", async () => {
      const events = await readAllEvents()
        .authenticated("admin", "changeit")
        .fromStart()
        .count(Number.MAX_SAFE_INTEGER)
        .execute(connection);

      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(8);

      const filteredEvents = events.filter(
        ({ event }) => !event?.streamId.startsWith("$")
      );
      expect(filteredEvents.length).toEqual(8);
      expect(filteredEvents[0].event?.streamId).toBe(STREAM_NAME_A);
    });

    // throws deep in GRPC crapness (goog.asserts)
    test.skip("from position", async () => {
      const [eventToExtract] = await readEventsFromStream(STREAM_NAME_A)
        .fromRevision(1)
        .count(1)
        .execute(connection);

      const { position } = eventToExtract.event!;

      const [extracted] = await readAllEvents()
        .authenticated("admin", "changeit")
        .fromPosition(position)
        .count(1)
        .execute(connection);

      expect(extracted).toEqual(eventToExtract);
    });

    test("backward from end", async () => {
      const events = await readAllEvents()
        .authenticated("admin", "changeit")
        .backward()
        .fromEnd()
        .count(Number.MAX_SAFE_INTEGER)
        .execute(connection);

      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(8);

      const filteredEvents = events.filter(
        ({ event }) => !event?.streamId.startsWith("$")
      );
      expect(filteredEvents.length).toEqual(8);
      expect(filteredEvents[0].event?.streamId).toBe(STREAM_NAME_B);
    });

    test("count", async () => {
      const events = await readAllEvents()
        .authenticated("admin", "changeit")
        .fromStart()
        .count(2)
        .execute(connection);

      expect(events.length).toBe(2);
    });
  });
});
