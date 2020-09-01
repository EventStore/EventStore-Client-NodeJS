import { v4 as uuid } from "uuid";
import { createTestNode } from "./utils";
import { EventStoreConnection, EventData, Revision } from "../";

describe("append_to_stream", function () {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully append events to stream", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

    const streamName = `write-${uuid()}`;
    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const result = await connection
      .streams()
      .writeEvents(streamName)
      .expectedRevision(Revision.Any)
      .send([evt]);

    expect(result.__typename).toBe("success");
  });
});
