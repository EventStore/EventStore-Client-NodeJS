import { collect, createTestNode } from "@test-utils";
import { KurrentDBClient, AccessDeniedError } from "@kurrent/db-client";

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
        collect(await client.readAll({ maxCount: 10 }))
      ).resolves.toBeDefined();
      await expect(
        collect(
          await client.readAll({
            maxCount: 10,
            credentials: { username: "AzureDiamond", password: "hunter2" },
          })
        )
      ).rejects.toThrowError(AccessDeniedError);
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

      await expect(
        collect(await client.readAll({ maxCount: 10 }))
      ).rejects.toThrowError(AccessDeniedError);
      await expect(
        collect(
          await client.readAll({
            maxCount: 10,
            credentials: { username: "admin", password: "changeit" },
          })
        )
      ).resolves.toBeDefined();
    });
  });
});
