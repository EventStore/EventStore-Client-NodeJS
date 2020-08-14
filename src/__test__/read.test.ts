import { v4 as uuid } from "uuid";
import * as eventstore from "../index";
import {EventData, Forward, ReadStreamResult, Revision} from "../types";

describe("read all forwards", function () {
  it("should successfully read all events", async function () {
    const connection = eventstore.EventStoreConnection.builder().build(
        "localhost:2113"
    );

    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const streamName = `read-${uuid()}`;
    const result = await connection
        .streams()
        .writeEvents(streamName)
        .expectedVersion(Revision.Any)
        .send([evt])

    expect(result.__typename).toBe("success");

    const result2: ReadStreamResult = await connection.streams()
        .readStream(streamName)
        .fromStart()
        .forward()
        .execute(10);

    expect(result2.events!.length).toBe(1);
  });
});
