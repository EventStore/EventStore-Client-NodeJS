import { v4 as uuid } from "uuid";
import * as eventstore from "../";
import { EventData, Revision } from "../types";

describe("subscribe to stream", function () {
  it("should successfully subscribe to stream", async function () {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113")
      .streams();

    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const streamName = `subscribe-${uuid()}`;

    await connection
      .writeEvents(streamName)
      .expectedRevision(Revision.Any)
      .send([evt, evt, evt]);

    const promise = new Promise<number>((resolve, reject) => {
      let count = 0;
      connection
        .subscribe(streamName)
        .fromStart()
        .execute({
          onError: reject,
          onEnd: () => {
            resolve(count);
          },
          onEvent: (report, event) => {
            expect(event).toBeDefined();
            ++count;
            if (count === 3) {
              report.unsubcribe();
              resolve(count);
            }
          },
        });
    });

    const result = await promise;
    connection.close();
    expect(result).toBe(3);
  });
});
