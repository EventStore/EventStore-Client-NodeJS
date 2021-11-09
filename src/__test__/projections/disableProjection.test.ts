/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion } from "@test-utils";

import {
  ABORTED,
  EventStoreDBClient,
  RUNNING,
  STOPPED,
  UnknownError,
} from "@eventstore/db-client";

describe("disable / abort", () => {
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

  describe("disableProjection", () => {
    test("disables the projection", async () => {
      const PROJECTION_NAME = "projection_to_disable";

      await client.createProjection(PROJECTION_NAME, projection);

      const beforeDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(beforeDetails).toBeDefined();
      expect(beforeDetails.projectionStatus).toBe(RUNNING);

      await client.disableProjection(PROJECTION_NAME);

      const afterDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(afterDetails).toBeDefined();

      if (matchServerVersion`>=21.10`) {
        expect(afterDetails.projectionStatus).toBe(STOPPED);
      } else {
        // Incorrect projection status was switched (ABORTED -> STOPPED) in
        // https://github.com/EventStore/EventStore/pull/2944
        expect([STOPPED, ABORTED]).toContain(afterDetails.projectionStatus);
      }
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

  describe("abortProjection", () => {
    test("aborts the projection", async () => {
      const PROJECTION_NAME = "projection_to_abort";

      await client.createProjection(PROJECTION_NAME, projection);

      const beforeDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(beforeDetails).toBeDefined();
      expect(beforeDetails.projectionStatus).toBe(RUNNING);

      await client.abortProjection(PROJECTION_NAME);

      const afterDetails = await client.getProjectionStatistics(
        PROJECTION_NAME
      );

      expect(afterDetails).toBeDefined();

      if (matchServerVersion`>=21.10`) {
        expect(afterDetails.projectionStatus).toBe(ABORTED);
      } else {
        // Incorrect projection status was switched (ABORTED -> STOPPED) in
        // https://github.com/EventStore/EventStore/pull/2944
        expect([STOPPED, ABORTED]).toContain(afterDetails.projectionStatus);
      }
    });

    describe("errors", () => {
      test("projection doesnt exist", async () => {
        const PROJECTION_NAME = "doesnt exist";

        await expect(
          client.abortProjection(PROJECTION_NAME)
        ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
      });
    });
  });
});
