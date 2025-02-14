/** @jest-environment ./src/utils/enableVersionCheck.ts */

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
  AccessDeniedError,
  END,
  KurrentDBClient,
  PersistentSubscriptionDoesNotExistError,
  Position,
  ROUND_ROBIN,
  START,
  UnsupportedError,
} from "@kurrent/db-client";

describe("listPersistentSubscriptionsToAll", () => {
  const supported = matchServerVersion`>=21.10.1`;
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();

    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  optionalDescribe(!supported)("Not Supported (<21.10.1)", () => {
    test("Throws an unavailable error", async () => {
      try {
        await client.listPersistentSubscriptionsToAll();
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: listPersistentSubscriptionsToAll requires server version 21.10.1 or higher.]`
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10.1)", () => {
    let created!: CreatedPSToAll[];

    beforeAll(async () => {
      let position!: Position;
      for await (const { event } of await client.readAll({ maxCount: 60 })) {
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

    describe("errors", () => {
      const emptyNode = createTestNode();
      let client!: KurrentDBClient;

      beforeAll(async () => {
        await emptyNode.up();

        client = KurrentDBClient.connectionString(
          emptyNode.connectionString()
        );
      });

      afterAll(async () => {
        await emptyNode.down();
      });

      test("PersistentSubscriptionDoesNotExist", async () => {
        try {
          await client.listPersistentSubscriptionsToAll();
          throw "unreachable";
        } catch (error) {
          expect(error).toBeInstanceOf(PersistentSubscriptionDoesNotExistError);
          expect(error).toMatchInlineSnapshot(
            `[Error: 5 NOT_FOUND: Subscription group  on stream $all does not exist.]`
          );

          if (error instanceof PersistentSubscriptionDoesNotExistError) {
            expect(error.streamName).toBe("$all");
          }
        }
      });

      test("AccessDenied", async () => {
        try {
          await client.listPersistentSubscriptionsToAll({
            credentials: { username: "AzureDiamond", password: "hunter2" },
          });
          throw "unreachable";
        } catch (error) {
          expect(error).toBeInstanceOf(AccessDeniedError);
        }
      });
    });
  });
});
