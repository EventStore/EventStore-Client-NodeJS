/** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */

import { createTestNode, matchServerVersion } from "@test-utils";

import {
  ABORTED,
  EventStoreDBClient,
  NotFoundError,
  RUNNING,
  STOPPED,
  UnknownError,
} from "@eventstore/db-client";

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
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("enables the projection", async () => {
    const PROJECTION_NAME = "projection_to_enable";

    await client.createProjection(PROJECTION_NAME, projection);

    await client.disableProjection(PROJECTION_NAME);

    const beforeDetails = await client.getProjectionStatus(PROJECTION_NAME);

    expect(beforeDetails).toBeDefined();

    if (matchServerVersion`>=21.10`) {
      expect(beforeDetails.projectionStatus).toBe(STOPPED);
    } else {
      // Incorrect projection status was switched (ABORTED -> STOPPED) in
      // https://github.com/EventStore/EventStore/pull/2944
      expect([STOPPED, ABORTED]).toContain(beforeDetails.projectionStatus);
    }

    await client.enableProjection(PROJECTION_NAME);

    const afterDetails = await client.getProjectionStatus(PROJECTION_NAME);

    expect(afterDetails).toBeDefined();
    expect(afterDetails.projectionStatus).toBe(RUNNING);
  });

  test("projection doesnt exist", async () => {
    const PROJECTION_NAME = "doesnt exist";

    await expect(client.enableProjection(PROJECTION_NAME)).rejects.toThrowError(
      matchServerVersion`>=24.6` ? NotFoundError : UnknownError
    );
  });
});
