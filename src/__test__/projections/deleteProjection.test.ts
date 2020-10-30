import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
  disableProjection,
  deleteProjection,
  getProjectionStatistics,
  RUNNING,
  DELETING,
  STOPPED,
  UnknownError,
} from "../..";

describe("deleteProjection", () => {
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

  test("delete the projection", async () => {
    const PROJECTION_NAME = "projection_to_delete_everything";

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

    const disabledDetails = await getProjectionStatistics(
      PROJECTION_NAME
    ).execute(connection);

    expect(disabledDetails).toBeDefined();
    expect(disabledDetails.projectionStatus).toBe(STOPPED);

    await deleteProjection(PROJECTION_NAME).execute(connection);

    const afterDetails = await getProjectionStatistics(PROJECTION_NAME).execute(
      connection
    );

    expect(afterDetails).toBeDefined();
    expect(afterDetails.projectionStatus).toBe(DELETING);
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        deleteProjection(PROJECTION_NAME).execute(connection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
