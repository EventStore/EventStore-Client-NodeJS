import { createTestNode } from "@test-utils";

import { EventStoreDBClient } from "@eventstore/db-client";

describe("restartSubsystem", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = EventStoreDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("Doesnt error", async () => {
    await expect(client.restartSubsystem()).resolves.toBeUndefined();
  });
});
