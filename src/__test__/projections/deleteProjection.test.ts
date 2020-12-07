import { createTestNode } from "../utils";

import {
  EventStoreDBClient,
  RUNNING,
  DELETING,
  STOPPED,
  UnknownError,
} from "../..";

describe("deleteProjection", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

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
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("delete the projection", async () => {
    const PROJECTION_NAME = "projection_to_delete_everything";

    await client.createContinuousProjection(PROJECTION_NAME, projection);

    const beforeDetails = await client.getProjectionStatistics(PROJECTION_NAME);

    expect(beforeDetails).toBeDefined();
    expect(beforeDetails.projectionStatus).toBe(RUNNING);

    await client.disableProjection(PROJECTION_NAME, { writeCheckpoint: false });

    const disabledDetails = await client.getProjectionStatistics(
      PROJECTION_NAME
    );

    expect(disabledDetails).toBeDefined();
    expect(disabledDetails.projectionStatus).toBe(STOPPED);

    await client.deleteProjection(PROJECTION_NAME);

    const afterDetails = await client.getProjectionStatistics(PROJECTION_NAME);

    expect(afterDetails).toBeDefined();
    expect(afterDetails.projectionStatus).toBe(DELETING);
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        client.deleteProjection(PROJECTION_NAME)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
