/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestCluster,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";

import {
  EventStoreDBClient,
  jsonEvent,
  persistentSubscriptionToAllSettingsFromDefaults,
  START,
  streamNameFilter,
  END,
  excludeSystemEvents,
  eventTypeFilter,
} from "@eventstore/db-client";

describe("subscribeToPersistentSubscriptionToAll (filters)", () => {
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
      { rootCertificate: cluster.rootCertificate },
      { username: "admin", password: "changeit" },
    );
  });

  afterAll(async () => {
    await cluster.down();
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    describe("streamName", () => {
      test.each`
        name          | filter                                                             | streamName
        ${"prefixes"} | ${streamNameFilter({ prefixes: ["prefix_filter_streamname"] })}    | ${(k: string) => `prefix_filter_streamname_${k}`}
        ${"regex"}    | ${streamNameFilter({ regex: "^[0-9]*_regex_filter_streamname_" })} | ${(k: string) => `${Math.floor(Math.random() * 1000)}_regex_filter_streamname_${k}`}
      `("$name", async ({ name, filter, streamName }) => {
        const STREAM_NAME_A = streamName("a");
        const STREAM_NAME_B = streamName("b");

        const GROUP_NAME = `streamName_filter_${name}_test`;
        const FINISH_TEST = `finish_streamName_filter_${name}_test`;
        const doSomething = jest.fn();

        await client.appendToStream(STREAM_NAME_A, jsonTestEvents(8));
        await client.appendToStream(STREAM_NAME_B, jsonTestEvents(8));
        await client.appendToStream(STREAM_NAME_A, [
          ...jsonTestEvents(8),
          finishEvent(FINISH_TEST),
        ]);

        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults({
            startFrom: START,
          }),
          { filter },
        );

        const ps$all =
          client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

        for await (const event of ps$all) {
          doSomething(event);
          await ps$all.ack(event);

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

        const GROUP_NAME = `eventType_filter_${name}_test`;
        const FINISH_TEST = eventType("finish");
        const doSomething = jest.fn();

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
          finishEvent(FINISH_TEST),
        ]);

        await client.createPersistentSubscriptionToAll(
          GROUP_NAME,
          persistentSubscriptionToAllSettingsFromDefaults({
            startFrom: START,
          }),
          { filter },
        );

        const ps$all =
          client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

        for await (const event of ps$all) {
          doSomething(event);

          await ps$all.ack(event);

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
      const GROUP_NAME = "exclude_system_events";
      const STREAM_NAME = "exclude_system_events_stream";
      const FINISH_TEST = "finish_exclude_system_events";
      const doSomething = jest.fn();
      const doSomethingWithNonSystemEvent = jest.fn();

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: END,
        }),
        { filter: excludeSystemEvents() },
      );

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        finishEvent(FINISH_TEST),
      ]);

      const ps$all = client.subscribeToPersistentSubscriptionToAll(GROUP_NAME);

      for await (const event of ps$all) {
        doSomething(event);

        if (!event.event?.type.startsWith("$")) {
          doSomethingWithNonSystemEvent(event);
        }

        await ps$all.ack(event);

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
  });
});
