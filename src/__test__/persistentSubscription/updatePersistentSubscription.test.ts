import { createTestNode } from "../utils";

import {
  EventStoreConnection,
  createPersistentSubscription,
  updatePersistentSubscription,
  ESDBConnection,
  PINNED,
} from "../..";

describe("updatePersistentSubscription", () => {
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

  test("should update a persistant subscription", async () => {
    const STREAM_NAME = "from_start_test_stream_name";
    const GROUP_NAME = "from_start_test_group_name";

    await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
      .authenticated("admin", "changeit")
      .fromStart()
      .execute(connection);

    await expect(
      updatePersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .consumerStrategy(PINNED)
        .execute(connection)
    ).resolves.toBeUndefined();
  });
});
