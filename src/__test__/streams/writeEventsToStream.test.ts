import { createTestNode, testEvents } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
} from "../..";
import { WrongExpectedVersionError } from "../../utils/CommandError";
import { ANY, NO_STREAM, STREAM_EXISTS } from "../../constants";

describe("writeEventsToStream", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully write to stream", () => {
    test("json events", async () => {
      const STREAM_NAME = "json_stream_name";
      const events = Array.from({ length: 4 }, (_, i) =>
        EventData.json("json-test", { message: "test", index: i }).build()
      );

      const result = await writeEventsToStream(STREAM_NAME)
        .send(...events)
        .execute(connection);

      expect(result).toBeDefined();
      expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
    });

    test("binary events", async () => {
      const STREAM_NAME = "binary_stream_name";
      const events = Array.from({ length: 4 }, (_, i) =>
        EventData.binary(
          "binary-test",
          Uint8Array.from(Buffer.from(`hello: ${i}`))
        ).build()
      );

      const result = await writeEventsToStream(STREAM_NAME)
        .send(...events)
        .execute(connection);

      expect(result).toBeDefined();
      expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
    });

    describe("expected revision", () => {
      describe(ANY, () => {
        test("succeeds", async () => {
          const STREAM_NAME = "any_stream_doesnt_matter";

          const result = await writeEventsToStream(STREAM_NAME)
            .expectedRevision(ANY)
            .send(...testEvents())
            .execute(connection);

          expect(result).toBeDefined();
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
        });
      });

      describe(NO_STREAM, () => {
        test("succeeds", async () => {
          const STREAM_NAME = "no_stream_here";

          const result = await writeEventsToStream(STREAM_NAME)
            .expectedRevision(NO_STREAM)
            .send(...testEvents())
            .execute(connection);

          expect(result).toBeDefined();
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
        });

        // issue on server
        test.skip("fails", async () => {
          const STREAM_NAME = "no_stream_here_but_there_is";

          await writeEventsToStream(STREAM_NAME)
            .send(...testEvents())
            .execute(connection);

          try {
            const result = await writeEventsToStream(STREAM_NAME)
              .expectedRevision("no_stream")
              .send(...testEvents())
              .execute(connection);

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

          await writeEventsToStream(STREAM_NAME)
            .send(...testEvents())
            .execute(connection);

          const result = await writeEventsToStream(STREAM_NAME)
            .expectedRevision(STREAM_EXISTS)
            .send(...testEvents())
            .execute(connection);

          expect(result).toBeDefined();
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
        });

        test("fails", async () => {
          const STREAM_NAME = "stream_should_exist_but_doesnt";

          try {
            const result = await writeEventsToStream(STREAM_NAME)
              .expectedRevision(STREAM_EXISTS)
              .send(...testEvents())
              .execute(connection);

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

          const { nextExpectedVersion } = await writeEventsToStream(STREAM_NAME)
            .send(...testEvents())
            .execute(connection);

          const result = await writeEventsToStream(STREAM_NAME)
            .expectedRevision(nextExpectedVersion)
            .send(...testEvents())
            .execute(connection);

          expect(result).toBeDefined();
          expect(result.nextExpectedVersion).toBeGreaterThanOrEqual(0);
        });

        describe("fails", () => {
          test("no stream", async () => {
            const STREAM_NAME = "stream_should_be_at_revision_but_doesnt_exist";

            try {
              const result = await writeEventsToStream(STREAM_NAME)
                .expectedRevision(1)
                .send(...testEvents())
                .execute(connection);

              expect(result).toBe("unreachable");
            } catch (error) {
              expect(error).toBeInstanceOf(WrongExpectedVersionError);

              if (error instanceof WrongExpectedVersionError) {
                expect(error.streamName).toBe(STREAM_NAME);
                expect(error.expectedVersion).toBe(1);
                expect(error.actualVersion).toBe(NO_STREAM);
              }
            }
          });

          test("wrong version", async () => {
            const STREAM_NAME = "stream_should_be_at_revision_but_isnt";

            const { nextExpectedVersion } = await writeEventsToStream(
              STREAM_NAME
            )
              .send(...testEvents())
              .execute(connection);

            try {
              const result = await writeEventsToStream(STREAM_NAME)
                .expectedRevision(nextExpectedVersion + 1)
                .send(...testEvents())
                .execute(connection);

              expect(result).toBe("unreachable");
            } catch (error) {
              expect(error).toBeInstanceOf(WrongExpectedVersionError);

              if (error instanceof WrongExpectedVersionError) {
                expect(error.streamName).toBe(STREAM_NAME);
                expect(error.expectedVersion).toBe(nextExpectedVersion + 1);
                expect(error.actualVersion).toBe(nextExpectedVersion);
              }
            }
          });
        });
      });
    });
  });
});
