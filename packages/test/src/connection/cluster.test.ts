import { collect, ConnectionFeatures, createTestCluster } from "@test-utils";
import { jsonEvent, EventStoreDBClient } from "@eventstore/db-client";

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
    const client = EventStoreDBClient.connectionString(
      cluster.connectionString()
    );

    const appendResult = await client.appendToStream(STREAM_NAME, event);
    const readResult = collect(
      await client.readStream(STREAM_NAME, { maxCount: 10 })
    );

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });

  test("maxDiscoverAttempts", async () => {
    const maxDiscoverAttempts = 3;
    const client = EventStoreDBClient.connectionString(
      cluster.connectionStringWithOverrides({
        endpoints: [
          { address: "localhost", port: 8888 },
          { address: "localhost", port: 8889 },
          { address: "localhost", port: 8890 },
        ],

        maxDiscoverAttempts: 3,
      })
    );

    await expect(
      client.appendToStream(STREAM_NAME, event)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to discover after ${maxDiscoverAttempts} attempts."`
    );
  });

  test("discoverInterval", async () => {
    let overrides: ConnectionFeatures = {
      endpoints: [
        { address: "localhost", port: 8888 },
        { address: "localhost", port: 8889 },
        { address: "localhost", port: 8890 },
      ],

      maxDiscoverAttempts: 3,
      discoveryInterval: 1,
    };

    const client1DiscoveryInterval = overrides.discoveryInterval!;
    const client1 = EventStoreDBClient.connectionString(
      cluster.connectionStringWithOverrides(overrides)
    );
    const client1Start = Date.now();

    await expect(
      client1.appendToStream(STREAM_NAME, event)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to discover after ${overrides.maxDiscoverAttempts} attempts."`
    );
    const client1Duration = Date.now() - client1Start;

    overrides.discoveryInterval = 5_000;
    const client2Start = Date.now();
    const client2 = EventStoreDBClient.connectionString(
      cluster.connectionStringWithOverrides(overrides)
    );
    await expect(
      client2.appendToStream(STREAM_NAME, event)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to discover after ${overrides.maxDiscoverAttempts} attempts."`
    );
    const client2Duration = Date.now() - client2Start;

    expect(client2Duration).toBeGreaterThan(client1Duration);
    expect(client2Duration).toBeGreaterThanOrEqual(
      overrides.discoveryInterval * overrides.maxDiscoverAttempts!
    );

    const expectedDifference =
      overrides.discoveryInterval * overrides.maxDiscoverAttempts! -
      client1DiscoveryInterval * overrides.maxDiscoverAttempts!;

    const actualDifference = client2Duration - client1Duration;
    const discrepency = actualDifference - expectedDifference;
    const slop = 2000;

    expect(discrepency).toBeLessThanOrEqual(slop);
    expect(discrepency).toBeGreaterThanOrEqual(-slop);
  });
});
