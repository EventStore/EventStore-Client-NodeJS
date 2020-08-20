import * as eventstore from "../";
import { Pinned } from "../types";
import { v4 as uuid } from "uuid";

describe("update_persistent_sub", function () {
  it("should successfully update a persistent subscription", async () => {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113");

    const streamName = `update_persistent_sub-${uuid()}`;
    await connection
      .persistentSubscriptions()
      .create(streamName, "jokers")
      .authenticated("admin", "changeit")
      .execute();

    await connection
      .persistentSubscriptions()
      .update(streamName, "jokers")
      .authenticated("admin", "changeit")
      .consumerStrategy(Pinned)
      .execute();

    expect(1).toBe(1);
  });
});
