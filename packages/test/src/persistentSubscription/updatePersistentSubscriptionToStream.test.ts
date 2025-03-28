import { createTestNode } from "@test-utils";

import {
  PINNED,
  KurrentDBClient,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from "@kurrent/kurrentdb-client";

describe("updatePersistentSubscriptionToStream", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();

    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("should update a persistent subscription", async () => {
    const STREAM_NAME = "from_start_test_stream_name";
    const GROUP_NAME = "from_start_test_group_name";
    const settings = persistentSubscriptionToStreamSettingsFromDefaults({
      startFrom: BigInt(1),
    });

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );

    await expect(
      client.updatePersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME, {
        ...settings,
        consumerStrategyName: PINNED,
      })
    ).resolves.toBeUndefined();
  });
});
