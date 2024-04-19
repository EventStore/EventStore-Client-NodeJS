import { createTestNode } from "@test-utils";

import { EventStoreDBClient } from "@eventstore/db-client";

describe("restartPersistentSubscriptionSubsystem", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("Doesnt error", async () => {
    await expect(
      client.restartPersistentSubscriptionSubsystem()
    ).resolves.toBeUndefined();
  });
});
