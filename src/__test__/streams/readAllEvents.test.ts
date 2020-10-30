import { createTestNode, testEvents } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  readAllEvents,
} from "../..";

describe("readAllEvents", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;
  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    await writeEventsToStream(STREAM_NAME_A)
      .send(...testEvents())
      .execute(connection);

    await writeEventsToStream(STREAM_NAME_B)
      .send(...testEvents())
      .execute(connection);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from $all", () => {
    test("from start", async () => {
      const events = await readAllEvents()
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

    test("from position", async () => {
      const [, , eventToExtract] = await readAllEvents()
        .fromStart()
        .count(3)
        .execute(connection);

      const { position } = eventToExtract.event!;

      const [extracted] = await readAllEvents()
        .fromPosition(position)
        .count(1)
        .execute(connection);

      expect(extracted).toEqual(eventToExtract);
    });

    test("backward from end", async () => {
      const events = await readAllEvents()
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
        .fromStart()
        .count(2)
        .execute(connection);

      expect(events.length).toBe(2);
    });
  });
});
