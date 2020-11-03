import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
  disableProjection,
  getProjectionStatistics,
  ABORTED,
  RUNNING,
  STOPPED,
  UnknownError,
} from "../..";

describe("disableProjection", () => {
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

  describe("disables the projection", () => {
    test("write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_with_checkpoint";

      await createContinuousProjection(PROJECTION_NAME, projection).execute(
        connection
      );

      const beforeDetails = await getProjectionStatistics(
        PROJECTION_NAME
      ).execute(connection);

      expect(beforeDetails).toBeDefined();
      expect(beforeDetails.projectionStatus).toBe(RUNNING);

      await disableProjection(PROJECTION_NAME)
        .writeCheckpoint()

        .execute(connection);

      const afterDetails = await getProjectionStatistics(
        PROJECTION_NAME
      ).execute(connection);

      expect(afterDetails).toBeDefined();
      expect(afterDetails.projectionStatus).toBe(ABORTED);
    });

    test("do not write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_without_checkpoint";

      await createContinuousProjection(PROJECTION_NAME, projection).execute(
        connection
      );

      const beforeDetails = await getProjectionStatistics(
        PROJECTION_NAME
      ).execute(connection);

      expect(beforeDetails).toBeDefined();
      expect(beforeDetails.projectionStatus).toBe(RUNNING);

      await disableProjection(PROJECTION_NAME)
        .doNotWriteCheckpoint()

        .execute(connection);

      const afterDetails = await getProjectionStatistics(
        PROJECTION_NAME
      ).execute(connection);

      expect(afterDetails).toBeDefined();
      expect(afterDetails.projectionStatus).toBe(STOPPED);
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        disableProjection(PROJECTION_NAME).execute(connection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
