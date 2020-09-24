import { createTestNode, Defer, delay, testEvents } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  ResolvedEvent,
  subscribeToStream,
  SubscriptionReport,
} from "../..";

describe("subscribeToStream", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  const finishEvent = EventData.json("finish-test", {
    message: "lets wrap this up",
  });

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    await writeEventsToStream("out_of_stream_name")
      .send(...testEvents(4))
      .execute(connection);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should subscribe to stream", () => {
    test("from start", async () => {
      const defer = new Defer();
      const STREAM_NAME = "from_start_test_stream_name";

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(4))
        .execute(connection);

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleClose = jest.fn();
      const handleConfirmation = jest.fn();
      const handleEnd = jest.fn();
      const handleEvent = jest.fn((event: ResolvedEvent) => {
        if (event.event?.eventType === "finish-test") {
          defer.resolve();
        }
      });

      await subscribeToStream(STREAM_NAME)
        .authenticated("admin", "changeit")
        .fromStart()
        .onError(handleError)
        .onEvent(handleEvent)
        .onClose(handleClose)
        .onConfirmation(handleConfirmation)
        .onEnd(handleEnd)
        .execute(connection);

      await delay(500);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(8);
    });

    test("from end", async () => {
      const STREAM_NAME = "from_end_test_stream_name";
      const defer = new Defer();

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(4))
        .execute(connection);

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleClose = jest.fn();
      const handleConfirmation = jest.fn();
      const handleEnd = jest.fn();
      const handleEvent = jest.fn((event: ResolvedEvent) => {
        if (event.event?.eventType === "finish-test") {
          defer.resolve();
        }
      });

      await subscribeToStream(STREAM_NAME)
        .authenticated("admin", "changeit")
        .fromEnd()
        .onError(handleError)
        .onEvent(handleEvent)
        .onClose(handleClose)
        .onConfirmation(handleConfirmation)
        .onEnd(handleEnd)
        .execute(connection);

      await delay(500);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(4);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(4))
        .execute(connection);

      const defer = new Defer();

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleClose = jest.fn();
      const handleConfirmation = jest.fn();
      const handleEnd = jest.fn();
      const handleEvent = jest.fn(
        (event: ResolvedEvent, report: SubscriptionReport) => {
          if (event.event?.eventType === "finish-test") {
            report.unsubscribe();
            defer.resolve();
          }
        }
      );

      await subscribeToStream(STREAM_NAME)
        .authenticated("admin", "changeit")
        .fromRevision(2n)
        .onError(handleError)
        .onEvent(handleEvent)
        .onClose(handleClose)
        .onConfirmation(handleConfirmation)
        .onEnd(handleEnd)
        .execute(connection);

      await delay(500);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(3))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(5);
      expect(handleEnd).toBeCalledTimes(1);
      expect(handleError).not.toBeCalled();
    });
  });

  describe("should return a subscription", () => {
    test("async iterator", async () => {
      const STREAM_NAME = "async_iter";
      const doSomething = jest.fn();

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(8))
        .send(finishEvent.build())
        .execute(connection);

      const subscription = await subscribeToStream(STREAM_NAME)
        .authenticated("admin", "changeit")
        .fromStart()
        .execute(connection);

      for await (const event of subscription) {
        doSomething(event);

        if (event.event?.eventType === "finish-test") {
          break;
        }
      }

      expect(doSomething).toBeCalledTimes(9);
    });

    test("after the fact event listeners", async () => {
      const STREAM_NAME = "after_the_fact";

      const defer = new Defer();

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(8))
        .execute(connection);

      const subscription = await subscribeToStream(STREAM_NAME)
        .authenticated("admin", "changeit")
        .fromEnd()
        .execute(connection);

      const eventListenerOne = jest.fn();
      const eventListenerTwo = jest.fn();
      const endListener = jest.fn();

      subscription.on("event", eventListenerOne);
      subscription.on("event", (event) => {
        eventListenerTwo(event);

        if (event.event?.eventType === "finish-test") {
          subscription.unsubscribe();
          defer.resolve();
        }
      });

      subscription.on("end", endListener);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(5))
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(eventListenerOne).toBeCalledTimes(6);
      expect(eventListenerTwo).toBeCalledTimes(6);
    });
  });
});
