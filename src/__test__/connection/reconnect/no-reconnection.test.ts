import { createTestCluster } from "@test-utils";
import {
  jsonEvent,
  EventStoreDBClient,
  StreamNotFoundError,
} from "@eventstore/db-client";

// This test can take time.
jest.setTimeout(120_000);

describe("reconnect", () => {
  test("no reconnection is made if error is not for reconnecting", async () => {
    const cluster = createTestCluster();

    await cluster.up();

    const client = new EventStoreDBClient(
      {
        endpoints: cluster.endpoints,
        // The timing of this test can be a bit variable,
        // so it's better not to have deadlines here to force the errors we are testing.
        defaultDeadline: Infinity,
      },
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const priorChannel = await (client as any).getChannel();

    try {
      // attempt to read a stream that doesnt exist
      for await (const event of client.readStream("doesn't-exist")) {
        expect(event).toBe("unreachable");
      }
    } catch (error) {
      expect(error).toBeInstanceOf(StreamNotFoundError);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const afterChannel = await (client as any).getChannel();

    expect(priorChannel).toBe(afterChannel);

    await cluster.down();
  });
});
