import { collect, createTestNode, delay, jsonTestEvents } from "@test-utils";
import {
  EventStoreDBClient,
  BACKWARDS,
  END,
  AllStreamResolvedEvent,
  jsonEvent,
  AllStreamBinaryRecordedEvent,
  LinkEvent,
} from "@eventstore/db-client";

describe("readAll", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;
  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    client = EventStoreDBClient.connectionString`esdb://admin:changeit@${node.uri}?tls=true&tlsCAFile=${node.certPath.root}`;

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

    test("resolve link tos", async () => {
      const FROM_STREAM_NAME = "link-from-stream";

      await client.enableProjection("$by_category");

      await client.createProjection(
        "projection",
        `fromStream("${FROM_STREAM_NAME}").when({
          $any: function(state, ev) {
            linkTo('a-' + ev.data.some, ev)
          }
        });`,
        { emitEnabled: true }
      );

      // Append an event that will be linked

      await client.appendToStream(
        FROM_STREAM_NAME,
        jsonEvent({ type: "linky", data: { some: "thing" } })
      );

      await delay(1000);

      // by default, resolveLinkTos should be false
      const noResolveLink = client.readAll();

      let noResolveEvent!: AllStreamResolvedEvent;

      for await (const event of noResolveLink) {
        if (event.event?.type !== "$>") continue;
        noResolveEvent = event;
        break;
      }

      // We found a link event
      expect(noResolveEvent).toBeDefined();

      // link event
      expect(noResolveEvent.event).toBeDefined();
      expect(noResolveEvent.event?.type).toBe("$>");

      const doResolveLink = client.readAll({
        maxCount: 1,
        resolveLinkTos: true,
        fromPosition: noResolveEvent.event!.position,
      });
      const [doResolveEvent] = await collect(doResolveLink);

      // resolved event
      expect(doResolveEvent.event).toBeDefined();
      expect(doResolveEvent.event?.type).toBe("linky");

      // link event
      expect(doResolveEvent.link).toBeDefined();
      expect(doResolveEvent.link?.type).toBe("$>");

      expect(doResolveEvent.event?.id).toBe(
        (noResolveEvent.event as AllStreamBinaryRecordedEvent<LinkEvent>)!
          .metadata!.$causedBy
      );
      expect(doResolveEvent.event?.id).toBe(
        doResolveEvent.link!.metadata.$causedBy
      );
    });
  });
});
