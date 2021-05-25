import { createTestNode } from "../utils";

import {
  ABORTED,
  EventStoreDBClient,
  RUNNING,
  STOPPED,
  UnknownError,
} from "../..";

describe("disableProjection", () => {
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

  describe("disables the projection", () => {
    test("write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_with_checkpoint";

      await client.createContinuousProjection(PROJECTION_NAME, projection);

      const beforeDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(beforeDetails).toBeDefined();
      expect(beforeDetails.projectionStatus).toBe(RUNNING);

      await client.disableProjection(PROJECTION_NAME, {
        writeCheckpoint: true,
      });

      const afterDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(afterDetails).toBeDefined();

      // Incorrect projection status was switched (ABORTED -> STOPPED) in
      // https://github.com/EventStore/EventStore/pull/2944
      expect([STOPPED, ABORTED]).toContain(afterDetails.projectionStatus);
    });

    test("do not write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_without_checkpoint";

      await client.createContinuousProjection(PROJECTION_NAME, projection);

      const beforeDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(beforeDetails).toBeDefined();
      expect(beforeDetails.projectionStatus).toBe(RUNNING);

      await client.disableProjection(PROJECTION_NAME, {
        writeCheckpoint: false,
      });

      const afterDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(afterDetails).toBeDefined();

      // Incorrect projection status was fixed (STOPPED -> ABORTED) in
      // https://github.com/EventStore/EventStore/pull/2944
      expect([ABORTED, STOPPED]).toContain(afterDetails.projectionStatus);
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        client.disableProjection(PROJECTION_NAME)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
