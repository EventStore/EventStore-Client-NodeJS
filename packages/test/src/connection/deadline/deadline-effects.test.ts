import { createTestCluster, jsonTestEvents } from "@test-utils";
import { KurrentDBClient, DeadlineExceededError } from "@eventstore/db-client";

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
          new KurrentDBClient(
            { endpoints: cluster.endpoints, defaultDeadline: 1 },
            { rootCertificate: cluster.certs.root },
            { username: "admin", password: "changeit" }
          ).listProjections(),
      ],
      [
        "call options",
        () =>
          new KurrentDBClient(
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
          new KurrentDBClient(
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
          new KurrentDBClient(
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
