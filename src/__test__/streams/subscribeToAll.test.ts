import {
  createTestNode,
  Defer,
  delay,
  jsonTestEvents,
  TestEventData,
} from "../utils";

import {
  EventStoreDBClient,
  jsonEvent,
  ResolvedEvent,
  SubscriptionReport,
} from "../..";
import { END } from "../../constants";

describe("subscribeToAll", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    await client.writeEventsToStream(STREAM_NAME_A, jsonTestEvents(4));
    await client.writeEventsToStream(STREAM_NAME_B, jsonTestEvents(4));
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

      const subscription = await client.subscribeToAll();

      subscription
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        eventType: FINISH_TEST,
        payload: {
          message: "lets wrap this up",
        },
      });

      await client.writeEventsToStream(STREAM_NAME_A, [
        ...jsonTestEvents(3),
        finishEvent,
      ]);

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

      const subscription = await client.subscribeToAll({ fromPosition: END });

      subscription
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        eventType: FINISH_TEST,
        payload: {
          message: "lets wrap this up",
        },
      });

      await delay(500);

      await client.writeEventsToStream(STREAM_NAME_A, [
        ...jsonTestEvents(3),
        finishEvent,
      ]);

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

      const writeResult = await client.writeEventsToStream(
        STREAM_NAME_B,
        jsonEvent({
          eventType: MARKER_EVENT,
          payload: { message: "mark my words" },
        })
      );

      await client.writeEventsToStream(STREAM_NAME_A, jsonTestEvents(3));

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

      const subscription = await client.subscribeToAll({
        fromPosition: writeResult.position,
      });

      subscription
        .on("error", onError)
        .on("event", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        eventType: FINISH_TEST,
        payload: {
          message: "lets wrap this up",
        },
      });

      await client.writeEventsToStream(STREAM_NAME_A, [
        ...jsonTestEvents(3),
        finishEvent,
      ]);

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

      const markerEvent = jsonEvent({
        eventType: MARKER_EVENT,
        payload: {
          message: "mark",
        },
      });

      const finishEvent = jsonEvent({
        eventType: FINISH_TEST,
        payload: {
          message: "lets wrap this up",
        },
      });

      const writeResult = await client.writeEventsToStream(
        STREAM_NAME_B,
        markerEvent
      );

      const subscription = await client.subscribeToAll({
        fromPosition: writeResult.position,
      });

      client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        finishEvent,
      ]);

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

      const markerEvent = jsonEvent({
        eventType: MARKER_EVENT,
        payload: {
          message: "mark",
        },
      });

      const finishEvent = jsonEvent({
        eventType: FINISH_TEST,
        payload: {
          message: "lets wrap this up",
        },
      });

      const writeResult = await client.writeEventsToStream(
        STREAM_NAME_B,
        markerEvent
      );

      const subscription = await client.subscribeToAll({
        fromPosition: writeResult.position,
      });

      client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(99),
        finishEvent,
      ]);

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

      const markerEvent = jsonEvent({
        eventType: MARKER_EVENT,
        payload: {
          message: "mark",
        },
      });

      const finishEvent = jsonEvent({
        eventType: FINISH_TEST,
        payload: {
          message: "lets wrap this up",
        },
      });

      const defer = new Defer();

      await client.writeEventsToStream(STREAM_NAME, jsonTestEvents(8));

      const writeResult = await client.writeEventsToStream(
        STREAM_NAME,
        markerEvent
      );

      const subscription = await client.subscribeToAll({
        fromPosition: writeResult.position,
      });

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

      await client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(5),
        finishEvent,
      ]);

      await defer.promise;

      expect(eventListenerOne).toBeCalledTimes(6);
      expect(eventListenerTwo).toBeCalledTimes(6);
      expect(onceListener).toBeCalledTimes(1);
      expect(endListener).toBeCalledTimes(1);
      expect(offListener).not.toBeCalled();
    });
  });
});
