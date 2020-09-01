import { v4 as uuid } from "uuid";
import { createTestNode } from "./utils";
import { EventStoreConnection, EventData, Revision } from "../";

describe("tombstone_stream", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully tombstone a stream", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .build(node.uri);

    const streamName = `tombstone-${uuid()}`;
    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    await connection
      .streams()
      .writeEvents(streamName)
      .expectedRevision(Revision.Any)
      .send([evt]);

    const result = await connection.streams().tombstone(streamName).execute();

    expect(result).toBeDefined();
  });
});
