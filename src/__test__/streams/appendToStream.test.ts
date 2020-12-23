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
      expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
    });

    test("binary events", async () => {
      const STREAM_NAME = "binary_stream_name";

      const result = await client.appendToStream(
        STREAM_NAME,
        binaryTestEvents()
      );

      expect(result).toBeDefined();
      expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
    });

    test("with metadata for json events", async () => {
      const STREAM_NAME = "json_metadata_stream_name";
      const METADATA = { metaMessage: "How meta is this?" };
      const event = jsonEvent({
        type: "metadata-test-json",
        data: {
          message: "the json message",
          kind: "json",
        },
        metadata: METADATA,
      });

      const result = await client.appendToStream(STREAM_NAME, event);

      expect(result).toBeDefined();
      expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);

      const rxEvents = await client.readStream(STREAM_NAME, 1);

      expect(rxEvents).toBeDefined();
      expect(rxEvents.length).toEqual(1);
      expect(rxEvents[0].event?.metadata).toBeDefined();
      const metaJx = rxEvents[0].event!.metadata as Record<string, unknown>;
      expect(metaJx.metaMessage).toMatch(METADATA.metaMessage);
    });

    test("with metadata for binary events", async () => {
      const STREAM_NAME = "binary_metadata_stream_name";
      const METADATA = "How meta is this?";

      const event = binaryEvent({
        type: "metadata-test-binary",
        data: Buffer.from("the binary message"),
        metadata: Buffer.from(METADATA),
      });

      const result = await client.appendToStream(STREAM_NAME, event);

      expect(result).toBeDefined();
      expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);

      const rxEvents = await client.readStream(STREAM_NAME, 1);

      expect(rxEvents).toBeDefined();
      expect(rxEvents.length).toEqual(1);
      expect(rxEvents[0].event?.metadata).toBeDefined();
      const metaBx = rxEvents[0].event!.metadata as Uint8Array;
      const metaBxData = Buffer.from(metaBx).toString("binary");
      expect(metaBxData).toMatch(METADATA);
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
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
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
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
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
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
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

          const { nextExpectedVersion } = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents()
          );

          const result = await client.appendToStream(
            STREAM_NAME,
            jsonTestEvents(),
            {
              expectedRevision: nextExpectedVersion,
            }
          );

          expect(result).toBeDefined();
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
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

            const { nextExpectedVersion } = await client.appendToStream(
              STREAM_NAME,
              jsonTestEvents()
            );

            try {
              const result = await client.appendToStream(
                STREAM_NAME,
                jsonTestEvents(),
                {
                  expectedRevision: nextExpectedVersion + BigInt(1),
                }
              );

              expect(result).toBe("unreachable");
            } catch (error) {
              expect(error).toBeInstanceOf(WrongExpectedVersionError);

              if (error instanceof WrongExpectedVersionError) {
                expect(error.streamName).toBe(STREAM_NAME);
                expect(error.expectedVersion).toBe(
                  nextExpectedVersion + BigInt(1)
                );
                expect(error.actualVersion).toBe(nextExpectedVersion);
              }
            }
          });
        });
      });
    });
  });
});
