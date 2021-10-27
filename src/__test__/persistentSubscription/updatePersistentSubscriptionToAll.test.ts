/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion, optionalDescribe } from "../utils";

import {
  PINNED,
  EventStoreDBClient,
  persistentSubscriptionToAllSettingsFromDefaults,
  UnsupportedError,
  UnknownError,
} from "../..";

describe("updatePersistentSubscriptionToAll", () => {
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
      const GROUP_NAME = "oh_no";

      try {
        await client.updatePersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
      }
    });

    test("Can skip the version check, if forced", async () => {
      const GROUP_NAME = "oh_boy";

      try {
        await client.updatePersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults(),
          { skipVersionCheck: true }
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnknownError);
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("should update a persistant subscription to all", async () => {
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
