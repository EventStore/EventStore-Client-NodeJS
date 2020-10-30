import { createInsecureTestCluster, createInsecureTestNode } from "../utils";

import {
  readEventsFromStream,
  writeEventsToStream,
  EventStoreConnection,
  EventData,
} from "../..";

describe("insecure", () => {
  const node = createInsecureTestNode();
  const cluster = createInsecureTestCluster();

  const event = EventData.json("test", { message: "test" });

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
        const connection = EventStoreConnection.connectionString`esdb://${node.uri}?tls=false`;

        const writeResult = await writeEventsToStream(STREAM_NAME)
          .send(event.build())
          .execute(connection);

        expect(writeResult).toBeDefined();

        const readResult = await readEventsFromStream(STREAM_NAME).execute(
          connection
        );

        expect(readResult).toBeDefined();
      });

      test("string argument", async () => {
        const STREAM_NAME = "string_stream";

        const connection = EventStoreConnection.connectionString(
          `esdb://${node.uri}?tls=false`
        );

        const writeResult = await writeEventsToStream(STREAM_NAME)
          .send(event.build())
          .execute(connection);

        expect(writeResult).toBeDefined();

        const readResult = await readEventsFromStream(STREAM_NAME).execute(
          connection
        );

        expect(readResult).toBeDefined();
      });
    });

    describe("singleNode", () => {
      test("template string", async () => {
        const STREAM_NAME = "template_string_stream";
        const connection = EventStoreConnection.connectionString`esdb://${cluster.endpoints
          .map(({ address, port }) => `${address}:${port}`)
          .join(",")}?tls=false&nodePreference=leader`;

        const writeResult = await writeEventsToStream(STREAM_NAME)
          .send(event.build())
          .execute(connection);

        expect(writeResult).toBeDefined();

        const readResult = await readEventsFromStream(STREAM_NAME).execute(
          connection
        );

        expect(readResult).toBeDefined();
      });

      test("string argument", async () => {
        const STREAM_NAME = "string_stream";
        const connectionString = `esdb://${cluster.endpoints
          .map(({ address, port }) => `${address}:${port}`)
          .join(",")}?tls=false&nodePreference=leader`;

        const connection = EventStoreConnection.connectionString(
          connectionString
        );

        const writeResult = await writeEventsToStream(STREAM_NAME)
          .send(event.build())
          .execute(connection);

        expect(writeResult).toBeDefined();

        const readResult = await readEventsFromStream(STREAM_NAME).execute(
          connection
        );

        expect(readResult).toBeDefined();
      });
    });
  });
});
