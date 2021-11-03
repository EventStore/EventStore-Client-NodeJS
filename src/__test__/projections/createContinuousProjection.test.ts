import { createTestNode } from "@test-utils";

import { EventStoreDBClient } from "@eventstore/db-client";

describe("createContinuousProjection", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

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

  test("track emitted streams", async () => {
    const PROJECTION_NAME = "track and field";

    await expect(
      client.createContinuousProjection(
        PROJECTION_NAME,
        `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
        `,
        {
          trackEmittedStreams: true,
        }
      )
    ).resolves.toBeUndefined();
  });

  test("do not track", async () => {
    const PROJECTION_NAME = "do not track";
    await expect(
      client.createContinuousProjection(
        PROJECTION_NAME,
        `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
        `,
        { trackEmittedStreams: false }
      )
    ).resolves.toBeUndefined();
  });
});
