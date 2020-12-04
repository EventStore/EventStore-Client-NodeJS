import { jsonTestEvents, optionalDescribe } from "../utils";

import {
  EventStoreDBClient,
  jsonEvent,
  NodePreference,
  NotLeaderError,
} from "../..";

optionalDescribe(process.env.EVENTSTORE_CLOUD_ID != null)(
  "dns discover",
  () => {
    const STREAM_NAME = "test_stream_name";
    const { EVENTSTORE_CLOUD_ID } = process.env;
    const event = jsonEvent({
      eventType: "test",
      payload: { message: "test" },
    });

    describe.each([
      [
        "connectionString",
        (nodePreference?: NodePreference) =>
          EventStoreDBClient.connectionString`esdb+discover://${EVENTSTORE_CLOUD_ID!}.mesdb.eventstore.cloud${
            nodePreference ? `?nodePreference=${nodePreference}` : ""
          }`,
      ],
      [
        "new client",
        (nodePreference?: NodePreference) =>
          new EventStoreDBClient({
            discover: {
              address: `${EVENTSTORE_CLOUD_ID!}.mesdb.eventstore.cloud`,
              port: 2113,
            },
            nodePreference,
          }),
      ],
    ])("%s", (clientType, createClient) => {
      test("should successfully connect", async () => {
        const client = createClient();

        const writeResult = await client.writeEventsToStream(
          STREAM_NAME,
          event
        );
        const readResult = await client.readEventsFromStream(STREAM_NAME, 10);

        expect(writeResult).toBeDefined();
        expect(readResult).toBeDefined();
      });

      describe("should connect to specified preference", () => {
        test("leader", async () => {
          const client = createClient("leader");
          const writeResult = await client.writeEventsToStream(
            `${clientType}-leader-test`,
            jsonTestEvents(),
            { requiresLeader: true }
          );

          expect(writeResult).toBeDefined();
        });

        test("follower", async () => {
          const client = createClient("follower");

          try {
            const writeResult = await client.writeEventsToStream(
              `${clientType}-leader-test`,
              jsonTestEvents(),
              { requiresLeader: true }
            );
            expect(writeResult).toBe("unreachable");
          } catch (error) {
            expect(error).toBeInstanceOf(NotLeaderError);
          }
        });
      });
    });
  }
);
