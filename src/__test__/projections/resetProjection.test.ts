/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion } from "@test-utils";

import {
  EventStoreDBClient,
  NotFoundError,
  UnknownError,
} from "@eventstore/db-client";

describe("resetProjection", () => {
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
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("resets the projection", async () => {
    const PROJECTION_NAME = "projection_to_disable";
    await client.createProjection(PROJECTION_NAME, projection);
    await client.resetProjection(PROJECTION_NAME);
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";
      await expect(
        client.resetProjection(PROJECTION_NAME)
      ).rejects.toThrowError(
        matchServerVersion`<=23.10` ? UnknownError : NotFoundError
      );
    });
  });
});
