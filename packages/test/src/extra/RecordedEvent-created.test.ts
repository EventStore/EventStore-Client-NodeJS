import { createTestNode, jsonTestEvents, delay } from "@test-utils";
import { KurrentDBClient } from "@kurrent/db-client";

describe("RecordedEvent created", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("Should be a Date", async () => {
    const STREAM_NAME = "test_stream_name";
    await client.appendToStream(STREAM_NAME, jsonTestEvents());
    for await (const { event } of client.readStream(STREAM_NAME)) {
      expect(event).toBeDefined;
      expect(event?.created).toBeInstanceOf(Date);
    }
  });

  test.skip("Should correctly converted from Ticks", async () => {
    const STREAM_NAME = "correct_conversion";

    // The db / test is running on the same box, so we can assume that the time lines up
    const before = Date.now();
    await client.appendToStream(STREAM_NAME, jsonTestEvents());
    const after = Date.now();

    // Lets wait 5 seconds before reading
    await delay(5_000);

    for await (const { event } of client.readStream(STREAM_NAME)) {
      expect(event?.created.valueOf()).toBeGreaterThanOrEqual(before);
      expect(event?.created.valueOf()).toBeLessThanOrEqual(after);
    }
  });
});
