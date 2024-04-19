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
            { rootCertificate: cluster.certs.root },
            { username: "admin", password: "changeit" }
          ).listProjections(),
      ],
      [
        "call options",
        () =>
          new EventStoreDBClient(
            { endpoints: cluster.endpoints },
            { rootCertificate: cluster.certs.root },
            { username: "admin", password: "changeit" }
          ).listProjections({
            deadline: 1,
          }),
      ],
      [
        "call options override",
        () =>
          new EventStoreDBClient(
            { endpoints: cluster.endpoints, defaultDeadline: 200_000 },
            { rootCertificate: cluster.certs.root },
            { username: "admin", password: "changeit" }
          ).listProjections({
            deadline: 1,
          }),
      ],
      [
        "append",
        () =>
          new EventStoreDBClient(
            { endpoints: cluster.endpoints, defaultDeadline: 200_000 },
            { rootCertificate: cluster.certs.root },
            { username: "admin", password: "changeit" }
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
