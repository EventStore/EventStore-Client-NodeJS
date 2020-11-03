import { createTestNode } from "../utils";

import {
  EventStoreConnection,
  createPersistentSubscription,
  ESDBConnection,
} from "../..";

describe("createPersistentSubscription", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  beforeAll(async () => {
    await node.up();

    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should create a persistant subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "stream_name_from_start";
      const GROUP_NAME = "group_name_from_start";
      await expect(
        createPersistentSubscription(STREAM_NAME, GROUP_NAME)
          .fromStart()
          .execute(connection)
      ).resolves.toBeUndefined();
    });

    test("from revision", async () => {
      const STREAM_NAME = "stream_name_from_revision";
      const GROUP_NAME = "group_name_from_revision";
      await expect(
        createPersistentSubscription(STREAM_NAME, GROUP_NAME)
          .fromRevision(BigInt(1))
          .execute(connection)
      ).resolves.toBeUndefined();
    });
  });
});
