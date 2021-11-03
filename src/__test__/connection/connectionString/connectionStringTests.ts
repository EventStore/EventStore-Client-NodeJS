import { Cluster, collect, delay, jsonTestEvents } from "@test-utils";

import { EventStoreDBClient } from "@eventstore/db-client";

interface ConnectionStringTestsOptions {
  title: string;
  createServer: () => Cluster;
  createUri: (c: Cluster) => string;
  createQueryString: (c: Cluster) => string;
  streamPrefix: string;
}

export const connectionStringTests = ({
  title,
  createServer,
  createUri,
  createQueryString,
  streamPrefix,
}: ConnectionStringTestsOptions) =>
  describe(`connectionString ${title}`, () => {
    const server = createServer();

    beforeAll(async () => {
      await server.up();
    });

    afterAll(async () => {
      await server.down();
    });

    test("template string", async () => {
      const STREAM_NAME = `${streamPrefix}_template_string_stream`;
      const uri = createUri(server);
      const query = createQueryString(server);
      const client = EventStoreDBClient.connectionString`esdb://${uri}?${query}`;

      const appendResult = await client.appendToStream(
        STREAM_NAME,
        jsonTestEvents()
      );
      await delay(100);
      const readResult = await collect(
        client.readStream(STREAM_NAME, {
          maxCount: 10,
        })
      );

      expect(appendResult).toBeDefined();
      expect(readResult).toBeDefined();
    });

    test("string argument", async () => {
      const STREAM_NAME = `${streamPrefix}_string_stream`;
      const uri = createUri(server);
      const query = createQueryString(server);
      const client = EventStoreDBClient.connectionString(
        `esdb://${uri}?${query}`
      );

      const appendResult = await client.appendToStream(
        STREAM_NAME,
        jsonTestEvents()
      );
      await delay(100);
      const readResult = await collect(
        client.readStream(STREAM_NAME, {
          maxCount: 10,
        })
      );

      expect(appendResult).toBeDefined();
      expect(readResult).toBeDefined();
    });

    test("default credentials", async () => {
      const uri = createUri(server);
      const query = createQueryString(server);
      const client = EventStoreDBClient.connectionString`esdb://admin:changeit@${uri}?${query}`;
      await expect(
        collect(client.readAll({ maxCount: 10 }))
      ).resolves.toBeDefined();
    });
  });
