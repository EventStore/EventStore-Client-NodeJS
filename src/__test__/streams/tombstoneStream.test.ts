import { createTestNode } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  readEventsFromStream,
  WrongExpectedVersionError,
  tombstoneStream,
  StreamDeletedError,
  NO_STREAM,
} from "../..";

describe("tombstoneStream", () => {
  describe("should successfully tombstone a stream", () => {
    const node = createTestNode();
    let connection!: ESDBConnection;

    const event = EventData.json("an_event", {
      message: "test",
    }).build();

    beforeAll(async () => {
      await node.up();
      connection = EventStoreConnection.builder()
        .sslRootCertificate(node.certPath)
        .singleNodeConnection(node.uri);
    });

    afterAll(async () => {
      await node.down();
    });

    describe("any revision", () => {
      const ANY_REVISION_STREAM = "any_revision_stream";

      beforeAll(async () => {
        await writeEventsToStream(ANY_REVISION_STREAM)
          .send(event, event, event, event)
          .execute(connection);
      });

      it("succeeds", async () => {
        const result = await tombstoneStream(ANY_REVISION_STREAM).execute(
          connection
        );
        expect(result).toBeDefined();

        try {
          const result = await readEventsFromStream(
            ANY_REVISION_STREAM
          ).execute(connection);

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
          await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);
        });

        it("fails", async () => {
          try {
            const result = await tombstoneStream(STREAM)
              .expectedRevision(2n)
              .execute(connection);

            expect(result).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);
            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM);
              expect(error.expectedVersion).toBe(2n);
            }
          }
        });

        it("succeeds", async () => {
          const [resolvedEvent] = await readEventsFromStream(STREAM)
            .fromEnd()
            .backward()
            .count(1)
            .execute(connection);

          const revision = resolvedEvent.event!.revision;

          const result = await tombstoneStream(STREAM)
            .expectedRevision(revision)
            .execute(connection);

          expect(result).toBeDefined();

          await expect(() =>
            readEventsFromStream(STREAM).execute(connection)
          ).rejects.toThrowError(StreamDeletedError);
        });
      });

      describe("no stream", () => {
        const NOT_A_STREAM = "expected_revision_stream_no_stream";
        const STREAM = "i_exist_hopefully";

        beforeAll(async () => {
          await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);
        });

        it("fails", async () => {
          try {
            const result = await tombstoneStream(STREAM)
              .expectedRevision(NO_STREAM)
              .execute(connection);

            expect(result).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);
            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM);
            }
          }
        });

        it("succeeds", async () => {
          const result = await tombstoneStream(NOT_A_STREAM)
            .expectedRevision(NO_STREAM)
            .execute(connection);

          expect(result).toBeDefined();

          await expect(() =>
            readEventsFromStream(NOT_A_STREAM).execute(connection)
          ).rejects.toThrowError(StreamDeletedError);
        });
      });
    });
  });
});
