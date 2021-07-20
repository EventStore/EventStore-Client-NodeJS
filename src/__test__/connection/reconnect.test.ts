import { createTestCluster, delay, jsonTestEvents } from "../utils";

import {
  jsonEvent,
  EventStoreDBClient,
  UnavailableError,
  FOLLOWER,
  NotLeaderError,
  EndPoint,
} from "../..";

describe("reconnect", () => {
  test("UnavailableError", async () => {
    const cluster = createTestCluster();

    await cluster.up();

    const client = new EventStoreDBClient(
      { endpoints: cluster.endpoints },
      { rootCertificate: cluster.rootCertificate }
    );

    // make successful append to connect to node
    const firstAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "first-append", data: { message: "test" } })
    );
    expect(firstAppend).toBeDefined();

    // Kill node we are connected to
    const activeConnection = await getCurrentConnection(client);
    await cluster.killNode(activeConnection);

    // next append should fail, triggering reconnection
    try {
      const secondAppend = await client.appendToStream(
        "my_stream",
        jsonEvent({ type: "failed-append", data: { message: "test" } })
      );
      expect(secondAppend).toBe("Unreachable");
    } catch (error) {
      expect(error).toBeInstanceOf(UnavailableError);
    }

    // next append should succeed, as it has connected to another node
    // but it might take a couple of tries
    let i = 0;
    while (++i < 20) {
      try {
        const reconnectedAppend = await client.appendToStream(
          "my_stream",
          jsonEvent({ type: "reconnect-append", data: { message: "test" } })
        );
        expect(reconnectedAppend).toBeDefined();
        break;
      } catch (error) {
        await delay(200);
      }
    }

    expect(i).toBeLessThan(20);

    await cluster.down();
  });

  test("NotLeaderError (should reconnect to leader)", async () => {
    const cluster = createTestCluster();

    await cluster.up();

    const client = new EventStoreDBClient(
      { endpoints: cluster.endpoints, nodePreference: FOLLOWER },
      { rootCertificate: cluster.rootCertificate }
    );

    // make successful append to follower node
    const firstAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "first-append", data: { message: "test" } })
    );
    expect(firstAppend).toBeDefined();

    let leader!: EndPoint;
    try {
      // state that append requires leader, causing failure
      const secondAppend = await client.appendToStream(
        "my_stream",
        jsonEvent({ type: "failed-append", data: { message: "test" } }),
        { requiresLeader: true }
      );
      expect(secondAppend).toBe("Unreachable");
    } catch (error) {
      expect(error).toBeInstanceOf(NotLeaderError);

      if (error instanceof NotLeaderError) {
        leader = error.leader;
      }
    }

    // next append should succeed, as it has connected to another node
    const reconnectedAppend = await client.appendToStream(
      "my_stream",
      jsonEvent({ type: "reconnect-append", data: { message: "test" } }),
      { requiresLeader: true }
    );
    expect(reconnectedAppend).toBeDefined();

    const { address, port } = await getCurrentConnection(client);

    expect(address).toEqual(leader.address);
    expect(port).toEqual(port);

    await cluster.down();
  });

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
      jsonTestEvents(2000)
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

    // next append should succeed, as it has connected to another node
    // but it might take a couple of tries
    let i = 0;
    while (++i < 20) {
      try {
        const reconnectedAppend = await client.appendToStream(
          "my_stream",
          jsonEvent({ type: "reconnect-append", data: { message: "test" } })
        );
        expect(reconnectedAppend).toBeDefined();
        break;
      } catch (error) {
        await delay(200);
      }
    }

    expect(i).toBeLessThan(20);

    await cluster.down();
  });
});

const getCurrentConnection = async (
  client: EventStoreDBClient
): Promise<EndPoint> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const channel = await (client as any).getChannel();
  const [_protocol, address, port] = channel.getTarget().split(":");
  return {
    address,
    port: Number.parseInt(port),
  };
};
