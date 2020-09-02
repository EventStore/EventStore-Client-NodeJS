import { createTestNode } from "../utils";

import {
  EventStoreConnection,
  createPersistentSubscription,
  ESDBConnection,
  deletePersistentSubscription,
} from "../..";

describe("deletePersistentSubscription", () => {
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

  test("should delete a persistant subscription", async () => {
    const STREAM_NAME = "test_stream_name";
    const GROUP_NAME = "test_group_name";

    await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
      .authenticated("admin", "changeit")
      .fromStart()
      .execute(connection);

    await expect(
      deletePersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .execute(connection)
    ).resolves.toBeUndefined();
  });
});
