import { createTestNode } from "../utils";

import { EventStoreDBClient } from "../..";
import { persistentSubscriptionSettingsFromDefaults } from "../../utils";

describe("deletePersistentSubscription", () => {
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

  test("should delete a persistant subscription", async () => {
    const STREAM_NAME = "test_stream_name";
    const GROUP_NAME = "test_group_name";

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults()
    );

    await expect(
      client.deletePersistentSubscription(STREAM_NAME, GROUP_NAME)
    ).resolves.toBeUndefined();
  });
});
