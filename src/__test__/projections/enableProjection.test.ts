import { createTestNode } from "../utils";

import { ABORTED, EventStoreDBClient, RUNNING, UnknownError } from "../..";

describe("enableProjection", () => {
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

  test("enables the projection", async () => {
    const PROJECTION_NAME = "projection_to_enable";

    await client.createContinuousProjection(PROJECTION_NAME, projection);

    await client.disableProjection(PROJECTION_NAME);

    const beforeDetails = await client.getProjectionStatistics(PROJECTION_NAME);

    expect(beforeDetails).toBeDefined();
    expect(beforeDetails.projectionStatus).toBe(ABORTED);

    await client.enableProjection(PROJECTION_NAME);

    const afterDetails = await client.getProjectionStatistics(PROJECTION_NAME);

    expect(afterDetails).toBeDefined();
    expect(afterDetails.projectionStatus).toBe(RUNNING);
  });

  test("projection doesnt exist", async () => {
    const PROJECTION_NAME = "doesnt exist";

    await expect(client.enableProjection(PROJECTION_NAME)).rejects.toThrowError(
      UnknownError
    ); // https://github.com/EventStore/EventStore/issues/2732
  });
});
