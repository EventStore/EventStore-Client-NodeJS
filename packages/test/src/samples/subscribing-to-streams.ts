import {
  START,
  KurrentDBClient,
  END,
  ReadRevision,
  JSONEventType,
  ResolvedEvent,
  AllStreamResolvedEvent,
  streamNameFilter,
  ReadPosition,
} from "@eventstore/db-client";
import { createTestNode, jsonTestEvents } from "@test-utils";

describe("[sample] server-side-filtering", () => {
  const log = console.log;
  const node = createTestNode();
  const handleEvent = jest.fn();
  let client!: KurrentDBClient;

  type SomeStreamEvents =
    | JSONEventType<"a", { a: true }>
    | JSONEventType<"b", { b: true }>;

  beforeAll(async () => {
    await node.up();
    client = new KurrentDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );

    await client.appendToStream("some-stream", jsonTestEvents());
    console.log = jest.fn();
  });

  afterAll(async () => {
    console.log = log;
    await node.down();
  });

  test("subscribe-to-stream", async () => {
    // region subscribe-to-stream
    const subscription =
      client.subscribeToStream<SomeStreamEvents>("some-stream");

    for await (const resolvedEvent of subscription) {
      console.log(
        `Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`
      );
      await handleEvent(resolvedEvent);
    }
    // endregion subscribe-to-stream

    async function handleEvent(_event: ResolvedEvent<SomeStreamEvents>) {
      await subscription.unsubscribe();
    }
  });

  test("subscribe-to-stream-from-position", async () => {
    // region subscribe-to-stream-from-position
    const subscription = client.subscribeToStream<SomeStreamEvents>(
      "some-stream",
      {
        fromRevision: BigInt(20),
      }
    );
    // endregion subscribe-to-stream-from-position

    await subscription.unsubscribe();
  });

  test("subscribe-to-stream-live", async () => {
    // region subscribe-to-stream-live
    const subscription = client.subscribeToStream<SomeStreamEvents>(
      "some-stream",
      {
        fromRevision: END,
      }
    );
    // endregion subscribe-to-stream-live

    await subscription.unsubscribe();
  });

  test("subscribe-to-stream-resolving-linktos", async () => {
    // region subscribe-to-stream-resolving-linktos
    const subscription = client.subscribeToStream<SomeStreamEvents>(
      "$et-myEventType",
      {
        fromRevision: START,
        resolveLinkTos: true,
      }
    );
    // endregion subscribe-to-stream-resolving-linktos

    await subscription.unsubscribe();
  });

  test("subscribe-to-stream-subscription-dropped", async () => {
    // region subscribe-to-stream-subscription-dropped
    let checkpoint: ReadRevision = START;

    const subscription = client
      .subscribeToStream<SomeStreamEvents>("some-stream", {
        fromRevision: checkpoint,
      })
      .on("data", (resolvedEvent) => {
        handleEvent(resolvedEvent);
        checkpoint = resolvedEvent.event?.revision ?? checkpoint;
      });
    // endregion subscribe-to-stream-subscription-dropped

    subscription.unsubscribe();
  });

  test("subscribeToAll", async () => {
    // region subscribe-to-all
    const subscription = client.subscribeToAll();

    for await (const resolvedEvent of subscription) {
      console.log(
        `Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`
      );
      await handleEvent(resolvedEvent);
    }
    // endregion subscribe-to-all

    async function handleEvent(_event: AllStreamResolvedEvent) {
      await subscription.unsubscribe();
    }
  });

  test("subscribe-to-all-from-position", async () => {
    // region subscribe-to-all-from-position
    const subscription = client.subscribeToAll({
      fromPosition: {
        commit: BigInt(1056),
        prepare: BigInt(1056),
      },
    });
    // endregion subscribe-to-all-from-position

    await subscription.unsubscribe();
  });

  test("subscribe-to-all-live", async () => {
    // region subscribe-to-all-live
    const subscription = client.subscribeToAll({
      fromPosition: END,
    });
    // endregion subscribe-to-all-live

    await subscription.unsubscribe();
  });

  test("stream-prefix-filtered-subscription", async () => {
    // region stream-prefix-filtered-subscription
    const subscription = client.subscribeToAll({
      filter: streamNameFilter({ prefixes: ["test-", "other-"] }),
    });
    // endregion stream-prefix-filtered-subscription

    await subscription.unsubscribe();
  });

  test("subscribe-to-all-subscription-dropped", async () => {
    // region subscribe-to-all-subscription-dropped
    let checkpoint: ReadPosition = START;

    const subscription = client
      .subscribeToAll({
        fromPosition: checkpoint,
      })
      .on("data", (resolvedEvent) => {
        handleEvent(resolvedEvent);
        checkpoint = resolvedEvent.event?.position ?? checkpoint;
      });
    // endregion subscribe-to-all-subscription-dropped

    await subscription.unsubscribe();
  });

  test("subscribeToAllOverridingUserCredentials", async () => {
    // region overriding-user-credentials
    const subscription = client.subscribeToStream<SomeStreamEvents>(
      "some-stream",
      {
        credentials: {
          username: "admin",
          password: "changeit",
        },
      }
    );
    // endregion overriding-user-credentials

    await subscription.unsubscribe();
  });
});
