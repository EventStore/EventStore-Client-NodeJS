import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
  resetProjection,
  UnknownError,
} from "../..";

describe("resetProjection", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  const projection = `
  fromAll()
    .when({
      $init: function (state, ev) {
        return {
          last: ev,
        };
      },
    });
  `;

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("resets the projection", () => {
    test("write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_with_checkpoint";

      await createContinuousProjection(PROJECTION_NAME, projection)
        .authenticated("admin", "changeit")
        .execute(connection);

      await resetProjection(PROJECTION_NAME)
        .writeCheckpoint()
        .authenticated("admin", "changeit")
        .execute(connection);
    });

    test("do not write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_without_checkpoint";

      await createContinuousProjection(PROJECTION_NAME, projection)
        .authenticated("admin", "changeit")
        .execute(connection);

      await resetProjection(PROJECTION_NAME)
        .doNotWriteCheckpoint()
        .authenticated("admin", "changeit")
        .execute(connection);
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        resetProjection(PROJECTION_NAME)
          .authenticated("admin", "changeit")
          .execute(connection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
