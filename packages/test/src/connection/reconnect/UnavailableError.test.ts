import { createTestCluster, delay, getCurrentConnection } from "@test-utils";
import {
  jsonEvent,
  EventStoreDBClient,
  UnavailableError,
} from "@eventstore/db-client";

import { setLogger, setLogVerbosity, logVerbosity } from "@grpc/grpc-js";

setLogVerbosity(logVerbosity.DEBUG);

setLogger(console);

// This test can take time.
jest.setTimeout(120_000);

describe("reconnect", () => {
  test("UnavailableError", async () => {
    const cluster = createTestCluster();

    await cluster.up();

    // The timing of this test can be a bit variable,
    // so it's better not to have deadlines here to force the errors we are testing.
    const client = EventStoreDBClient.connectionString`esdb://admin:changeit@${cluster.uri}?tls=true&tlsCAFile=${cluster.certPath.root}&defaultDeadline=Infinity`;

    // make successful append to connect to node
    const firstAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "first-append", data: { message: "test" } }),
      // batch append triggers reconnect as soon as stream drops, so we need to force regular append
      { credentials: { username: "admin", password: "changeit" } }
    );
    expect(firstAppend).toBeDefined();

    // Kill node we are connected to
    const activeConnection = await getCurrentConnection(client);
    await cluster.killNode(activeConnection);

    // next append should fail, triggering reconnection
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
