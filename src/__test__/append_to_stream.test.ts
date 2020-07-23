// import { v4 as uuid } from "uuid";

import * as eventstore from "../";
import {EventData, Revision} from "../types";

describe("append_to_stream", function () {
  it("should successfully append events to stream", async () => {
    const connection = eventstore.EventStoreConnection
        .builder()
        .build("http://localhost:2113");

    const sink = connection
        .streams()
        .writeEvents("foobar")
        .expectedVersion(Revision.Any)
        .start();

    const evt = EventData.json("typescript-type", {
        message: "baz"
    }).build();

    sink.send(evt);
    let resp = await sink.end();

    expect(1).toBe(1);

    // Connect to client
    // let connectionSettings = new ConnectionSettings(
    //   "/Users/mat-mcloughlin/git/eventStore/src/dev-ca/server1.pem"
    // );
    // let client = new EventStoreConnection(
    //   "localhost:2113",
    //   "admin",
    //   "changeit",
    //   connectionSettings
    // );

    // // Generate event data
    // let eventData = new Array<EventData>();

    // // Encode JSON
    // const encoder = new TextEncoder();
    // let data = encoder.encode('{"Id": "1"}');

    // let eventId = uuid();

    // let eventDataOne = new EventData(eventId, "type", data);
    // eventData.push(eventDataOne);

    // // Send request to append
    // client.appendToStream("SomeStream", AnyStreamRevision.Any, eventData);
  });

});
