import { createTestNode } from "@test-utils";

import {
  KurrentDBClient,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from "@kurrent/db-client";

describe("deletePersistentSubscriptionToStream", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();

    client = new KurrentDBClient(
      {
        endpoint: node.uri,
      },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
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
