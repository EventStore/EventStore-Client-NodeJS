/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  matchServerVersion,
  createTestNode,
  optionalDescribe,
} from "@test-utils";

import {
  END,
  EventStoreDBClient,
  excludeSystemEvents,
  PersistentSubscriptionExistsError,
  persistentSubscriptionToAllSettingsFromDefaults,
  START,
  UnsupportedError,
} from "@eventstore/db-client";

describe("createPersistentSubscriptionToAll", () => {
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
      { username: "admin", password: "changeit" },
    );
  });

  afterAll(async () => {
    await node.down();
  });

  optionalDescribe(!supported)("Not Supported (<21.10)", () => {
    test("Throws an unavailable error", async () => {
      const GROUP_NAME = "oh_no";

      try {
        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: createPersistentSubscriptionToAll requires server version 21.10 or higher.]`,
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    describe("should create a persistent subscription to all", () => {
      test("start from start", async () => {
        const GROUP_NAME = "group_name_from_start";
        await expect(
          client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: START,
            }),
          ),
        ).resolves.toBeUndefined();
      });

      test("start from end", async () => {
        const GROUP_NAME = "group_name_from_end";
        await expect(
          client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: END,
            }),
          ),
        ).resolves.toBeUndefined();
      });

      test("start from position", async () => {
        const GROUP_NAME = "group_name_from_position";
        await expect(
          client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: { commit: BigInt(1), prepare: BigInt(1) },
            }),
          ),
        ).resolves.toBeUndefined();
      });

      test("with a filter", async () => {
        const GROUP_NAME = "group_name_with_filter";
        await expect(
          client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: END,
            }),
            { filter: excludeSystemEvents() },
          ),
        ).resolves.toBeUndefined();
      });
    });

    test("should throw an error if group name exists", async () => {
      const GROUP_NAME = "group_name_already_exists";

      await expect(
        client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults(),
        ),
      ).resolves.toBeUndefined();

      await expect(
        client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults(),
        ),
      ).rejects.toThrowError(PersistentSubscriptionExistsError);
    });
  });
});
