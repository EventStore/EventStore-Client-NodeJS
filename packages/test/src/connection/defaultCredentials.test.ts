import { collect, createTestNode } from "@test-utils";
import { KurrentDBClient, AccessDeniedError } from "@kurrent/kurrentdb-client";

describe("defaultCredentials", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should set default credentials to be used by commands", () => {
    test("bad override", async () => {
      const client = KurrentDBClient.connectionString(node.connectionString());
      await expect(
        collect(client.readAll({ maxCount: 10 }))
      ).resolves.toBeDefined();
      try {
        await collect(
          client.readAll({
            maxCount: 10,
            credentials: { username: "AzureDiamond", password: "hunter2" },
          })
        );
      } catch (e) {
        expect(e).toBeInstanceOf(AccessDeniedError);
      }
    });

    test("good override", async () => {
      const client = KurrentDBClient.connectionString(
        node.connectionStringWithOverrides({
          defaultUserCredentials: {
            username: "AzureDiamond",
            password: "hunter2",
          },
        })
      );

      try {
        await collect(client.readAll({ maxCount: 10 }));
      } catch (e) {
        expect(e).toBeInstanceOf(AccessDeniedError);
      }
      await expect(
        collect(
          client.readAll({
            maxCount: 10,
            credentials: { username: "admin", password: "changeit" },
          })
        )
      ).resolves.toBeDefined();
    });
  });
});
