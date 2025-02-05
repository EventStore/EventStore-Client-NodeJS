import { createTestNode } from "@test-utils";

import { EventStoreDBClient } from "@eventstore/db-client";

describe("restartPersistentSubscriptionSubsystem", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = EventStoreDBClient.connectionString`esdb://admin:changeit@${node.uri}?tls=true&tlsCAFile=${node.certPath.root}`;
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
