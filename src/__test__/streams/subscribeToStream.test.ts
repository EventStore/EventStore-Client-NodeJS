import { createTestNode, Defer, delay, jsonTestEvents } from "../utils";

import {
  EventStoreDBClient,
  ResolvedEvent,
  SubscriptionReport,
  jsonEvent,
  END,
} from "../..";

describe("subscribeToStream", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  const finishEvent = () =>
    jsonEvent({
      eventType: "finish-test",
      payload: {
        message: "lets wrap this up",
      },
    });

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
    await client.writeEventsToStream("out_of_stream_name", jsonTestEvents(4));
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should subscribe to stream", () => {
    test("from start", async () => {
      const defer = new Defer();
      const STREAM_NAME = "from_start_test_stream_name";

      await client.writeEventsToStream(STREAM_NAME, jsonTestEvents(4));

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

      const subscription = await client.subscribeToStream(STREAM_NAME);

      subscription
        .on("error", handleError)
        .on("event", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
        .on("end", handleEnd);

      await delay(500);

      await client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(8);
    });

    test("from end", async () => {
      const STREAM_NAME = "from_end_test_stream_name";
      const defer = new Defer();

      await client.writeEventsToStream(STREAM_NAME, jsonTestEvents(4));

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

      const subscription = await client.subscribeToStream(STREAM_NAME, {
        fromRevision: END,
      });

      subscription
        .on("error", handleError)
        .on("event", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
        .on("end", handleEnd);

      await delay(500);

      await client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(4);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";

      await client.writeEventsToStream(STREAM_NAME, jsonTestEvents(4));

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

      const subscription = await client.subscribeToStream(STREAM_NAME, {
        fromRevision: BigInt(2),
      });

      subscription
        .on("close", handleClose)
        .on("error", handleError)
        .on("event", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
        .on("end", handleEnd);

      await delay(500);

      await client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

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

      await client.writeEventsToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        finishEvent(),
      ]);

      const subscription = await client.subscribeToStream(STREAM_NAME);

      for await (const event of subscription) {
        doSomething(event);

        if (event.event?.eventType === "finish-test") {
          break;
        }
      }

      expect(doSomething).toBeCalledTimes(9);
    });
  });
});
