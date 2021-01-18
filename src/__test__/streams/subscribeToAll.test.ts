import { pipeline, Writable, Readable } from "stream";
import { promisify } from "util";
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
  END,
  streamNameFilter,
  START,
  eventTypeFilter,
} from "../..";

const asyncPipeline = promisify(pipeline);

describe("subscribeToAll", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  const STREAM_NAME_A = "stream_name_a";
  const STREAM_NAME_B = "stream_name_b";

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.rootCertificate,
      },
      { username: "admin", password: "changeit" }
    );

    await client.appendToStream(STREAM_NAME_A, jsonTestEvents(4));
    await client.appendToStream(STREAM_NAME_B, jsonTestEvents(4));
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
      const onEnd = jest.fn(defer.resolve);
      const onEvent = jest.fn(async (event: ResolvedEvent) => {
        events.push(event);

        if (!event.event?.type.startsWith("$")) {
          filteredEvents.push(event);
        }

        if (event.event?.type === FINISH_TEST) {
          subscription.unsubscribe();
        }
      });

      const subscription = client
        .subscribeToAll()
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      await client.appendToStream(STREAM_NAME_A, [
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
      const onEnd = jest.fn(defer.resolve);
      const onEvent = jest.fn((event: ResolvedEvent) => {
        events.push(event);

        if (!event.event?.type.startsWith("$")) {
          filteredEvents.push(event);
        }

        if (event.event?.type === FINISH_TEST) {
          subscription.unsubscribe();
        }
      });

      const subscription = client
        .subscribeToAll({ fromPosition: END })
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      await delay(500);

      await client.appendToStream(STREAM_NAME_A, [
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

      const appendResult = await client.appendToStream(
        STREAM_NAME_B,
        jsonEvent({
          type: MARKER_EVENT,
          data: { message: "mark my words" },
        })
      );

      await client.appendToStream(STREAM_NAME_A, jsonTestEvents(3));

      const events: ResolvedEvent[] = [];
      const filteredEvents: ResolvedEvent[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn(defer.resolve);
      const onEvent = jest.fn((event: ResolvedEvent) => {
        events.push(event);

        if (!event.event?.type.startsWith("$")) {
          filteredEvents.push(event);
        }

        if (event.event?.type === FINISH_TEST) {
          subscription.unsubscribe();
        }
      });

      const subscription = client
        .subscribeToAll({
          fromPosition: appendResult.position,
        })
        .on("error", onError)
        .on("data", onEvent)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      await client.appendToStream(STREAM_NAME_A, [
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

  describe("should return a readable stream", () => {
    test("async iterator", async () => {
      const STREAM_NAME = "async_iter_sync_fun";
      const FINISH_TEST = "finish_async_iterator_sync_fun";
      const MARKER_EVENT = "async_iter_sync_fun_marker";
      const doSomething = jest.fn();
      const doSomethingElse = jest.fn();

      const markerEvent = jsonEvent({
        type: MARKER_EVENT,
        data: {
          message: "mark",
        },
      });

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      const appendResult = await client.appendToStream(
        STREAM_NAME_B,
        markerEvent
      );

      client.appendToStream(STREAM_NAME, [...jsonTestEvents(8), finishEvent]);

      const subscription = client.subscribeToAll({
        fromPosition: appendResult.position,
      });

      for await (const event of subscription) {
        doSomething(event);

        if (!event.event?.type.startsWith("$")) {
          doSomethingElse(event);
        }

        if (event.event?.type === FINISH_TEST) {
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
        type: MARKER_EVENT,
        data: {
          message: "mark",
        },
      });

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      const appendResult = await client.appendToStream(
        STREAM_NAME_B,
        markerEvent
      );

      const subscription = client.subscribeToAll({
        fromPosition: appendResult.position,
      });

      client.appendToStream(STREAM_NAME, [...jsonTestEvents(99), finishEvent]);

      const readEvents = new Set<number>();

      for await (const event of subscription) {
        doSomething(event);

        if (!event.event?.type.startsWith("$")) {
          doSomethingElse(event);
        }

        if (event.event?.type === "test") {
          // example of awaiting an async function when iterating over the async iterator
          await delay(10);

          if (event.event.isJson) {
            readEvents.add((event.event.data as TestEventData).index);
          }
        }

        if (event.event?.type === FINISH_TEST) {
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
        type: MARKER_EVENT,
        data: {
          message: "mark",
        },
      });

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      const defer = new Defer();

      await client.appendToStream(STREAM_NAME, jsonTestEvents(8));

      const appendResult = await client.appendToStream(
        STREAM_NAME,
        markerEvent
      );

      const eventListenerOne = jest.fn();
      const eventListenerTwo = jest.fn();
      const endListener = jest.fn(defer.resolve);
      const onceListener = jest.fn();
      const offListener = jest.fn();

      const subscription = client
        .subscribeToAll({
          fromPosition: appendResult.position,
        })
        .on("data", eventListenerOne)
        .on("data", (event) => {
          eventListenerTwo(event);

          if (event.event?.type === FINISH_TEST) {
            subscription.unsubscribe();
          }
        })
        .on("data", offListener)
        .once("data", onceListener)
        .on("end", endListener)
        .off("data", offListener);

      await client.appendToStream(STREAM_NAME, [
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

    test("pipeline", async () => {
      const STREAM_NAME = "pipeline test";
      const FINISH_TEST = "finish_pipeline";

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        jsonEvent({
          type: FINISH_TEST,
          data: {
            message: "lets wrap this up",
          },
        }),
      ]);

      const subscription = client.subscribeToStream(STREAM_NAME);

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

      await asyncPipeline(subscription as Readable, writeStream);

      expect(writeStream.ids).toHaveLength(9);
    });
  });

  describe("should accept a filter", () => {
    describe("streamName", () => {
      test.each`
        name          | filter                                                             | streamName
        ${"prefixes"} | ${streamNameFilter({ prefixes: ["prefix_filter_streamname"] })}    | ${(k: string) => `prefix_filter_streamname_${k}`}
        ${"regex"}    | ${streamNameFilter({ regex: "^[0-9]*_regex_filter_streamname_" })} | ${(k: string) => `${Math.floor(Math.random() * 1000)}_regex_filter_streamname_${k}`}
      `("$name", async ({ filter, streamName }) => {
        const STREAM_NAME_A = streamName("a");
        const STREAM_NAME_B = streamName("b");

        const FINISH_TEST = "finish_streamName_filter_test";
        const doSomething = jest.fn();

        const finishEvent = jsonEvent({
          type: FINISH_TEST,
          data: {
            message: "lets wrap this up",
          },
        });

        await client.appendToStream(STREAM_NAME_A, jsonTestEvents(8));
        await client.appendToStream(STREAM_NAME_B, jsonTestEvents(8));
        await client.appendToStream(STREAM_NAME_A, [
          ...jsonTestEvents(8),
          finishEvent,
        ]);

        const subscription = client.subscribeToAll({
          fromPosition: START,
          filter,
        });

        for await (const event of subscription) {
          doSomething(event);

          if (event.event?.type === FINISH_TEST) {
            break;
          }
        }

        expect(doSomething).toBeCalledTimes(
          8 + // a
            8 + // b
            8 + // a
            1 // finish
        );
      });
    });

    describe("eventType", () => {
      test.each`
        name          | filter                                                                  | eventType
        ${"prefixes"} | ${eventTypeFilter({ prefixes: ["prefix_filter_eventType"] })}           | ${(k: string) => `prefix_filter_eventType_${k}`}
        ${"regex"}    | ${eventTypeFilter({ regex: "^[0-9]*_regex_filter_eventType_[A-z]*$" })} | ${(k: string) => `${Math.floor(Math.random() * 1000)}_regex_filter_eventType_${k}`}
      `("$name", async ({ name, filter, eventType }) => {
        const STREAM_NAME_A = `filter_eventType_${name}_a`;
        const STREAM_NAME_B = `filter_eventType_${name}_b`;

        const FINISH_TEST = eventType("finish");
        const doSomething = jest.fn();

        const finishEvent = jsonEvent({
          type: FINISH_TEST,
          data: {
            message: "lets wrap this up",
          },
        });

        await client.appendToStream(
          STREAM_NAME_A,
          jsonTestEvents(8, eventType("a"))
        );
        await client.appendToStream(
          STREAM_NAME_B,
          jsonTestEvents(8, eventType("b"))
        );
        await client.appendToStream(STREAM_NAME_A, [
          ...jsonTestEvents(8, eventType("c")),
          finishEvent,
        ]);

        const subscription = client.subscribeToAll({
          fromPosition: START,
          filter,
        });

        for await (const event of subscription) {
          doSomething(event);

          if (event.event?.type === FINISH_TEST) {
            break;
          }
        }

        expect(doSomething).toBeCalledTimes(
          8 + // a
            8 + // b
            8 + // a
            1 // finish
        );
      });
    });
  });
});
