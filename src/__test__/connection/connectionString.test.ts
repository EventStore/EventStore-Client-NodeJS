import { createInsecureTestCluster, createInsecureTestNode } from "../utils";

import { EventStoreDBClient, jsonEvent } from "../..";

describe("connectionString", () => {
  const node = createInsecureTestNode();
  const cluster = createInsecureTestCluster();

  const testEvent = () =>
    jsonEvent({ eventType: "test", payload: { message: "test" } });

  beforeAll(async () => {
    await node.up();
    await cluster.up();
  });

  afterAll(async () => {
    await node.down();
    await cluster.down();
  });

  describe("should successfully connect with connection string", () => {
    describe("singleNode", () => {
      test("template string", async () => {
        const STREAM_NAME = "template_string_stream";
        const client = EventStoreDBClient.connectionString`esdb://${node.uri}?tls=false`;

        const writeResult = await client.writeEventsToStream(
          STREAM_NAME,
          testEvent()
        );
        const readResult = await client.readEventsFromStream(STREAM_NAME, 10);

        expect(writeResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      test("string argument", async () => {
        const STREAM_NAME = "string_stream";

        const client = EventStoreDBClient.connectionString(
          `esdb://${node.uri}?tls=false`
        );

        const writeResult = await client.writeEventsToStream(
          STREAM_NAME,
          testEvent()
        );
        const readResult = await client.readEventsFromStream(STREAM_NAME, 10);

        expect(writeResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      // test("default credentials", async () => {
      //   const client = EventStoreDBClient.connectionString`esdb://admin:changeit@${node.uri}?tls=false`;
      //   await expect(client.readAllEvents()).resolves.toBeDefined();
      // });
    });

    describe("cluster", () => {
      test("template string", async () => {
        const STREAM_NAME = "template_string_stream";
        const gossipEndpoints = cluster.endpoints
          .map(({ address, port }) => `${address}:${port}`)
          .join(",");

        const client = EventStoreDBClient.connectionString`esdb://${gossipEndpoints}?tls=false&nodePreference=leader`;

        const writeResult = await client.writeEventsToStream(
          STREAM_NAME,
          testEvent()
        );

        const readResult = await client.readEventsFromStream(STREAM_NAME, 10);

        expect(writeResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      test("string argument", async () => {
        const STREAM_NAME = "string_stream";
        const gossipEndpoints = cluster.endpoints
          .map(({ address, port }) => `${address}:${port}`)
          .join(",");
        const connectionString = `esdb://${gossipEndpoints}?tls=false&nodePreference=leader`;

        const client = EventStoreDBClient.connectionString(connectionString);

        const writeResult = await client.writeEventsToStream(
          STREAM_NAME,
          testEvent()
        );
        const readResult = await client.readEventsFromStream(STREAM_NAME, 10);

        expect(writeResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      // test("default credentials", async () => {
      //   const gossipEndpoints = cluster.endpoints
      //     .map(({ address, port }) => `${address}:${port}`)
      //     .join(",");

      //   const client = EventStoreDBClient.connectionString`esdb://admin:changeit@${gossipEndpoints}?tls=false&nodePreference=leader`;

      //   await expect(client.readAllEvents()).resolves.toBeDefined();
      // });
    });
  });
});
