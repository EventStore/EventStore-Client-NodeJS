import { collect, createTestCluster } from "@test-utils";
import {
  jsonEvent,
  FOLLOWER,
  ErrorType,
  NotLeaderError,
  EventStoreDBClient,
  BACKWARDS,
  END,
} from "@eventstore/db-client";

describe("not-leader", () => {
  const cluster = createTestCluster();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ type: "test", data: { message: "test" } });

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should get an error here", async () => {
    const followerClient = EventStoreDBClient.connectionString(cluster.connectionStringWithOverrides({
      nodePreference: FOLLOWER,
    }));

    const appendResult = await followerClient.appendToStream(
      STREAM_NAME,
      event
    );

    expect(appendResult).toBeDefined();

    const readFromTestStream = async (client: EventStoreDBClient) => {
      return collect(
        await client.readStream(STREAM_NAME, {
          maxCount: 10,
          direction: BACKWARDS,
          fromRevision: END,
          requiresLeader: true,
        })
      );
    };

    try {
      const readResult = await readFromTestStream(followerClient);

      expect(readResult).toBe("unreachable");
    } catch (error) {
      expect(error).toBeInstanceOf(NotLeaderError);

      if (error instanceof NotLeaderError) {
        expect(error.type).toBe(ErrorType.NOT_LEADER);
        expect(error.leader).toBeDefined();
        expect(cluster.endpoints).toContainEqual(error.leader);

        const leaderClient = EventStoreDBClient.connectionString(cluster.connectionStringWithOverrides({
          endpoints: [error.leader]
        }));

        const readResult = await readFromTestStream(leaderClient);

        expect(readResult).toBeDefined();
      }
    }
  });
});
