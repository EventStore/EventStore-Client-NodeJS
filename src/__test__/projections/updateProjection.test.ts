import { createTestNode } from "@test-utils";

import { EventStoreDBClient, UnknownError } from "@eventstore/db-client";

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
      { rootCertificate: node.rootCertificate },
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
      await client.createContinuousProjection(PROJECTION_NAME, projection);
      await client.updateProjection(PROJECTION_NAME, after);
    });

    test("track Emitted Streams", async () => {
      const PROJECTION_NAME = "projection_to_update_tracking";
      await client.createContinuousProjection(PROJECTION_NAME, projection);
      await client.updateProjection(PROJECTION_NAME, projection, {
        trackEmittedStreams: true,
      });
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";
      await expect(
        client.updateProjection(PROJECTION_NAME, projection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
