import { createTestCluster } from "../utils";

import {
  jsonEvent,
  FOLLOWER,
  ErrorType,
  NotLeaderError,
  EventStoreDBClient,
} from "../..";
import { BACKWARD, END } from "../../constants";

describe("not-leader", () => {
  const cluster = createTestCluster();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ eventType: "test", payload: { message: "test" } });

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should get an error here", async () => {
    const followerClient = new EventStoreDBClient(
      {
        endpoints: cluster.endpoints,
        nodePreference: FOLLOWER,
      },
      { rootCertificate: cluster.rootCertificate }
    );

    const appendResult = await followerClient.appendToStream(
      STREAM_NAME,
      event
    );

    expect(appendResult).toBeDefined();

    const readFromTestStream = (client: EventStoreDBClient) => {
      return client.readStream(STREAM_NAME, 10, {
        direction: BACKWARD,
        fromRevision: END,
        requiresLeader: true,
      });
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

        const leaderClient = new EventStoreDBClient(
          {
            endpoint: error.leader,
          },
          { rootCertificate: cluster.rootCertificate }
        );

        const readResult = await readFromTestStream(leaderClient);

        expect(readResult).toBeDefined();
      }
    }
  });
});
