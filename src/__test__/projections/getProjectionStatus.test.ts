/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion } from "@test-utils";

import {
  EventStoreDBClient,
  NotFoundError,
  UnknownError,
} from "@eventstore/db-client";

describe("getProjectionStatus", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

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
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );

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
        matchServerVersion`<=23.10` ? UnknownError : NotFoundError
      );
    });
  });
});
