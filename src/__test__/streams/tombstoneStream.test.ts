import { collect, createTestNode, jsonTestEvents } from "@test-utils";

import {
  WrongExpectedVersionError,
  StreamDeletedError,
  NO_STREAM,
  EventStoreDBClient,
  BACKWARDS,
  END,
} from "@eventstore/db-client";

describe("tombstoneStream", () => {
  describe("should successfully tombstone a stream", () => {
    const node = createTestNode();
    let client!: EventStoreDBClient;

    beforeAll(async () => {
      await node.up();
      client = new EventStoreDBClient(
        { endpoint: node.uri },
        { rootCertificate: node.rootCertificate },
        { username: "admin", password: "changeit" },
      );
    });

    afterAll(async () => {
      await node.down();
    });

    describe("any revision", () => {
      const ANY_REVISION_STREAM = "any_revision_stream";

      beforeAll(async () => {
        await client.appendToStream(ANY_REVISION_STREAM, jsonTestEvents());
      });

      it("succeeds", async () => {
        const result = await client.tombstoneStream(ANY_REVISION_STREAM);
        expect(result).toBeDefined();

        try {
          for await (const event of client.readStream(ANY_REVISION_STREAM, {
            maxCount: 10,
          })) {
            expect(event).toBe("Unreachable");
          }
        } catch (error) {
          expect(error).toBeInstanceOf(StreamDeletedError);

          if (error instanceof StreamDeletedError) {
            expect(error.streamName).toBe(ANY_REVISION_STREAM);
          }
        }
      });
    });

    describe("expected revision", () => {
      describe("exact", () => {
        const STREAM = "expected_revision_stream_exact";

        beforeAll(async () => {
          await client.appendToStream(STREAM, jsonTestEvents());
        });

        it("fails", async () => {
          try {
            const result = await client.tombstoneStream(STREAM, {
              expectedRevision: BigInt(2),
            });

            expect(result).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);
            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM);
              expect(error.expectedVersion).toBe(BigInt(2));
            }
          }
        });

        it("succeeds", async () => {
          let revision!: bigint;

          for await (const { event } of client.readStream(STREAM, {
            maxCount: 1,
            direction: BACKWARDS,
            fromRevision: END,
          })) {
            revision = event!.revision;
          }

          const result = await client.tombstoneStream(STREAM, {
            expectedRevision: revision,
          });

          expect(result).toBeDefined();

          try {
            for await (const event of client.readStream(STREAM, {
              maxCount: 10,
            })) {
              expect(event).toBeDefined();
            }

            expect(true).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(StreamDeletedError);

            if (error instanceof StreamDeletedError) {
              expect(error.streamName).toBe(STREAM);
            }
          }
        });
      });

      describe("no stream", () => {
        const NOT_A_STREAM = "expected_revision_stream_no_stream";
        const STREAM = "i_exist_hopefully";

        beforeAll(async () => {
          await client.appendToStream(STREAM, jsonTestEvents());
        });

        it("fails", async () => {
          try {
            const result = await client.tombstoneStream(STREAM, {
              expectedRevision: NO_STREAM,
            });

            expect(result).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);
            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM);
            }
          }
        });

        it("succeeds", async () => {
          const result = await client.tombstoneStream(NOT_A_STREAM, {
            expectedRevision: NO_STREAM,
          });

          expect(result).toBeDefined();

          await expect(() =>
            collect(client.readStream(NOT_A_STREAM, { maxCount: 10 })),
          ).rejects.toThrowError(StreamDeletedError);
        });
      });
    });
  });
});
