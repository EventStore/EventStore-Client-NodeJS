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
          new EventStoreDBClient(
            { endpoints: cluster.endpoints, defaultDeadline: 1 },
            { rootCertificate: cluster.rootCertificate }
          ).listProjections(),
      ],
      [
        "call options",
        () =>
          new EventStoreDBClient(
            { endpoints: cluster.endpoints },
            { rootCertificate: cluster.rootCertificate }
          ).listProjections({
            deadline: 1,
          }),
      ],
      [
        "call options override",
        () =>
          new EventStoreDBClient(
            { endpoints: cluster.endpoints, defaultDeadline: 200_000 },
            { rootCertificate: cluster.rootCertificate }
          ).listProjections({
            deadline: 1,
          }),
      ],
      [
        "append",
        () =>
          new EventStoreDBClient(
            { endpoints: cluster.endpoints, defaultDeadline: 200_000 },
            { rootCertificate: cluster.rootCertificate }
          ).appendToStream("deadline", jsonTestEvents(), {
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
