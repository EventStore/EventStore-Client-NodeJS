/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  CreatedPSToAll,
  createManyPsToAll,
  createTestNode,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";

import {
  END,
  EventStoreDBClient,
  Position,
  ROUND_ROBIN,
  START,
  UnsupportedError,
} from "@eventstore/db-client";

describe("listPersistentSubscriptionsToAll", () => {
  const supported = matchServerVersion`>=21.10`;
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      {
        endpoint: node.uri,
      },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  optionalDescribe(!supported)("Not Supported (<21.10)", () => {
    test("Throws an unavailable error", async () => {
      try {
        await client.listPersistentSubscriptionsToAll();
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: listPersistentSubscriptionsToAll requires server version 21.10 or higher.]`
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    let created!: CreatedPSToAll[];

    beforeAll(async () => {
      let position!: Position;
      for await (const { event } of client.readAll({ maxCount: 60 })) {
        if (!event) continue;
        position = event.position;
      }

      created = await createManyPsToAll(client)(
        (i) => `test_group_name_${i}`,
        [
          {
            startFrom: START,
            extraStatistics: true,
          },
          {
            startFrom: END,
          },
          {
            startFrom: position,
            maxRetryCount: 12,
            consumerStrategyName: ROUND_ROBIN,
          },
          {},
        ]
      );
    });

    test("should list persistent subscriptions on a stream", async () => {
      const list = await client.listPersistentSubscriptionsToAll();

      expect(list).toHaveLength(created.length);

      for (const [streamName, groupName, settings] of created) {
        const ps = list.find((ps) => ps.groupName === groupName)!;
        expect(ps).toBeDefined();
        expect(ps.eventSource).toBe(streamName);
        expect(ps.groupName).toBe(groupName);
        expect(ps.settings).toEqual(settings);
      }
    });

    test("should list info on a persistent subscription connection", async () => {
      const groupNameOfInterest = created[0][1];

      await client.appendToStream("some_stream", jsonTestEvents());

      const subscription = client
        .subscribeToPersistentSubscriptionToAll(groupNameOfInterest)
        .on("data", async (e) => {
          await subscription.ack(e);
        });

      // let some events run through the subscriptions
      await delay(1000);

      const list = await client.listPersistentSubscriptionsToAll();

      expect(list).toHaveLength(created.length);

      for (const [streamName, groupName, settings] of created) {
        const ps = list.find((ps) => ps.groupName === groupName)!;
        expect(ps).toBeDefined();
        expect(ps.eventSource).toBe(streamName);
        expect(ps.groupName).toBe(groupName);
        expect(ps.settings).toEqual(settings);

        if (groupName === groupNameOfInterest) {
          // We are the only connection
          expect(ps.connections).toHaveLength(1);

          const [connection] = ps.connections;

          // We set our default user above
          expect(connection.username).toBe("admin");

          // we enabled extraStatistics.
          expect(connection.extraStatistics).toBeDefined();
          expect(connection.extraStatistics!.get("quintile 3")).toBeDefined();
        }
      }

      await subscription.unsubscribe();
    });
  });
});
