import { createTestNode } from "@test-utils";

import {
  CONTINUOUS,
  EventStoreDBClient,
  TRANSIENT,
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

  const continuousProjections = [
    "continuous-1",
    "continuous-2",
    "continuous-3",
  ];
  const transientProjections = ["transient-1", "transient-2", "transient-3"];

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );

    for (const name of continuousProjections) {
      await client.createContinuousProjection(name, basicProjection);
    }

    for (const name of transientProjections) {
      await client.createTransientProjection(name, basicProjection);
    }
  });

  afterAll(async () => {
    await node.down();
  });

  describe("gets Projection Statistics", () => {
    test("continuous", async () => {
      const REQUESTED_NAME = continuousProjections[2];

      const details = await client.getProjectionStatistics(REQUESTED_NAME);

      expect(details).toBeDefined();
      expect(details.mode).toBe(CONTINUOUS);
      expect(details.name).toBe(REQUESTED_NAME);
    });

    test("transient", async () => {
      const REQUESTED_NAME = transientProjections[1];
      const details = await client.getProjectionStatistics(REQUESTED_NAME);

      expect(details).toBeDefined();
      expect(details.mode).toBe(TRANSIENT);
      expect(details.name).toBe(REQUESTED_NAME);
    });

    test("non-existant", async () => {
      const REQUESTED_NAME = "some-non-existant-projection";
      await expect(
        client.getProjectionStatistics(REQUESTED_NAME)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
