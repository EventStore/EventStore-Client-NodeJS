import {
  START,
  EventStoreDBClient,
  excludeSystemEvents,
  eventTypeFilter,
  streamNameFilter,
} from "@eventstore/db-client";
import { createTestNode, jsonTestEvents } from "@test-utils";

describe("[sample] server-side-filtering", () => {
  const log = console.log;
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
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

  test("exclude-system", async () => {
    // region exclude-system
    const subscription = client
      .subscribeToAll({
        fromPosition: START,
        filter: excludeSystemEvents(),
      })
      .on("data", (resolvedEvent) => {
        console.log(
          `Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`
        );
      });
    // endregion exclude-system
    await subscription.unsubscribe();
  });

  test("event-type-prefix", async () => {
    // region event-type-prefix
    const filter = eventTypeFilter({
      prefixes: ["customer-"],
    });
    // endregion event-type-prefix

    return filter;
  });

  test("event-type-regex", async () => {
    // region event-type-regex
    const filter = eventTypeFilter({
      regex: "^user|^company",
    });
    // endregion event-type-regex

    return filter;
  });

  test("stream-prefix", async () => {
    // region stream-prefix
    const filter = streamNameFilter({
      prefixes: ["user-"],
    });
    // endregion stream-prefix
    return filter;
  });

  test("stream-regex", async () => {
    // region stream-regex
    const filter = streamNameFilter({
      regex: "^account|^savings",
    });
    // endregion stream-regex
    return filter;
  });

  test("checkpoint", async () => {
    const doSomethingAsync = async () => {
      // :shrug:
    };
    // region checkpoint
    excludeSystemEvents({
      async checkpointReached(_subscription, position) {
        // The subscription will wait until the promise is resolved
        // Save commit position to a persistent store as a checkpoint
        await doSomethingAsync();
        console.log(`checkpoint taken at ${position.commit}`);
      },
    });
    // endregion checkpoint
  });

  test("checkpoint-with-interval", async () => {
    // region checkpoint-with-interval
    const filter = eventTypeFilter({
      regex: "^[^$].*",
      checkpointInterval: 1000,
      checkpointReached(_subscription, position) {
        // Save commit position to a persistent store as a checkpoint
        console.log(`checkpoint taken at ${position.commit}`);
      },
    });
    // endregion checkpoint-with-interval
    return filter;
  });
});
