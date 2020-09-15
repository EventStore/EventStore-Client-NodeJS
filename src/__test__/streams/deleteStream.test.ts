import { createTestNode } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  readEventsFromStream,
  WrongExpectedVersionError,
  deleteStream,
} from "../..";
import { NO_STREAM, STREAM_EXISTS } from "../../constants";
import { StreamNotFoundError } from "../../utils/CommandError";

describe("deleteStream", () => {
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

  describe("should successfully delete a stream", () => {
    describe("any revision", () => {
      const ANY_REVISION_STREAM = "any_revision_stream";

      beforeAll(async () => {
        await writeEventsToStream(ANY_REVISION_STREAM)
          .send(event, event, event, event)
          .execute(connection);
      });

      it("succeeds", async () => {
        const result = await deleteStream(ANY_REVISION_STREAM).execute(
          connection
        );
        expect(result).toBeDefined();

        await expect(
          readEventsFromStream(ANY_REVISION_STREAM).execute(connection)
        ).rejects.toThrowError(StreamNotFoundError);
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
            const result = await deleteStream(STREAM)
              .expectedRevision(2)
              .execute(connection);

            expect(result).toBe("Unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(WrongExpectedVersionError);
            if (error instanceof WrongExpectedVersionError) {
              expect(error.streamName).toBe(STREAM);
              expect(error.expectedVersion).toBe(2);
            }
          }
        });

        it("succeeds", async () => {
          const events = await readEventsFromStream(STREAM)
            .fromEnd()
            .backward()
            .count(1)
            .execute(connection);

          const revision = events[0].event!.revision;

          const result = await deleteStream(STREAM)
            .expectedRevision(revision)
            .execute(connection);

          expect(result).toBeDefined();

          await expect(
            readEventsFromStream(STREAM).execute(connection)
          ).rejects.toThrowError(StreamNotFoundError);
        });
      });

      // throws error: 2 UNKNOWN: Exception was thrown by handler.
      describe.skip(STREAM_EXISTS, () => {
        const STREAM = "expected_revision_stream_exists";
        const NOT_A_STREAM = "i_dont_exist_hopefully";

        beforeAll(async () => {
          await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);
        });

        it("fails", async () => {
          await expect(
            deleteStream(NOT_A_STREAM)
              .expectedRevision(STREAM_EXISTS)
              .execute(connection)
          ).rejects.toThrowError(`error here`);
        });

        it("succeeds", async () => {
          const result = await deleteStream(STREAM)
            .expectedRevision(STREAM_EXISTS)
            .execute(connection);

          expect(result).toBeDefined();

          await expect(
            readEventsFromStream(STREAM).execute(connection)
          ).rejects.toThrowError(StreamNotFoundError);
        });
      });

      describe(NO_STREAM, () => {
        const NOT_A_STREAM = "expected_revision_stream_no_stream";
        const STREAM = "i_exist_hopefully";

        beforeAll(async () => {
          await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);
        });

        it("fails", async () => {
          try {
            const result = await deleteStream(STREAM)
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
          const result = await deleteStream(NOT_A_STREAM)
            .expectedRevision(NO_STREAM)
            .execute(connection);

          expect(result).toBeDefined();
        });
      });
    });
  });
});
