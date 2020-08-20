import { v4 as uuid } from "uuid";
import * as eventstore from "../";
import { EventData, Revision } from "../types";

describe("subscribe to persistent sub", function () {
  it("should successfully subscribe to a persistent subscription", async function () {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113");

    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const streamName = `connect_persistent_sub-${uuid()}`;
    const persistent = connection.persistentSubscriptions();

    await persistent
      .create(streamName, "jokers")
      .authenticated("admin", "changeit")
      .execute();

    await connection
      .streams()
      .writeEvents(streamName)
      .expectedVersion(Revision.Any)
      .send([evt, evt, evt]);

    const promise = new Promise<number>((resolve, reject) => {
      let count = 0;
      persistent
        .subscribe(streamName, "jokers")
        .authenticated("admin", "changeit")
        .execute({
          onError: reject,
          onEnd: () => {
            resolve(count);
          },
          onEvent: (report, event) => {
            ++count;
            if (event.event) {
              report.ack([event.event.id]);
            } else throw "Unexpected undefined event property";

            if (count === 3) {
              report.unsubscribe();
              resolve(count);
            }
          },
        });
    });

    const result = await promise;
    persistent.close();
    expect(result).toBe(3);
  });
});
