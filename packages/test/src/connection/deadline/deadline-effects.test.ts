import { createTestCluster, jsonTestEvents } from "@test-utils";
import {
  EventStoreDBClient,
  DeadlineExceededError,
} from "@eventstore/db-client";

describe("deadline", () => {
  const cluster = createTestCluster();

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  describe("should time out a call", () => {
    test.each([
      [
        "client settings",
        () =>
          EventStoreDBClient.connectionString`esdb://admin:changeit@${cluster.uri}?tlsCaFile=${cluster.certPath.root}&defaultDeadline=1`.listProjections(),
      ],
      [
        "call options",
        () =>
          EventStoreDBClient.connectionString`esdb://admin:changeit@${cluster.uri}?tlsCaFile=${cluster.certPath.root}`.listProjections(
            {
              deadline: 1,
            }
          ),
      ],
      [
        "call options override",
        () =>
          EventStoreDBClient.connectionString`esdb://admin:changeit@${cluster.uri}?tlsCaFile=${cluster.certPath.root}&defaultDeadline=200000`.listProjections(
            {
              deadline: 1,
            }
          ),
      ],
      [
        "append",
        () =>
          EventStoreDBClient.connectionString`esdb://admin:changeit@${cluster.uri}?tlsCaFile=${cluster.certPath.root}&defaultDeadline=200000`.appendToStream(
            "deadline",
            jsonTestEvents(),
            {
              deadline: 1,
            }
          ),
      ],
    ])("%s", async (_, makeCall) => {
      try {
        await makeCall();
      } catch (error) {
        expect(error).toBeInstanceOf(DeadlineExceededError);
      }
    });
  });
});
