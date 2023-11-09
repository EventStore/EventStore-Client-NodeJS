import { collect, jsonTestEvents, optionalDescribe } from "@test-utils";
import {
  EventStoreDBClient,
  jsonEvent,
  NodePreference,
  NotLeaderError,
} from "@eventstore/db-client";

optionalDescribe(!!process.env.EVENTSTORE_CLOUD_ID)("dns discover", () => {
  const STREAM_NAME = "test_stream_name";
  const { EVENTSTORE_CLOUD_ID } = process.env;
  const event = jsonEvent({
    type: "test",
    data: { message: "test" },
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
      await expect(
        client.appendToStream(STREAM_NAME, event)
      ).resolves.toBeDefined();
      await expect(
        collect(client.readStream(STREAM_NAME, { maxCount: 10 }))
      ).resolves.toBeDefined();
    });

    describe("should connect to specified preference", () => {
      test("leader", async () => {
        const client = createClient("leader");
        await expect(
          client.appendToStream(`${clientType}-leader-test`, jsonTestEvents(), {
            requiresLeader: true,
          })
        ).resolves.toBeDefined();
      });

      test("follower", async () => {
        const client = createClient("follower");
        await expect(
          client.appendToStream(`${clientType}-leader-test`, jsonTestEvents(), {
            requiresLeader: true,
          })
        ).rejects.toThrow(NotLeaderError);
      });
    });
  });
});
