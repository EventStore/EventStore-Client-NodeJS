import { v4 as uuid } from "uuid";
import { SingleNode } from "./utils";
import { EventStoreConnection, Pinned } from "../";

describe("update_persistent_sub", () => {
  const node = new SingleNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully update a persistent subscription", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

    const streamName = `update_persistent_sub-${uuid()}`;
    await connection
      .persistentSubscriptions()
      .create(streamName, "jokers")
      .authenticated("admin", "changeit")
      .execute();

    await connection
      .persistentSubscriptions()
      .update(streamName, "jokers")
      .authenticated("admin", "changeit")
      .consumerStrategy(Pinned)
      .execute();

    expect(1).toBe(1);
  });
});
