/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { pipeline, Writable, Readable, Transform } from "stream";
import { promisify } from "util";

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
  AllStreamResolvedEvent,
  NotLeaderError,
  PersistentSubscriptionToStream,
  EventStoreDBClient,
  jsonEvent,
  persistentSubscriptionToAllSettingsFromDefaults,
  START,
  UnsupportedError,
  streamNameFilter,
  END,
} from "@eventstore/db-client";

const asyncPipeline = promisify(pipeline);

describe("subscribeToPersistentSubscriptionToAll", () => {
  const supported = matchServerVersion`>=21.10`;
  const cluster = createTestCluster();
  let client!: EventStoreDBClient;

  const finishEvent = (type: string) =>
    jsonEvent({
      type,
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

  optionalDescribe(!supported)("Not Supported (<21.10)", () => {
    test("Throws an unavailable error", async () => {
      const GROUP_NAME = "oh_no";

      try {
        const ps$all =
          client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

        for await (const event of ps$all) {
          expect(event).toBe("unreachable");
        }
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedError);
        expect(error).toMatchInlineSnapshot(
          `[Error: subscribeToPersistentSubscriptionToAll requires server version 21.10 or higher.]`
        );
      }
    });
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    describe("should connect to a persistent subscription to all", () => {
      test("from start", async () => {
        const STREAM_PREFIX = "connect_from_start_";
        const GROUP_NAME = "from_start_test_group_name";
        const FINISH_TEST = "from_start_test_finish_test";

        await client.appendToStream(`${STREAM_PREFIX}a`, jsonTestEvents(20));
        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults({
            startFrom: START,
          }),
          { filter: streamNameFilter({ prefixes: [STREAM_PREFIX] }) }
        );

        const defer = new Defer();

        const onError = jest.fn((error) => {
          defer.reject(error);
        });
        const onClose = jest.fn();
        const onConfirmation = jest.fn();
        const onEnd = jest.fn();
        const onEvent = jest.fn(async (event: AllStreamResolvedEvent) => {
          if (event.event) {
            await subscription.ack(event);
          }

          if (event.event?.type === FINISH_TEST) {
            defer.resolve();
          }
        });

        const subscription = client
          .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
          .on("error", onError)
          .on("data", onEvent)
          .on("close", onClose)
          .on("confirmation", onConfirmation)
          .on("end", onEnd);

        await client.appendToStream(`${STREAM_PREFIX}b`, [
          ...jsonTestEvents(3),
          finishEvent(FINISH_TEST),
        ]);

        await defer.promise;
        await subscription.unsubscribe();

        expect(onError).not.toBeCalled();
        expect(onConfirmation).toBeCalledTimes(1);
        expect(onEvent).toBeCalled();
      });

      test("from position", async () => {
        const GROUP_NAME = "from_position_test_group_name";
        const FINISH_TEST = "from_position_test_finish_test";

        const { position } = await client.appendToStream(
          "some_stream",
          jsonTestEvents(1)
        );

        await client.appendToStream("some_stream", jsonTestEvents(20));

        expect(position).toBeDefined();

        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults({
            startFrom: position,
          }),
          {}
        );

        const defer = new Defer();

        const onError = jest.fn((error) => {
          defer.reject(error);
        });
        const onClose = jest.fn();
        const onConfirmation = jest.fn();
        const onEnd = jest.fn();
        const onEvent = jest.fn(async (event: AllStreamResolvedEvent) => {
          await subscription.ack(event);

          if (event.event?.type === FINISH_TEST) {
            defer.resolve();
          }
        });

        const subscription = client
          .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
          .on("error", onError)
          .on("data", onEvent)
          .on("close", onClose)
          .on("confirmation", onConfirmation)
          .on("end", onEnd);

        await client.appendToStream("a_stream", [
          ...jsonTestEvents(3),
          finishEvent(FINISH_TEST),
        ]);

        await defer.promise;
        await subscription.unsubscribe();

        expect(onError).not.toBeCalled();
        expect(onConfirmation).toBeCalledTimes(1);
        // 20 pre-write + 4 after + system events
        expect(onEvent.mock.calls.length).toBeGreaterThanOrEqual(24);
      });

      test("from end", async () => {
        const STREAM_NAME = "from_end_test_stream_name";
        const GROUP_NAME = "from_end_test_group_name";
        const FINISH_TEST = "from_end_test_finish_test";

        await client.appendToStream(STREAM_NAME, jsonTestEvents(4));
        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults() // end is default
        );

        const defer = new Defer();

        const onError = jest.fn((error) => {
          defer.reject(error);
        });
        const onClose = jest.fn();
        const onConfirmation = jest.fn();
        const onEnd = jest.fn();
        const onEvent = jest.fn(async (event: AllStreamResolvedEvent) => {
          await subscription.ack(event);

          if (event.event?.type === FINISH_TEST) {
            defer.resolve();
          }
        });

        const subscription = client
          .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
          .on("error", onError)
          .on("data", onEvent)
          .on("close", onClose)
          .on("confirmation", onConfirmation)
          .on("end", onEnd);

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(3),
          finishEvent(FINISH_TEST),
        ]);

        await defer.promise;
        await subscription.unsubscribe();

        expect(onError).not.toBeCalled();
        expect(onConfirmation).toBeCalledTimes(1);
        // 4 after + system events
        expect(onEvent.mock.calls.length).toBeGreaterThanOrEqual(4);
      });

      test("nack", async () => {
        const STREAM_NAME = "nack_test_stream_name";
        const GROUP_NAME = "nack_test_group_name";
        const FINISH_TEST = "nack_test_finish_event";

        // Skip the first twenty events and retry the next 20 events.
        // we should see the number of times that the `onEvent` callback
        // is called reflects this (if nack is working)

        const skipCount = 20;
        const retryCount = 20;

        const { position } = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents(1, "mark")
        );

        expect(position).toBeDefined();

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(skipCount, "skip-event"),
          ...jsonTestEvents(retryCount, "retry-event"),
          finishEvent(FINISH_TEST),
        ]);

        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults({
            startFrom: position,
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
        const onEvent = jest.fn(async (event: AllStreamResolvedEvent) => {
          if (!event.event) return;

          if (event.event.type === FINISH_TEST) {
            await subscription.ack(event);
            defer.resolve();
            return;
          }

          if (
            !event.event.streamId.startsWith("$") &&
            !nacked.includes(event.event.id)
          ) {
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
          .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
          .on("error", onError)
          .on("data", onEvent)
          .on("close", onClose)
          .on("confirmation", onConfirmation)
          .on("end", onEnd);

        await defer.promise;
        await subscription.unsubscribe();

        expect(onError).not.toBeCalled();
        expect(onConfirmation).toBeCalledTimes(1);
        // mark + skipped + retried
        expect(nacked.length).toBe(1 + skipCount + retryCount);
        // mark + skipped + retried (twice) + finish test + system events
        expect(onEvent.mock.calls.length).toBeGreaterThanOrEqual(
          1 + skipCount + retryCount * 2 + 1
        );
      });
    });

    describe("should return a readable stream", () => {
      describe("async iterator", () => {
        test("ack", async () => {
          const STREAM_NAME = "async_iter_ack_stream";
          const GROUP_NAME = "async_iter_ack_group_name";
          const FINISH_TEST = "async_iter_ack_finish_test";
          const doSomething = jest.fn();

          const { position } = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(1, "mark")
          );

          expect(position).toBeDefined();

          await client.appendToStream(STREAM_NAME, [
            ...jsonTestEvents(99),
            finishEvent(FINISH_TEST),
          ]);

          await client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: position,
            })
          );

          const subscription =
            client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

          for await (const resolvedEvent of subscription) {
            doSomething(resolvedEvent);
            await subscription.ack(resolvedEvent);

            if (resolvedEvent.event?.type === FINISH_TEST) {
              break;
            }
          }

          // 100 events + system events
          expect(doSomething.mock.calls.length).toBeGreaterThanOrEqual(100);
        });

        test("nack", async () => {
          const STREAM_NAME = "async_iter_nack";
          const GROUP_NAME = "async_iter_nack_group_name";
          const FINISH_TEST = "async_iter_nack_finish_test";
          const doSomething = jest.fn();
          const nacked: string[] = [];

          const { position } = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(1, "mark")
          );

          expect(position).toBeDefined();

          // Skip the first twenty events and retry the next 20 events.
          // we should see the number of times that the `onEvent` callback
          // is called reflects this (if nack is working)

          const skipCount = 20;
          const retryCount = 20;

          await client.appendToStream(STREAM_NAME, [
            ...jsonTestEvents(skipCount, "skip-event"),
            ...jsonTestEvents(retryCount, "retry-event"),
            finishEvent(FINISH_TEST),
          ]);

          await client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: position,
            })
          );

          const subscription =
            client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

          for await (const resolvedEvent of subscription) {
            if (!resolvedEvent.event) continue;

            doSomething(resolvedEvent);

            if (resolvedEvent.event.type === FINISH_TEST) {
              await subscription.ack(resolvedEvent);
              break;
            }

            if (
              !resolvedEvent.event.streamId.startsWith("$") &&
              !nacked.includes(resolvedEvent.event.id)
            ) {
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

          // mark + skipped + retried
          expect(nacked.length).toBe(1 + skipCount + retryCount);
          // mark + skipped + retried (twice) + finish test + system events
          expect(doSomething.mock.calls.length).toBeGreaterThanOrEqual(
            1 + skipCount + retryCount * 2 + 1
          );
        });

        test("ack with async function", async () => {
          const STREAM_NAME = "async_iter_ack_fun";
          const GROUP_NAME = "async_iter_ack_fun_group_name";
          const FINISH_TEST = "async_iter_ack_fun_finish_test";
          const doSomething = jest.fn();

          await client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults()
          );

          await client.appendToStream(STREAM_NAME, [
            ...jsonTestEvents(99),
            finishEvent(FINISH_TEST),
          ]);

          const subscription =
            client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

          for await (const resolvedEvent of subscription) {
            const { event } = resolvedEvent;
            if (!event) continue;

            if (event.type === "test") {
              // example of awaiting an async function when iterating over the async iterator
              await delay(10);
            }

            doSomething(event);

            await subscription.ack(resolvedEvent);

            if (event.type === FINISH_TEST) {
              break;
            }
          }

          // 100 events + system events
          expect(doSomething.mock.calls.length).toBeGreaterThanOrEqual(100);
        });
      });

      test("after the fact event listeners", async () => {
        const STREAM_NAME = "after_the_fact";
        const GROUP_NAME = "after_the_fact_group_name";
        const FINISH_TEST = "after_the_fact_finish_test";

        const defer = new Defer();

        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults({
            startFrom: END,
          })
        );

        const subscription =
          client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

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

            if (resolvedEvent.event?.type === FINISH_TEST) {
              subscription.unsubscribe();
            }
          })
          .on("error", onError)
          .on("end", endListener);

        await client.appendToStream(STREAM_NAME, [
          ...jsonTestEvents(5),
          finishEvent(FINISH_TEST),
        ]);

        await defer.promise;
        await subscription.unsubscribe();

        expect(eventListenerOne.mock.calls.length).toBeGreaterThan(6);
        expect(eventListenerTwo.mock.calls.length).toBeGreaterThan(6);
      });

      test("pipeline", async () => {
        const STREAM_NAME = "pipeline_test";
        const GROUP_NAME = "pipeline_test_group_name";
        const FINISH_TEST = "finish_pipeline";

        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults()
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

        const subscription =
          client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

        const acker = new (class extends Transform {
          _transform(
            resolvedEvent: AllStreamResolvedEvent,
            _encoding: string,
            done: (error: null, e: AllStreamResolvedEvent) => void
          ) {
            subscription
              .ack(resolvedEvent)
              .then(() => done(null, resolvedEvent));
          }
        })({ objectMode: true });

        const writeStream = new (class extends Writable {
          public ids: string[] = [];
          _write(
            { event }: AllStreamResolvedEvent,
            _encoding: string,
            done: () => void
          ) {
            if (!event?.streamId.startsWith("$")) {
              this.ids.push(event!.id);
            }

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
      const FINISH_TEST = "malformed_json_finish_test";
      const doSomething = jest.fn();

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: END,
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
        finishEvent(FINISH_TEST),
      ]);

      const subscription =
        client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

      for await (const resolvedEvent of subscription) {
        doSomething(resolvedEvent);
        await subscription.ack(resolvedEvent);

        if (resolvedEvent.event?.type === "malformed-event") {
          expect(resolvedEvent.event.data).toBe(malformedData);
        }

        if (resolvedEvent.event?.type === FINISH_TEST) {
          break;
        }
      }

      expect(doSomething).toBeCalled();
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
      const FINISH_TEST = "follower_node_finish_test";
      const doSomething = jest.fn();
      const confirmThatErrorWasThrown = jest.fn();

      const createAndConnectWithAutoReconnect = async (
        client: EventStoreDBClient
      ): Promise<PersistentSubscriptionToStream> => {
        try {
          await client.createPersistentSubscriptionToAll(
            GROUP_NAME,
            persistentSubscriptionToAllSettingsFromDefaults({
              startFrom: START,
            })
          );

          return client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);
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
        finishEvent(FINISH_TEST),
      ]);

      const subscription = await createAndConnectWithAutoReconnect(
        followerClient
      );

      for await (const resolvedEvent of subscription) {
        doSomething(resolvedEvent);
        await subscription.ack(resolvedEvent);

        if (resolvedEvent.event?.type === FINISH_TEST) {
          break;
        }
      }

      expect(doSomething.mock.calls.length).toBeGreaterThanOrEqual(100);

      expect(confirmThatErrorWasThrown).toBeCalledTimes(1);
      expect(confirmThatErrorWasThrown.mock.calls[0][0]).toBeInstanceOf(
        NotLeaderError
      );
    });

    test("retryCount", async () => {
      const STREAM_NAME = "to_all_retry_count_stream_name";
      const GROUP_NAME = "to_all_retry_count_group_name";
      const FINISH_TEST = "to_all_retry_count_finish_test";

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: END,
          maxRetryCount: 5,
        })
      );

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(99),
        finishEvent(FINISH_TEST),
      ]);

      const subscription =
        client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

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

        if (resolvedEvent.event?.type === FINISH_TEST) {
          break;
        }
      }
    });
  });
});
