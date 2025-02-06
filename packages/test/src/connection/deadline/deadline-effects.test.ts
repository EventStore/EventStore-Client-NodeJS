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
          EventStoreDBClient.connectionString(cluster.connectionStringWithOverrides({
            defaultDeadline: 1,
          })).listProjections(),
      ],
      [
        "call options",
        () =>
          EventStoreDBClient.connectionString(cluster.connectionString()).listProjections({
            deadline: 1,
          }),
      ],
      [
        "call options override",
        () =>
          EventStoreDBClient.connectionString(cluster.connectionStringWithOverrides({
            defaultDeadline: 200_000,
          })).listProjections({
            deadline: 1,
          }),
      ],
      [
        "append",
        () =>
          EventStoreDBClient.connectionString(cluster.connectionStringWithOverrides({
            defaultDeadline: 200_000,
          })).appendToStream("deadline", jsonTestEvents(), {
            deadline: 1,
          }),
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
