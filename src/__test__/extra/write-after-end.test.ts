import { createTestNode, delay, jsonTestEvents } from "@test-utils";
import { EventStoreDBClient, UnavailableError } from "@eventstore/db-client";

describe("write after end", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("Should not write after end", async () => {
    const STREAM_NAME = "json_stream_name";
    await client.appendToStream(STREAM_NAME, jsonTestEvents());

    client
      .appendToStream(STREAM_NAME, jsonTestEvents(100_000))
      .then((result) => {
        expect(result).toBe("unreachable");
      })
      .catch((e) => {
        expect(e).toBeInstanceOf(UnavailableError);
      });

    node.killNode(node.endpoints[0]);

    // wait for any unhandled rejections
    await delay(5_000);
  });
});
