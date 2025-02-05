import {
  START,
  FORWARDS,
  EventStoreDBClient,
  StreamNotFoundError,
  BACKWARDS,
  END,
  JSONEventType,
} from "@eventstore/db-client";
import { createTestNode, jsonTestEvents } from "@test-utils";

type SomeEvent = JSONEventType<
  "some-event",
  {
    id: string;
    value: string;
  }
>;

describe("[sample] reading-events", () => {
  const log = console.log;
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = EventStoreDBClient.connectionString`esdb://admin:changeit@${node.uri}?tls=true&tlsCAFile=${node.certPath.root}`;

    await client.appendToStream("some-stream", jsonTestEvents());
    console.log = jest.fn();
  });

  afterAll(async () => {
    console.log = log;
    await node.down();
  });

  test("read-from-stream", async () => {
    // region read-from-stream
    const events = client.readStream<SomeEvent>("some-stream", {
      direction: FORWARDS,
      fromRevision: START,
      maxCount: 10,
    });
    // endregion read-from-stream

    // #region iterate-stream
    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
    // #endregion iterate-stream
  });

  test("read-from-stream-position", async () => {
    // region read-from-stream-position
    const events = client.readStream<SomeEvent>("some-stream", {
      direction: FORWARDS,
      fromRevision: BigInt(10),
      maxCount: 20,
    });
    // endregion read-from-stream-position

    // #region iterate-stream
    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
    // #endregion iterate-stream
  });

  test("read-from-stream-position-check", async () => {
    // region checking-for-stream-presence

    const events = client.readStream<SomeEvent>("some-stream", {
      direction: FORWARDS,
      fromRevision: BigInt(10),
      maxCount: 20,
    });

    try {
      for await (const resolvedEvent of events) {
        console.log(resolvedEvent.event?.data);
      }
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return;
      }

      throw error;
    }

    // #endregion checking-for-stream-presence
  });

  test("read-from-stream-overriding-credentials", async () => {
    // region overriding-user-credentials
    const credentials = {
      username: "admin",
      password: "changeit",
    };

    const events = client.readStream<SomeEvent>("some-stream", {
      direction: FORWARDS,
      fromRevision: START,
      credentials,
      maxCount: 10,
    });
    // endregion overriding-user-credentials

    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
  });

  test("read-from-stream-backwards", async () => {
    // region reading-backwards
    const events = client.readStream<SomeEvent>("some-stream", {
      direction: BACKWARDS,
      fromRevision: END,
      maxCount: 10,
    });

    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
    // #endregion reading-backwards
  });

  test("read-from-all-stream", async () => {
    // region read-from-all-stream
    const events = client.readAll({
      direction: FORWARDS,
      fromPosition: START,
      maxCount: 10,
    });
    // endregion read-from-all-stream

    // #region read-from-all-stream-iterate
    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
    // #endregion read-from-all-stream-iterate
  });

  test("ignore-system-events", async () => {
    // region ignore-system-events
    const events = client.readAll({
      direction: FORWARDS,
      fromPosition: START,
      maxCount: 10,
    });

    for await (const resolvedEvent of events) {
      if (resolvedEvent.event?.type.startsWith("$")) {
        continue;
      }

      console.log(resolvedEvent.event?.type);
    }
    // #endregion ignore-system-events
  });

  test("read-from-all-stream-backwards", async () => {
    // region read-from-all-stream-backwards
    const events = client.readAll({
      direction: BACKWARDS,
      fromPosition: END,
      maxCount: 10,
    });
    // endregion read-from-all-stream-backwards

    // #region read-from-all-stream-iterate
    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
    // #endregion read-from-all-stream-iterate

    return events;
  });

  test("read-from-all-overriding-credentials", async () => {
    // region read-all-overriding-user-credentials
    const credentials = {
      username: "admin",
      password: "changeit",
    };

    const events = client.readAll({
      direction: FORWARDS,
      fromPosition: START,
      credentials,
      maxCount: 10,
    });
    // endregion read-all-overriding-user-credentials

    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
  });

  test("filter-out-system-events", async () => {
    // region filter-out-system-events
    const events = client.readAll({
      direction: FORWARDS,
      fromPosition: START,
      maxCount: 10,
    });

    for await (const resolvedEvent of events) {
      if (resolvedEvent.event?.type.startsWith("$")) {
        continue;
      }
      console.log(resolvedEvent.event?.type);
    }
    // #endregion filter-out-system-events
  });

  test("read-from-all-stream-resolving-link-tos", async () => {
    // region read-from-all-stream-resolving-link-Tos
    const events = client.readAll({
      direction: BACKWARDS,
      fromPosition: END,
      resolveLinkTos: true,
      maxCount: 10,
    });
    // endregion read-from-all-stream-resolving-link-Tos

    // #region read-from-all-stream-iterate
    for await (const resolvedEvent of events) {
      console.log(resolvedEvent.event?.data);
    }
    // #endregion read-from-all-stream-iterate
  });
});
