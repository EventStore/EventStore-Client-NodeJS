import { createTestNode } from "@test-utils";

import {
  PINNED,
  EventStoreDBClient,
  persistentSubscriptionSettingsFromDefaults,
} from "@eventstore/db-client";

describe("updatePersistentSubscription", () => {
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

  test("should update a persistant subscription", async () => {
    const STREAM_NAME = "from_start_test_stream_name";
    const GROUP_NAME = "from_start_test_group_name";
    const settings = persistentSubscriptionSettingsFromDefaults({
      startFrom: BigInt(1),
    });

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );

    await expect(
      client.updatePersistentSubscription(STREAM_NAME, GROUP_NAME, {
        ...settings,
        consumerStrategyName: PINNED,
      })
    ).resolves.toBeUndefined();
  });
});
