import { createTestNode } from "@test-utils";

import {
  ABORTED,
  ABORTING,
  COMPLETED,
  CREATING,
  DELETING,
  EventStoreDBClient,
  FAULTED,
  LOADED,
  LOADING,
  LOADING_STOPPED,
  PREPARED,
  PREPARING,
  RUNNING,
  STARTING,
  STOPPED,
  STOPPING,
  UnknownError,
} from "@eventstore/db-client";

describe("getProjectionStatistics", () => {
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

  const possibleStatuses = [
    CREATING,
    LOADING,
    LOADED,
    PREPARING,
    PREPARED,
    STARTING,
    LOADING_STOPPED,
    RUNNING,
    STOPPING,
    ABORTING,
    STOPPED,
    COMPLETED,
    ABORTED,
    FAULTED,
    DELETING,
  ];

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
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
      for (const projection of projections) {
        const status = await client.getProjectionStatus(projection);
        expect(possibleStatuses).toContain(status);
      }
    });

    test("non-existant", async () => {
      const REQUESTED_NAME = "some-non-existant-projection";
      await expect(
        client.getProjectionStatus(REQUESTED_NAME)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
