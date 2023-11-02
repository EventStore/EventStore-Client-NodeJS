/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestNode,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";

import {
  EventStoreDBClient,
  persistentSubscriptionToAllSettingsFromDefaults,
  UnsupportedError,
} from "@eventstore/db-client";

describe("deletePersistentSubscriptionToAll", () => {
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
        await client.deletePersistentSubscriptionToAll(GROUP_NAME);
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: deletePersistentSubscriptionToAll requires server version 21.10 or higher.]`,
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("should delete a persistent subscription", async () => {
      const GROUP_NAME = "test_group_name";

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults(),
      );

      await expect(
        client.deletePersistentSubscriptionToAll(GROUP_NAME),
      ).resolves.toBeUndefined();
    });
  });
});
