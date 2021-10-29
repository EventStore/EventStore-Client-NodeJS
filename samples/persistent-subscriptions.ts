/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  AllStreamResolvedEvent,
  EventStoreDBClient,
  jsonEvent,
  JSONEventType,
  PARK,
  persistentSubscriptionSettingsFromDefaults,
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
    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults(),
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

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({ startFrom: START }),
      { credentials: { username: "admin", password: "changeit" } }
    );

    // region subscribe-to-persistent-subscription-to-stream
    const subscription = client.connectToPersistentSubscription<SomeEvent>(
      STREAM_NAME,
      GROUP_NAME
    );

    try {
      for await (const event of subscription) {
        try {
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
        client.connectToPersistentSubscriptionToAll(GROUP_NAME);

      try {
        for await (const event of subscription) {
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

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({
        startFrom: START,
      }),
      { credentials: { username: "admin", password: "changeit" } }
    );

    await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: "test", data: {} })
    );

    // region subscribe-to-persistent-subscription-with-manual-acks
    const subscription = client.connectToPersistentSubscription<SomeEvent>(
      STREAM_NAME,
      GROUP_NAME
    );

    try {
      for await (const event of subscription) {
        try {
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

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults()
    );

    // region update-persistent-subscription
    await client.updatePersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({
        resolveLinkTos: true,
        checkPointLowerBound: 20,
      })
    );
    // endregion update-persistent-subscription
  });

  test("delete-persistent-subscription", async () => {
    const STREAM_NAME = "delete-persistent-subscription";
    const GROUP_NAME = "delete-persistent-subscription-group";

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults()
    );

    // region delete-persistent-subscription
    await client.deletePersistentSubscription(STREAM_NAME, GROUP_NAME);
    // endregion delete-persistent-subscription
  });
});
