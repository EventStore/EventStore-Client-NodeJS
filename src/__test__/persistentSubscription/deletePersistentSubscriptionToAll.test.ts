/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion, optionalDescribe } from "../utils";

import {
  EventStoreDBClient,
  persistentSubscriptionToAllSettingsFromDefaults,
  UnknownError,
  UnsupportedError,
} from "../..";

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
        await client.deletePersistentSubscriptionToAll(GROUP_NAME);
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
      }
    });

    test("Can skip the version check, if forced", async () => {
      const GROUP_NAME = "oh_boy";

      try {
        await client.deletePersistentSubscriptionToAll(GROUP_NAME, {
          skipVersionCheck: true,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnknownError);
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("should delete a persistant subscription", async () => {
      const GROUP_NAME = "test_group_name";

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults()
      );

      await expect(
        client.deletePersistentSubscriptionToAll(GROUP_NAME)
      ).resolves.toBeUndefined();
    });
  });
});
