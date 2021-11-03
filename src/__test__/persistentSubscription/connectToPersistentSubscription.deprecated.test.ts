import { pipeline, Writable, Readable, Transform } from "stream";
import { promisify } from "util";

import { v4 as uuid } from "uuid";

import {
  createTestCluster,
  Defer,
  delay,
  jsonTestEvents,
  postEventViaHttpApi,
} from "@test-utils";

import {
  ResolvedEvent,
  NotLeaderError,
  PersistentSubscription,
  EventStoreDBClient,
  jsonEvent,
  persistentSubscriptionSettingsFromDefaults,
  START,
} from "@eventstore/db-client";

const asyncPipeline = promisify(pipeline);

describe("connectToPersistentSubscription [deprecated ack / nack]", () => {
  const cluster = createTestCluster();
  let client!: EventStoreDBClient;

  const finishEvent = () =>
    jsonEvent({
      type: "finish-test",
      data: {
        message: "lets wrap this up",
      },
    });

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

  describe("should connect to a persistant subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "from_start_test_stream_name";
      const GROUP_NAME = "from_start_test_group_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(20));
      await client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults({
          startFrom: START,
        })
      );

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(async (event: ResolvedEvent) => {
        if (event.event) {
          await subscription.ack(event.event.id);
        }

        if (event.event?.type === "finish-test") {
          defer.resolve();
        }
      });

      const subscription = client
        .connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 20 pre-write + 4 after
      expect(onEvent).toBeCalledTimes(24);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";
      const GROUP_NAME = "from_revision_test_group_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));
      await client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults({
          startFrom: BigInt(1),
        })
      );

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(async (event: ResolvedEvent) => {
        if (event.event) {
          await subscription.ack(event.event.id);
        }

        if (event.event?.type === "finish-test") {
          defer.resolve();
        }
      });

      const subscription = client
        .connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 4 pre-write + 4 after - 1 (start from revision)
      expect(onEvent).toBeCalledTimes(7);
    });

    test("from end", async () => {
      const STREAM_NAME = "from_end_test_stream_name";
      const GROUP_NAME = "from_end_test_group_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));
      await client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults() // end is default
      );

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(async (event: ResolvedEvent) => {
        if (event.event) {
          await subscription.ack(event.event.id);
        }

        if (event.event?.type === "finish-test") {
          defer.resolve();
        }
      });

      const subscription = client
        .connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 4 pre-write + 4 after - 4 (start from end)
      expect(onEvent).toBeCalledTimes(4);
    });

    test("nack", async () => {
      const STREAM_NAME = "nack_test_stream_name";
      const GROUP_NAME = "nack_test_group_name";

      // Skip the first twenty events and retry the next 20 events.
      // we should see the number of times that the `onEvent` callback
      // is called reflects this (if nack is working)

      const skipCount = 20;
      const retryCount = 20;

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(skipCount, "skip-event"),
        ...jsonTestEvents(retryCount, "retry-event"),
        finishEvent(),
      ]);

      await client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults({ startFrom: START })
      );

      const defer = new Defer();

      const nacked: string[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(async (event: ResolvedEvent) => {
        if (!event.event) return;

        if (event.event.type === "finish-test") {
          await subscription.ack(event.event.id);
          defer.resolve();
          return;
        }

        if (!nacked.includes(event.event.id)) {
          nacked.push(event.event.id);
          await subscription.nack(
            event.event.type === "skip-event" ? "skip" : "retry",
            "To test it",
            event.event.id
          );
          return;
        }

        await subscription.ack(event.event.id);
        return;
      });

      const subscription = client
        .connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      expect(onEvent).toBeCalledTimes(
        // skipped
        skipCount +
          // retried
          retryCount * 2 +
          // finish test event
          1
      );
    });
  });

  describe("should return a readable stream", () => {
    describe("async iterator", () => {
      test("ack", async () => {
        const STREAM_NAME = "async_iter_ack";
        const GROUP_NAME = "async_iter_ack_group_name";
        const doSomething = jest.fn();

        await client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults({ startFrom: START })
        );

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(99),
          finishEvent(),
        ]);

        const subscription = client.connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        );

        for await (const { event } of subscription) {
          if (!event) continue;

          doSomething(event);
          await subscription.ack(event.id);

          if (event?.type === "finish-test") {
            break;
          }
        }

        expect(doSomething).toBeCalledTimes(100);
      });

      test("nack", async () => {
        const STREAM_NAME = "async_iter_nack";
        const GROUP_NAME = "async_iter_nack_group_name";
        const doSomething = jest.fn();
        const nacked: string[] = [];

        // Skip the first twenty events and retry the next 20 events.
        // we should see the number of times that the `onEvent` callback
        // is called reflects this (if nack is working)

        const skipCount = 20;
        const retryCount = 20;

        await client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults()
        );

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(skipCount, "skip-event"),
          ...jsonTestEvents(retryCount, "retry-event"),
          finishEvent(),
        ]);

        const subscription = client.connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        );

        for await (const { event } of subscription) {
          if (!event) continue;

          doSomething(event);

          if (event.type === "finish-test") {
            await subscription.ack(event.id);
            break;
          }

          if (!nacked.includes(event.id)) {
            nacked.push(event.id);
            await subscription.nack(
              event.type === "skip-event" ? "skip" : "retry",
              "To test it",
              event.id
            );
            continue;
          }

          await subscription.ack(event.id);
        }

        expect(doSomething).toBeCalledTimes(
          // skipped
          skipCount +
            // retried
            retryCount * 2 +
            // finish test event
            1
        );
      });

      test("ack with async function", async () => {
        const STREAM_NAME = "async_iter_ack_fun";
        const GROUP_NAME = "async_iter_ack_fun_group_name";
        const doSomething = jest.fn();

        await client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults({ startFrom: START })
        );

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(99),
          finishEvent(),
        ]);

        const subscription = client.connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        );

        for await (const { event } of subscription) {
          if (!event) continue;

          if (event?.type === "test") {
            // example of awaiting an async function when iterating over the async iterator
            await delay(10);
          }

          doSomething(event);

          await subscription.ack(event.id);

          if (event?.type === "finish-test") {
            break;
          }
        }

        expect(doSomething).toBeCalledTimes(100);
      });
    });

    test("after the fact event listeners", async () => {
      const STREAM_NAME = "after_the_fact";
      const GROUP_NAME = "after_the_fact_group_name";

      const defer = new Defer();

      await client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults({ startFrom: START })
      );

      const subscription = client.connectToPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME
      );

      const eventListenerOne = jest.fn();
      const eventListenerTwo = jest.fn();
      const endListener = jest.fn(() => {
        defer.resolve();
      });

      subscription
        .on("data", eventListenerOne)
        .on("data", async ({ event }) => {
          if (!event) return;

          eventListenerTwo(event);
          await subscription.ack(event.id);

          if (event.type === "finish-test") {
            subscription.unsubscribe();
          }
        })
        .on("error", (err) => console.log("aag", err))
        .on("end", endListener);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(5),
        finishEvent(),
      ]);

      await defer.promise;

      expect(eventListenerOne).toBeCalledTimes(6);
      expect(eventListenerTwo).toBeCalledTimes(6);
    });

    test("pipeline", async () => {
      const STREAM_NAME = "pipeline_test";
      const GROUP_NAME = "pipeline_test_group_name";
      const FINISH_TEST = "finish_pipeline";

      await client.createPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionSettingsFromDefaults({ startFrom: START })
      );

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        jsonEvent({
          type: FINISH_TEST,
          data: {
            message: "lets wrap this up",
          },
        }),
      ]);

      const subscription = client.connectToPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME
      );

      const acker = new (class extends Transform {
        _transform(
          resolvedEvent: ResolvedEvent,
          _encoding: string,
          done: (error: null, e: ResolvedEvent) => void
        ) {
          subscription
            .ack(resolvedEvent.event!.id)
            .then(() => done(null, resolvedEvent));
        }
      })({ objectMode: true });

      const writeStream = new (class extends Writable {
        public ids: string[] = [];
        _write({ event }: ResolvedEvent, _encoding: string, done: () => void) {
          this.ids.push(event!.id);
          if (event?.type === FINISH_TEST) {
            subscription.unsubscribe().then(done);
          } else {
            done();
          }
        }
      })({ objectMode: true });

      await asyncPipeline(subscription as Readable, acker, writeStream);

      expect(writeStream.ids).toHaveLength(9);
    });
  });

  test("malformed events", async () => {
    const STREAM_NAME = "malformed_json";
    const GROUP_NAME = "malformed_json_group_name";
    const doSomething = jest.fn();

    await client.createPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({ startFrom: START })
    );

    await client.appendToStream(STREAM_NAME, jsonTestEvents(3, "test 1"));

    const malformedData = "****";

    await postEventViaHttpApi(cluster, {
      contentType: "application/json",
      type: "malformed-event",
      stream: STREAM_NAME,
      data: malformedData,
    });

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(3, "test 2"),
      finishEvent(),
    ]);

    const subscription = client.connectToPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME
    );

    for await (const { event } of subscription) {
      if (!event) continue;

      doSomething(event);
      await subscription.ack(event.id);

      if (event.type === "malformed-event") {
        expect(event.data).toBe(malformedData);
      }

      if (event.type === "finish-test") {
        break;
      }
    }

    expect(doSomething).toBeCalledTimes(8);
  });

  test("should throw on follower node", async () => {
    // Create connection to a follower node
    const followerClient = new EventStoreDBClient(
      {
        endpoints: cluster.endpoints,
        nodePreference: "follower",
      },
      { rootCertificate: cluster.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    const STREAM_NAME = "follower_node_test";
    const GROUP_NAME = "follower_node_test";
    const doSomething = jest.fn();
    const confirmThatErrorWasThrown = jest.fn();

    const createAndConnectWithAutoReconnect = async (
      client: EventStoreDBClient
    ): Promise<PersistentSubscription> => {
      try {
        await client.createPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionSettingsFromDefaults({ startFrom: START })
        );

        return client.connectToPersistentSubscription(STREAM_NAME, GROUP_NAME);
      } catch (error) {
        confirmThatErrorWasThrown(error);

        // Our command is good, but must be executed on the leader
        if (error instanceof NotLeaderError) {
          // Create new client connected to the reported leader node
          const leaderClient = new EventStoreDBClient(
            {
              endpoint: error.leader,
            },
            { rootCertificate: cluster.rootCertificate },
            { username: "admin", password: "changeit" }
          );

          // try again with new connection
          return createAndConnectWithAutoReconnect(leaderClient);
        }

        // other errors can be passed up the chain
        throw error;
      }
    };

    await followerClient.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(99),
      finishEvent(),
    ]);

    const subscription = await createAndConnectWithAutoReconnect(
      followerClient
    );

    for await (const { event } of subscription) {
      if (!event) continue;

      doSomething(event);
      await subscription.ack(event.id);

      if (event?.type === "finish-test") {
        break;
      }
    }

    expect(doSomething).toBeCalledTimes(100);

    expect(confirmThatErrorWasThrown).toBeCalledTimes(1);
    expect(confirmThatErrorWasThrown.mock.calls[0][0]).toBeInstanceOf(
      NotLeaderError
    );
  });

  test("on system stream", async () => {
    await client.enableProjection("$by_event_type");

    const FINISH_ID = uuid();
    const EVENT_TYPE = "SourceCreatedEvent";
    const SYSTEM_STREAM_NAME = `$et-${EVENT_TYPE}`;
    const GROUP_NAME = "system_stream";

    const STREAM_NAME = "system_stream";
    const doSomething = jest.fn();

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(99, EVENT_TYPE),
      jsonEvent({
        type: EVENT_TYPE,
        id: FINISH_ID,
        data: {
          message: "test",
          index: 100,
        },
      }),
    ]);

    await client.createPersistentSubscription(
      SYSTEM_STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionSettingsFromDefaults({
        resolveLinkTos: true,
        startFrom: START,
      })
    );

    const subscription = client.connectToPersistentSubscription(
      SYSTEM_STREAM_NAME,
      GROUP_NAME
    );

    const acked = new Set<string>();

    for await (const event of subscription) {
      if (!event.event) continue;

      doSomething(event);

      expect(acked).not.toContain(event.event.id);

      acked.add(event.event.id);

      // We must ack the id of event in the stream we are subscribed to,
      // in this case, the link event.
      await subscription.ack(event.link!.id);

      if (event.event.id === FINISH_ID) {
        await subscription.unsubscribe();
      }
    }

    expect(doSomething).toBeCalledTimes(100);
  });
});
