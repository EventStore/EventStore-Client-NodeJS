import { collect, createTestNode } from "@test-utils";
import { EventStoreDBClient, jsonEvent } from "@eventstore/db-client";

describe("singleNodeConnection", () => {
  const node = createTestNode();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ type: "test", data: { message: "test" } });

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  test("should successfully connect", async () => {
    const client = EventStoreDBClient.connectionString`esdb://admin:changeit@${node.uri}?tls=true&tlsCAFile=${node.certPath.root}`;

    const appendResult = await client.appendToStream(STREAM_NAME, event);
    const readResult = await collect(
      client.readStream(STREAM_NAME, { maxCount: 10 })
    );

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });
});
