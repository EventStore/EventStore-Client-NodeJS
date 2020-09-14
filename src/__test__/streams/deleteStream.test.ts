import { createTestNode } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
  readEventsFromStream,
} from "../../index";
import { deleteStream } from "../../command/streams";
import { WrongExpectedVersionError } from "../../command";

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
        const result = await writeEventsToStream(ANY_REVISION_STREAM)
          .send(event, event, event, event)
          .execute(connection);

        expect(result.__typename).toBe("success");
      });

      it("succeeds", async () => {
        const result = await deleteStream(ANY_REVISION_STREAM).execute(
          connection
        );
        expect(result).toBeDefined();

        const readResult = await readEventsFromStream(
          ANY_REVISION_STREAM
        ).execute(connection);

        expect(readResult.__typename).toBe("not_found");
        expect(readResult.events).toBeUndefined();
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
          try {
            const result = await deleteStream(STREAM)
              .expectedRevision({
                __typename: "exact",
                revision: 2,
              })
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
          const { events } = await readEventsFromStream(STREAM)
            .fromEnd()
            .backward()
            .count(1)
            .execute(connection);

          const revision = events![0].event!.revision;

          const result = await deleteStream(STREAM)
            .expectedRevision({
              __typename: "exact",
              revision,
            })
            .execute(connection);

          expect(result).toBeDefined();

          const readResult = await readEventsFromStream(STREAM).execute(
            connection
          );

          expect(readResult.__typename).toBe("not_found");
          expect(readResult.events).toBeUndefined();
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
            deleteStream(NOT_A_STREAM)
              .expectedRevision({
                __typename: "stream_exists",
              })
              .execute(connection)
          ).rejects.toThrowError(`error here`);
        });

        it("succeeds", async () => {
          const result = await deleteStream(STREAM)
            .expectedRevision({
              __typename: "stream_exists",
            })
            .execute(connection);

          expect(result).toBeDefined();

          const readResult = await readEventsFromStream(STREAM).execute(
            connection
          );

          expect(readResult.__typename).toBe("not_found");
          expect(readResult.events).toBeUndefined();
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
          try {
            const result = await deleteStream(STREAM)
              .expectedRevision({
                __typename: "no_stream",
              })
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
            .expectedRevision({
              __typename: "no_stream",
            })
            .execute(connection);

          expect(result).toBeDefined();
        });
      });
    });
  });
});
