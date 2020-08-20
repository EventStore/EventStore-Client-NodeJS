import { v4 as uuid } from "uuid";
import * as eventstore from "../index";
import { EventData, ReadStreamResult, Revision } from "../types";

describe("read all forwards", function () {
  it("should successfully read all events", async function () {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113");

    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const streamName = `read-${uuid()}`;
    const result = await connection
      .streams()
      .writeEvents(streamName)
      .expectedRevision(Revision.Any)
      .send([evt]);

    expect(result.__typename).toBe("success");

    const result2: ReadStreamResult = await connection
      .streams()
      .readStream(streamName)
      .fromStart()
      .forward()
      .execute(10);

    if (result2.events) {
      expect(result2.events.length).toBe(1);
    } else {
      expect(result2.events).toBeDefined();
    }
  });
});
