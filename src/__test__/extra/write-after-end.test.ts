/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestNode,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalTest,
} from "@test-utils";
import { EventStoreDBClient, UnavailableError } from "@eventstore/db-client";

// These tests can take time.
jest.setTimeout(120_000);

describe("write after end", () => {
  test("Should not write after end", async () => {
    const node = createTestNode();
    await node.up();

    const client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    const STREAM_NAME = "json_stream_name";
    await client.appendToStream(STREAM_NAME, jsonTestEvents(), {
      // credentials enforces classic append
      credentials: { username: "admin", password: "changeit" },
    });

    const writeUntilError = () =>
      new Promise((resolve) => {
        const writeOnLoop = (): Promise<never> =>
          client
            .appendToStream(STREAM_NAME, jsonTestEvents(30_000), {
              // credentials enforces classic append
              credentials: { username: "admin", password: "changeit" },
            })
            .then(writeOnLoop);

        writeOnLoop().catch((e) => {
          resolve(e);
        });
      });

    const errorPromise = writeUntilError();

    await node.killNode(node.endpoints[0]);

    const error = await errorPromise;
    expect(error).toBeInstanceOf(UnavailableError);

    // wait for any unhandled rejections
    await delay(5_000);

    await node.down();
  });

  optionalTest(matchServerVersion`>=21.10`)(
    "Should not write after end (batch append)",
    async () => {
      const node = createTestNode();
      await node.up();

      const client = new EventStoreDBClient(
        { endpoint: node.uri },
        { rootCertificate: node.rootCertificate },
        { username: "admin", password: "changeit" }
      );

      const STREAM_NAME = "json_stream_name";
      await client.appendToStream(STREAM_NAME, jsonTestEvents());

      const writeUntilError = () =>
        new Promise((resolve) => {
          const writeOnLoop = (): Promise<never> =>
            client
              .appendToStream(STREAM_NAME, jsonTestEvents(30_000))
              .then(writeOnLoop);

          writeOnLoop().catch((e) => {
            resolve(e);
          });
        });

      const errorPromise = writeUntilError();

      await node.killNode(node.endpoints[0]);

      const error = await errorPromise;
      expect(error).toBeInstanceOf(UnavailableError);

      // wait for any unhandled rejections
      await delay(5_000);
    }
  );
});
