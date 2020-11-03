import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
  UnknownError,
  updateProjection,
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
    test("change query", async () => {
      const PROJECTION_NAME = "projection_to_update_query";
      const after = `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {
                last: ev,
                updated: true,
              };
            },
          });
      `;

      await createContinuousProjection(PROJECTION_NAME, projection).execute(
        connection
      );

      await updateProjection(PROJECTION_NAME, after).execute(connection);
    });

    test("track Emitted Streams", async () => {
      const PROJECTION_NAME = "projection_to_update_tracking";

      await createContinuousProjection(PROJECTION_NAME, projection).execute(
        connection
      );

      await updateProjection(PROJECTION_NAME, projection)
        .trackEmittedStreams()

        .execute(connection);
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        updateProjection(PROJECTION_NAME, projection).execute(connection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
