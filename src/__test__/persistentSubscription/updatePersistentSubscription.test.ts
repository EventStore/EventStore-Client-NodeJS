import { createTestNode } from "../utils";

import { PINNED, EventStoreDBClient } from "../..";
import { persistentSubscriptionSettingsFromDefaults } from "../../utils";

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
      fromRevision: BigInt(1),
    });

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );

    await expect(
      client.updatePersistentSubscription(STREAM_NAME, GROUP_NAME, {
        ...settings,
        strategy: PINNED,
      })
    ).resolves.toBeUndefined();
  });
});
