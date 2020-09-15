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

    const result1 = await writeEventsToStream(STREAM_NAME_A)
      .send(event, event, event, event)
      .execute(connection);

    expect(result1.__typename).toBe("success");

    const result2 = await writeEventsToStream(STREAM_NAME_B)
      .send(event, event, event, event)
      .execute(connection);

    expect(result2.__typename).toBe("success");
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from $all", () => {
    test("from start", async () => {
      const { events } = await readAllEvents()
        .authenticated("admin", "changeit")
        .fromStart()
        .count(Number.MAX_SAFE_INTEGER)
        .execute(connection);

      expect(events).toBeDefined();
      expect(events!.length).toBeGreaterThan(8);

      const filteredEvents = events!.filter(
        ({ event }) => !event?.streamId.startsWith("$")
      );
      expect(filteredEvents.length).toEqual(8);
      expect(filteredEvents[0].event?.streamId).toBe(STREAM_NAME_A);
    });

    // throws deep in GRPC crapness (goog.asserts)
    test.skip("from position", async () => {
      const streamResult = await readEventsFromStream(STREAM_NAME_A)
        .fromRevision(1)
        .count(1)
        .execute(connection);

      const [eventToExtract] = streamResult.events!;
      const { position } = eventToExtract.event!;

      const allResult = await readAllEvents()
        .authenticated("admin", "changeit")
        .fromPosition(position)
        .count(1)
        .execute(connection);

      const [extracted] = allResult.events!;

      expect(extracted).toEqual(eventToExtract);
    });

    test("backward from end", async () => {
      const { events } = await readAllEvents()
        .authenticated("admin", "changeit")
        .backward()
        .fromEnd()
        .count(Number.MAX_SAFE_INTEGER)
        .execute(connection);

      expect(events).toBeDefined();
      expect(events!.length).toBeGreaterThan(8);

      const filteredEvents = events!.filter(
        ({ event }) => !event?.streamId.startsWith("$")
      );
      expect(filteredEvents.length).toEqual(8);
      expect(filteredEvents[0].event?.streamId).toBe(STREAM_NAME_B);
    });

    test("count", async () => {
      const result = await readAllEvents()
        .authenticated("admin", "changeit")
        .fromStart()
        .count(2)
        .execute(connection);

      expect(result.__typename).toBe("success");
      expect(result.events!.length).toBe(2);
    });
  });
});
