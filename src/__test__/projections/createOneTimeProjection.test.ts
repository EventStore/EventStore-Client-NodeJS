import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createOneTimeProjection,
} from "../..";

describe("createOneTimeProjection", () => {
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

  it("succeeds", async () => {
    await expect(
      createOneTimeProjection(`
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
      `)
        .authenticated("admin", "changeit")
        .execute(connection)
    ).resolves.toBeUndefined();
  });
});
