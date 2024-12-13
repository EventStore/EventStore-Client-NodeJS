import { relative, resolve } from "path";

import { collect, createTestNode, jsonTestEvents } from "@test-utils";
import { KurrentDBClient } from "@eventstore/db-client";

describe("tlsCAFile", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  test.each([
    ["relative", () => relative(process.cwd(), node.certPath.root)],
    [
      "absolute",
      // in case node.certPath.root implementation changes to be relative, make certain it is absolute
      () => resolve(process.cwd(), relative(process.cwd(), node.certPath.root)),
    ],
  ])("Path can be %s", async (name, tlsCAFile) => {
    const STREAM_NAME = `${name}_stream`;

    const client = KurrentDBClient.connectionString`esdb://admin:changeit@${
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
        KurrentDBClient.connectionString`esdb://admin:changeit@${node.uri}?tlsCAFile=/some/path.ca`
    ).toThrowErrorMatchingSnapshot();
  });
});
