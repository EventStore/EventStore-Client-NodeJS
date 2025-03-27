import { collect, createTestNode, jsonTestEvents } from "@test-utils";
import {
  KurrentDBClient,
  WrongExpectedVersionError,
  NO_STREAM,
  StreamNotFoundError,
  BACKWARDS,
} from "@kurrent/kurrentdb-client";

describe("deleteStream", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully delete a stream", () => {
    describe("any revision", () => {
      const ANY_REVISION_STREAM = "any_revision_stream";

      beforeAll(async () => {
        await client.appendToStream(ANY_REVISION_STREAM, jsonTestEvents(4));
      });

      it("succeeds", async () => {
        const result = await client.deleteStream(ANY_REVISION_STREAM);
        expect(result).toBeDefined();

        await expect(
          collect(client.readStream(ANY_REVISION_STREAM, { maxCount: 10 }))
        ).rejects.toThrowError(StreamNotFoundError);
      });
    });

    describe("expected revision", () => {
      describe("exact", () => {
        const STREAM = "expected_revision_stream_exact";

        beforeAll(async () => {
          await client.appendToStream(STREAM, jsonTestEvents(4));
        });

        it("fails", async () => {
          try {
            const result = await client.deleteStream(STREAM, {
              expectedRevision: BigInt(2),
            });

            expect(result).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);
            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM);
              expect(error.expectedState).toBe(BigInt(2));
            }
          }
        });

        it("succeeds", async () => {
          const events = await collect(
            client.readStream(STREAM, {
              maxCount: 1,
              direction: BACKWARDS,
              fromRevision: "end",
            })
          );

          const expectedRevision = events[0].event!.revision;

          const result = await client.deleteStream(STREAM, {
            expectedRevision,
          });

          expect(result).toBeDefined();

          await expect(
            collect(client.readStream(STREAM, { maxCount: 1 }))
          ).rejects.toThrowError(StreamNotFoundError);
        });
      });

      describe(NO_STREAM, () => {
        it("fails if stream exists", async () => {
          const STREAM = "i_exist_hopefully";

          await client.appendToStream(STREAM, jsonTestEvents(4));

          try {
            const result = await client.deleteStream(STREAM, {
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

        it("fails if stream doesn't exist", async () => {
          const NOT_A_STREAM = "expected_revision_stream_no_stream";

          try {
            const result = await client.deleteStream(NOT_A_STREAM, {
              expectedRevision: NO_STREAM,
            });

            // Before https://github.com/kurrent-io/EventStore/pull/3154 this should pass.
            expect(result).toBeDefined();
          } catch (error) {
            // After https://github.com/kurrent-io/EventStore/pull/3154 this will throw an error.
            expect(error).toBeInstanceOf(WrongExpectedVersionError);

            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(NOT_A_STREAM);
            }
          }
        });

        it("succeeds if stream implicityly exists", async () => {
          const IMPLICITLY_A_STREAM = "i_exist_implicitly";

          await client.setStreamMetadata(IMPLICITLY_A_STREAM, {
            cacheControl: 10,
          });

          const result = await client.deleteStream(IMPLICITLY_A_STREAM, {
            expectedRevision: NO_STREAM,
          });

          expect(result).toBeDefined();
        });
      });
    });
  });
});
