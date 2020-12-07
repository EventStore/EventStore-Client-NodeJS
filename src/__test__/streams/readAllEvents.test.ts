import { createTestNode, jsonTestEvents } from "../utils";

import { EventStoreDBClient, BACKWARD, END, START } from "../..";

describe("readAllEvents", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;
  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    await client.writeEventsToStream(STREAM_NAME_A, jsonTestEvents());
    await client.writeEventsToStream(STREAM_NAME_B, jsonTestEvents());
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from $all", () => {
    test("from start", async () => {
      const events = await client.readAllEvents(Number.MAX_SAFE_INTEGER, {
        fromPosition: START,
      });

      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(8);

      const filteredEvents = events.filter(
        ({ event }) => !event?.streamId.startsWith("$")
      );
      expect(filteredEvents.length).toEqual(8);
      expect(filteredEvents[0].event?.streamId).toBe(STREAM_NAME_A);
    });

    test("from position", async () => {
      const [, , eventToExtract] = await client.readAllEvents(3);

      const { position } = eventToExtract.event!;

      const [extracted] = await client.readAllEvents(1, {
        fromPosition: position,
      });

      expect(extracted).toEqual(eventToExtract);
    });

    test("backward from end", async () => {
      const events = await client.readAllEvents(Number.MAX_SAFE_INTEGER, {
        direction: BACKWARD,
        fromPosition: END,
      });

      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(8);

      const filteredEvents = events.filter(
        ({ event }) => !event?.streamId.startsWith("$")
      );
      expect(filteredEvents.length).toEqual(8);
      expect(filteredEvents[0].event?.streamId).toBe(STREAM_NAME_B);
    });

    test("count", async () => {
      const events = await client.readAllEvents(2);
      expect(events.length).toBe(2);
    });
  });
});
