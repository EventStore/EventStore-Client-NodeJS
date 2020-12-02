import { createTestNode } from "../utils";

import { EventStoreDBClient, UnknownError } from "../..";

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
    test("write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_with_checkpoint";
      await client.createContinuousProjection(PROJECTION_NAME, projection);
      await client.resetProjection(PROJECTION_NAME, { writeCheckpoint: true });
    });

    test("do not write a checkpoint", async () => {
      const PROJECTION_NAME = "projection_to_disable_without_checkpoint";
      await client.createContinuousProjection(PROJECTION_NAME, projection);
      await client.resetProjection(PROJECTION_NAME, { writeCheckpoint: false });
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";
      await expect(
        client.resetProjection(PROJECTION_NAME)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
