import { createTestNode } from "../utils";

import { EventStoreDBClient } from "../..";
import { persistentSubscriptionSettingsFromDefaults } from "../../utils";

describe("createPersistentSubscription", () => {
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

  describe("should create a persistant subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "stream_name_from_start";
      const GROUP_NAME = "group_name_from_start";
      await expect(
        client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults()
        )
      ).resolves.toBeUndefined();
    });

    test("from revision", async () => {
      const STREAM_NAME = "stream_name_from_revision";
      const GROUP_NAME = "group_name_from_revision";
      await expect(
        client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults({
            fromRevision: BigInt(1),
          })
        )
      ).resolves.toBeUndefined();
    });
  });
});
