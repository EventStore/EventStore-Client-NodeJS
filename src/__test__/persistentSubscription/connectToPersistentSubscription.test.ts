import { createTestNode, Defer } from "../utils";

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
        .send(event.build(), event.build(), event.build(), event.build())
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
        (_report: PersistentReport, event: ResolvedEvent) => {
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

      // 4 pre-write + 4 after
      expect(onEvent).toBeCalledTimes(8);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";
      const GROUP_NAME = "from_revision_test_group_name";

      await writeEventsToStream(STREAM_NAME)
        .send(event.build(), event.build(), event.build(), event.build())
        .execute(connection);

      await createPersistentSubscription(STREAM_NAME, GROUP_NAME)
        .authenticated("admin", "changeit")
        .fromRevision(1)
        .execute(connection);

      const defer = new Defer();

      const onError = jest.fn((error) => {
        defer.reject(error);
      });
      const onClose = jest.fn();
      const onConfirmation = jest.fn();
      const onEnd = jest.fn();
      const onEvent = jest.fn(
        (_report: PersistentReport, event: ResolvedEvent) => {
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
  });
});
