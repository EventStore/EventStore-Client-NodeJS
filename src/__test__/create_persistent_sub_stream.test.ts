// import { v4 as uuid } from "uuid";

import * as eventstore from "../";
import { EventData, Revision } from "../types";
import {v4 as uuid} from "uuid";

describe("create_persistent_sub", function () {
  it("should successfully create a persistent subscription", async () => {
    const connection = eventstore.EventStoreConnection
        .builder()
        .sslDevMode()
        .build(
      "localhost:2113"
    );

    const streamName = `create_persistent_sub-${uuid()}`;
    await connection
        .persistentSubscriptions()
        .create(streamName, "jokers")
        .authenticated("admin", "changeit")
        .execute();

    expect(1).toBe(1);
  });
});
