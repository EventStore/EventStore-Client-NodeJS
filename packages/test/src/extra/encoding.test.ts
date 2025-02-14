import { createTestNode } from "@test-utils";
import {
  KurrentDBClient,
  jsonEvent,
  ResolvedEvent,
  START,
} from "@kurrent/db-client";

describe("encoding", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("U+0018", async () => {
    const STREAM_NAME = "cancel";

    const cancelEvent = jsonEvent({
      type: "something",
      data: {
        char: "",
      },
    });

    await client.appendToStream(STREAM_NAME, cancelEvent);

    let resolvedEvent!: ResolvedEvent;

    for await (const event of await client.readStream(STREAM_NAME, {
      maxCount: 1,
      fromRevision: START,
    })) {
      resolvedEvent = event;
    }

    const event = resolvedEvent.event!;

    expect(event.data).toMatchObject({
      char: "",
    });
  });

  test("U+0118", async () => {
    const STREAM_NAME = "ogonek";

    const eEvent = jsonEvent({
      type: "something",
      data: {
        char: "Ę",
      },
    });

    await client.appendToStream(STREAM_NAME, eEvent);

    let resolvedEvent!: ResolvedEvent;

    for await (const event of await client.readStream(STREAM_NAME, {
      maxCount: 1,
      fromRevision: START,
    })) {
      resolvedEvent = event;
    }

    const event = resolvedEvent.event!;

    expect(event.data).toMatchObject({
      char: "Ę",
    });
  });
});
