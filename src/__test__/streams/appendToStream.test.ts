import { binaryTestEvents, createTestNode, jsonTestEvents } from "../utils";

import { EventStoreDBClient, jsonEvent } from "../..";
import { WrongExpectedVersionError } from "../../utils/CommandError";
import { ANY, NO_STREAM, STREAM_EXISTS } from "../../constants";
import { binaryEvent } from "../../events";

describe("appendToStream", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully append to stream", () => {
    test("json events", async () => {
      const STREAM_NAME = "json_stream_name";

      const result = await client.appendToStream(STREAM_NAME, jsonTestEvents());
      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
    });

    test("binary events", async () => {
      const STREAM_NAME = "binary_stream_name";

      const result = await client.appendToStream(
        STREAM_NAME,
        binaryTestEvents()
      );

      expect(result).toBeDefined();
      expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
    });

    describe("metadata", () => {
      describe("json", () => {
        const METADATA = { metaMessage: "How meta is this?" };

        test("json events", async () => {
          const STREAM_NAME = "metadata_json_json";
          const event = jsonEvent({
            type: "metadata-test",
            data: {
              message: "the json message",
              kind: "json",
            },
            metadata: METADATA,
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeDefined();
          const metaJx = rxEvents[0].event!.metadata as Record<string, unknown>;
          expect(metaJx.metaMessage).toMatch(METADATA.metaMessage);
        });

        test("binary events", async () => {
          const STREAM_NAME = "metadata_json_binary";
          const event = binaryEvent({
            type: "metadata-test",
            data: Buffer.from("the binary message"),
            metadata: METADATA,
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeDefined();

          const metaJx = rxEvents[0].event!.metadata as Record<string, unknown>;
          expect(metaJx.metaMessage).toMatch(METADATA.metaMessage);
        });
      });

      describe("buffer", () => {
        const MESSAGE = "How meta is this?";
        const METADATA = Buffer.from(MESSAGE);

        test("json events", async () => {
          const STREAM_NAME = "metadata_buffer_json";
          const event = jsonEvent({
            type: "metadata-test",
            data: {
              message: "the json message",
              kind: "json",
            },
            metadata: METADATA,
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeDefined();
          const metaBx = rxEvents[0].event!.metadata as Uint8Array;
          const metaBxData = Buffer.from(metaBx).toString("binary");
          expect(metaBxData).toMatch(MESSAGE);
        });

        test("binary events", async () => {
          const STREAM_NAME = "metadata_buffer_binary";
          const event = binaryEvent({
            type: "metadata-test",
            data: Buffer.from("the binary message"),
            metadata: METADATA,
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeDefined();
          const metaBx = rxEvents[0].event!.metadata as Uint8Array;
          const metaBxData = Buffer.from(metaBx).toString("binary");
          expect(metaBxData).toMatch(MESSAGE);
        });
      });

      describe("Uint8Array", () => {
        const MESSAGE = "How Uint8Array is this?";
        const METADATA = Uint8Array.from(Buffer.from(MESSAGE));

        test("json events", async () => {
          const STREAM_NAME = "metadata_Uint8Array_json";
          const event = jsonEvent({
            type: "metadata-test",
            data: {
              message: "the json message",
              kind: "json",
            },
            metadata: METADATA,
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeDefined();
          const metaBx = rxEvents[0].event!.metadata as Uint8Array;
          const metaBxData = Buffer.from(metaBx).toString("binary");
          expect(metaBxData).toMatch(MESSAGE);
        });

        test("binary events", async () => {
          const STREAM_NAME = "metadata_Uint8Array_binary";
          const event = binaryEvent({
            type: "metadata-test",
            data: Buffer.from("the binary message"),
            metadata: METADATA,
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeDefined();
          const metaBx = rxEvents[0].event!.metadata as Uint8Array;
          const metaBxData = Buffer.from(metaBx).toString("binary");
          expect(metaBxData).toMatch(MESSAGE);
        });
      });

      describe("undefined", () => {
        test("json events", async () => {
          const STREAM_NAME = "metadata_undefined_json";
          const event = jsonEvent({
            type: "metadata-test",
            data: {
              message: "the json message",
              kind: "json",
            },
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeUndefined();
        });

        test("binary events", async () => {
          const STREAM_NAME = "metadata_undefined_binary";
          const event = binaryEvent({
            type: "metadata-test",
            data: Buffer.from("the binary message"),
          });

          const result = await client.appendToStream(STREAM_NAME, event);

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);

          const rxEvents = await client.readStream(STREAM_NAME, 1);

          expect(rxEvents).toBeDefined();
          expect(rxEvents.length).toEqual(1);
          expect(rxEvents[0].event?.metadata).toBeUndefined();
        });
      });
    });

    describe("expected revision", () => {
      describe(ANY, () => {
        test("succeeds", async () => {
          const STREAM_NAME = "any_stream_doesnt_matter";

          const result = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(),
            {
              expectedRevision: ANY,
            }
          );

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
        });
      });

      describe(NO_STREAM, () => {
        test("succeeds", async () => {
          const STREAM_NAME = "no_stream_here";

          const result = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(),
            {
              expectedRevision: NO_STREAM,
            }
          );

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
        });

        test("fails", async () => {
          const STREAM_NAME = "no_stream_here_but_there_is";

          await client.appendToStream(STREAM_NAME, jsonTestEvents());

          try {
            const result = await client.appendToStream(
              STREAM_NAME,
              jsonTestEvents(),
              {
                expectedRevision: "no_stream",
              }
            );

            expect(result).toBe("unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);

            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM_NAME);
              expect(error.expectedVersion).toBe(NO_STREAM);
              expect(error.actualVersion).toBeGreaterThanOrEqual(1);
            }
          }
        });
      });

      describe(STREAM_EXISTS, () => {
        test("succeeds", async () => {
          const STREAM_NAME = "stream_should_exist";

          await client.appendToStream(STREAM_NAME, jsonTestEvents());

          const result = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(),
            {
              expectedRevision: STREAM_EXISTS,
            }
          );
          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
        });

        test("fails", async () => {
          const STREAM_NAME = "stream_should_exist_but_doesnt";

          try {
            const result = await client.appendToStream(
              STREAM_NAME,
              jsonTestEvents(),
              {
                expectedRevision: STREAM_EXISTS,
              }
            );

            expect(result).toBe("unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);

            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM_NAME);
              expect(error.expectedVersion).toBe(STREAM_EXISTS);
              expect(error.actualVersion).toBe(NO_STREAM);
            }
          }
        });
      });

      describe("exact version", () => {
        test("succeeds", async () => {
          const STREAM_NAME = "stream_should_be_at_nextExpectedRevision";

          const { nextExpectedRevision } = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents()
          );

          const result = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(),
            {
              expectedRevision: nextExpectedRevision,
            }
          );

          expect(result).toBeDefined();
          expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(0);
        });

        describe("fails", () => {
          test("no stream", async () => {
            const STREAM_NAME = "stream_should_be_at_revision_but_doesnt_exist";

            try {
              const result = await client.appendToStream(
                STREAM_NAME,
                jsonTestEvents(),
                { expectedRevision: BigInt(1) }
              );

              expect(result).toBe("unreachable");
            } catch (error) {
              expect(error).toBeInstanceOf(WrongExpectedVersionError);

              if (error instanceof WrongExpectedVersionError) {
                expect(error.streamName).toBe(STREAM_NAME);
                expect(error.expectedVersion).toBe(BigInt(1));
                expect(error.actualVersion).toBe(NO_STREAM);
              }
            }
          });

          test("wrong version", async () => {
            const STREAM_NAME = "stream_should_be_at_revision_but_isnt";

            const { nextExpectedRevision } = await client.appendToStream(
              STREAM_NAME,
              jsonTestEvents()
            );

            try {
              const result = await client.appendToStream(
                STREAM_NAME,
                jsonTestEvents(),
                {
                  expectedRevision: nextExpectedRevision + BigInt(1),
                }
              );

              expect(result).toBe("unreachable");
            } catch (error) {
              expect(error).toBeInstanceOf(WrongExpectedVersionError);

              if (error instanceof WrongExpectedVersionError) {
                expect(error.streamName).toBe(STREAM_NAME);
                expect(error.expectedVersion).toBe(
                  nextExpectedRevision + BigInt(1)
                );
                expect(error.actualVersion).toBe(nextExpectedRevision);
              }
            }
          });
        });
      });
    });
  });

  describe("throwOnAppendFailure", () => {
    test("throws on true", async () => {
      const throwingClient = new EventStoreDBClient(
        { endpoint: node.uri, throwOnAppendFailure: true },
        { rootCertificate: node.rootCertificate },
        { username: "admin", password: "changeit" }
      );

      const STREAM_NAME = "throwing__no_stream_here_but_there_is";

      await throwingClient.appendToStream(STREAM_NAME, jsonTestEvents());

      try {
        const result = await throwingClient.appendToStream(
          STREAM_NAME,
          jsonTestEvents(),
          {
            expectedRevision: "no_stream",
          }
        );

        expect(result).toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(WrongExpectedVersionError);

        if (error instanceof WrongExpectedVersionError) {
          expect(error.streamName).toBe(STREAM_NAME);
          expect(error.expectedVersion).toBe(NO_STREAM);
          expect(error.actualVersion).toBeGreaterThanOrEqual(1);
        }
      }
    });

    test("returns failure result on false", async () => {
      const nonThrowingClient = new EventStoreDBClient(
        { endpoint: node.uri, throwOnAppendFailure: false },
        { rootCertificate: node.rootCertificate },
        { username: "admin", password: "changeit" }
      );

      const STREAM_NAME = "no_throwing__no_stream_here_but_there_is";

      await nonThrowingClient.appendToStream(STREAM_NAME, jsonTestEvents());

      const result = await nonThrowingClient.appendToStream(
        STREAM_NAME,
        jsonTestEvents(),
        {
          expectedRevision: "no_stream",
        }
      );

      expect(result.success).toBe(false);

      if (result.success) {
        expect(result).toBe("unreachable");
      } else {
        expect(result.nextExpectedRevision).toBeGreaterThanOrEqual(1);
      }
    });
  });
});
