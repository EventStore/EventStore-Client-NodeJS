import { v4 as uuid } from "uuid";
import { SingleNode } from "./utils";
import { EventStoreConnection, EventData, Revision } from "../";

describe("subscribe to persistent sub", () => {
  const node = new SingleNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully subscribe to a persistent subscription", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

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
      .expectedRevision(Revision.Any)
      .send([evt, evt, evt]);

    const result = await new Promise<number>((resolve, reject) => {
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

    persistent.close();
    expect(result).toBe(3);
  });
});
