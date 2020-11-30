import { createTestCluster } from "../utils";

import { jsonEvent, EventStoreDBClient } from "../..";

describe("cluster", () => {
  const cluster = createTestCluster();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ eventType: "test", payload: { message: "test" } });

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should successfully connect", async () => {
    const client = new EventStoreDBClient(
      { endpoints: cluster.endpoints },
      { rootCertificate: cluster.rootCertificate }
    );

    const writeResult = await client.writeEventsToStream(STREAM_NAME, event);
    const readResult = await client.readEventsFromStream(STREAM_NAME, 10);

    expect(writeResult).toBeDefined();
    expect(readResult).toBeDefined();
  });
});
