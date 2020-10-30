import { createTestNode } from "../utils";

import { AccessDeniedError, EventStoreConnection, readAllEvents } from "../..";

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
      const connection = EventStoreConnection.builder()
        .defaultCredentials({ username: "admin", password: "changeit" })
        .sslRootCertificate(node.certPath)
        .singleNodeConnection(node.uri);

      await expect(
        readAllEvents().fromStart().execute(connection)
      ).resolves.toBeDefined();

      await expect(
        readAllEvents()
          .authenticated({ username: "AzureDiamond", password: "hunter2" })
          .fromStart()
          .execute(connection)
      ).rejects.toThrowError(AccessDeniedError);
    });

    test("good override", async () => {
      const connection = EventStoreConnection.builder()
        .defaultCredentials({ username: "AzureDiamond", password: "hunter2" })
        .sslRootCertificate(node.certPath)
        .singleNodeConnection(node.uri);

      await expect(
        readAllEvents().fromStart().execute(connection)
      ).rejects.toThrowError(AccessDeniedError);

      await expect(
        readAllEvents()
          .authenticated({ username: "admin", password: "changeit" })
          .fromStart()
          .execute(connection)
      ).resolves.toBeDefined();
    });
  });
});
