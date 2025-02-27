import { collect, createInsecureTestNode } from "@test-utils";
import { KurrentDBClient, jsonEvent } from "@kurrent/db-client";

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
    const client = KurrentDBClient.connectionString(node.connectionString());

    const appendResult = await client.appendToStream(STREAM_NAME, event);
    const readResult = await collect(
      client.readStream(STREAM_NAME, { maxCount: 10 })
    );

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });
});
