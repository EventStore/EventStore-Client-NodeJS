import { createTestNode, jsonTestEvents } from "../utils";

import {
  WrongExpectedVersionError,
  StreamDeletedError,
  NO_STREAM,
  EventStoreDBClient,
} from "../..";
import { BACKWARDS, END } from "../../constants";

describe("tombstoneStream", () => {
  describe("should successfully tombstone a stream", () => {
    const node = createTestNode();
    let client!: EventStoreDBClient;

    beforeAll(async () => {
      await node.up();
      client = new EventStoreDBClient(
        { endpoint: node.uri },
        { rootCertificate: node.rootCertificate }
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
          const result = await client.readStream(ANY_REVISION_STREAM, 10);

          expect(result).toBe("Unreachable");
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
          const [resolvedEvent] = await client.readStream(STREAM, 1, {
            direction: BACKWARDS,
            fromRevision: END,
          });

          const revision = resolvedEvent.event!.revision;

          const result = await client.tombstoneStream(STREAM, {
            expectedRevision: revision,
          });

          expect(result).toBeDefined();

          await expect(() =>
            client.readStream(STREAM, 10)
          ).rejects.toThrowError(StreamDeletedError);
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
            client.readStream(NOT_A_STREAM, 10)
          ).rejects.toThrowError(StreamDeletedError);
        });
      });
    });
  });
});
