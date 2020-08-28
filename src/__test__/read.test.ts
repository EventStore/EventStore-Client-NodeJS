import { v4 as uuid } from "uuid";
import { SingleNode } from "./utils";
import {
  EventStoreConnection,
  EventData,
  ReadStreamResult,
  Revision,
} from "../index";

describe("read all forwards", () => {
  const node = new SingleNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully read all events", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

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
