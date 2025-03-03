import {
  jsonEvent,
  NO_STREAM,
  START,
  FORWARDS,
  KurrentDBClient,
  JSONEventType,
  AppendExpectedRevision,
  WrongExpectedVersionError,
} from "@kurrent/kurrentdb-client";
import { createTestNode } from "@test-utils";
import { v4 as uuid } from "uuid";

describe("[sample] appending-events", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("append-to-stream", async () => {
    // region append-to-stream
    type SomeEvent = JSONEventType<
      "some-event",
      {
        id: string;
        value: string;
      }
    >;

    const event = jsonEvent<SomeEvent>({
      id: uuid(),
      type: "some-event",
      data: {
        id: "1",
        value: "some value",
      },
    });

    await client.appendToStream("some-stream", event, {
      expectedRevision: NO_STREAM,
    });
    // endregion append-to-stream
  });

  test("append-duplicate-event", async () => {
    type SomeEvent = JSONEventType<
      "some-event",
      {
        id: string;
        value: string;
      }
    >;

    // region append-duplicate-event
    const event = jsonEvent<SomeEvent>({
      id: uuid(),
      type: "some-event",
      data: {
        id: "1",
        value: "some value",
      },
    });

    await client.appendToStream("same-event-stream", event);

    // attempt to append the same event again
    await client.appendToStream("same-event-stream", event);
    // endregion append-duplicate-event
  });

  test("append-with-no-stream", async () => {
    type SomeEvent = JSONEventType<
      "some-event",
      {
        id: string;
        value: string;
      }
    >;
    try {
      // region append-with-no-stream
      const eventOne = jsonEvent<SomeEvent>({
        id: uuid(),
        type: "some-event",
        data: {
          id: "1",
          value: "some value",
        },
      });

      const eventTwo = jsonEvent<SomeEvent>({
        id: uuid(),
        type: "some-event",
        data: {
          id: "2",
          value: "some other value",
        },
      });

      await client.appendToStream("no-stream-stream", eventOne, {
        expectedRevision: NO_STREAM,
      });

      // attempt to append the same event again
      await client.appendToStream("no-stream-stream", eventTwo, {
        expectedRevision: NO_STREAM,
      });
      // endregion append-with-no-stream
    } catch (error) {
      expect(error).toBeInstanceOf(WrongExpectedVersionError);
    }
  });

  test("append-with-concurrency-check", async () => {
    type SomeEvent = JSONEventType<
      "some-event",
      {
        id: string;
        value: string;
      }
    >;
    try {
      await client.appendToStream(
        "concurrency-stream",
        jsonEvent<SomeEvent>({
          id: uuid(),
          type: "some-event",
          data: {
            id: "1",
            value: "some value",
          },
        })
      );

      // region append-with-concurrency-check
      const events = client.readStream<SomeEvent>("concurrency-stream", {
        fromRevision: START,
        direction: FORWARDS,
      });

      let revision: AppendExpectedRevision = NO_STREAM;
      for await (const { event } of events) {
        revision = event?.revision ?? revision;
      }

      const clientOneEvent = jsonEvent<SomeEvent>({
        id: uuid(),
        type: "some-event",
        data: {
          id: "1",
          value: "some value",
        },
      });

      await client.appendToStream("concurrency-stream", clientOneEvent, {
        expectedRevision: revision,
      });

      const clientTwoEvent = jsonEvent<SomeEvent>({
        id: uuid(),
        type: "some-event",
        data: {
          id: "2",
          value: "some value",
        },
      });

      await client.appendToStream("concurrency-stream", clientTwoEvent, {
        expectedRevision: revision,
      });
      // endregion append-with-concurrency-check
    } catch (error) {
      expect(error).toBeInstanceOf(WrongExpectedVersionError);
    }
  });

  test("overriding-user-credentials", async () => {
    const event = jsonEvent({
      id: uuid(),
      type: "some-event",
      data: {
        id: "1",
        value: "some value",
      },
    });
    // region overriding-user-credentials
    const credentials = {
      username: "admin",
      password: "changeit",
    };

    await client.appendToStream("some-stream", event, {
      credentials,
    });
    // endregion overriding-user-credentials
  });
});
