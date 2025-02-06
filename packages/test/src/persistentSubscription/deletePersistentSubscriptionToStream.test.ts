import { createTestNode } from "@test-utils";

import {
  EventStoreDBClient,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from "@eventstore/db-client";

describe("deletePersistentSubscriptionToStream", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = EventStoreDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("should delete a persistent subscription", async () => {
    const STREAM_NAME = "test_stream_name";
    const GROUP_NAME = "test_group_name";

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults()
    );

    await expect(
      client.deletePersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
    ).resolves.toBeUndefined();
  });
});
