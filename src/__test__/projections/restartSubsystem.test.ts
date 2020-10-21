import { createTestNode } from "../utils";

import { ESDBConnection, EventStoreConnection, restartSubsystem } from "../..";

describe("restartSubsystem", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  test("Doesnt error", async () => {
    await expect(
      restartSubsystem().authenticated("admin", "changeit").execute(connection)
    ).resolves.toBeUndefined();
  });
});
