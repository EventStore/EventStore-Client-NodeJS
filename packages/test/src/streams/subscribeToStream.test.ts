/** @jest-environment ./src/utils/enableVersionCheck.ts */

import { pipeline, Writable, Readable } from "stream";
import { promisify } from "util";
import {
  createTestNode,
  Defer,
  delay,
  jsonTestEvents,
  matchServerVersion,
} from "@test-utils";

import {
  KurrentDBClient,
  ResolvedEvent,
  jsonEvent,
  END,
} from "@kurrent/db-client";

const asyncPipeline = promisify(pipeline);

describe("subscribeToStream", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  const finishEvent = () =>
    jsonEvent({
      type: "finish-test",
      data: {
        message: "lets wrap this up",
      },
    });

  beforeAll(async () => {
    await node.up();
    client = new KurrentDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
    await client.appendToStream("out_of_stream_name", jsonTestEvents(4));
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should subscribe to stream", () => {
    test("from start", async () => {
      const defer = new Defer();
      const STREAM_NAME = "from_start_test_stream_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleClose = jest.fn();
      const handleConfirmation = jest.fn();
      const handleEnd = jest.fn(defer.resolve);
      const handleEvent = jest.fn((event: ResolvedEvent) => {
        if (event.event?.type === "finish-test") {
          subscription.unsubscribe();
        }
      });
      const handleCaughtUp = jest.fn(() => {
        try {
          expect(handleEvent).toBeCalledTimes(4);
        } catch (error) {
          defer.reject(error);
        }
      });

      const subscription = client
        .subscribeToStream(STREAM_NAME)
        .on("error", handleError)
        .on("data", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
        .on("caughtUp", handleCaughtUp)
        .on("end", handleEnd);

      await delay(500);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(8);

      if (matchServerVersion`>=23.10`) {
        expect(handleCaughtUp).toBeCalledTimes(1);
      }
    });

    test("from end", async () => {
      const STREAM_NAME = "from_end_test_stream_name";
      const defer = new Defer();

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleClose = jest.fn();
      const handleConfirmation = jest.fn();
      const handleEnd = jest.fn(defer.resolve);
      const handleEvent = jest.fn((event: ResolvedEvent) => {
        if (event.event?.type === "finish-test") {
          subscription.unsubscribe();
        }
      });
      const handleCaughtUp = jest.fn(() => {
        try {
          expect(handleEvent).toBeCalledTimes(0);
        } catch (error) {
          defer.reject(error);
        }
      });

      const subscription = client
        .subscribeToStream(STREAM_NAME, {
          fromRevision: END,
        })
        .on("error", handleError)
        .on("data", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
        .on("caughtUp", handleCaughtUp)
        .on("end", handleEnd);

      await delay(500);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(4);
    });

    test("from revision", async () => {
      const STREAM_NAME = "from_revision_test_stream_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

      const defer = new Defer();

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleClose = jest.fn();
      const handleConfirmation = jest.fn();
      const handleEnd = jest.fn(defer.resolve);
      const handleEvent = jest.fn((event: ResolvedEvent) => {
        if (event.event?.type === "finish-test") {
          subscription.unsubscribe();
        }
      });
      const handleCaughtUp = jest.fn(() => {
        try {
          // It should throw 1 because we are starting from revision 2
          expect(handleEvent).toBeCalledTimes(1);
        } catch (error) {
          defer.reject(error);
        }
      });

      const subscription = client
        .subscribeToStream(STREAM_NAME, {
          fromRevision: BigInt(2),
        })
        .on("close", handleClose)
        .on("error", handleError)
        .on("data", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
        .on("caughtUp", handleCaughtUp)
        .on("end", handleEnd);

      await delay(500);

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(3),
        finishEvent(),
      ]);

      await defer.promise;

      expect(handleConfirmation).toBeCalledTimes(1);
      expect(handleEvent).toBeCalledTimes(5);
      expect(handleEnd).toBeCalledTimes(1);
      expect(handleError).not.toBeCalled();

      if (matchServerVersion`>=23.10`) {
        expect(handleCaughtUp).toBeCalledTimes(1);
      }
    });
  });

  describe("should return a readableStream", () => {
    test("async iterator", async () => {
      const STREAM_NAME = "async_iter";
      const doSomething = jest.fn();

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        finishEvent(),
      ]);

      for await (const event of client.subscribeToStream(STREAM_NAME)) {
        doSomething(event);

        if (event.event?.type === "finish-test") {
          break;
        }
      }

      expect(doSomething).toBeCalledTimes(9);
    });

    test("pipeline", async () => {
      const STREAM_NAME = "pipeline test";

      await client.appendToStream(STREAM_NAME, [
        ...jsonTestEvents(8),
        finishEvent(),
      ]);

      const subscription = client.subscribeToStream(STREAM_NAME);

      const writeStream = new (class extends Writable {
        public ids: string[] = [];
        _write({ event }: ResolvedEvent, _encoding: string, done: () => void) {
          this.ids.push(event!.id);
          if (event?.type === "finish-test") {
            subscription.unsubscribe().then(done);
          } else {
            done();
          }
        }
      })({ objectMode: true });

      await asyncPipeline(subscription as Readable, writeStream);

      expect(writeStream.ids).toHaveLength(9);
    });
  });
});
