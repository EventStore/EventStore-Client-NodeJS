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
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("resets the projection", () => {
    test("write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_with_checkpoint";

      await createContinuousProjection(PROJECTION_NAME, projection).execute(
        connection
      );

      await resetProjection(PROJECTION_NAME)
        .writeCheckpoint()

        .execute(connection);
    });

    test("do not write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_without_checkpoint";

      await createContinuousProjection(PROJECTION_NAME, projection).execute(
        connection
      );

      await resetProjection(PROJECTION_NAME)
        .doNotWriteCheckpoint()

        .execute(connection);
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        resetProjection(PROJECTION_NAME).execute(connection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
