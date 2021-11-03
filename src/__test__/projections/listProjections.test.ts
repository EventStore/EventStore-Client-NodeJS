import { createTestNode } from "@test-utils";

import {
  CONTINUOUS,
  EventStoreDBClient,
  ONE_TIME,
  TRANSIENT,
} from "@eventstore/db-client";

describe("list projections", () => {
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
  const oneTimeProjections = [1, 2, 3];
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

    for (const _ of oneTimeProjections) {
      await client.createOneTimeProjection(basicProjection);
    }

    for (const name of transientProjections) {
      await client.createTransientProjection(name, basicProjection);
    }
  });

  afterAll(async () => {
    await node.down();
  });

  describe("lists projections", () => {
    test("listContinuousProjections", async () => {
      const projections = await client.listContinuousProjections();

      // includes system projections
      expect(projections.length).toBeGreaterThan(continuousProjections.length);

      projections.forEach((details) => {
        expect(details).toBeDefined();
        expect(details.mode).toBe(CONTINUOUS);
        if (!details.name.startsWith("$")) {
          expect(continuousProjections).toContain(details.name);
        }
      });
    });

    test("listOneTimeProjections", async () => {
      const projections = await client.listOneTimeProjections();

      expect(projections).toHaveLength(oneTimeProjections.length);

      projections.forEach((details) => {
        expect(details).toBeDefined();
        expect(details.mode).toBe(ONE_TIME);
      });
    });

    test("listTransientProjections", async () => {
      const projections = await client.listTransientProjections();

      expect(projections).toHaveLength(transientProjections.length);

      projections.forEach((details) => {
        expect(details).toBeDefined();
        expect(details.mode).toBe(TRANSIENT);
        expect(transientProjections).toContain(details.name);
      });
    });
  });
});
