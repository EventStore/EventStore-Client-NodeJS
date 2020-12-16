import { pipeline, Writable, Readable } from "stream";
import { promisify } from "util";
import { createTestNode, Defer, delay, jsonTestEvents } from "../utils";

import { EventStoreDBClient, ResolvedEvent, jsonEvent, END } from "../..";

const asyncPipeline = promisify(pipeline);

describe("subscribeToStream", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  const finishEvent = () =>
    jsonEvent({
      eventType: "finish-test",
      payload: {
        message: "lets wrap this up",
      },
    });

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
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
        if (event.event?.eventType === "finish-test") {
          subscription.unsubscribe();
        }
      });

      const subscription = client
        .subscribeToStream(STREAM_NAME)
        .on("error", handleError)
        .on("data", handleEvent)
        .on("close", handleClose)
        .on("confirmation", handleConfirmation)
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
        if (event.event?.eventType === "finish-test") {
          subscription.unsubscribe();
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
        if (event.event?.eventType === "finish-test") {
          subscription.unsubscribe();
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

        if (event.event?.eventType === "finish-test") {
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
          if (event?.eventType === "finish-test") {
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
