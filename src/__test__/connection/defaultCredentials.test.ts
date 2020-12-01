import { createTestNode } from "../utils";

import { EventStoreDBClient, AccessDeniedError } from "../..";

describe.skip("defaultCredentials", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should set default credentials to be used by commands", () => {
    test("bad override", async () => {
      const client = new EventStoreDBClient(
        { endpoint: node.uri },
        { rootCertificate: node.rootCertificate },
        { username: "admin", password: "changeit" }
      );
      await expect(client.readAllEvents(10)).resolves.toBeDefined();
      await expect(
        client.readAllEvents(10, {
          credentials: { username: "AzureDiamond", password: "hunter2" },
        })
      ).rejects.toThrowError(AccessDeniedError);
    });

    test("good override", async () => {
      const client = new EventStoreDBClient(
        { endpoint: node.uri },
        { rootCertificate: node.rootCertificate },
        { username: "AzureDiamond", password: "hunter2" }
      );
      await expect(client.readAllEvents(10)).rejects.toThrowError(
        AccessDeniedError
      );
      await expect(
        client.readAllEvents(10, {
          credentials: { username: "admin", password: "changeit" },
        })
      ).resolves.toBeDefined();
    });
  });
});
