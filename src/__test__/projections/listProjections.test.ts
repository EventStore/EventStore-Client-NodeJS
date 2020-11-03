import { createTestNode } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createOneTimeProjection,
  createContinuousProjection,
  createTransientProjection,
  listContinuousProjections,
  listOneTimeProjections,
  listTransientProjections,
  CONTINUOUS,
  ONE_TIME,
  TRANSIENT,
} from "../..";

describe("list projections", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

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
    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    for (const name of continuousProjections) {
      await createContinuousProjection(name, basicProjection).execute(
        connection
      );
    }

    for (const _ of oneTimeProjections) {
      await createOneTimeProjection(basicProjection).execute(connection);
    }

    for (const name of transientProjections) {
      await createTransientProjection(name, basicProjection).execute(
        connection
      );
    }
  });

  afterAll(async () => {
    await node.down();
  });

  describe("lists projections", () => {
    test("listContinuousProjections", async () => {
      const projections = await listContinuousProjections().execute(connection);

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
      const projections = await listOneTimeProjections().execute(connection);

      expect(projections).toHaveLength(oneTimeProjections.length);

      projections.forEach((details) => {
        expect(details).toBeDefined();
        expect(details.mode).toBe(ONE_TIME);
      });
    });

    test("listTransientProjections", async () => {
      const projections = await listTransientProjections().execute(connection);

      expect(projections).toHaveLength(transientProjections.length);

      projections.forEach((details) => {
        expect(details).toBeDefined();
        expect(details.mode).toBe(TRANSIENT);
        expect(transientProjections).toContain(details.name);
      });
    });
  });
});
