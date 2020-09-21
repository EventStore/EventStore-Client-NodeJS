import { createTestNode, Defer, delay } from "../utils";

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

  const event = EventData.json("test", {
    message: "lets test this",
  });

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    await writeEventsToStream(STREAM_NAME_A)
      .send(event.build(), event.build(), event.build(), event.build())
      .execute(connection);

    await writeEventsToStream(STREAM_NAME_B)
      .send(event.build(), event.build(), event.build(), event.build())
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
        (_report: SubscriptionReport, event: ResolvedEvent) => {
          events.push(event);

          if (!event.event?.eventType.startsWith("$")) {
            filteredEvents.push(event);
          }

          if (event.event?.eventType === FINISH_TEST) {
            defer.resolve();
          }
        }
      );

      await subscribeToAll()
        .authenticated("admin", "changeit")
        .fromStart()
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
        .execute(connection);

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      await writeEventsToStream(STREAM_NAME_A)
        .send(event.build(), event.build(), event.build())
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
        (_report: SubscriptionReport, event: ResolvedEvent) => {
          events.push(event);

          if (!event.event?.eventType.startsWith("$")) {
            filteredEvents.push(event);
          }

          if (event.event?.eventType === FINISH_TEST) {
            defer.resolve();
          }
        }
      );

      await subscribeToAll()
        .authenticated("admin", "changeit")
        .fromEnd()
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
        .execute(connection);

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      await delay(500);

      await writeEventsToStream(STREAM_NAME_A)
        .send(event.build(), event.build(), event.build())
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
        .send(event.build(), event.build(), event.build())
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
        (_report: SubscriptionReport, event: ResolvedEvent) => {
          events.push(event);

          if (!event.event?.eventType.startsWith("$")) {
            filteredEvents.push(event);
          }

          if (event.event?.eventType === FINISH_TEST) {
            defer.resolve();
          }
        }
      );

      await subscribeToAll()
        .authenticated("admin", "changeit")
        .fromPosition(writeResult.position!)
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
        .execute(connection);

      const finishEvent = EventData.json(FINISH_TEST, {
        message: "lets wrap this up",
      });

      await writeEventsToStream(STREAM_NAME_B)
        .send(event.build(), event.build(), event.build())
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
});
