/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  CreatedPS,
  CreatedPSToAll,
  createManyPs,
  createManyPsToAll,
  createTestNode,
  delay,
  jsonTestEvents,
  matchServerVersion,
} from "@test-utils";

import {
  END,
  EventStoreDBClient,
  PersistentSubscriptionToAll,
  PINNED,
  Position,
  ROUND_ROBIN,
  START,
} from "@eventstore/db-client";

describe("listAllPersistentSubscriptions", () => {
  const psToAllSupported = matchServerVersion`>=21.10`;

  const node = createTestNode();
  let client!: EventStoreDBClient;
  const created: Array<CreatedPSToAll | CreatedPS> = [];
  let psOfInterestToAll: CreatedPSToAll;
  let psOfInterestToStream: CreatedPS;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      {
        endpoint: node.uri,
      },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    if (psToAllSupported) {
      let position!: Position;
      for await (const { event } of client.readAll({ maxCount: 60 })) {
        if (!event) continue;
        position = event.position;
      }

      const createdAll = await createManyPsToAll(client)(
        (i) => `test_group_name_to_all_${i}`,
        [
          {
            startFrom: START,
            extraStatistics: true,
          },
          {
            startFrom: END,
          },
          {
            startFrom: position,
            maxRetryCount: 12,
            consumerStrategyName: PINNED,
          },
          {},
        ]
      );

      created.push(...createdAll);
      psOfInterestToAll = createdAll[0];
    }

    const createdSteam = await createManyPs(client)(
      (i) => `test_stream_name_${i}`,
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
    created.push(...createdSteam);
    psOfInterestToStream = createdSteam[0];
  });

  afterAll(async () => {
    await node.down();
  });

  test("should list all persistant subscriptions", async () => {
    const list = await client.listAllPersistentSubscriptions();

    expect(list).toHaveLength(created.length);

    for (const [streamName, groupName, settings] of created) {
      const ps = list.find((ps) => ps.groupName === groupName)!;
      expect(ps).toBeDefined();
      expect(ps.eventSource).toBe(streamName);
      expect(ps.groupName).toBe(groupName);
      expect(ps.settings).toEqual(settings);
    }
  });

  test("should list info on a persistant subscription connection", async () => {
    const [streamNameOfInterest, groupNameOfInterest] = psOfInterestToStream;
    const groupNameOfInterestToAll = psOfInterestToAll?.[1];

    let subscriptionToAll: PersistentSubscriptionToAll | undefined;
    if (psToAllSupported) {
      subscriptionToAll = client
        .subscribeToPersistentSubscriptionToAll(groupNameOfInterestToAll)
        .on("data", async (e) => {
          await subscriptionToAll!.ack(e);
        });
    }

    await client.appendToStream(streamNameOfInterest, jsonTestEvents());

    const subscriptionToStream = client
      .subscribeToPersistentSubscription(
        streamNameOfInterest,
        groupNameOfInterest
      )
      .on("data", async (e) => {
        await subscriptionToStream.ack(e);
      });

    // let some events run through the subscriptions
    await delay(1000);

    const list = await client.listAllPersistentSubscriptions();

    expect(list).toHaveLength(created.length);

    for (const [streamName, groupName, settings] of created) {
      const ps = list.find((ps) => ps.groupName === groupName)!;
      expect(ps).toBeDefined();
      expect(ps.eventSource).toBe(streamName);
      expect(ps.groupName).toBe(groupName);
      expect(ps.settings).toEqual(settings);

      if (
        groupName === groupNameOfInterest ||
        (groupNameOfInterestToAll && groupName === groupNameOfInterestToAll)
      ) {
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

    await subscriptionToAll?.unsubscribe();
    await subscriptionToStream.unsubscribe();
  });
});