import { v4 as uuid } from "uuid";
import { createTestNode } from "./utils";
import { EventStoreConnection, EventData, Revision } from "../";

describe("subscribe to stream", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully subscribe to stream", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri)
      .streams();

    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const streamName = `subscribe-${uuid()}`;

    await connection
      .writeEvents(streamName)
      .expectedRevision(Revision.Any)
      .send([evt, evt, evt]);

    const result = await new Promise<number>((resolve, reject) => {
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

    connection.close();
    expect(result).toBe(3);
  });
});
