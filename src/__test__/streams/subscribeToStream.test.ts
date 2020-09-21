import { createTestNode, Defer, delay } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  ResolvedEvent,
  SubscriptionReport,
  subscribeToStream,
} from "../..";

describe("subscribeToStream", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  const event = EventData.json("test", {
    message: "lets test this",
  });

  const finishEvent = EventData.json("finish-test", {
    message: "lets wrap this up",
  });

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    await writeEventsToStream("out_of_stream_name")
      .send(event.build(), event.build(), event.build(), event.build())
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
        .send(event.build(), event.build(), event.build(), event.build())
        .execute(connection);

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (_report: SubscriptionReport, event: ResolvedEvent) => {
          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await subscribeToStream(STREAM_NAME)
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

      await delay(500);

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build())
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);
      expect(onEvent).toBeCalledTimes(8);
    });

    test("from end", async () => {
      const STREAM_NAME = "from_end_test_stream_name";
      const defer = new Defer();

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build(), event.build())
        .execute(connection);

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (_report: SubscriptionReport, event: ResolvedEvent) => {
          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await subscribeToStream(STREAM_NAME)
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

      await delay(500);

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build())
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);
      expect(onEvent).toBeCalledTimes(4);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build(), event.build())
        .execute(connection);

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (_report: SubscriptionReport, event: ResolvedEvent) => {
          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await subscribeToStream(STREAM_NAME)
        .authenticated("admin", "changeit")
        .fromRevision(2n)
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
        .execute(connection);

      await delay(500);

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build())
        .send(finishEvent.build())
        .execute(connection);

      await defer.promise;

      expect(onError).not.toBeCalled();
      expect(onConfirmation).toBeCalledTimes(1);
      expect(onEvent).toBeCalledTimes(5);
    });
  });
});
