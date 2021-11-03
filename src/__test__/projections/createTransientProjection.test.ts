import { createTestNode } from "@test-utils";

import { EventStoreDBClient } from "@eventstore/db-client";

describe("createOneTimeProjection", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  it("succeeds", async () => {
    const PROJECTION_NAME = "transient";

    await expect(
      client.createTransientProjection(
        PROJECTION_NAME,
        `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
        `
      )
    ).resolves.toBeUndefined();
  });
});
