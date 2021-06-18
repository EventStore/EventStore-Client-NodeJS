import {
  collect,
  createInsecureTestCluster,
  createInsecureTestNode,
  createTestCluster,
  createTestNode,
  jsonTestEvents,
} from "../utils";

import { EventStoreDBClient } from "../..";

describe("connectionString", () => {
  const insecureSingleNode = createInsecureTestNode();
  const insecureCluster = createInsecureTestCluster();
  const secureSingleNode = createTestNode();
  const secureCluster = createTestCluster();

  beforeAll(async () => {
    await Promise.all([
      insecureSingleNode.up(),
      insecureCluster.up(),
      secureSingleNode.up(),
      secureCluster.up(),
    ]);
  });

  afterAll(async () => {
    await Promise.all([
      insecureSingleNode.down(),
      insecureCluster.down(),
      secureSingleNode.down(),
      secureCluster.down(),
    ]);
  });

  describe("should successfully connect with connection string", () => {
    describe.each([
      [
        "Secure Single Node", // name
        () => secureSingleNode.uri, // create uri
        () => `tlsCAFile=${secureSingleNode.certPath}`, // create query string
        "ssn", // stream prefix
      ],
      [
        "Secure Cluster",
        () =>
          secureCluster.endpoints
            .map(({ address, port }) => `${address}:${port}`)
            .join(","),
        () => `tlsCAFile=${secureCluster.certPath}`,
        "sc",
      ],
      [
        "Insecure Single Node",
        () => insecureSingleNode.uri,
        () => `tls=false`,
        "isn",
      ],
      [
        "Insecure Cluster",
        () =>
          insecureCluster.endpoints
            .map(({ address, port }) => `${address}:${port}`)
            .join(","),
        () => `tls=false`,
        "ic",
      ],
    ])("%s", (_, uri, query, prefix) => {
      test("template string", async () => {
        const STREAM_NAME = `${prefix}_template_string_stream`;
        const client = EventStoreDBClient.connectionString`esdb://${uri()}?${query()}`;

        const appendResult = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents()
        );
        const readResult = await collect(
          client.readStream(STREAM_NAME, {
            maxCount: 10,
          })
        );

        expect(appendResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      test("string argument", async () => {
        const STREAM_NAME = `${prefix}_string_stream`;

        const client = EventStoreDBClient.connectionString(
          `esdb://${uri()}?${query()}`
        );

        const appendResult = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents()
        );
        const readResult = await collect(
          client.readStream(STREAM_NAME, {
            maxCount: 10,
          })
        );

        expect(appendResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      test("default credentials", async () => {
        const client = EventStoreDBClient.connectionString`esdb://admin:changeit@${uri()}?${query()}`;
        await expect(
          collect(client.readAll({ maxCount: 10 }))
        ).resolves.toBeDefined();
      });
    });
  });
});
