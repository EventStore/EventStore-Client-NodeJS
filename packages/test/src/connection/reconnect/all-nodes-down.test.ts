import { collect, createTestCluster, delay } from "@test-utils";
import {
  jsonEvent,
  KurrentDBClient,
  UnavailableError,
  persistentSubscriptionToStreamSettingsFromDefaults,
  StreamNotFoundError,
} from "@kurrent/db-client";

// This test can take time.
jest.setTimeout(120_000);

const STREAM_NAME = "my_stream";

describe("reconnect", () => {
  const cluster = createTestCluster();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await cluster.up();

    client = KurrentDBClient.connectionString(
      cluster.connectionStringWithOverrides({
        defaultDeadline: 100_000_000,
      })
    );
  });

  afterAll(async () => {
    await cluster.down();
  });

  test("All nodes down", async () => {
    // make successful append to connect to node
    const firstAppend = await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: "first-append", data: { message: "test" } }),
      // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(firstAppend).toBeDefined();

    // read the stream successfully
    const firstReadStream = await collect(
      await client.readStream(STREAM_NAME, { maxCount: 10 })
    );
    expect(firstReadStream.length).toBe(1);
    const firstEvent = firstReadStream[0].event;
    expect(firstEvent?.data).toStrictEqual({ message: "test" });
    expect(firstEvent?.type).toBe("first-append");

    // make successfull subscription to stream
    const firstCreateSubscription =
      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        "first-test-group",
        persistentSubscriptionToStreamSettingsFromDefaults()
      );
    expect(firstCreateSubscription).toBeUndefined();

    // delete the stream successfully
    const firstDeleteStream = await client.deleteStream(STREAM_NAME);
    expect(firstDeleteStream).toBeDefined();
    await expect(
      collect(await client.readStream(STREAM_NAME, { maxCount: 10 }))
    ).rejects.toThrowError(StreamNotFoundError);

    // Kill all nodes
    for (const endpoint of cluster.endpoints) {
      await cluster.killNode(endpoint);
    }

    // next client operations should fail

    // append to stream
    await expect(
      client.appendToStream(
        STREAM_NAME,
        jsonEvent({ type: "failed-append", data: { message: "test" } }),
        // batch append triggers reconnect as soon as stream drops, so we need to force regular append
        { credentials: { username: "admin", password: "changeit" } }
      )
    ).rejects.toThrowError(UnavailableError);
    // read the stream
    await expect(async () => {
      let count = 0;
      for await (const e of await client.readStream(STREAM_NAME, {
        maxCount: 10,
      })) {
        count++;
      }
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );
    // create subsctiption
    await expect(
      client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        "second-test-group",
        persistentSubscriptionToStreamSettingsFromDefaults()
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );
    // delete stream
    await expect(
      client.deleteStream(STREAM_NAME)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );

    // next operations should also fail, as there is nothing to reconnect to reconnection fail
    // append to stream
    await expect(
      client.appendToStream(
        STREAM_NAME,
        jsonEvent({ type: "failed-append", data: { message: "test" } }),
        // batch append triggers reconnect as soon as stream drops, so we need to force regular append
        { credentials: { username: "admin", password: "changeit" } }
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );
    // read the stream
    await expect(async () => {
      let count = 0;
      for await (const e of await client.readStream(STREAM_NAME, {
        maxCount: 10,
      })) {
        count++;
      }
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );
    // create subsctiption
    await expect(
      client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        "third-test-group",
        persistentSubscriptionToStreamSettingsFromDefaults()
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );
    // delete stream
    await expect(
      client.deleteStream(STREAM_NAME)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to discover after 10 attempts."'
    );

    // resurrect all nodes
    await cluster.resurrect();

    // wait for leader to be ready
    await delay(5000);

    const reconnectedAppend = await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: "reconnect-append", data: { message: "test" } }),
      // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(reconnectedAppend).toBeDefined();

    const reconnectReadStream = await collect(
      await client.readStream(STREAM_NAME, { maxCount: 10 })
    );
    expect(reconnectReadStream.length).toBe(1);
    const reconnectEvent = reconnectReadStream[0].event;
    expect(reconnectEvent?.data).toStrictEqual({ message: "test" });
    expect(reconnectEvent?.type).toBe("reconnect-append");

    const reconndectedCreateSubscription =
      await client.createPersistentSubscriptionToStream(
        STREAM_NAME,
        "fourth-test-group",
        persistentSubscriptionToStreamSettingsFromDefaults()
      );
    expect(reconndectedCreateSubscription).toBeUndefined();

    const reconnectedDeleteStream = await client.deleteStream(STREAM_NAME);
    expect(reconnectedDeleteStream).toBeDefined();
    await expect(
      collect(await client.readStream(STREAM_NAME, { maxCount: 10 }))
    ).rejects.toThrowError(StreamNotFoundError);
  });
});
