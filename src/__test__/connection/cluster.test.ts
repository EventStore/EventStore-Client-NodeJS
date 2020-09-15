import { createTestCluster } from "../utils";

import {
  readEventsFromStream,
  writeEventsToStream,
  EventStoreConnection,
  EventData,
} from "../..";

describe("cluster", () => {
  const cluster = createTestCluster();
  const STREAM_NAME = "test_stream_name";
  const event = EventData.json("test", { message: "test" });

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should successfully connect", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(cluster.certPath)
      .gossipClusterConnection(cluster.endpoints);

    const writeResult = await writeEventsToStream(STREAM_NAME)
      .send(event.build())
      .execute(connection);

    expect(writeResult.__typename).toBe("success");

    const readResult = await readEventsFromStream(STREAM_NAME).execute(
      connection
    );

    expect(readResult.__typename).toBe("success");
    expect(readResult.events).toBeDefined();
  });
});
