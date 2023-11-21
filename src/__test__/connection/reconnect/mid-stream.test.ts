/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestCluster,
  delay,
  getCurrentConnection,
  jsonTestEvents,
  matchServerVersion,
} from "@test-utils";
import {
  jsonEvent,
  EventStoreDBClient,
  CancelledError,
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
      { rootCertificate: cluster.rootCertificate },
      { username: "admin", password: "changeit" }
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
      if (matchServerVersion`<=23.10`) {
        // In ESDB versions below 24, the default value for
        // HostOptions.ShutdownTimeout in the .NET runtime is 5 seconds.  This
        // means the client will wait for 5 seconds for a server response before
        // timing out. If the server shuts down during this period, the client
        // will encounter a CancelledError. Previously, a CancelledError was
        // incorrectly thrown for keep alive ping errors due to a lack of error
        // handling in grpc-js. This issue was addressed in
        // https://github.com/grpc/grpc-node/pull/2563/commits/83789c15dbe9de3bc9069bc0d7c63f13d71f5b6e
        expect(error).toBeInstanceOf(CancelledError);
      } else {
        // Starting with ESDB version 24, the default ShutdownTimeout value has
        // been increased to 30 seconds. This change gives us a longer grace
        // period for the client to handle server shutdowns.
        expect(error).toBeInstanceOf(UnavailableError);
      }
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
