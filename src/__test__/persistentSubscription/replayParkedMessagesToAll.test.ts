/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestCluster,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";

import {
  AccessDeniedError,
  EventStoreDBClient,
  jsonEvent,
  PARK,
  PersistentSubscriptionDoesNotExistError,
  persistentSubscriptionToAllSettingsFromDefaults,
  START,
  streamNameFilter,
  UnsupportedError,
} from "@eventstore/db-client";

describe("replayParkedMessagesToAll", () => {
  const supported = matchServerVersion`>=21.10`;
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

  optionalDescribe(!supported)("Not Supported (<21.10)", () => {
    test("Throws an unavailable error", async () => {
      const GROUP_NAME = "oh_no";

      try {
        await client.replayParkedMessagesToAll(GROUP_NAME);
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: replayParkedMessagesToAll requires server version 21.10 or higher.]`
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("should replay all parked messages by default", async () => {
      const GROUP_NAME = "replay_to_end_parked_group_name";
      const PREFIX = "replay_parked_to_all_";
      const FINISH = "finish-test";

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: START,
        }),
        {
          filter: streamNameFilter({ prefixes: [PREFIX] }),
        }
      );

      await client.appendToStream(`${PREFIX}something`, [
        ...jsonTestEvents(19),
        jsonEvent({
          type: FINISH,
          data: {},
        }),
      ]);

      const subscription =
        client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

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
            await client.replayParkedMessagesToAll(GROUP_NAME);
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
      const GROUP_NAME = "replay_to_stop_parked_group_name";
      const PREFIX = "replay_to_stop_parked_to_all_";
      const FINISH = "finish-test";
      const STOP_AT = 4;

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: START,
        }),
        {
          filter: streamNameFilter({ prefixes: [PREFIX] }),
        }
      );

      await client.appendToStream(`${PREFIX}something`, [
        ...jsonTestEvents(19),
        jsonEvent({
          type: FINISH,
          data: {},
        }),
      ]);

      const subscription =
        client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

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
            await client.replayParkedMessagesToAll(GROUP_NAME, {
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
      const PREFIX =
        "어학연구소/0️⃣/ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็_";
      const GROUP_NAME = "ヽ༼ຈل͜ຈ༽ﾉ / ヽ༼ຈل͜ຈ༽ﾉ";
      const FINISH = "finish-test";
      const STOP_AT = 4;

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: START,
        }),
        {
          filter: streamNameFilter({ prefixes: [PREFIX] }),
        }
      );

      await client.appendToStream(`${PREFIX}something`, [
        ...jsonTestEvents(19),
        jsonEvent({
          type: FINISH,
          data: {},
        }),
      ]);

      const subscription =
        client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

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
            await client.replayParkedMessagesToAll(GROUP_NAME, {
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
        const GROUP_NAME = "does_not_exist_replay_parked_group_name";

        try {
          await client.replayParkedMessagesToAll(GROUP_NAME);
        } catch (error) {
          expect(error).toBeInstanceOf(PersistentSubscriptionDoesNotExistError);
          expect(error).toMatchInlineSnapshot(
            `[Error: 5 NOT_FOUND: Subscription group does_not_exist_replay_parked_group_name on stream $all does not exist.]`
          );

          if (error instanceof PersistentSubscriptionDoesNotExistError) {
            expect(error.groupName).toBe(GROUP_NAME);
          }
        }
      });

      test("AccessDenied", async () => {
        const GROUP_NAME = "access_denied_replay_parked_group_name";

        try {
          await client.replayParkedMessagesToAll(GROUP_NAME, {
            credentials: { username: "AzureDiamond", password: "hunter2" },
          });
        } catch (error) {
          expect(error).toBeInstanceOf(AccessDeniedError);
        }
      });
    });
  });
});
