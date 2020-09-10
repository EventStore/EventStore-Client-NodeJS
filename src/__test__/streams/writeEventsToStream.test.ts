import { createTestNode } from "../utils";

import {
  writeEventsToStream,
  ESDBConnection,
  EventStoreConnection,
  EventData,
} from "../../index";

describe("writeEventsToStream", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;
  const STREAM_NAME = "test_stream_name";

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully write to stream", () => {
    test("json events", async () => {
      const events = Array.from({ length: 4 }, (_, i) =>
        EventData.json("json-test", { message: "test", index: i }).build()
      );

      const result = await writeEventsToStream(STREAM_NAME)
        .send(...events)
        .execute(connection);

      expect(result.__typename).toBe("success");
    });

    test("binary events", async () => {
      const events = Array.from({ length: 4 }, (_, i) =>
        EventData.binary(
          "binary-test",
          Uint8Array.from(Buffer.from(`hello: ${i}`))
        ).build()
      );

      const result = await writeEventsToStream(STREAM_NAME)
        .send(...events)
        .execute(connection);

      expect(result.__typename).toBe("success");
    });
  });
});
