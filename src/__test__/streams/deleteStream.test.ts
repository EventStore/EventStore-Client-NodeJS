import { createTestNode, jsonTestEvents } from "../utils";

import {
  EventStoreDBClient,
  WrongExpectedVersionError,
  NO_STREAM,
  StreamNotFoundError,
} from "../..";
import { BACKWARDS } from "../../constants";

describe("deleteStream", () => {
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
          client.readStream(ANY_REVISION_STREAM, { maxCount: 10 })
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
              expect(error.expectedVersion).toBe(BigInt(2));
            }
          }
        });

        it("succeeds", async () => {
          const events = await client.readStream(STREAM, {
            maxCount: 1,
            direction: BACKWARDS,
            fromRevision: "end",
          });

          const expectedRevision = events[0].event!.revision;

          const result = await client.deleteStream(STREAM, {
            expectedRevision,
          });

          expect(result).toBeDefined();

          await expect(
            client.readStream(STREAM, { maxCount: 1 })
          ).rejects.toThrowError(StreamNotFoundError);
        });
      });

      describe(NO_STREAM, () => {
        const NOT_A_STREAM = "expected_revision_stream_no_stream";
        const STREAM = "i_exist_hopefully";

        beforeAll(async () => {
          await client.appendToStream(STREAM, jsonTestEvents(4));
        });

        it("fails", async () => {
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

        it("succeeds", async () => {
          const result = await client.deleteStream(NOT_A_STREAM, {
            expectedRevision: NO_STREAM,
          });

          expect(result).toBeDefined();
        });
      });
    });
  });
});
