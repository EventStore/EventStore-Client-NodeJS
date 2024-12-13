/** @jest-environment ./src/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion } from "@test-utils";

import {
  KurrentDBClient,
  NotFoundError,
  UnknownError,
} from "@eventstore/db-client";

describe("resetProjection", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

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
    client = new KurrentDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
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
      await client.createProjection(PROJECTION_NAME, projection);
      await client.updateProjection(PROJECTION_NAME, after);
    });

    test("Emit enabled", async () => {
      const PROJECTION_NAME = "projection_to_update_tracking";
      await client.createProjection(PROJECTION_NAME, projection);
      await client.updateProjection(PROJECTION_NAME, projection, {
        emitEnabled: true,
      });
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";
      await expect(
        client.updateProjection(PROJECTION_NAME, projection)
      ).rejects.toThrowError(
        matchServerVersion`>=24.6` ? NotFoundError : UnknownError
      );
    });
  });
});
