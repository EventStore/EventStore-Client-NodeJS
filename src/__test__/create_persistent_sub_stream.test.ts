import { v4 as uuid } from "uuid";
import { createTestNode } from "./utils";
import { EventStoreConnection } from "../";

describe("create_persistent_sub", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully create a persistent subscription", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

    const streamName = `create_persistent_sub-${uuid()}`;
    await connection
      .persistentSubscriptions()
      .create(streamName, "jokers")
      .authenticated("admin", "changeit")
      .execute();

    expect(1).toBe(1);
  });
});
