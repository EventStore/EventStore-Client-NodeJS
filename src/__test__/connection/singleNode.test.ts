import { createTestNode } from "../utils";

import { EventStoreDBClient, jsonEvent } from "../..";

describe("singleNodeConnection", () => {
  const node = createTestNode();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ eventType: "test", payload: { message: "test" } });

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  test("should successfully connect", async () => {
    const client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate }
    );

    const appendResult = await client.appendToStream(STREAM_NAME, event);
    const readResult = await client.readStream(STREAM_NAME, 10);

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });
});
