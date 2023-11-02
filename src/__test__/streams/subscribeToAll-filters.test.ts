/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestNode,
  Defer,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalTest,
} from "@test-utils";
import {
  EventStoreDBClient,
  jsonEvent,
  ResolvedEvent,
  streamNameFilter,
  START,
  eventTypeFilter,
  excludeSystemEvents,
  AllStreamSubscription,
  Position,
} from "@eventstore/db-client";

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
      { username: "admin", password: "changeit" },
    );

    await client.appendToStream(STREAM_NAME_A, jsonTestEvents(4));
    await client.appendToStream(STREAM_NAME_B, jsonTestEvents(4));
  });

  afterAll(async () => {
    await node.down();
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
            1, // finish
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
          jsonTestEvents(8, eventType("a")),
        );
        await client.appendToStream(
          STREAM_NAME_B,
          jsonTestEvents(8, eventType("b")),
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
            1, // finish
        );
      });
    });

    test("excludeSystemEvents", async () => {
      const STREAM_NAME = "exclude_system_events_stream";
      const FINISH_TEST = "finish_exclude_system_events";
      const doSomething = jest.fn();
      const doSomethingWithNonSystemEvent = jest.fn();

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      client.appendToStream(STREAM_NAME, [...jsonTestEvents(8), finishEvent]);

      const subscription = client.subscribeToAll({
        fromPosition: START,
        filter: excludeSystemEvents(),
      });

      for await (const event of subscription) {
        doSomething(event);

        if (!event.event?.type.startsWith("$")) {
          doSomethingWithNonSystemEvent(event);
        }

        if (event.event?.type === FINISH_TEST) {
          break;
        }
      }

      // We run from the start, so could be more
      expect(doSomething.mock.calls.length).toBeGreaterThanOrEqual(9);
      expect(doSomethingWithNonSystemEvent).toBeCalledTimes(
        doSomething.mock.calls.length,
      );
    });

    // checkpoints behaviour was fixed in
    // https://github.com/EventStore/EventStore/pull/2608
    optionalTest(matchServerVersion`>=21.10`)("checkpoints", async () => {
      const defer = new Defer();
      const FINISH_TEST = "checkpoints-finish";
      const MARKER_EVENT = "marker_event";

      const appendResult = await client.appendToStream(
        STREAM_NAME_B,
        jsonEvent({
          type: MARKER_EVENT,
          data: { message: "mark my words" },
        }),
      );

      await client.appendToStream(STREAM_NAME_A, jsonTestEvents(8));

      const events: ResolvedEvent[] = [];
      const checkpoints: Position[] = [];

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn(defer.resolve);
      const onEvent = jest.fn((event: ResolvedEvent) => {
        events.push(event);

        if (event.event?.type === FINISH_TEST) {
          subscription.unsubscribe();
        }
      });

      let active = false;

      const checkpointReached = jest.fn(
        async (_: AllStreamSubscription, position: Position) => {
          checkpoints.push(position);

          active = true;
          await delay(100);
          active = false;
        },
      );

      const confirmWaitingForCheckpointReached = jest.fn(() => {
        expect(active).toBe(false);
      });

      const subscription = client
        .subscribeToAll({
          fromPosition: appendResult.position,
          filter: excludeSystemEvents({
            checkpointInterval: 2,
            checkpointReached,
          }),
        })
        .on("error", onError)
        .on("data", onEvent)
        .on("data", confirmWaitingForCheckpointReached)
        .on("close", onClose)
        .on("confirmation", onConfirmation)
        .on("end", onEnd);

      const finishEvent = jsonEvent({
        type: FINISH_TEST,
        data: {
          message: "lets wrap this up",
        },
      });

      for (let i = 0; i < 18; i++) {
        await client.appendToStream(STREAM_NAME_A, jsonTestEvents(20));
        await delay(10);
      }

      await client.appendToStream(STREAM_NAME_A, [
        ...jsonTestEvents(15),
        finishEvent,
      ]);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);

      // 8 before subscribed, 376 after subscribed
      expect(onEvent).toBeCalledTimes(384);
      expect(confirmWaitingForCheckpointReached).toBeCalledTimes(384);
      expect(events.length).toBe(384);

      // 384 / (32 * 2 (checkpointInterval) ) = 6;
      expect(checkpointReached.mock.calls.length).toBeGreaterThanOrEqual(6);
      // sometimes we can have a catch up checkpoint
      expect(checkpointReached.mock.calls.length).toBeLessThanOrEqual(7);

      for (const { commit, prepare } of checkpoints) {
        expect(typeof commit).toBe("bigint");
        expect(typeof prepare).toBe("bigint");
      }
    });
  });
});
