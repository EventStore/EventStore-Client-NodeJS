import { createTestNode } from "../utils";

import {
  EventStoreDBClient,
  PersistentSubscriptionExistsError,
  persistentSubscriptionSettingsFromDefaults,
  START,
} from "../..";

describe("createPersistentSubscription", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      {
        endpoint: node.uri,
      },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should create a persistant subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "stream_name_from_start";
      const GROUP_NAME = "group_name_from_start";
      await expect(
        client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults({
            startFrom: START,
          })
        )
      ).resolves.toBeUndefined();
    });

    test("from end", async () => {
      const STREAM_NAME = "stream_name_from_end";
      const GROUP_NAME = "group_name_from_end";
      await expect(
        client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults() // end is default
        )
      ).resolves.toBeUndefined();
    });

    test("from revision", async () => {
      const STREAM_NAME = "stream_name_from_revision";
      const GROUP_NAME = "group_name_from_revision";
      await expect(
        client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults({
            startFrom: BigInt(1),
          })
        )
      ).resolves.toBeUndefined();
    });
  });

  test("should throw an error if subscription exists", async () => {
    const STREAM_NAME = "stream_name_already_exists";
    const GROUP_NAME = "group_name_already_exists";

    await expect(
      client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults()
      )
    ).resolves.toBeUndefined();

    await expect(
      client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults()
      )
    ).rejects.toThrowError(PersistentSubscriptionExistsError);
  });
});
