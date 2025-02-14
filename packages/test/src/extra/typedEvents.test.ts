import { createTestNode } from "@test-utils";
import {
  binaryEvent,
  BinaryEventType,
  KurrentDBClient,
  jsonEvent,
  JSONEventType,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from "@kurrent/db-client";

describe("typed events should compile", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("jsonEvent", () => {
    type MyFirstEvent = JSONEventType<
        "my-first-event",
        { hello: string },
        { meta: string }
    >;

    jsonEvent<MyFirstEvent>({
      type: "my-first-event",
      data: { hello: "hi" },
      metadata: { meta: "data" },
    });

    jsonEvent<MyFirstEvent>(
        // @ts-expect-error metadata is required in the event type
        {
          type: "my-first-event",
          data: { hello: "hi" },
        }
    );

    jsonEvent<MyFirstEvent>({
      // @ts-expect-error wrong type
      type: "my-second-event",
      data: { hello: "hi" },
      metadata: { meta: "data" },
    });

    type MyOtherEvent = JSONEventType<"my-other-event", { hello: string }>;

    // not specifying metadata in type means it is optional
    jsonEvent<MyOtherEvent>({
      type: "my-other-event",
      data: { hello: "hi" },
    });

    jsonEvent<MyOtherEvent>({
      type: "my-other-event",
      data: { hello: "hi" },
      metadata: { however: "I can pass something, if I need" },
    });

    // dont have to pass type
    jsonEvent({
      type: "any_event",
      data: { hello: "hi" },
      metadata: { meta: "data" },
    });

    // metadata is optional by default
    jsonEvent({
      type: "any_event",
      data: { hello: "hi" },
    });

    // @ts-expect-error wont take a BinaryEventType
    jsonEvent<BinaryEventType>({
      type: "any_event",
      data: { hello: "hi" },
    });
  });

  test("binaryEvent", () => {
    type MySecondEvent = BinaryEventType<"my-second-event", { meta: string }>;

    binaryEvent<MySecondEvent>({
      type: "my-second-event",
      data: new Uint8Array(),
      metadata: { meta: "data" },
    });

    binaryEvent<MySecondEvent>(
        // @ts-expect-error metadata is required in the event type
        {
          type: "my-second-event",
          data: new Uint8Array(),
        }
    );

    binaryEvent<MySecondEvent>({
      // @ts-expect-error wrong type
      type: "my-first-event",
      data: new Uint8Array(),
      metadata: { meta: "data" },
    });

    type MyOtherEvent = BinaryEventType<"my-other-event">;

    // not specifying metadata in type means it is optional
    binaryEvent<MyOtherEvent>({
      type: "my-other-event",
      data: new Uint8Array(),
    });

    binaryEvent<MyOtherEvent>({
      type: "my-other-event",
      data: new Uint8Array(),
      metadata: { however: "I can pass something, if I need" },
    });

    // dont have to pass type
    binaryEvent({
      type: "any_event",
      data: new Uint8Array(),
      metadata: { meta: "data" },
    });

    // metadata is optional by default
    binaryEvent({
      type: "any_event",
      data: new Uint8Array(),
    });

    // @ts-expect-error wont take a JSONEventType
    binaryEvent<JSONEventType>({
      type: "any_event",
      data: new Uint8Array(),
    });
  });

  test("readStream", async () => {
    const STREAM_NAME = "known_types_in_stream";

    // set up event types

    type MyEvent = JSONEventType<
        "my-event",
        { hello: string },
        { meta: string }
    >;

    type MyOtherEvent = JSONEventType<
        "my-other-event",
        { hi: string },
        { metadata: string }
    >;

    type KnownEvents = MyEvent | MyOtherEvent;

    const event1 = jsonEvent<MyEvent>({
      type: "my-event",
      data: { hello: "hi there" },
      metadata: { meta: "data" },
    });

    const event2 = jsonEvent<MyOtherEvent>({
      type: "my-other-event",
      data: { hi: "hello there" },
      metadata: { metadata: "goes here" },
    });

    await client.appendToStream(STREAM_NAME, [event1, event2]);

    for await (const { event } of await client.readStream<KnownEvents>(
        STREAM_NAME,
        {
          maxCount: 1,
        }
    )) {
      switch (event?.type) {
        case "my-event":
          // `hello` exists on the data of `my-event` so we can access it deirectly
          expect(event.data.hello).toBeDefined();
          break;
        case "my-other-event":
          // @ts-expect-error `hello` doesnt exist on `my-other-event`, so this errors
          expect(event.data.hello).not.toBeDefined();
          break;
      }
    }
  });

  test("subscribeToStream", async () => {
    const STREAM_NAME = "known_types_in_stream_subscription";

    // set up event types

    type MyGreatEvent = JSONEventType<
        "my-great-event",
        { yay: true; reason: string },
        { feels: string }
    >;

    enum WhatWentWrong {
      "bad-stuff",
      "kinda-bad-stuff",
    }

    type MyNotSoGreatEvent = JSONEventType<
        "my-not-so-great-event",
        { ohno: WhatWentWrong },
        { feels: string }
    >;

    type KnownEvents = MyGreatEvent | MyNotSoGreatEvent;

    const event1 = jsonEvent<MyGreatEvent>({
      type: "my-great-event",
      data: { yay: true, reason: "I wrote an event!" },
      metadata: { feels: "great" },
    });

    const event2 = jsonEvent<MyNotSoGreatEvent>({
      type: "my-not-so-great-event",
      data: { ohno: WhatWentWrong["kinda-bad-stuff"] },
      metadata: { feels: "terrible" },
    });

    await client.appendToStream(STREAM_NAME, [event1, event2]);

    for await (const { event } of client.subscribeToStream<KnownEvents>(
        STREAM_NAME
    )) {
      switch (event?.type) {
        case "my-great-event":
          // `yay` exists on the data of `my-event` so we can access it deirectly
          expect(event.data.yay).toBeDefined();
          // same here
          expect(event.metadata.feels).toBeDefined();
          break;
        case "my-not-so-great-event":
          //  jest infers this type as being `WhatWentWrong` so we can see that enum types work
          expect(event.data.ohno).not.toBe(WhatWentWrong["kinda-bad-stuff"]);
          break;
          // @ts-expect-error this type doesnt exist
        case "my-other-event":
          // event is never
          expect(event).not.toBeDefined();
          break;
      }

      // we only care about the TS here
      break;
    }
  });

  test("connectToPersistantSubscription", async () => {
    const STREAM_NAME = "known_types_in_persistent_subscription";
    const GROUP_NAME = "some_group";

    // set up event types

    type MyGreatEvent = JSONEventType<
        "my-great-event",
        { yay: true; reason: string },
        { feels: string }
    >;

    enum WhatWentWrong {
      "bad-stuff",
      "kinda-bad-stuff",
    }

    type MyNotSoGreatEvent = JSONEventType<
        "my-not-so-great-event",
        { ohno: WhatWentWrong },
        { feels: string }
    >;

    type KnownEvents = MyGreatEvent | MyNotSoGreatEvent;

    const event1 = jsonEvent<MyGreatEvent>({
      type: "my-great-event",
      data: { yay: true, reason: "I wrote an event!" },
      metadata: { feels: "great" },
    });

    const event2 = jsonEvent<MyNotSoGreatEvent>({
      type: "my-not-so-great-event",
      data: { ohno: WhatWentWrong["kinda-bad-stuff"] },
      metadata: { feels: "terrible" },
    });

    await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        GROUP_NAME,
        persistentSubscriptionToStreamSettingsFromDefaults()
    );

    await client.appendToStream(STREAM_NAME, [event1, event2]);

    for await (const {
      event,
    } of client.subscribeToPersistentSubscriptionToStream<KnownEvents>(
        STREAM_NAME,
        GROUP_NAME
    )) {
      switch (event?.type) {
        case "my-great-event":
          // `yay` exists on the data of `my-event` so we can access it deirectly
          expect(event.data.yay).toBeDefined();
          // same here
          expect(event.metadata.feels).toBeDefined();
          break;
        case "my-not-so-great-event":
          //  jest infers this type as being `WhatWentWrong` so we can see that enum types work
          expect(event.data.ohno).not.toBe(WhatWentWrong["kinda-bad-stuff"]);
          break;
          // @ts-expect-error this type doesnt exist
        case "my-other-event":
          // event is never
          expect(event).not.toBeDefined();
          break;
      }

      // we only care about the TS here
      break;
    }
  });
});
