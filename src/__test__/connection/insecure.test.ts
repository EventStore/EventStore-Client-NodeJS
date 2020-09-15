import { createInsecureTestNode } from "../utils";

import {
  readEventsFromStream,
  writeEventsToStream,
  EventStoreConnection,
  EventData,
} from "../..";

describe("insecure", () => {
  const node = createInsecureTestNode();
  const STREAM_NAME = "test_stream_name";
  const event = EventData.json("test", { message: "test" });

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  test("should successfully connect", async () => {
    const connection = EventStoreConnection.builder()
      .insecure()
      .singleNodeConnection(node.uri);

    const writeResult = await writeEventsToStream(STREAM_NAME)
      .send(event.build())
      .execute(connection);

    expect(writeResult.__typename).toBe("success");

    const readResult = await readEventsFromStream(STREAM_NAME).execute(
      connection
    );

    expect(readResult.__typename).toBe("success");
    expect(readResult.events).toBeDefined();
  });
});
