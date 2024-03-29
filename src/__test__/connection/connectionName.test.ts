import { EventStoreDBClient } from "@eventstore/db-client";

describe("connectionName", () => {
  test("constructor", async () => {
    const CONNECTION_NAME = "my great connection";
    const client = new EventStoreDBClient({
      endpoint: "somewhere",
      connectionName: CONNECTION_NAME,
    });

    expect(client.connectionName).toBe(CONNECTION_NAME);
  });

  test("connection string", async () => {
    const CONNECTION_NAME = "my great connection";
    const client = EventStoreDBClient.connectionString`esdb://host?connectionName=${CONNECTION_NAME}`;

    expect(client.connectionName).toBe(CONNECTION_NAME);
  });

  test("default", async () => {
    const client = new EventStoreDBClient({
      endpoint: "somewhere",
    });

    expect(client.connectionName).toMatch(
      // a (v4) uuid
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    );
  });
});
