import { collect, createTestCluster } from "@test-utils";
import { jsonEvent, KurrentDBClient } from "@eventstore/db-client";

describe("cluster", () => {
  const cluster = createTestCluster();
  const STREAM_NAME = "test_stream_name";
  const event = jsonEvent({ type: "test", data: { message: "test" } });

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("should successfully connect", async () => {
    const client = new KurrentDBClient(
      { endpoints: cluster.endpoints },
      { rootCertificate: cluster.certs.root },
      { username: "admin", password: "changeit" }
    );

    const appendResult = await client.appendToStream(STREAM_NAME, event);
    const readResult = collect(
      client.readStream(STREAM_NAME, { maxCount: 10 })
    );

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });

  test("maxDiscoverAttempts", async () => {
    const maxDiscoverAttempts = 3;

    const client = new KurrentDBClient(
      {
        endpoints: [
          { address: "localhost", port: 8888 },
          { address: "localhost", port: 8889 },
          { address: "localhost", port: 8890 },
        ],
        maxDiscoverAttempts,
      },
      { rootCertificate: cluster.certs.root }
    );

    await expect(
      client.appendToStream(STREAM_NAME, event)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to discover after ${maxDiscoverAttempts} attempts."`
    );
  });

  test("discoverInterval", async () => {
    const maxDiscoverAttempts = 3;
    const endpoints = [
      { address: "localhost", port: 8888 },
      { address: "localhost", port: 8889 },
      { address: "localhost", port: 8890 },
    ];

    const client1DiscoveryInterval = 1;
    const client2DiscoveryInterval = 5_000;

    const client1Start = Date.now();
    const client1 = new KurrentDBClient({
      endpoints,
      maxDiscoverAttempts,
      discoveryInterval: client1DiscoveryInterval,
    });
    await expect(
      client1.appendToStream(STREAM_NAME, event)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to discover after ${maxDiscoverAttempts} attempts."`
    );
    const client1Duration = Date.now() - client1Start;

    const client2Start = Date.now();
    const client2 = new KurrentDBClient({
      endpoints,
      maxDiscoverAttempts,
      discoveryInterval: client2DiscoveryInterval,
    });
    await expect(
      client2.appendToStream(STREAM_NAME, event)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to discover after ${maxDiscoverAttempts} attempts."`
    );
    const client2Duration = Date.now() - client2Start;

    expect(client2Duration).toBeGreaterThan(client1Duration);
    expect(client2Duration).toBeGreaterThanOrEqual(
      client2DiscoveryInterval * maxDiscoverAttempts
    );

    const expectedDifference =
      client2DiscoveryInterval * maxDiscoverAttempts -
      client1DiscoveryInterval * maxDiscoverAttempts;

    const actualDifference = client2Duration - client1Duration;
    const discrepency = actualDifference - expectedDifference;
    const slop = 2000;

    expect(discrepency).toBeLessThanOrEqual(slop);
    expect(discrepency).toBeGreaterThanOrEqual(-slop);
  });
});
