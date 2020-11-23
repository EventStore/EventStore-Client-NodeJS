import {
  createTestCluster,
  Defer,
  delay,
  testEvents,
  postEventViaHttpApi,
} from "../utils";

import {
  EventStoreConnection,
  createPersistentSubscription,
  connectToPersistentSubscription,
  writeEventsToStream,
  EventData,
  PersistentReport,
  ResolvedEvent,
  ESDBConnection,
  NotLeaderError,
  PersistentSubscription,
} from "../..";

describe("connectToPersistentSubscription", () => {
  const cluster = createTestCluster();
  let connection!: ESDBConnection;

  const finishEvent = EventData.json("finish-test", {
    message: "lets wrap this up",
  });

  beforeAll(async () => {
    await cluster.up();

    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(cluster.certPath)
      .gossipClusterConnection(cluster.endpoints, "leader");
  });

  afterAll(async () => {
    await cluster.down();
  });

  describe("should connect to a persistant subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "from_start_test_stream_name";
      const GROUP_NAME = "from_start_test_group_name";

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(20))
        .execute(connection);

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .fromStart()
        .execute(connection);

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (event: ResolvedEvent, report: PersistentReport) => {
          if (event.event) {
            report.ack(event.event.id);
          }

          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd)
        .execute(connection);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 20 pre-write + 4 after
      expect(onEvent).toBeCalledTimes(24);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";
      const GROUP_NAME = "from_revision_test_group_name";

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(4))
        .execute(connection);

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .fromRevision(BigInt(1))
        .execute(connection);

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (event: ResolvedEvent, report: PersistentReport) => {
          if (event.event) {
            report.ack(event.event.id);
          }

          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd)
        .execute(connection);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 4 pre-write + 4 after - 1 (start from revision)
      expect(onEvent).toBeCalledTimes(7);
    });

    test("nack", async () => {
      const STREAM_NAME = "nack_test_stream_name";
      const GROUP_NAME = "nack_test_group_name";

      // Skip the first twenty events and retry the next 20 events.
      // we should see the number of times that the `onEvent` callback
      // is called reflects this (if nack is working)

      const skipCount = 20;
      const retryCount = 20;

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(skipCount))
        .send(...testEvents(retryCount))
        .send(finishEvent.build())
        .execute(connection);

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .fromStart()
        .execute(connection);

      const defer = new Defer();

      const nacked: string[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (event: ResolvedEvent, report: PersistentReport) => {
          if (!event.event) return;

          if (event.event.eventType === "finish-test") {
            report.ack(event.event.id);
            defer.resolve();
            return;
          }

          if (!nacked.includes(event.event.id)) {
            nacked.push(event.event.id);
            report.nack(
              nacked.length < skipCount ? "skip" : "retry",
              "To test it",
              event.event.id
            );
            return;
          }

          report.ack(event.event.id);
        }
      );

      await connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd)
        .execute(connection);

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

  describe("should return a subscription", () => {
    describe("async iterator", () => {
      test("ack", async () => {
        const STREAM_NAME = "async_iter_ack";
        const GROUP_NAME = "async_iter_ack_group_name";
        const doSomething = jest.fn();

        await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
          .fromStart()
          .execute(connection);

        await writeEventsToStream(STREAM_NAME)
          .send(...testEvents(99))
          .send(finishEvent.build())
          .execute(connection);

        const subscription = await connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        ).execute(connection);

        for await (const { event } of subscription) {
          if (!event) continue;

          doSomething(event);
          subscription.ack(event.id);

          if (event?.eventType === "finish-test") {
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

        await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
          .fromStart()
          .execute(connection);

        await writeEventsToStream(STREAM_NAME)
          .send(...testEvents(skipCount, "skip-event"))
          .send(...testEvents(retryCount, "retry-event"))
          .send(finishEvent.build())
          .execute(connection);

        const subscription = await connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        ).execute(connection);

        for await (const { event } of subscription) {
          if (!event) continue;

          doSomething(event);

          if (event.eventType === "finish-test") {
            subscription.ack(event.id);
            break;
          }

          if (!nacked.includes(event.id)) {
            nacked.push(event.id);
            subscription.nack(
              event.eventType === "skip-event" ? "skip" : "retry",
              "To test it",
              event.id
            );
            continue;
          }

          subscription.ack(event.id);
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

        await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
          .fromStart()
          .execute(connection);

        await writeEventsToStream(STREAM_NAME)
          .send(...testEvents(99))
          .send(finishEvent.build())
          .execute(connection);

        const subscription = await connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        ).execute(connection);

        for await (const { event } of subscription) {
          if (!event) continue;

          if (event?.eventType === "test") {
            // example of awaiting an async function when iterating over the async iterator
            await delay(10);
          }

          doSomething(event);

          subscription.ack(event.id);

          if (event?.eventType === "finish-test") {
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

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .fromStart()
        .execute(connection);

      const subscription = await connectToPersistentSubscription(
        STREAM_NAME,
        GROUP_NAME
      ).execute(connection);

      const eventListenerOne = jest.fn();
      const eventListenerTwo = jest.fn();
      const endListener = jest.fn();

      subscription
        .on("event", eventListenerOne)
        .on("event", ({ event }, report) => {
          if (!event) return;

          eventListenerTwo(event);
          report.ack(event.id);

          if (event.eventType === "finish-test") {
            subscription.unsubscribe();
            defer.resolve();
          }
        })
        .on("end", endListener);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(5))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(eventListenerOne).toBeCalledTimes(6);
      expect(eventListenerTwo).toBeCalledTimes(6);
    });
  });

  test("malformed events", async () => {
    const STREAM_NAME = "malformed_json";
    const GROUP_NAME = "malformed_json_group_name";
    const doSomething = jest.fn();

    await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
      .fromStart()
      .execute(connection);

    await writeEventsToStream(STREAM_NAME)
      .send(...testEvents(3, "test 1"))
      .execute(connection);

    const malformedData = "****";

    await postEventViaHttpApi(cluster, {
      contentType: "application/json",
      eventType: "malformed-event",
      stream: STREAM_NAME,
      data: malformedData,
    });

    await writeEventsToStream(STREAM_NAME)
      .send(...testEvents(3, "test 2"))
      .send(finishEvent.build())
      .execute(connection);

    const subscription = await connectToPersistentSubscription(
      STREAM_NAME,
      GROUP_NAME
    ).execute(connection);

    for await (const { event } of subscription) {
      if (!event) continue;

      doSomething(event);
      subscription.ack(event.id);

      if (event.eventType === "malformed-event") {
        expect(event.data).toBe(malformedData);
      }

      if (event?.eventType === "finish-test") {
        break;
      }
    }

    expect(doSomething).toBeCalledTimes(8);
  });

  test("should throw on follower node", async () => {
    const connectionBuilder = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(cluster.certPath);

    // Create connection to a follower node
    const followerConnection = connectionBuilder.gossipClusterConnection(
      cluster.endpoints,
      "follower"
    );

    const STREAM_NAME = "follower_node_test";
    const GROUP_NAME = "follower_node_test";
    const doSomething = jest.fn();
    const confirmThatErrorWasThrown = jest.fn();

    const createAndConnectWithAutoReconnect = async (
      connection: ESDBConnection
    ): Promise<PersistentSubscription> => {
      try {
        await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
          .fromStart()
          .execute(connection);

        const subscription = await connectToPersistentSubscription(
          STREAM_NAME,
          GROUP_NAME
        ).execute(connection);

        return subscription;
      } catch (error) {
        confirmThatErrorWasThrown(error);

        // Our command is good, but must be executed on the leader
        if (error instanceof NotLeaderError) {
          // Create new connection to the reported leader node
          const leaderConnection = connectionBuilder.singleNodeConnection(
            error.leader
          );

          // try again with new connection
          return createAndConnectWithAutoReconnect(leaderConnection);
        }

        // other errors can be passed up the chain
        throw error;
      }
    };

    await writeEventsToStream(STREAM_NAME)
      .send(...testEvents(99))
      .send(finishEvent.build())
      .execute(followerConnection);

    const subscription = await createAndConnectWithAutoReconnect(
      followerConnection
    );

    for await (const { event } of subscription) {
      if (!event) continue;

      doSomething(event);
      subscription.ack(event.id);

      if (event?.eventType === "finish-test") {
        break;
      }
    }

    expect(doSomething).toBeCalledTimes(100);

    expect(confirmThatErrorWasThrown).toBeCalledTimes(1);
    expect(confirmThatErrorWasThrown.mock.calls[0][0]).toBeInstanceOf(
      NotLeaderError
    );
  });
});
