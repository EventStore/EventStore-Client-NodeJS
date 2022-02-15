import { createTestNode, delay, jsonTestEvents } from "@test-utils";

import {
  END,
  EventStoreDBClient,
  persistentSubscriptionSettingsFromDefaults,
  ROUND_ROBIN,
  START,
} from "@eventstore/db-client";

describe("getPersistentSubscriptionInfo", () => {
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

  test("should get info on a persistent subscription", async () => {
    const STREAM_NAME = "test_stream_name";
    const GROUP_NAME = "test_group_name";

    const settings = persistentSubscriptionSettingsFromDefaults({
      startFrom: END,
      checkPointUpperBound: 1,
    });

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );

    const info = await client.getPersistentSubscriptionInfo(
      STREAM_NAME,
      GROUP_NAME
    );

    expect(info.eventSource).toBe(STREAM_NAME);
    expect(info.groupName).toBe(GROUP_NAME);
    expect(info.settings).toEqual(settings);
    // We did not connect
    expect(info.connections).toHaveLength(0);

    const settings2 = persistentSubscriptionSettingsFromDefaults({
      ...settings,
      startFrom: BigInt(123),
      checkPointLowerBound: 12,
      maxSubscriberCount: 200,
      consumerStrategyName: ROUND_ROBIN,
    });

    await client.updatePersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      settings2
    );

    const info2 = await client.getPersistentSubscriptionInfo(
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
      .subscribeToPersistentSubscription(STREAM_NAME, GROUP_NAME)
      .on("data", async (e) => {
        await subscription.ack(e);
      });

    // let some events run through the subscription
    await delay(1000);
    await subscription.unsubscribe();
    await delay(1000);

    const info3 = await client.getPersistentSubscriptionInfo(
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

    const settings = persistentSubscriptionSettingsFromDefaults({
      startFrom: START,
      extraStatistics: true,
    });

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      settings
    );
    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    const subscription = client
      .subscribeToPersistentSubscription(STREAM_NAME, GROUP_NAME)
      .on("data", async (e) => {
        await subscription.ack(e);
      });

    // let some events run through the subscription
    await delay(1000);

    const info = await client.getPersistentSubscriptionInfo(
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

    // we enabled extraStatistics.
    expect(connection.extraStatistics).toBeDefined();
    expect(connection.extraStatistics!.get("quintile 3")).toBeDefined();
  });
});
