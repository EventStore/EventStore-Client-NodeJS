/** @jest-environment ./src/utils/enableVersionCheck.ts */

import type { Stream } from "stream";
import { v4 as uuid } from "uuid";

import {
  createTestNode,
  Defer,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";
import {
  KurrentDBClient,
  persistentSubscriptionToAllSettingsFromDefaults,
  persistentSubscriptionToStreamSettingsFromDefaults,
  START,
  streamNameFilter,
} from "@eventstore/db-client";

describe("dispose", () => {
  const supported = matchServerVersion`>=21.10`;

  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = new KurrentDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  afterEach(async () => {
    await client.dispose();
  });

  test("stream set should be cleaned up", async () => {
    const STREAM_NAME = uuid();
    const STREAM_NAME_2 = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(100), {
      // We don't want to use a stream for this, so we can use the same number regardless of server support.
      credentials: { username: "admin", password: "changeit" },
    });

    const handleError = jest.fn();
    const handleEvent = jest.fn();

    // 1
    client
      .readStream(STREAM_NAME)
      .on("error", handleError)
      .on("data", handleEvent);

    // 2
    client
      .readStream(STREAM_NAME_2)
      .on("error", handleError)
      .on("data", handleEvent);

    // 3
    client.readAll().on("error", handleError).on("data", handleEvent);

    // 4
    client
      .subscribeToStream(STREAM_NAME)
      .on("error", handleError)
      .on("data", handleEvent);

    // 5
    client.subscribeToAll().on("error", handleError).on("data", handleEvent);

    // wait for next tick
    await delay(0);

    expect(extractKnownStreams.call(client).size).toBe(5);

    await client.dispose();

    expect(extractKnownStreams.call(client).size).toBe(0);
    expect(handleError).not.toBeCalled();
  });

  test("stream set should be cleaned up naturally", async () => {
    const STREAM_NAME = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(10), {
      // We dont want to use a stream for this, so we can use the same number regardless of server support.
      credentials: { username: "admin", password: "changeit" },
    });

    for await (const event of client.readStream(STREAM_NAME, {
      maxCount: 1,
    })) {
      expect(extractKnownStreams.call(client).size).toBe(1);
      expect(event).toBeDefined();
    }

    expect(extractKnownStreams.call(client).size).toBe(0);
  });

  test("Subscription to stream", async () => {
    const defer = new Defer();
    const STREAM_NAME = uuid();
    const STREAM_NAME_2 = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

    const handleError = jest.fn((error) => {
      defer.reject(error);
    });
    const handleEvent = jest.fn();
    const handleSubscription1End = jest.fn(defer.resolve);
    const handleSubscription2End = jest.fn(defer.resolve);

    client
      .subscribeToStream(STREAM_NAME)
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handleSubscription1End);

    client
      .subscribeToStream(STREAM_NAME_2)
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handleSubscription2End);

    await delay(500);

    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    await client.dispose();

    await defer.promise;

    expect(handleError).not.toBeCalled();
    expect(handleSubscription1End).toBeCalledTimes(1);
    expect(handleSubscription2End).toBeCalledTimes(1);
  });

  test("Subscription to $all", async () => {
    const defer = new Defer();
    const STREAM_NAME = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

    const handleError = jest.fn((error) => {
      defer.reject(error);
    });
    const handleEvent = jest.fn();
    const handleSubscription1End = jest.fn(defer.resolve);
    const handleSubscription2End = jest.fn(defer.resolve);

    client
      .subscribeToAll()
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handleSubscription1End);

    client
      .subscribeToAll()
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handleSubscription2End);

    await delay(500);

    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    await client.dispose();

    await defer.promise;

    expect(handleError).not.toBeCalled();
    expect(handleSubscription1End).toBeCalledTimes(1);
    expect(handleSubscription2End).toBeCalledTimes(1);
  });

  test("Persistent subscription to stream", async () => {
    const defer = new Defer();
    const STREAM_NAME = uuid();
    const GROUP_NAME = uuid();
    const STREAM_NAME_2 = uuid();
    const GROUP_NAME_2 = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME,
      GROUP_NAME,
      persistentSubscriptionToStreamSettingsFromDefaults({
        startFrom: START,
      })
    );

    await client.createPersistentSubscriptionToStream(
      STREAM_NAME_2,
      GROUP_NAME_2,
      persistentSubscriptionToStreamSettingsFromDefaults({
        startFrom: START,
      })
    );

    const handleError = jest.fn((error) => {
      defer.reject(error);
    });
    const handleEvent = jest.fn();
    const handlePS$allSubscription1End = jest.fn(defer.resolve);
    const handlePS$allSubscription2End = jest.fn(defer.resolve);

    client
      .subscribeToPersistentSubscriptionToStream(STREAM_NAME, GROUP_NAME)
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handlePS$allSubscription1End);

    client
      .subscribeToPersistentSubscriptionToStream(STREAM_NAME_2, GROUP_NAME_2)
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handlePS$allSubscription2End);

    await delay(500);

    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    await client.dispose();

    await defer.promise;

    expect(handleError).not.toBeCalled();
    expect(handlePS$allSubscription1End).toBeCalledTimes(1);
    expect(handlePS$allSubscription2End).toBeCalledTimes(1);
  });

  test("read $all", async () => {
    const defer = new Defer();
    const STREAM_NAME = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

    const handleError = jest.fn((error) => {
      defer.reject(error);
    });
    const handleEvent = jest.fn();
    const handlereadAll1End = jest.fn(defer.resolve);
    const handlereadAll2End = jest.fn(defer.resolve);

    client
      .readAll()
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handlereadAll1End);

    client
      .readAll()
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handlereadAll2End);

    await delay(500);

    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    await client.dispose();

    await defer.promise;

    expect(handleError).not.toBeCalled();
    expect(handlereadAll1End).toBeCalledTimes(1);
    expect(handlereadAll2End).toBeCalledTimes(1);
  });

  test("read stream", async () => {
    const defer = new Defer();
    const STREAM_NAME = uuid();
    const STREAM_NAME_2 = uuid();

    await client.appendToStream(STREAM_NAME, jsonTestEvents(100));
    await client.appendToStream(STREAM_NAME_2, jsonTestEvents(100));

    const handleError = jest.fn((error) => {
      defer.reject(error);
    });
    const handleEvent = jest.fn();
    const handlereadStream1End = jest.fn(defer.resolve);
    const handlereadStream2End = jest.fn(defer.resolve);

    client
      .readStream(STREAM_NAME)
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handlereadStream1End);

    client
      .readStream(STREAM_NAME_2)
      .on("error", handleError)
      .on("data", handleEvent)
      .on("end", handlereadStream2End);

    await delay(10);

    await client.dispose();

    await defer.promise;

    expect(handleError).not.toBeCalled();
    expect(handlereadStream1End).toBeCalledTimes(1);
    expect(handlereadStream2End).toBeCalledTimes(1);
  });

  optionalDescribe(supported)("Supported (>=21.10)", () => {
    test("Batch append", async () => {
      const STREAM_NAME = uuid();
      const result = await client.appendToStream(STREAM_NAME, jsonTestEvents());
      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
      await client.dispose();
      const result2 = await client.appendToStream(
        STREAM_NAME,
        jsonTestEvents()
      );
      expect(result2).toBeDefined();
      expect(result2.nextExpectedRevision).toBeGreaterThanOrEqual(0);
    });

    test("Persistent subscription to $all", async () => {
      const defer = new Defer();
      const STREAM_NAME = uuid();
      const GROUP_NAME = uuid();
      const GROUP_NAME_2 = uuid();

      await client.appendToStream(STREAM_NAME, jsonTestEvents(4));

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: START,
        }),
        { filter: streamNameFilter({ prefixes: [STREAM_NAME] }) }
      );

      await client.createPersistentSubscriptionToAll(
        GROUP_NAME_2,
        persistentSubscriptionToAllSettingsFromDefaults({
          startFrom: START,
        })
      );

      const handleError = jest.fn((error) => {
        defer.reject(error);
      });
      const handleEvent = jest.fn();
      const handlePS$allSubscription1End = jest.fn(defer.resolve);
      const handlePS$allSubscription2End = jest.fn(defer.resolve);

      client
        .subscribeToPersistentSubscriptionToAll(GROUP_NAME)
        .on("error", handleError)
        .on("data", handleEvent)
        .on("end", handlePS$allSubscription1End);

      client
        .subscribeToPersistentSubscriptionToAll(GROUP_NAME_2)
        .on("error", handleError)
        .on("data", handleEvent)
        .on("end", handlePS$allSubscription2End);

      await delay(500);

      await client.appendToStream(STREAM_NAME, jsonTestEvents());

      await client.dispose();

      await defer.promise;

      expect(handleError).not.toBeCalled();
      expect(handlePS$allSubscription1End).toBeCalledTimes(1);
      expect(handlePS$allSubscription2End).toBeCalledTimes(1);
    });
  });
});

function extractKnownStreams(this: KurrentDBClient): Set<Stream> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (this as any).disposableStreams;
}
