import { createTestNode, jsonTestEvents } from "../utils";

import {
  EventStoreDBClient,
  BACKWARDS,
  END,
  AllStreamResolvedEvent,
} from "../..";

describe("readAll", () => {
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

    await client.appendToStream(STREAM_NAME_A, jsonTestEvents());
    await client.appendToStream(STREAM_NAME_B, jsonTestEvents());
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from $all", () => {
    test("from start", async () => {
      let count = 0;
      const notSystemStreams = [];

      for await (const { event } of client.readAll()) {
        count++;

        if (event && !event.streamId.startsWith("$")) {
          notSystemStreams.push(event.streamId);
        }
      }

      expect(count).toBeGreaterThan(8);
      expect(notSystemStreams.length).toEqual(8);
      expect(notSystemStreams[0]).toBe(STREAM_NAME_A);
    });

    test("from position", async () => {
      let eventToExtract!: AllStreamResolvedEvent;

      for await (const event of client.readAll({ maxCount: 3 })) {
        eventToExtract = event;
      }
      const { position } = eventToExtract!.event!;

      let extracted!: AllStreamResolvedEvent;
      for await (const event of client.readAll({
        maxCount: 1,
        fromPosition: position,
      })) {
        extracted = event;
      }

      expect(extracted).toEqual(eventToExtract);
    });

    test("backwards from end", async () => {
      let count = 0;
      const notSystemStreams = [];

      for await (const { event } of client.readAll({
        direction: BACKWARDS,
        fromPosition: END,
      })) {
        count++;

        if (event && !event.streamId.startsWith("$")) {
          notSystemStreams.push(event.streamId);
        }
      }

      expect(count).toBeGreaterThan(8);
      expect(notSystemStreams.length).toEqual(8);
      expect(notSystemStreams[0]).toBe(STREAM_NAME_B);
    });

    test("maxCount", async () => {
      let count = 0;

      for await (const _ of client.readAll({ maxCount: 2 })) {
        count++;
      }

      expect(count).toBe(2);
    });
  });
});
