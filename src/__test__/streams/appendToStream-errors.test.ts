/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import {
  createTestNode,
  jsonTestEvents,
  matchServerVersion,
  optionalTest,
} from "@test-utils";

import {
  EventStoreDBClient,
  WrongExpectedVersionError,
  NO_STREAM,
  StreamDeletedError,
  MaxAppendSizeExceededError,
  AccessDeniedError,
  TimeoutError,
} from "@eventstore/db-client";

describe("appendToStream - errors", () => {
  const node = createTestNode();
  const timeoutNode = createTestNode()
    .setOption("EVENTSTORE_COMMIT_TIMEOUT_MS", 1)
    .setOption("EVENTSTORE_PREPARE_TIMEOUT_MS", 1);
  let client!: EventStoreDBClient;
  let timeoutClient!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    await timeoutNode.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri, throwOnAppendFailure: true },
      { rootCertificate: node.rootCertificate }
    );
    timeoutClient = new EventStoreDBClient(
      { endpoint: timeoutNode.uri, throwOnAppendFailure: true },
      { rootCertificate: timeoutNode.rootCertificate }
    );
  });

  afterAll(async () => {
    await node.down();
    await timeoutNode.down();
  });

  describe.each([
    ["Batch append (>21.10)", matchServerVersion`>=21.10`, undefined],
    ["Normal Append", true, { username: "admin", password: "changeit" }],
  ])("%s", (prefix, supported, credentials) => {
    optionalTest(supported)("WrongExpectedVersion", async () => {
      const STREAM_NAME = `${prefix}_no_stream_here_but_there_is`;

      await client.appendToStream(STREAM_NAME, jsonTestEvents(), {
        credentials,
      });

      try {
        const result = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents(),
          {
            expectedRevision: "no_stream",
            credentials,
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

    optionalTest(supported)("StreamDeleted", async () => {
      const STREAM_NAME = `${prefix}_i_will_be_deleted`;

      await client.appendToStream(STREAM_NAME, jsonTestEvents(), {
        credentials,
      });
      await client.tombstoneStream(STREAM_NAME, { credentials });

      try {
        const result = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents(),
          {
            credentials,
          }
        );

        expect(result).toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(StreamDeletedError);

        if (error instanceof StreamDeletedError) {
          expect(error.streamName).toBe(STREAM_NAME);
        }
      }
    });

    optionalTest(supported)("AccessDenied", async () => {
      const STREAM_NAME = `${prefix}_no_entry`;

      await client.appendToStream(STREAM_NAME, jsonTestEvents(), {
        credentials,
      });

      await client.setStreamMetadata(STREAM_NAME, {
        acl: {
          writeRoles: ["some_user"],
        },
      });

      try {
        const result = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents(),
          {
            credentials: credentials
              ? { username: "AzureDiamond", password: "hunter2" }
              : undefined,
          }
        );

        expect(result).toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(AccessDeniedError);
      }
    });

    optionalTest(supported)("Timeout", async () => {
      const STREAM_NAME = `${prefix}_timeout`;

      try {
        // try increasingly hard to hit the timeout
        for (let i = 5; i < 20; i += 5) {
          await Promise.all(
            Array.from({ length: i }, () =>
              timeoutClient.appendToStream(
                STREAM_NAME,
                jsonTestEvents(30_000),
                {
                  credentials,
                }
              )
            )
          );
        }

        expect("this point").toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(TimeoutError);
      }
    });

    optionalTest(supported)("MaximumAppendSizeExceeded", async () => {
      const STREAM_NAME = `${prefix}_i_am_too_many`;

      try {
        const result = await client.appendToStream(
          STREAM_NAME,
          jsonTestEvents(40_000),
          {
            credentials,
          }
        );

        expect(result).toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(MaxAppendSizeExceededError);

        if (error instanceof MaxAppendSizeExceededError) {
          expect(typeof error.maxAppendSize).toBe("number");
        }
      }
    });
  });
});
