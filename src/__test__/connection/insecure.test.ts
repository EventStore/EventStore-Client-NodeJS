import { collect, createInsecureTestNode } from "@test-utils";
import { EventStoreDBClient, jsonEvent } from "@eventstore/db-client";

describe("insecure", () => {
  const node = createInsecureTestNode();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ type: "test", data: { message: "test" } });

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  test("should successfully connect", async () => {
    const client = new EventStoreDBClient(
      { endpoint: node.uri },
      { insecure: true }
    );

    const appendResult = await client.appendToStream(STREAM_NAME, event);
    const readResult = await collect(
      client.readStream(STREAM_NAME, { maxCount: 10 })
    );

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });
});
