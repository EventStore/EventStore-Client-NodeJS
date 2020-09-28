import { createTestNode, Defer, testEvents } from "../utils";

import {
  EventStoreConnection,
  createPersistentSubscription,
  connectToPersistentSubscription,
  writeEventsToStream,
  EventData,
  PersistentReport,
  ResolvedEvent,
  ESDBConnection,
} from "../..";

describe("connectToPersistentSubscription", () => {
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
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should connect to a persistant subscription", () => {
    test("from start", async () => {
      const STREAM_NAME = "from_start_test_stream_name";
      const GROUP_NAME = "from_start_test_group_name";

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(20))
        .execute(connection);

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
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
        (report: PersistentReport, event: ResolvedEvent) => {
          if (event.event) {
            report.ack([event.event.id]);
          }

          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
        .execute(connection);

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build())
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
        .send(event.build(), event.build(), event.build(), event.build())
        .execute(connection);

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .fromRevision(1n)
        .execute(connection);

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (report: PersistentReport, event: ResolvedEvent) => {
          if (event.event) {
            report.ack([event.event.id]);
          }

          if (event.event?.eventType === "finish-test") {
            defer.resolve();
          }
        }
      );

      await connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
        .execute(connection);

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build())
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
        .authenticated("admin", "changeit")
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
        (report: PersistentReport, event: ResolvedEvent) => {
          if (!event.event) return;

          if (event.event.eventType === "finish-test") {
            report.ack([event.event.id]);
            defer.resolve();
            return;
          }

          if (!nacked.includes(event.event.id)) {
            nacked.push(event.event.id);
            report.nack(
              nacked.length < skipCount ? "skip" : "retry",
              "To test it",
              [event.event.id]
            );
            return;
          }

          report.ack([event.event.id]);
        }
      );

      await connectToPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .handler({
          onError,
          onEvent,
          onClose,
          onConfirmation,
          onEnd,
        })
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
});
