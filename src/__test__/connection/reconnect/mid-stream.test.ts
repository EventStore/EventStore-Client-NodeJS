import {
  createTestCluster,
  delay,
  getCurrentConnection,
  jsonTestEvents,
} from "@test-utils";
import {
  jsonEvent,
  EventStoreDBClient,
  UnavailableError,
} from "@eventstore/db-client";

// This test can take time.
jest.setTimeout(120_000);

describe("reconnect", () => {
  test("Connection error mid stream should cause a reconnect", async () => {
    const cluster = createTestCluster();

    await cluster.up();

    const client = new EventStoreDBClient(
      { endpoints: cluster.endpoints },
      { rootCertificate: cluster.rootCertificate }
    );

    // make successful append of 2000 events to node
    const firstAppend = await client.appendToStream(
      "my_stream",
      jsonTestEvents(2000),
      // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(firstAppend).toBeDefined();

    try {
      let i = 0;
      for await (const event of client.readStream("my_stream")) {
        expect(event).toBeDefined();

        if (i === 12) {
          // Kill node we are connected to
          const activeConnection = await getCurrentConnection(client);
          await cluster.killNode(activeConnection);
        }

        i++;
      }

      expect(i).toBe("unreachable");
    } catch (error) {
      expect(error).toBeInstanceOf(UnavailableError);
    }

    // wait for leader to be ready
    await delay(5000);

    const reconnectedAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "reconnect-append", data: { message: "test" } }), // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(reconnectedAppend).toBeDefined();

    await cluster.down();
  });
});
