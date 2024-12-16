/** @jest-environment ./src/utils/enableVersionCheck.ts */

import {
  binaryTestEvents,
  collect,
  createTestNode,
  delay,
  jsonTestEvents,
  matchServerVersion,
  optionalDescribe,
} from "@test-utils";
import {
  KurrentDBClient,
  BACKWARDS,
  END,
  jsonEvent,
  StreamDeletedError,
  StreamNotFoundError,
  ResolvedEvent,
  LinkEvent,
  Position,
  AppendResult,
  InvalidArgumentError,
} from "@kurrent/db-client";

describe("readStream", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;
  let appendResult: AppendResult;
  const STREAM_NAME = "test_stream_name";
  const OUT_OF_STREAM_NAME = "out_of_stream_name";

  beforeAll(async () => {
    await node.up();
    client = new KurrentDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );

    appendResult = await client.appendToStream(STREAM_NAME, [
      ...jsonTestEvents(4, "json-test"),
      ...binaryTestEvents(4, "binary-test"),
    ]);

    await client.appendToStream(
      OUT_OF_STREAM_NAME,
      jsonTestEvents(5, "out-of-stream-test")
    );
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully read from stream", () => {
    describe("Event types", () => {
      test("json event", async () => {
        let resolvedEvent!: ResolvedEvent;

        for await (const event of client.readStream(STREAM_NAME, {
          maxCount: 1,
          fromRevision: BigInt(1),
        })) {
          resolvedEvent = event;
        }

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(true);
        expect(event.type).toBe("json-test");
        expect(event.data).toMatchObject({
          index: 1,
          message: "test",
        });
      });

      test("binary event", async () => {
        let resolvedEvent!: ResolvedEvent;

        for await (const event of client.readStream(STREAM_NAME, {
          maxCount: 1,
          fromRevision: BigInt(5),
        })) {
          resolvedEvent = event;
        }

        const event = resolvedEvent.event!;

        expect(event.isJson).toBe(false);
        expect(event.type).toBe("binary-test");

        expect(Buffer.from(event.data as string).toString()).toBe("hello: 1");
      });
    });

    describe("options", () => {
      test("from start", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME)) {
          count++;
        }

        expect(count).toBe(8);
      });

      test("from revision", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, {
          fromRevision: BigInt(1),
        })) {
          count++;
        }

        expect(count).toBe(7);
      });

      test("backwards from end", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, {
          direction: BACKWARDS,
          fromRevision: END,
        })) {
          count++;
        }

        expect(count).toBe(8);
      });

      test("backwards from revision", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, {
          direction: BACKWARDS,
          fromRevision: BigInt(1),
        })) {
          count++;
        }

        expect(count).toBe(2);
      });

      test("maxCount", async () => {
        let count = 0;

        for await (const _ of client.readStream(STREAM_NAME, { maxCount: 2 })) {
          count++;
        }

        expect(count).toBe(2);
      });

      test("resolve link tos", async () => {
        const FROM_STREAM_NAME = "link-from-stream";

        await client.enableProjection("$by_category");

        await client.createProjection(
          "projection",
          `fromStream("${FROM_STREAM_NAME}").when({
            $any: function(state, ev) {
              linkTo('a-' + ev.data.some, ev)
            }
          });`,
          { emitEnabled: true }
        );

        // Append an event that will be linked

        await client.appendToStream(
          FROM_STREAM_NAME,
          jsonEvent({ type: "linky", data: { some: "thing" } })
        );

        await delay(1000);

        // by default, resolveLinkTos should be false
        const noResolveLink = client.readStream<LinkEvent>("a-thing", {
          maxCount: 1,
        });
        const [noResolveEvent] = await collect(noResolveLink);

        // link event
        expect(noResolveEvent.event).toBeDefined();
        expect(noResolveEvent.event?.type).toBe("$>");

        const doResolveLink = client.readStream("a-thing", {
          maxCount: 1,
          resolveLinkTos: true,
        });
        const [doResolveEvent] = await collect(doResolveLink);

        // resolved event
        expect(doResolveEvent.event).toBeDefined();
        expect(doResolveEvent.event?.type).toBe("linky");

        // link event
        expect(doResolveEvent.link).toBeDefined();
        expect(doResolveEvent.link?.type).toBe("$>");

        expect(doResolveEvent.event?.id).toBe(
          noResolveEvent.event!.metadata.$causedBy
        );
        expect(doResolveEvent.event?.id).toBe(
          doResolveEvent.link!.metadata.$causedBy
        );
      });
    });

    describe("errors", () => {
      test("stream not found", async () => {
        const NO_STREAM_NAME = "this_is_not_a_stream";

        try {
          for await (const e of client.readStream(NO_STREAM_NAME)) {
            expect(e).toBe("UNREACHABLE");
          }
        } catch (error) {
          expect(error).toBeInstanceOf(StreamNotFoundError);

          if (error instanceof StreamNotFoundError) {
            expect(error.streamName).toBe(NO_STREAM_NAME);
          }
        }
      });

      test("stream revision invalid argument lower bound", async () => {
        let count = 0;
        try {
          for await (const e of client.readStream(STREAM_NAME, {
            direction: BACKWARDS,
            fromRevision: BigInt(-1),
          })) {
            count++;
          }
        } catch (error) {
          expect(error).toBeInstanceOf(InvalidArgumentError);
        }
      });

      test("stream revision invalid argument upper bound", async () => {
        let count = 0;
        try {
          for await (const e of client.readStream(STREAM_NAME, {
            direction: BACKWARDS,
            fromRevision: BigInt("18446744073709551616"),
          })) {
            count++;
          }
        } catch (error) {
          expect(error).toBeInstanceOf(InvalidArgumentError);
        }
      });

      test("stream deleted", async () => {
        const DELETE_STREAM_NAME = "this_stream_will_be_deleted";

        await client.appendToStream(DELETE_STREAM_NAME, jsonTestEvents());

        const result = await client.tombstoneStream(DELETE_STREAM_NAME);
        expect(result).toBeDefined();

        try {
          for await (const event of client.readStream(DELETE_STREAM_NAME, {
            maxCount: 10,
          })) {
            expect(event).toBe("Unreachable");
          }
        } catch (error) {
          expect(error).toBeInstanceOf(StreamDeletedError);

          if (error instanceof StreamDeletedError) {
            expect(error.streamName).toBe(DELETE_STREAM_NAME);
          }
        }
      });
    });
    const supported = matchServerVersion`>=22.6.0`;
    optionalDescribe(supported)("Supported (>=22.6.0)", () => {
      test("populates log position", async () => {
        const [resolvedEvent] = await collect(
          client.readStream(STREAM_NAME, {
            maxCount: 1,
            fromRevision: END,
            direction: BACKWARDS,
          })
        );

        expect(resolvedEvent.event?.position).toBeDefined();
        expect(resolvedEvent.event?.position?.commit).toBeDefined();
        expect(resolvedEvent.event?.position?.prepare).toBeDefined();
        expect(resolvedEvent.event?.position?.commit).toBe(
          appendResult.position?.commit
        );
        expect(resolvedEvent.event?.position?.prepare).toBe(
          appendResult.position?.prepare
        );
      });
    });
  });
});
