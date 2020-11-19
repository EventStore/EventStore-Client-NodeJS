import {
  createTestNode,
  Defer,
  delay,
  TestEventData,
  testEvents,
} from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  ResolvedEvent,
  SubscriptionReport,
  subscribeToAll,
} from "../..";

describe("subscribeToAll", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    await writeEventsToStream(STREAM_NAME_A)
      .send(...testEvents(4))
      .execute(connection);

    await writeEventsToStream(STREAM_NAME_B)
      .send(...testEvents(4))
      .execute(connection);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should subscribe to $all", () => {
    test("from start", async () => {
      const defer = new Defer();
      const FINISH_TEST = "from-start-finish";

      const events: ResolvedEvent[] = [];
      const filteredEvents: ResolvedEvent[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (event: ResolvedEvent, report: SubscriptionReport) => {
          events.push(event);

          if (!event.event?.eventType.startsWith("$")) {
            filteredEvents.push(event);
          }

          if (event.event?.eventType === FINISH_TEST) {
            report.unsubscribe();
            defer.resolve();
          }
        }
      );

      await subscribeToAll()
        .fromStart()
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd)
        .execute(connection);

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      await writeEventsToStream(STREAM_NAME_A)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);
      expect(onEvent).toHaveBeenCalled();

      // 8 set up events, 4 after subscribed
      expect(filteredEvents.length).toBe(12);
      // plus system events
      expect(events.length).toBeGreaterThan(12);
    });

    test("from end", async () => {
      const defer = new Defer();
      const FINISH_TEST = "from-end-finish";

      const events: ResolvedEvent[] = [];
      const filteredEvents: ResolvedEvent[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (event: ResolvedEvent, report: SubscriptionReport) => {
          events.push(event);

          if (!event.event?.eventType.startsWith("$")) {
            filteredEvents.push(event);
          }

          if (event.event?.eventType === FINISH_TEST) {
            defer.resolve();
            report.unsubscribe();
          }
        }
      );

      await subscribeToAll()
        .fromEnd()
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd)
        .execute(connection);

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      await delay(500);

      await writeEventsToStream(STREAM_NAME_A)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);
      expect(onEvent).toHaveBeenCalled();

      // only 4 after subscribed
      expect(filteredEvents.length).toBe(4);
      // plus system events (if any)
      expect(events.length).toBeGreaterThanOrEqual(4);
    });

    test("from position", async () => {
      const defer = new Defer();
      const FINISH_TEST = "from-position-finish";
      const MARKER_EVENT = "marker_event";

      const writeResult = await writeEventsToStream(STREAM_NAME_B)
        .send(
          EventData.json(MARKER_EVENT, {
            message: "mark my words",
          }).build()
        )
        .execute(connection);

      await writeEventsToStream(STREAM_NAME_A)
        .send(...testEvents(3))
        .execute(connection);

      const events: ResolvedEvent[] = [];
      const filteredEvents: ResolvedEvent[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (event: ResolvedEvent, report: SubscriptionReport) => {
          events.push(event);

          if (!event.event?.eventType.startsWith("$")) {
            filteredEvents.push(event);
          }

          if (event.event?.eventType === FINISH_TEST) {
            defer.resolve();
            report.unsubscribe();
          }
        }
      );

      await subscribeToAll()
        .fromPosition(writeResult.position!)
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd)
        .execute(connection);

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      await writeEventsToStream(STREAM_NAME_B)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);
      expect(onEvent).toHaveBeenCalled();

      // 3 before subscribed, 4 after subscribed
      expect(filteredEvents.length).toBe(7);
      // plus system events (if any)
      expect(events.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe("should return a subscription", () => {
    test("async iterator", async () => {
      const STREAM_NAME = "async_iter_sync_fun";
      const FINISH_TEST = "finish_async_iterator_sync_fun";
      const MARKER_EVENT = "async_iter_sync_fun_marker";
      const doSomething = jest.fn();
      const doSomethingElse = jest.fn();

      const markerEvent = EventData.json(MARKER_EVENT, {
        message: "mark",
      });

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      const writeResult = await writeEventsToStream(STREAM_NAME_B)
        .send(markerEvent.build())
        .execute(connection);

      const subscription = await subscribeToAll()
        .fromPosition(writeResult.position!)
        .execute(connection);

      writeEventsToStream(STREAM_NAME)
        .send(...testEvents(8))
        .send(finishEvent.build())
        .execute(connection);

      for await (const event of subscription) {
        doSomething(event);

        if (!event.event?.eventType.startsWith("$")) {
          doSomethingElse(event);
        }

        if (event.event?.eventType === FINISH_TEST) {
          break;
        }
      }

      expect(doSomething).toBeCalled();
      expect(doSomethingElse).toBeCalledTimes(9);
    });

    test("async iterator with async function", async () => {
      const STREAM_NAME = "async_iter_async_fun";
      const FINISH_TEST = "finish_async_iterator_async_fun";
      const MARKER_EVENT = "async_iter_async_fun_marker";
      const doSomething = jest.fn();
      const doSomethingElse = jest.fn();

      const markerEvent = EventData.json(MARKER_EVENT, {
        message: "mark",
      });

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      const writeResult = await writeEventsToStream(STREAM_NAME_B)
        .send(markerEvent.build())
        .execute(connection);

      const subscription = await subscribeToAll()
        .fromPosition(writeResult.position!)
        .execute(connection);

      writeEventsToStream(STREAM_NAME)
        .send(...testEvents(99))
        .send(finishEvent.build())
        .execute(connection);

      const readEvents = new Set<number>();

      for await (const event of subscription) {
        doSomething(event);

        if (!event.event?.eventType.startsWith("$")) {
          doSomethingElse(event);
        }

        if (event.event?.eventType === "test") {
          // example of awaiting an async function when iterating over the async iterator
          await delay(10);

          if (event.event.isJson) {
            readEvents.add((event.event.data as TestEventData).index);
          }
        }

        if (event.event?.eventType === FINISH_TEST) {
          break;
        }
      }

      expect(doSomething).toBeCalled();
      // unique numbers from 0 -> 98
      expect(readEvents.size).toBe(99);
      expect(doSomethingElse).toBeCalledTimes(100);
    });

    test("after the fact event listeners", async () => {
      const STREAM_NAME = "after_the_fact";
      const FINISH_TEST = "finish_after_the_fact";
      const MARKER_EVENT = "after_the_fact_marker";

      const markerEvent = EventData.json(MARKER_EVENT, {
        message: "mark",
      });

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      const defer = new Defer();

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(8))
        .execute(connection);

      const writeResult = await writeEventsToStream(STREAM_NAME)
        .send(markerEvent.build())
        .execute(connection);

      const subscription = await subscribeToAll()
        .fromPosition(writeResult.position!)
        .execute(connection);

      const eventListenerOne = jest.fn();
      const eventListenerTwo = jest.fn();
      const endListener = jest.fn();
      const onceListener = jest.fn();
      const offListener = jest.fn();

      subscription
        .on("event", eventListenerOne)
        .on("event", (event) => {
          eventListenerTwo(event);

          if (event.event?.eventType === FINISH_TEST) {
            subscription.unsubscribe();
            defer.resolve();
          }
        })
        .on("event", offListener)
        .once("event", onceListener)
        .on("end", endListener)
        .off("event", offListener);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(5))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(eventListenerOne).toBeCalledTimes(6);
      expect(eventListenerTwo).toBeCalledTimes(6);
      expect(onceListener).toBeCalledTimes(1);
      expect(endListener).toBeCalledTimes(1);
      expect(offListener).not.toBeCalled();
    });
  });
});
