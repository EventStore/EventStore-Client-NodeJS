import { createTestCluster } from "../utils";

import {
  readEventsFromStream,
  writeEventsToStream,
  EventStoreConnection,
  EventData,
  NodePreference,
  ErrorType,
  NotLeaderError,
} from "../../index";

describe("not-leader", () => {
  const cluster = createTestCluster();
  const STREAM_NAME = "test_stream_name";
  const event = EventData.json("test", { message: "test" });

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should get an error here", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(cluster.certPath)
      .gossipClusterConnection(cluster.endpoints, NodePreference.Follower);

    const writeResult = await writeEventsToStream(STREAM_NAME)
      .send(event.build())
      .execute(connection);

    expect(writeResult.__typename).toBe("success");

    const readFromStream = readEventsFromStream(STREAM_NAME)
      .count(10)
      .backward()
      .fromEnd()
      .requiresLeader();

    try {
      const readResult = await readFromStream.execute(connection);

      expect(readResult).toBe("unreachable");
    } catch (error) {
      expect(error).toBeInstanceOf(NotLeaderError);

      if (error instanceof NotLeaderError) {
        expect(error.type).toBe(ErrorType.NOT_LEADER);
        expect(error.leader).toBeDefined();
        expect(cluster.endpoints).toContainEqual(error.leader);

        const connection = EventStoreConnection.builder()
          .sslRootCertificate(cluster.certPath)
          .singleNodeConnection(error.leader);

        const readResult = await readFromStream.execute(connection);

        expect(readResult.__typename).toBe("success");
      }
    }
  });
});
