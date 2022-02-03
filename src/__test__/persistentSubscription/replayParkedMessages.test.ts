import { createTestCluster, delay, jsonTestEvents } from "@test-utils";

import {
  AccessDeniedError,
  EventStoreDBClient,
  jsonEvent,
  PARK,
  PersistentSubscriptionDoesNotExistError,
  persistentSubscriptionSettingsFromDefaults,
  START,
} from "@eventstore/db-client";

describe("replayParkedMessages", () => {
  const cluster = createTestCluster();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await cluster.up();

    client = new EventStoreDBClient(
      { endpoints: cluster.endpoints, nodePreference: "leader" },
      { rootCertificate: cluster.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should replay all parked messages by default", async () => {
    const STREAM_NAME = "replay_to_end_parked_stream_name";
    const GROUP_NAME = "replay_to_end_parked_group_name";
    const FINISH = "finish-test";

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({
        startFrom: START,
      })
    );

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(19),
      jsonEvent({
        type: FINISH,
        data: {},
      }),
    ]);

    const subscription = client.subscribeToPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME
    );

    const parkEvent = jest.fn((resolvedEvent) =>
      subscription.nack(PARK, "Park it", resolvedEvent)
    );
    const ackEvent = jest.fn((resolvedEvent) =>
      subscription.ack(resolvedEvent)
    );

    let hasReplayed = false;
    for await (const resolvedEvent of subscription) {
      if (!hasReplayed) {
        await parkEvent(resolvedEvent);

        if (resolvedEvent.event?.type === FINISH) {
          await delay(5000); // wait for all nacks to be processed
          await client.replayParkedMessages(STREAM_NAME, GROUP_NAME);
          hasReplayed = true;
        }

        continue;
      }

      await ackEvent(resolvedEvent);
      if (resolvedEvent.event?.type === FINISH) break;
    }

    expect(parkEvent).toHaveBeenCalledTimes(20);
    expect(ackEvent).toHaveBeenCalledTimes(20);
  });

  test("should stop at requested stopAt", async () => {
    const STREAM_NAME = "replay_to_stop_parked_stream_name";
    const GROUP_NAME = "replay_to_stop_parked_group_name";
    const FINISH = "finish-test";
    const STOP_AT = 4;

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({
        startFrom: START,
      })
    );

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(19),
      jsonEvent({
        type: FINISH,
        data: {},
      }),
    ]);

    const subscription = client.subscribeToPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME
    );

    const parkEvent = jest.fn((resolvedEvent) =>
      subscription.nack(PARK, "Park it", resolvedEvent)
    );
    const ackEvent = jest.fn((resolvedEvent) =>
      subscription.ack(resolvedEvent)
    );

    let hasReplayed = false;
    let count = 0;
    for await (const resolvedEvent of subscription) {
      if (!hasReplayed) {
        await parkEvent(resolvedEvent);

        if (resolvedEvent.event?.type === FINISH) {
          await delay(5000); // wait for all nacks to be processed
          await client.replayParkedMessages(STREAM_NAME, GROUP_NAME, {
            stopAt: STOP_AT,
          });
          hasReplayed = true;
        }

        continue;
      }

      await ackEvent(resolvedEvent);
      count++;

      if (count === STOP_AT) {
        // wait 5 seconds, then unsubscribe.
        // the subscription will continue to recieve events in the meantime.
        delay(5000).then(() => subscription.unsubscribe());
      }

      if (resolvedEvent.event?.type === FINISH) {
        // we should never get this far.
        break;
      }
    }

    expect(parkEvent).toHaveBeenCalledTimes(20);
    expect(ackEvent).toHaveBeenCalledTimes(STOP_AT);
  });

  test("uri encoding", async () => {
    const STREAM_NAME =
      "어학연구소/0️⃣/ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็";
    const GROUP_NAME = "ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ";
    const FINISH = "finish-test";
    const STOP_AT = 4;

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({
        startFrom: START,
      })
    );

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(19),
      jsonEvent({
        type: FINISH,
        data: {},
      }),
    ]);

    const subscription = client.subscribeToPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME
    );

    const parkEvent = jest.fn((resolvedEvent) =>
      subscription.nack(PARK, "Park it", resolvedEvent)
    );
    const ackEvent = jest.fn((resolvedEvent) =>
      subscription.ack(resolvedEvent)
    );

    let hasReplayed = false;
    let count = 0;
    for await (const resolvedEvent of subscription) {
      if (!hasReplayed) {
        await parkEvent(resolvedEvent);

        if (resolvedEvent.event?.type === FINISH) {
          await delay(5000); // wait for all nacks to be processed
          await client.replayParkedMessages(STREAM_NAME, GROUP_NAME, {
            stopAt: STOP_AT,
          });
          hasReplayed = true;
        }

        continue;
      }

      await ackEvent(resolvedEvent);
      count++;

      if (count === STOP_AT) {
        // wait 5 seconds, then unsubscribe.
        // the subscription will continue to recieve events in the meantime.
        delay(5000).then(() => subscription.unsubscribe());
      }

      if (resolvedEvent.event?.type === FINISH) {
        // we should never get this far.
        break;
      }
    }

    expect(parkEvent).toHaveBeenCalledTimes(20);
    expect(ackEvent).toHaveBeenCalledTimes(STOP_AT);
  });

  describe("errors", () => {
    test("PersistentSubscriptionDoesNotExist", async () => {
      const STREAM_NAME = "does_not_exist_replay_parked_stream_name";
      const GROUP_NAME = "does_not_exist_replay_parked_group_name";

      try {
        await client.replayParkedMessages(STREAM_NAME, GROUP_NAME);
      } catch (error) {
        expect(error).toBeInstanceOf(PersistentSubscriptionDoesNotExistError);
        expect(error).toMatchInlineSnapshot(
          `[Error: 5 NOT_FOUND: Subscription group does_not_exist_replay_parked_group_name on stream does_not_exist_replay_parked_stream_name does not exist.]`
        );

        if (error instanceof PersistentSubscriptionDoesNotExistError) {
          expect(error.streamName).toBe(STREAM_NAME);
          expect(error.groupName).toBe(GROUP_NAME);
        }
      }
    });

    test("AccessDenied", async () => {
      const STREAM_NAME = "access_denied_replay_parked_stream_name";
      const GROUP_NAME = "access_denied_replay_parked_group_name";

      try {
        await client.replayParkedMessages(STREAM_NAME, GROUP_NAME, {
          credentials: { username: "AzureDiamond", password: "hunter2" },
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AccessDeniedError);
      }
    });
  });
});
