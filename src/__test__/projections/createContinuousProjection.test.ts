import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
} from "../..";

describe("createContinuousProjection", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  test("track emitted streams", async () => {
    const PROJECTION_NAME = "track and field";

    await expect(
      createContinuousProjection(
        PROJECTION_NAME,
        `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
        `
      )
        .trackEmittedStreams()
        .authenticated("admin", "changeit")
        .execute(connection)
    ).resolves.toBeUndefined();
  });

  test("do not track", async () => {
    const PROJECTION_NAME = "do not track";
    await expect(
      createContinuousProjection(
        PROJECTION_NAME,
        `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
        `
      )
        .doNotTrackEmittedStreams()
        .authenticated("admin", "changeit")
        .execute(connection)
    ).resolves.toBeUndefined();
  });
});
