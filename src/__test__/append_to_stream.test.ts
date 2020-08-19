import * as eventstore from "../";
import { EventData, Revision } from "../types";
import {v4 as uuid} from "uuid";

describe("append_to_stream", function () {
  it("should successfully append events to stream", async () => {
    const connection = eventstore.EventStoreConnection
        .builder()
        .sslDevMode()
        .build(
      "localhost:2113"
    );

    const streamName = `write-${uuid()}`;
    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const result = await connection
        .streams()
        .writeEvents(streamName)
        .expectedVersion(Revision.Any)
        .send([evt])

    console.log(result);
    expect(result.__typename).toBe("success");
  });
});
