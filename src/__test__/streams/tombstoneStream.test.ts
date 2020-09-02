import { createTestNode } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  readEventsFromStream,
} from "../../index";
import { tombstoneStream } from "../../command/streams";

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
        const result = await writeEventsToStream(ANY_REVISION_STREAM)
          .send(event, event, event, event)
          .execute(connection);

        expect(result.__typename).toBe("success");
      });

      it("succeeds", async () => {
        const result = await tombstoneStream(ANY_REVISION_STREAM).execute(
          connection
        );
        expect(result).toBeDefined();

        await expect(() =>
          readEventsFromStream(ANY_REVISION_STREAM).execute(connection)
        ).rejects.toThrowError(
          `9 FAILED_PRECONDITION: Event stream '${ANY_REVISION_STREAM}' is deleted.`
        );
      });
    });

    describe("expected revision", () => {
      describe("exact", () => {
        const STREAM = "expected_revision_stream_exact";

        beforeAll(async () => {
          const result = await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);

          expect(result.__typename).toBe("success");
        });

        it("fails", async () => {
          await expect(
            tombstoneStream(STREAM)
              .expectedRevision({
                __typename: "exact",
                revision: 2,
              })
              .execute(connection)
          ).rejects.toThrowError(
            `9 FAILED_PRECONDITION: Append failed due to WrongExpectedVersion. Stream: ${STREAM}, Expected version: 2, Actual version: `
          );
        });

        it("succeeds", async () => {
          const { events } = await readEventsFromStream(STREAM)
            .fromEnd()
            .backward()
            .count(1)
            .execute(connection);

          const revision = events![0].event!.revision;

          const result = await tombstoneStream(STREAM)
            .expectedRevision({
              __typename: "exact",
              revision,
            })
            .execute(connection);

          expect(result).toBeDefined();

          await expect(() =>
            readEventsFromStream(STREAM).execute(connection)
          ).rejects.toThrowError(
            `9 FAILED_PRECONDITION: Event stream '${STREAM}' is deleted.`
          );
        });
      });

      // throws error: 2 UNKNOWN: Exception was thrown by handler.
      describe.skip("exists", () => {
        const STREAM = "expected_revision_stream_exists";
        const NOT_A_STREAM = "i_dont_exist_hopefully";

        beforeAll(async () => {
          const result = await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);

          expect(result.__typename).toBe("success");
        });

        it("fails", async () => {
          await expect(
            tombstoneStream(NOT_A_STREAM)
              .expectedRevision({
                __typename: "stream_exists",
              })
              .execute(connection)
          ).rejects.toThrowError(`error here`);
        });

        it("succeeds", async () => {
          const result = await tombstoneStream(STREAM)
            .expectedRevision({
              __typename: "stream_exists",
            })
            .execute(connection);

          expect(result).toBeDefined();

          await expect(() =>
            readEventsFromStream(STREAM).execute(connection)
          ).rejects.toThrowError(
            `9 FAILED_PRECONDITION: Event stream '${STREAM}' is deleted.`
          );
        });
      });

      describe("no stream", () => {
        const NOT_A_STREAM = "expected_revision_stream_no_stream";
        const STREAM = "i_exist_hopefully";

        beforeAll(async () => {
          const result = await writeEventsToStream(STREAM)
            .send(event, event, event, event)
            .execute(connection);

          expect(result.__typename).toBe("success");
        });

        it("fails", async () => {
          await expect(
            tombstoneStream(STREAM)
              .expectedRevision({
                __typename: "no_stream",
              })
              .execute(connection)
          ).rejects.toThrowError(
            `9 FAILED_PRECONDITION: Append failed due to WrongExpectedVersion. Stream: ${STREAM}, Expected version: -1, Actual version: `
          );
        });

        it("succeeds", async () => {
          const result = await tombstoneStream(NOT_A_STREAM)
            .expectedRevision({
              __typename: "no_stream",
            })
            .execute(connection);

          expect(result).toBeDefined();

          await expect(() =>
            readEventsFromStream(NOT_A_STREAM).execute(connection)
          ).rejects.toThrowError(
            `9 FAILED_PRECONDITION: Event stream '${NOT_A_STREAM}' is deleted.`
          );
        });
      });
    });
  });
});
