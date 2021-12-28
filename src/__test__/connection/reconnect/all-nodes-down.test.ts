import { createTestCluster, delay } from "@test-utils";
import {
  jsonEvent,
  EventStoreDBClient,
  UnavailableError,
} from "@eventstore/db-client";

// This test can take time.
jest.setTimeout(120_000);

describe("reconnect", () => {
  test("All nodes down", async () => {
    const cluster = createTestCluster();

    await cluster.up();

    const client = new EventStoreDBClient(
      { endpoints: cluster.endpoints },
      { rootCertificate: cluster.rootCertificate }
    );

    // make successful append to connect to node
    const firstAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "first-append", data: { message: "test" } }),
      // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(firstAppend).toBeDefined();

    // Kill all nodes
    for (const endpoint of cluster.endpoints) {
      await cluster.killNode(endpoint);
    }

    // next append should fail
    try {
      const secondAppend = await client.appendToStream(
        "my_stream",
        jsonEvent({ type: "failed-append", data: { message: "test" } }),
        // batch append triggers reconnect as soon as stream drops, so we need to force regular append
        { credentials: { username: "admin", password: "changeit" } }
      );
      expect(secondAppend).toBe("Unreachable");
    } catch (error) {
      expect(error).toBeInstanceOf(UnavailableError);
    }

    // next append should also fail, as there is nothing to reconnect to reconnection  fail
    try {
      const secondAppend = await client.appendToStream(
        "my_stream",
        jsonEvent({ type: "failed-append", data: { message: "test" } }),
        // batch append triggers reconnect as soon as stream drops, so we need to force regular append
        { credentials: { username: "admin", password: "changeit" } }
      );
      expect(secondAppend).toBe("Unreachable");
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: Failed to discover after 10 attempts.]`
      );
    }

    // resurrect all nodes
    await cluster.resurrect();

    // wait for leader to be ready
    await delay(5000);

    const reconnectedAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "reconnect-append", data: { message: "test" } }),
      // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(reconnectedAppend).toBeDefined();

    await cluster.down();
  });
});
