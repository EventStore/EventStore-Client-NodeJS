/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  AllStreamResolvedEvent,
  EventStoreDBClient,
  jsonEvent,
  JSONEventType,
  PARK,
  persistentSubscriptionToStreamSettingsFromDefaults,
  persistentSubscriptionToAllSettingsFromDefaults,
  ResolvedEvent,
  START,
  streamNameFilter,
} from "@eventstore/db-client";
import {
  createTestNode,
  jsonTestEvents,
  matchServerVersion,
  optionalTest,
} from "@test-utils";

type SomeEvent = JSONEventType<"test", Record<string, unknown>>;

describe("[sample] persistent-subscriptions", () => {
  const supports$all = matchServerVersion`>=21.10`;
  const node = createTestNode();
  const log = console.log;

  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    await client.appendToStream("some-stream", jsonTestEvents());
    console.log = jest.fn(log);
  });

  afterAll(async () => {
    console.log = log;
    await node.down();
  });

  afterEach(() => {
    (console.log as jest.Mock).mockReset();
  });

  test("create-persistent-subscription-to-stream", async () => {
    const STREAM_NAME = "create-persistent-subscription-to-stream";
    const GROUP_NAME = "create-persistent-subscription-to-stream-group";

    // region create-persistent-subscription-to-stream
    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults(),
      { credentials: { username: "admin", password: "changeit" } }
    );
    // endregion create-persistent-subscription-to-stream
  });

  test("subscribe-to-persistent-subscription-to-stream", async () => {
    const STREAM_NAME = "subscribe-to-persistent-subscription-to-stream";
    const GROUP_NAME = "subscribe-to-persistent-subscription-to-stream-group";
    const handleEvent = async (event: ResolvedEvent<SomeEvent>) => {
      expect(event).toBeDefined();
      await subscription.unsubscribe();
    };

    await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: "test", data: {} })
    );

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({ startFrom: START }),
      { credentials: { username: "admin", password: "changeit" } }
    );

    // region subscribe-to-persistent-subscription-to-stream
    const subscription =
      client.subscribeToPersistentSubscriptionToStream<SomeEvent>(
        STREAM_NAME,
        GROUP_NAME
      );

    try {
      for await (const event of subscription) {
        try {
          console.log(
            `handling event ${event.event?.type} with retryCount ${event.retryCount}`
          );
          await handleEvent(event);
          await subscription.ack(event);
        } catch (error) {
          await subscription.nack(PARK, error.toString(), event);
        }
      }
    } catch (error) {
      console.log(`Subscription was dropped. ${error}`);
    }
    // endregion subscribe-to-persistent-subscription-to-stream
  });

  optionalTest(supports$all)(
    "create-persistent-subscription-to-all",
    async () => {
      const GROUP_NAME = "create-persistent-subscription-to-all-group";

      // region create-persistent-subscription-to-all
      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults(),
        {
          filter: streamNameFilter({ prefixes: ["test"] }),
          credentials: { username: "admin", password: "changeit" },
        }
      );
      // endregion create-persistent-subscription-to-all
    }
  );

  optionalTest(supports$all)(
    "subscribe-to-persistent-subscription-to-all",
    async () => {
      const STREAM_NAME = "subscribe-to-persistent-subscription-to-all";
      const GROUP_NAME = "subscribe-to-persistent-subscription-to-all-group";
      const handleEvent = async (event: AllStreamResolvedEvent) => {
        expect(event).toBeDefined();
        await subscription.unsubscribe();
      };

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults(),
        {
          filter: streamNameFilter({ prefixes: [STREAM_NAME] }),
        }
      );

      await client.appendToStream(
        STREAM_NAME,
        jsonEvent({ type: "test", data: {} })
      );

      // region subscribe-to-persistent-subscription-to-all
      const subscription =
        client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

      try {
        for await (const event of subscription) {
          console.log(
            `handling event ${event.event?.type} with retryCount ${event.retryCount}`
          );
          await handleEvent(event);
          await subscription.ack(event);
        }
      } catch (error) {
        console.log(`Subscription was dropped. ${error}`);
      }

      // endregion subscribe-to-persistent-subscription-to-all
    }
  );

  test("subscribe-to-persistent-subscription-with-manual-acks", async () => {
    const STREAM_NAME = "subscribe-to-persistent-subscription-with-manual-acks";
    const GROUP_NAME =
      "subscribe-to-persistent-subscription-with-manual-acks-group";
    const handleEvent = async (event: ResolvedEvent<SomeEvent>) => {
      expect(event).toBeDefined();
      await subscription.unsubscribe();
    };

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({
        startFrom: START,
      }),
      { credentials: { username: "admin", password: "changeit" } }
    );

    await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: "test", data: {} })
    );

    // region subscribe-to-persistent-subscription-with-manual-acks
    const subscription =
      client.subscribeToPersistentSubscriptionToStream<SomeEvent>(
        STREAM_NAME,
        GROUP_NAME
      );

    try {
      for await (const event of subscription) {
        try {
          console.log(
            `handling event ${event.event?.type} with retryCount ${event.retryCount}`
          );
          await handleEvent(event);
          await subscription.ack(event);
        } catch (error) {
          await subscription.nack(PARK, error.toString(), event);
        }
      }
    } catch (error) {
      console.log(`Subscription was dropped. ${error}`);
    }
    // endregion subscribe-to-persistent-subscription-with-manual-acks
  });

  test("update-persistent-subscription", async () => {
    const STREAM_NAME = "update-persistent-subscription";
    const GROUP_NAME = "update-persistent-subscription-group";

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults()
    );

    // region update-persistent-subscription
    await client.updatePersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({
        resolveLinkTos: true,
        checkPointLowerBound: 20,
      })
    );
    // endregion update-persistent-subscription
  });

  test("delete-persistent-subscription", async () => {
    const STREAM_NAME = "delete-persistent-subscription";
    const GROUP_NAME = "delete-persistent-subscription-group";

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults()
    );

    // region delete-persistent-subscription
    await client.deletePersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME);
    // endregion delete-persistent-subscription
  });

  test("get-persistent-subscription-to-stream-info", async () => {
    const STREAM_NAME = "get-persistent-subscription-to-stream-info";
    const GROUP_NAME = "get-persistent-subscription-to-stream-info-group";

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults()
    );

    // region get-persistent-subscription-to-stream-info
    const info = await client.getPersistentSubscriptionToStreamInfo(
      STREAM_NAME,
      GROUP_NAME
    );

    console.log(
      `Persistent subscription ${info.groupName} to stream ${info.eventSource} has status ${info.status}.`
    );
    // endregion get-persistent-subscription-to-stream-info

    expect(console.log).toBeCalledWith(
      `Persistent subscription ${GROUP_NAME} to stream ${STREAM_NAME} has status ${info.status}.`
    );
  });

  optionalTest(supports$all)(
    "get-persistent-subscription-to-all-info",
    async () => {
      const GROUP_NAME = "get-persistent-subscription-to-all-info-group";
      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults()
      );

      // region get-persistent-subscription-to-all-info
      const info = await client.getPersistentSubscriptionToAllInfo(GROUP_NAME);

      console.log(
        `Persistent subscription ${info.groupName} to $all has status ${info.status}.`
      );
      // endregion get-persistent-subscription-to-all-info

      expect(console.log).toBeCalledWith(
        `Persistent subscription ${GROUP_NAME} to $all has status ${info.status}.`
      );
    }
  );

  test("replay-parked-of-persistent-subscription-to-stream", async () => {
    const STREAM_NAME = "replay-parked-of-persistent-subscription-to-stream";
    const GROUP_NAME =
      "replay-parked-of-persistent-subscription-to-stream-group";
    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults()
    );

    // region replay-parked-of-persistent-subscription-to-stream
    await client.replayParkedMessagesToStream(STREAM_NAME, GROUP_NAME, {
      stopAt: 10,
    });
    // endregion replay-parked-of-persistent-subscription-to-stream
  });

  optionalTest(supports$all)(
    "replay-parked-of-persistent-subscription-to-all",
    async () => {
      const GROUP_NAME =
        "replay-parked-of-persistent-subscription-to-all-group";
      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults()
      );
      // region replay-parked-of-persistent-subscription-to-all
      await client.replayParkedMessagesToAll(GROUP_NAME, { stopAt: 10 });
      // endregion replay-parked-of-persistent-subscription-to-all
    }
  );

  test("list-persistent-subscriptions-to-stream", async () => {
    const STREAM_NAME = "list-persistent-subscriptions-to-stream";
    const GROUP_NAME = "list-persistent-subscriptions-to-stream-group";
    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults()
    );
    // region list-persistent-subscriptions-to-stream
    const subscriptions = await client.listPersistentSubscriptionsToStream(
      STREAM_NAME
    );

    for (const { groupName, eventSource, status } of subscriptions) {
      console.log(
        `Persistent subscription ${groupName} to stream ${eventSource} has status ${status}.`
      );
    }
    // endregion list-persistent-subscriptions-to-stream

    expect(console.log).toBeCalledTimes(1);
  });

  optionalTest(supports$all)(
    "list-persistent-subscriptions-to-all",
    async () => {
      const GROUP_NAME = "list-persistent-subscriptions-to-all-group";
      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults()
      );
      // region list-persistent-subscriptions-to-all
      const subscriptions = await client.listPersistentSubscriptionsToAll();

      for (const { groupName, status } of subscriptions) {
        console.log(
          `Persistent subscription ${groupName} to $all has status ${status}.`
        );
      }
      // endregion list-persistent-subscriptions-to-all

      expect(console.log).toBeCalled();
    }
  );

  test("list-persistent-subscriptions", async () => {
    // region list-persistent-subscriptions
    const subscriptions = await client.listAllPersistentSubscriptions();

    for (const { groupName, eventSource, status } of subscriptions) {
      console.log(
        `Persistent subscription ${groupName} to ${eventSource} has status ${status}.`
      );
    }
    // endregion list-persistent-subscriptions
  });

  test("restart-persistent-subscription-subsystem", async () => {
    // region restart-persistent-subscription-subsystem
    await client.restartPersistentSubscriptionSubsystem();
    // endregion restart-persistent-subscription-subsystem
  });
});
