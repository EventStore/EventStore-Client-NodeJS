/** @jest-environment ./src/utils/enableVersionCheck.ts */

import { createTestNode, delay, jsonTestEvents } from "@test-utils";
import {
  EventData,
  KurrentDBClient,
  jsonEvent,
  UnavailableError,
} from "@kurrent/db-client";

// These tests can take time.
jest.setTimeout(120_000);

const neverEndingEvents: Array<EventData> = (function* neverEndingEvents() {
  let i = 0;
  while (true) {
    yield jsonEvent({
      type: "test",
      data: {
        message: "test",
        index: i++,
      },
    });
  }
})() as never;

// neverEndingEvents really is an array...
const isArray = Array.isArray;
Array.isArray = (arg): arg is never[] => {
  if (isArray(arg)) return true;
  return arg === neverEndingEvents;
};

// jest.retryTimes(5, { logErrorsBeforeRetry: true });

describe("write after end", () => {
  test("Should not write after end", async () => {
    // We are going to do a huge append, so tell KurrentDB not to reject it
    const node = createTestNode().setOption(
      "EVENTSTORE_MAX_APPEND_SIZE",
      10_000_000
    );
    await node.up();

    const client = KurrentDBClient.connectionString(node.connectionString());

    const STREAM_NAME = "json_stream_name";
    await client.appendToStream(STREAM_NAME, jsonTestEvents(), {
      // credentials enforces classic append
      credentials: { username: "admin", password: "changeit" },
    });

    const neverEndingAppend = client
      .appendToStream(STREAM_NAME, neverEndingEvents, {
        // credentials enforces classic append
        credentials: { username: "admin", password: "changeit" },
        deadline: Infinity,
      })
      .catch((err) => err);

    // let the write get started
    await delay(1);

    await node.killNode(node.endpoints[0]);

    const error = await neverEndingAppend;
    expect(error).toBeInstanceOf(UnavailableError);

    // wait for any unhandled rejections
    await delay(5_000);

    await node.down();
  });

  test("Should not write after end (batch append)", async () => {
    // We are going to do a huge append, so tell KurrentDB not to reject it
    const node = createTestNode().setOption(
      "EVENTSTORE_MAX_APPEND_SIZE",
      10_000_000
    );
    await node.up();

    const client = KurrentDBClient.connectionString(node.connectionString());

    const STREAM_NAME = "json_stream_name";
    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    const neverEndingAppend = client
      .appendToStream(STREAM_NAME, neverEndingEvents, {
        deadline: Infinity,
      })
      .catch((err) => err);

    // let the write get started
    await delay(1);

    await node.killNode(node.endpoints[0]);

    const error = await neverEndingAppend;
    expect(error).toBeInstanceOf(UnavailableError);

    // wait for any unhandled rejections
    await delay(5_000);

    await node.down();
  });

  // todo: investigate why this test does not work in ci only
  test.skip("Should not write after end (batch append)", async () => {
    const node = createTestNode();
    await node.up();

    const client = KurrentDBClient.connectionString(node.connectionString());

    const STREAM_NAME = "json_stream_name";
    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    const writeUntilError = () =>
      new Promise((resolve) => {
        const writeOnLoop = (): Promise<never> =>
          client
            .appendToStream(STREAM_NAME, jsonTestEvents(5000))
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
  });
});
