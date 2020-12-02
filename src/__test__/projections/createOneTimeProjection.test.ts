import { createTestNode } from "../utils";

import { EventStoreDBClient } from "../..";

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

  describe("string", () => {
    it("succeeds", async () => {
      await expect(
        client.createOneTimeProjection(
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

  describe("template string", () => {
    it("succeeds", async () => {
      const INIT = "$init";

      await expect(
        client.createOneTimeProjection`
          fromAll()
            .when({
              ${INIT}: function (state, ev) {
                return {};
              }
            });
        `
      ).resolves.toBeUndefined();
    });
  });
});
