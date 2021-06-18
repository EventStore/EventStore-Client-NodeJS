import { collect, createTestNode, jsonTestEvents } from "../utils";
import { EventStoreDBClient } from "../..";
import { relative, resolve } from "path";

describe("tlsCAFile", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  test.each([
    ["relative", () => relative(process.cwd(), node.certPath)],
    [
      "absolute",
      // in case node.certPath implementation changes to be relative, make certain it is absolute
      () => resolve(process.cwd(), relative(process.cwd(), node.certPath)),
    ],
  ])("Path can be %s", async (name, tlsCAFile) => {
    const STREAM_NAME = `${name}_stream`;

    const client = EventStoreDBClient.connectionString`esdb://${
      node.uri
    }?tlsCAFile=${tlsCAFile()}`;

    const appendResult = await client.appendToStream(
      STREAM_NAME,
      jsonTestEvents()
    );
    const readResult = await collect(
      client.readStream(STREAM_NAME, { maxCount: 10 })
    );

    expect(appendResult).toBeDefined();
    expect(readResult).toBeDefined();
  });

  test("If a file was not found, error should be thrown", () => {
    expect(
      () =>
        EventStoreDBClient.connectionString`esdb://${node.uri}?tlsCAFile=/some/path.ca`
    ).toThrowErrorMatchingSnapshot();
  });
});
