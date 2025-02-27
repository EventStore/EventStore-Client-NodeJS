/** @jest-environment ./src/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion } from "@test-utils";

import {
  KurrentDBClient,
  NotFoundError,
  UnknownError,
} from "@kurrent/db-client";

describe("getProjectionStatus", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  const basicProjection = `
  fromAll()
    .when({
      $init: function (state, ev) {
        return {};
      }
    });
  `;

  const projections = ["projection-1", "projection-2", "projection-3"];

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());

    for (const name of projections) {
      await client.createProjection(name, basicProjection);
    }
  });

  afterAll(async () => {
    await node.down();
  });

  describe("gets Projection Status", () => {
    test("gets status", async () => {
      const REQUESTED_NAME = projections[2];

      const details = await client.getProjectionStatus(REQUESTED_NAME);

      expect(details).toBeDefined();
      expect(details.name).toBe(REQUESTED_NAME);
    });

    test("non-existant", async () => {
      const REQUESTED_NAME = "some-non-existant-projection";
      await expect(
        client.getProjectionStatus(REQUESTED_NAME)
      ).rejects.toThrowError(
        matchServerVersion`>=24.6` ? NotFoundError : UnknownError
      );
    });
  });
});
