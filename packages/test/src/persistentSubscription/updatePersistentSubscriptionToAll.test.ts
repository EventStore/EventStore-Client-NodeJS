/** @jest-environment ./src/utils/enableVersionCheck.ts */

import {
  createTestNode,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";

import {
  PINNED,
  KurrentDBClient,
  persistentSubscriptionToAllSettingsFromDefaults,
  UnsupportedError,
} from "@kurrent/kurrentdb-client";

describe("updatePersistentSubscriptionToAll", () => {
  const supported = matchServerVersion`>=21.10`;
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();

    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  optionalDescribe(!supported)("Not Supported (<21.10)", () => {
    test("Throws an unavailable error", async () => {
      const GROUP_NAME = "oh_no";

      try {
        await client.updatePersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: updatePersistentSubscriptionToAll requires server version 21.10 or higher.]`
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("should update a persistent subscription to all", async () => {
      const GROUP_NAME = "supported_test_group_name";
      const settings = persistentSubscriptionToAllSettingsFromDefaults({
        extraStatistics: true,
      });

      await client.createPersistentSubscriptionToAll(GROUP_NAME, settings);

      await expect(
        client.updatePersistentSubscriptionToAll(GROUP_NAME, {
          ...settings,
          consumerStrategyName: PINNED,
        })
      ).resolves.toBeUndefined();
    });
  });
});
