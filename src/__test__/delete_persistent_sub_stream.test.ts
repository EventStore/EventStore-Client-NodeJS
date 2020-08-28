import { v4 as uuid } from "uuid";
import { SingleNode } from "./utils";
import { EventStoreConnection } from "../";

describe("delete_persistent_sub", () => {
  const node = new SingleNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully delete a persistent subscription", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

    const streamName = `delete_persistent_sub-${uuid()}`;
    await connection
      .persistentSubscriptions()
      .create(streamName, "jokers")
      .authenticated("admin", "changeit")
      .execute();

    await connection
      .persistentSubscriptions()
      .delete(streamName, "jokers")
      .authenticated("admin", "changeit")
      .execute();

    expect(1).toBe(1);
  });
});
