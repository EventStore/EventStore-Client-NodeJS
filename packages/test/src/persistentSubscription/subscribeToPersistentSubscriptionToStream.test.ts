/** @jest-environment ./src/utils/enableVersionCheck.ts */

import { pipeline, Writable, Readable, Transform } from "stream";
import { promisify } from "util";

import { v4 as uuid } from "uuid";

import {
  createTestCluster,
  Defer,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
  postEventViaHttpApi,
} from "@test-utils";

import {
  ResolvedEvent,
  NotLeaderError,
  PersistentSubscriptionToStream,
  EventStoreDBClient,
  jsonEvent,
  persistentSubscriptionToStreamSettingsFromDefaults,
  START,
} from "@eventstore/db-client";

const asyncPipeline = promisify(pipeline);

describe("subscribeToPersistentSubscriptionToStream", () => {
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
      { rootCertificate: cluster.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await cluster.down();
  });

  describe("should connect to a persistent subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "from_start_test_stream_name";
      const GROUP_NAME = "from_start_test_group_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(20));
      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults({
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
          await subscription.ack(event);
        }

        if (event.event?.type === "finish-test") {
          defer.resolve();
        }
      });

      const subscription = client
        .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
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
      await subscription.unsubscribe();

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 20 pre-write + 4 after
      expect(onEvent).toBeCalledTimes(24);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";
      const GROUP_NAME = "from_revision_test_group_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));
      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults({
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
        await subscription.ack(event);

        if (event.event?.type === "finish-test") {
          defer.resolve();
        }
      });

      const subscription = client
        .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
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
      await subscription.unsubscribe();

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 4 pre-write + 4 after - 1 (start from revision)
      expect(onEvent).toBeCalledTimes(7);
    });

    test("from end", async () => {
      const STREAM_NAME = "from_end_test_stream_name";
      const GROUP_NAME = "from_end_test_group_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));
      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults() // end is default
      );

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(async (event: ResolvedEvent) => {
        await subscription.ack(event);

        if (event.event?.type === "finish-test") {
          defer.resolve();
        }
      });

      const subscription = client
        .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
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
      await subscription.unsubscribe();

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

      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults({
          startFrom: START,
        })
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
          await subscription.ack(event);
          defer.resolve();
          return;
        }

        if (!nacked.includes(event.event.id)) {
          nacked.push(event.event.id);
          await subscription.nack(
            event.event.type === "skip-event" ? "skip" : "retry",
            "To test it",
            event
          );
          return;
        }

        await subscription.ack(event);
        return;
      });

      const subscription = client
        .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      await defer.promise;
      await subscription.unsubscribe();

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

        await client.createPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionToStreamSettingsFromDefaults({
            startFrom: START,
          })
        );

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(99),
          finishEvent(),
        ]);

        const subscription = client.subscribeToPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME
        );

        for await (const resolvedEvent of subscription) {
          doSomething(resolvedEvent);
          await subscription.ack(resolvedEvent);

          if (resolvedEvent.event?.type === "finish-test") {
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

        await client.createPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionToStreamSettingsFromDefaults({
            startFrom: START,
          })
        );

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(skipCount, "skip-event"),
          ...jsonTestEvents(retryCount, "retry-event"),
          finishEvent(),
        ]);

        const subscription = client.subscribeToPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME
        );

        for await (const resolvedEvent of subscription) {
          if (!resolvedEvent.event) continue;

          doSomething(resolvedEvent);

          if (resolvedEvent.event.type === "finish-test") {
            await subscription.ack(resolvedEvent);
            break;
          }

          if (!nacked.includes(resolvedEvent.event.id)) {
            nacked.push(resolvedEvent.event.id);
            await subscription.nack(
              resolvedEvent.event.type === "skip-event" ? "skip" : "retry",
              "To test it",
              resolvedEvent
            );
            continue;
          }

          await subscription.ack(resolvedEvent);
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

        await client.createPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionToStreamSettingsFromDefaults({
            startFrom: START,
          })
        );

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(99),
          finishEvent(),
        ]);

        const subscription = client.subscribeToPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME
        );

        for await (const resolvedEvent of subscription) {
          const { event } = resolvedEvent;
          if (!event) continue;

          if (event.type === "test") {
            // example of awaiting an async function when iterating over the async iterator
            await delay(10);
          }

          doSomething(event);

          await subscription.ack(resolvedEvent);

          if (event.type === "finish-test") {
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

      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults({
          startFrom: START,
        })
      );

      const subscription = client.subscribeToPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME
      );

      const eventListenerOne = jest.fn();
      const eventListenerTwo = jest.fn();
      const onError = jest.fn();
      const endListener = jest.fn(() => {
        defer.resolve();
      });

      subscription
        .on("data", eventListenerOne)
        .on("data", async (resolvedEvent) => {
          eventListenerTwo(resolvedEvent);
          await subscription.ack(resolvedEvent);

          if (resolvedEvent.event?.type === "finish-test") {
            subscription.unsubscribe();
          }
        })
        .on("error", onError)
        .on("end", endListener);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(5),
        finishEvent(),
      ]);

      await defer.promise;
      await subscription.unsubscribe();

      expect(eventListenerOne).toBeCalledTimes(6);
      expect(eventListenerTwo).toBeCalledTimes(6);
    });

    test("pipeline", async () => {
      const STREAM_NAME = "pipeline_test";
      const GROUP_NAME = "pipeline_test_group_name";
      const FINISH_TEST = "finish_pipeline";

      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults({
          startFrom: START,
        })
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

      const subscription = client.subscribeToPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME
      );

      const acker = new (class extends Transform {
        _transform(
          resolvedEvent: ResolvedEvent,
          _encoding: string,
          done: (error: null, e: ResolvedEvent) => void
        ) {
          subscription.ack(resolvedEvent).then(() => done(null, resolvedEvent));
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

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({
        startFrom: START,
      })
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

    const subscription = client.subscribeToPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME
    );

    for await (const resolvedEvent of subscription) {
      doSomething(resolvedEvent);
      await subscription.ack(resolvedEvent);

      if (resolvedEvent.event?.type === "malformed-event") {
        expect(resolvedEvent.event.data).toBe(malformedData);
      }

      if (resolvedEvent.event?.type === "finish-test") {
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
      { rootCertificate: cluster.certs.root },
      { username: "admin", password: "changeit" }
    );

    const STREAM_NAME = "follower_node_test";
    const GROUP_NAME = "follower_node_test";
    const doSomething = jest.fn();
    const confirmThatErrorWasThrown = jest.fn();

    const createAndConnectWithAutoReconnect = async (
      client: EventStoreDBClient
    ): Promise<PersistentSubscriptionToStream> => {
      try {
        await client.createPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME,
          persistentSubscriptionToStreamSettingsFromDefaults({
            startFrom: START,
          })
        );

        return client.subscribeToPersistentSubscriptionToStream(
          STREAM_NAME,
          GROUP_NAME
        );
      } catch (error) {
        confirmThatErrorWasThrown(error);

        // Our command is good, but must be executed on the leader
        if (error instanceof NotLeaderError) {
          // Create new client connected to the reported leader node
          const leaderClient = new EventStoreDBClient(
            {
              endpoint: error.leader,
            },
            { rootCertificate: cluster.certs.root },
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

    for await (const resolvedEvent of subscription) {
      doSomething(resolvedEvent);
      await subscription.ack(resolvedEvent);

      if (resolvedEvent.event?.type === "finish-test") {
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

    await client.createPersistentSubscriptionToStream(
      SYSTEM_STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({
        resolveLinkTos: true,
      })
    );

    const subscription = client.subscribeToPersistentSubscriptionToStream(
      SYSTEM_STREAM_NAME,
      GROUP_NAME
    );

    const acked = new Set<string>();

    for await (const resolvedEvent of subscription) {
      if (!resolvedEvent.event) continue;

      doSomething(resolvedEvent);

      expect(acked).not.toContain(resolvedEvent.event?.id);

      acked.add(resolvedEvent.event.id);

      await subscription.ack(resolvedEvent);

      if (resolvedEvent.event.id === FINISH_ID) {
        await subscription.unsubscribe();
      }
    }

    expect(doSomething).toBeCalledTimes(100);
  });

  test("retryCount", async () => {
    const STREAM_NAME = "retry_count";
    const GROUP_NAME = "retry_count_group_name";

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({
        startFrom: START,
        maxRetryCount: 5,
      })
    );

    await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(99),
      finishEvent(),
    ]);

    const subscription = client.subscribeToPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME
    );

    const nacked: Record<string, number> = {};

    for await (const resolvedEvent of subscription) {
      const id = resolvedEvent.event!.id;

      if (nacked[id] != null) {
        expect(resolvedEvent.retryCount).toBe(nacked[id]);
      } else {
        expect(resolvedEvent.retryCount).toBe(0);
      }

      await subscription.nack("retry", "to test it", resolvedEvent);

      nacked[id] = (nacked[id] ?? 0) + 1;

      if (resolvedEvent.event?.type === "finish-test") {
        break;
      }
    }
  });

  const supported = matchServerVersion`>=22.6.0`;
  optionalDescribe(supported)("Supported (>=22.6.0)", () => {
    test("populates log position", async () => {
      const STREAM_NAME = "log_position";
      const GROUP_NAME = "log_position_group_name";

      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults({
          startFrom: START,
        })
      );

      const appendResult = await client.appendToStream(
        STREAM_NAME,
        finishEvent()
      );

      const subscription = client.subscribeToPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME
      );

      for await (const resolvedEvent of subscription) {
        await subscription.ack(resolvedEvent);

        expect(resolvedEvent.event?.position).toBeDefined();
        expect(resolvedEvent.event?.position?.commit).toBeDefined();
        expect(resolvedEvent.event?.position?.prepare).toBeDefined();
        expect(resolvedEvent.event?.position?.commit).toBe(
          appendResult.position?.commit
        );
        expect(resolvedEvent.event?.position?.prepare).toBe(
          appendResult.position?.prepare
        );

        if (resolvedEvent.event?.type === "finish-test") {
          break;
        }
      }
    });
  });
});
