/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestNode,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";

import {
  AccessDeniedError,
  END,
  EventStoreDBClient,
  PersistentSubscriptionDoesNotExistError,
  persistentSubscriptionToAllSettingsFromDefaults,
  Position,
  ROUND_ROBIN,
  START,
  UnsupportedError,
} from "@eventstore/db-client";

describe("getPersistentSubscriptionToAllInfo", () => {
  const supported = matchServerVersion`>=21.10.1`;
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      {
        endpoint: node.uri,
      },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" },
    );
  });

  afterAll(async () => {
    await node.down();
  });

  optionalDescribe(!supported)("Not Supported (<21.10.1)", () => {
    test("Throws an unavailable error", async () => {
      const GROUP_NAME = "oh_no";

      try {
        await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: getPersistentSubscriptionToAllInfo requires server version 21.10.1 or higher.]`,
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10.1)", () => {
    test("should get info on a persistent subscription to all", async () => {
      const STREAM_NAME = "test_stream_name";
      const GROUP_NAME = "test_group_name";

      const settings = persistentSubscriptionToAllSettingsFromDefaults({
        startFrom: END,
        checkPointUpperBound: 1,
      });

      await client.createPersistentSubscriptionToAll(GROUP_NAME, settings);

      const info = await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);

      expect(info.groupName).toBe(GROUP_NAME);
      expect(info.settings).toEqual(settings);
      // We did not connect
      expect(info.connections).toHaveLength(0);

      let position!: Position;
      for await (const { event } of client.readAll({ maxCount: 60 })) {
        if (!event) continue;
        position = event.position;
      }

      const settings2 = persistentSubscriptionToAllSettingsFromDefaults({
        ...settings,
        startFrom: position,
        checkPointLowerBound: 12,
        maxSubscriberCount: 200,
        consumerStrategyName: ROUND_ROBIN,
      });

      await client.updatePersistentSubscriptionToAll(GROUP_NAME, settings2);

      const info2 = await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);

      expect(info2.eventSource).toBe("$all");
      expect(info2.groupName).toBe(GROUP_NAME);
      expect(info2.settings).toEqual(settings2);
      // We did not connect
      expect(info2.connections).toHaveLength(0);
      expect("lastKnownEventRevision" in info2.stats).toBe(false);

      await client.appendToStream(STREAM_NAME, jsonTestEvents(500));

      const subscription = client
        .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
        .on("error", jest.fn())
        .on("data", async (e) => {
          await subscription.ack(e);
        });

      // let some events run through the subscription
      await delay(1000);
      await subscription.unsubscribe();
      await delay(1000);

      const info3 = await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);

      expect(info3.eventSource).toBe("$all");
      expect(info3.groupName).toBe(GROUP_NAME);
      expect(info3.settings).toEqual(settings2);
      // We have disconnected
      expect(info3.connections).toHaveLength(0);

      // These should not be populated
      expect("lastKnownEventRevision" in info3.stats).toBe(false);
      expect("lastCheckpointedEventRevision" in info3.stats).toBe(false);

      expect(typeof info3.stats.lastKnownEventPosition?.commit).toBe("bigint");
      expect(typeof info3.stats.lastKnownEventPosition?.prepare).toBe("bigint");

      expect(typeof info3.stats.lastCheckpointedEventPosition?.commit).toBe(
        "bigint",
      );
      expect(typeof info3.stats.lastCheckpointedEventPosition?.prepare).toBe(
        "bigint",
      );
    });

    test("should get info on a persistent subscription to all connection", async () => {
      const STREAM_NAME = "test_stream_name_connection";
      const GROUP_NAME = "test_group_name_connection";

      const settings = persistentSubscriptionToAllSettingsFromDefaults({
        startFrom: START,
        extraStatistics: true,
      });

      await client.createPersistentSubscriptionToAll(GROUP_NAME, settings);
      await client.appendToStream(STREAM_NAME, jsonTestEvents());

      const subscription = client
        .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
        .on("error", jest.fn())
        .on("data", async (e) => {
          await subscription.ack(e);
        });

      // let some events run through the subscription
      await delay(1000);

      const info = await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);

      await subscription.unsubscribe();

      expect(info.eventSource).toBe("$all");
      expect(info.groupName).toBe(GROUP_NAME);
      expect(info.settings).toEqual(settings);

      // We are the only connection
      expect(info.connections).toHaveLength(1);

      const [connection] = info.connections;

      // We set our default user above
      expect(connection.username).toBe("admin");
      // should be us connected
      expect(connection.connectionName).toBe(client.connectionName);

      // we enabled extraStatistics.
      expect(connection.extraStatistics).toBeDefined();
      expect(connection.extraStatistics!.get("quintile 3")).toBeDefined();
    });

    describe("errors", () => {
      test("PersistentSubscriptionDoesNotExist", async () => {
        const GROUP_NAME = "does_not_exist_get_info_group_name";

        try {
          await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);
          throw "unreachable";
        } catch (error) {
          expect(error).toBeInstanceOf(PersistentSubscriptionDoesNotExistError);
          expect(error).toMatchInlineSnapshot(
            `[Error: 5 NOT_FOUND: Subscription group does_not_exist_get_info_group_name on stream $all does not exist.]`,
          );

          if (error instanceof PersistentSubscriptionDoesNotExistError) {
            expect(error.groupName).toBe(GROUP_NAME);
          }
        }
      });

      test("AccessDenied", async () => {
        const GROUP_NAME = "access_denied_get_info_group_name";

        try {
          await client.getPersistentSubscriptionToAllInfo(GROUP_NAME, {
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
