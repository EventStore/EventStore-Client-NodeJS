import {
  createManyPs,
  createTestNode,
  delay,
  jsonTestEvents,
} from "@test-utils";

import {
  AccessDeniedError,
  END,
  KurrentDBClient,
  PersistentSubscriptionDoesNotExistError,
  ROUND_ROBIN,
  START,
} from "@kurrent/db-client";

describe("listPersistentSubscriptions", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();

    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("should list persistent subscriptions on a stream", async () => {
    const STREAM_NAME = "test_stream_name";
    const created = await createManyPs(client)(
      () => STREAM_NAME,
      (i) => `test_group_name_${i}`,
      [
        {
          startFrom: START,
          extraStatistics: true,
        },
        {
          startFrom: END,
        },
        {
          startFrom: BigInt(2),
          maxRetryCount: 12,
          consumerStrategyName: ROUND_ROBIN,
        },
        {},
      ]
    );

    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    await delay(1000);

    const list = await client.listPersistentSubscriptionsToStream(STREAM_NAME);

    expect(list).toHaveLength(created.length);

    for (const [streamName, groupName, settings] of created) {
      const ps = list.find((ps) => ps.groupName === groupName)!;
      expect(ps).toBeDefined();
      expect(ps.eventSource).toBe(streamName);
      expect(ps.groupName).toBe(groupName);
      expect(ps.settings).toEqual(settings);
    }
  });

  test("should list info on a persistent subscription connection", async () => {
    const STREAM_NAME = "test_stream_name_connection";

    const created = await createManyPs(client)(
      () => STREAM_NAME,
      (i) => `test_group_name_connection_${i}`,
      [
        {
          startFrom: START,
          extraStatistics: true,
        },
        {
          startFrom: END,
        },
        {
          startFrom: BigInt(2),
          maxRetryCount: 12,
        },
        {},
      ]
    );

    const groupNameOfInterest = created[0][1];

    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    const subscription = client
      .subscribeToPersistentSubscriptionToStream(
        STREAM_NAME,
        groupNameOfInterest
      )
      .on("error", jest.fn())
      .on("data", async (e) => {
        await subscription.ack(e);
      });

    // let some events run through the subscription
    await delay(1000);

    const list = await client.listPersistentSubscriptionsToStream(STREAM_NAME);

    expect(list).toHaveLength(created.length);

    for (const [streamName, groupName, settings] of created) {
      const ps = list.find((ps) => ps.groupName === groupName)!;
      expect(ps).toBeDefined();
      expect(ps.eventSource).toBe(streamName);
      expect(ps.groupName).toBe(groupName);
      expect(ps.settings).toEqual(settings);

      if (groupName === groupNameOfInterest) {
        // We are the only connection
        expect(ps.connections).toHaveLength(1);

        const [connection] = ps.connections;

        // We set our default user above
        expect(connection.username).toBe("admin");

        // we enabled extraStatistics.
        expect(connection.extraStatistics).toBeDefined();
        expect(connection.extraStatistics!.get("quintile 3")).toBeDefined();
      }
    }

    await subscription.unsubscribe();
  });

  describe("errors", () => {
    test("PersistentSubscriptionDoesNotExist", async () => {
      const STREAM_NAME = "does_not_exist_list_stream_name";

      try {
        await client.listPersistentSubscriptionsToStream(STREAM_NAME);
        throw "unreachable";
      } catch (error) {
        expect(error).toBeInstanceOf(PersistentSubscriptionDoesNotExistError);
        expect(error).toMatchInlineSnapshot(
          `[Error: 5 NOT_FOUND: Subscription group  on stream does_not_exist_list_stream_name does not exist.]`
        );

        if (error instanceof PersistentSubscriptionDoesNotExistError) {
          expect(error.streamName).toBe(STREAM_NAME);
        }
      }
    });

    test("AccessDenied", async () => {
      const STREAM_NAME = "access_denied_list_stream_name";

      try {
        await client.listPersistentSubscriptionsToStream(STREAM_NAME, {
          credentials: { username: "AzureDiamond", password: "hunter2" },
        });
        throw "unreachable";
      } catch (error) {
        expect(error).toBeInstanceOf(AccessDeniedError);
      }
    });
  });
});
