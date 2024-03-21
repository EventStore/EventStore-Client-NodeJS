import { createTestNode, delay, jsonTestEvents } from "@test-utils";

import {
  AccessDeniedError,
  END,
  EventStoreDBClient,
  PersistentSubscriptionDoesNotExistError,
  persistentSubscriptionToStreamSettingsFromDefaults,
  ROUND_ROBIN,
  START,
} from "@eventstore/db-client";

describe("getPersistentSubscriptionToStreamInfo", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      {
        endpoint: node.uri,
        connectionName: "getPersistentSubscriptionInfo test client",
      },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("should get info on a persistent subscription", async () => {
    const STREAM_NAME = "test_stream_name";
    const GROUP_NAME = "test_group_name";

    const settings = persistentSubscriptionToStreamSettingsFromDefaults({
      startFrom: END,
      checkPointUpperBound: 1,
    });

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );

    const info = await client.getPersistentSubscriptionToStreamInfo(
      STREAM_NAME,
      GROUP_NAME
    );

    expect(info.eventSource).toBe(STREAM_NAME);
    expect(info.groupName).toBe(GROUP_NAME);
    expect(info.settings).toEqual(settings);
    // We did not connect
    expect(info.connections).toHaveLength(0);

    const settings2 = persistentSubscriptionToStreamSettingsFromDefaults({
      ...settings,
      startFrom: BigInt(123),
      checkPointLowerBound: 12,
      maxSubscriberCount: 200,
      consumerStrategyName: ROUND_ROBIN,
    });

    await client.updatePersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      settings2
    );

    const info2 = await client.getPersistentSubscriptionToStreamInfo(
      STREAM_NAME,
      GROUP_NAME
    );

    expect(info2.eventSource).toBe(STREAM_NAME);
    expect(info2.groupName).toBe(GROUP_NAME);
    expect(info2.settings).toEqual(settings2);
    // We did not connect
    expect(info2.connections).toHaveLength(0);
    expect(info2.stats.lastKnownEventRevision).toBeUndefined();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(500));

    const subscription = client
      .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
      .on("error", jest.fn())
      .on("data", async (e) => {
        await subscription.ack(e);
      });

    // let some events run through the subscription
    await delay(1000);
    await subscription.unsubscribe();
    await delay(1000);

    const info3 = await client.getPersistentSubscriptionToStreamInfo(
      STREAM_NAME,
      GROUP_NAME
    );

    expect(info3.eventSource).toBe(STREAM_NAME);
    expect(info3.groupName).toBe(GROUP_NAME);
    expect(info3.settings).toEqual(settings2);
    // We have disconnected
    expect(info3.connections).toHaveLength(0);

    // These should be populated as revisions
    expect(typeof info3.stats.lastKnownEventRevision).toBe("bigint");
    expect(typeof info3.stats.lastCheckpointedEventRevision).toBe("bigint");
  });

  test("should get info on a persistent subscription connection", async () => {
    const STREAM_NAME = "test_stream_name_connection";
    const GROUP_NAME = "test_group_name_connection";

    const settings = persistentSubscriptionToStreamSettingsFromDefaults({
      startFrom: START,
      extraStatistics: true,
    });

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );
    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    const subscription = client
      .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
      .on("error", jest.fn())
      .on("data", async (e) => {
        await subscription.ack(e);
      });

    // let some events run through the subscription
    await delay(1000);

    const info = await client.getPersistentSubscriptionToStreamInfo(
      STREAM_NAME,
      GROUP_NAME
    );

    await subscription.unsubscribe();

    expect(info.eventSource).toBe(STREAM_NAME);
    expect(info.groupName).toBe(GROUP_NAME);
    expect(info.settings).toEqual(settings);

    // We are the only connection
    expect(info.connections).toHaveLength(1);

    const [connection] = info.connections;

    // We set our default user above
    expect(connection.username).toBe("admin");
    // should be us connected
    expect(connection.connectionName).toBe(client.connectionName);

    // we enabled extraStatistics.
    expect(connection.extraStatistics).toBeDefined();
    expect(connection.extraStatistics!.get("quintile 3")).toBeDefined();
  });

  describe("errors", () => {
    test("PersistentSubscriptionDoesNotExist", async () => {
      const STREAM_NAME = "does_not_exist_get_info_stream_name";
      const GROUP_NAME = "does_not_exist_get_info_group_name";

      try {
        await client.getPersistentSubscriptionToStreamInfo(
          STREAM_NAME,
          GROUP_NAME
        );
        throw "unreachable";
      } catch (error) {
        expect(error).toBeInstanceOf(PersistentSubscriptionDoesNotExistError);
        expect(error).toMatchInlineSnapshot(
          `[Error: 5 NOT_FOUND: Subscription group does_not_exist_get_info_group_name on stream does_not_exist_get_info_stream_name does not exist.]`
        );

        if (error instanceof PersistentSubscriptionDoesNotExistError) {
          expect(error.streamName).toBe(STREAM_NAME);
          expect(error.groupName).toBe(GROUP_NAME);
        }
      }
    });

    test("AccessDenied", async () => {
      const STREAM_NAME = "access_denied_get_info_stream_name";
      const GROUP_NAME = "access_denied_get_info_group_name";

      try {
        await client.getPersistentSubscriptionToStreamInfo(
          STREAM_NAME,
          GROUP_NAME,
          {
            credentials: { username: "AzureDiamond", password: "hunter2" },
          }
        );
        throw "unreachable";
      } catch (error) {
        expect(error).toBeInstanceOf(AccessDeniedError);
      }
    });
  });
});
