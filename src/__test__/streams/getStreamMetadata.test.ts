import { createTestNode, jsonTestEvents } from "@test-utils";
import { EventStoreDBClient, StreamMetadata } from "@eventstore/db-client";

describe("getStreamMetadata", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" },
    );
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should return empty metadata", () => {
    test("any stream", async () => {
      const STREAM_NAME = "anything";
      await client.getStreamMetadata(STREAM_NAME);
    });

    test("written to stream", async () => {
      const STREAM_NAME = "test_stream_name";

      await client.appendToStream(STREAM_NAME, jsonTestEvents());

      const metadata = await client.getStreamMetadata(STREAM_NAME);

      expect(metadata).toEqual({ streamName: STREAM_NAME });
    });
  });

  describe("should return the written metadata", () => {
    test("all keys metadata", async () => {
      const STREAM_NAME = "all_keys_stream_name";

      const metadata: StreamMetadata = {
        maxAge: 2,
        cacheControl: 15,
        truncateBefore: 1,
        maxCount: 12,
        acl: {
          readRoles: ["admin"],
          writeRoles: ["admin"],
          deleteRoles: ["admin"],
          metaReadRoles: ["admin"],
          metaWriteRoles: ["admin"],
        },
      };

      await client.setStreamMetadata(STREAM_NAME, metadata);

      const metadataResult = await client.getStreamMetadata(STREAM_NAME);

      expect(metadataResult.streamName).toEqual(STREAM_NAME);
      expect(metadataResult.metadata).toEqual(metadata);
    });

    test("custom keys metadata", async () => {
      const STREAM_NAME = "custom_keys_stream_name";

      type CustomMetadata = {
        turkey: string;
      };

      const metadata: StreamMetadata<CustomMetadata> = {
        maxCount: 12,
        turkey: "🦃",
      };

      await client.setStreamMetadata(STREAM_NAME, metadata);

      const metadataResult = await client.getStreamMetadata(STREAM_NAME);

      expect(metadataResult.streamName).toEqual(STREAM_NAME);
      expect(metadataResult.metadata).toEqual(metadata);

      const metadata2: StreamMetadata<CustomMetadata> = {
        maxCount: 11,
        turkey: "🍗",
      };

      await client.setStreamMetadata(STREAM_NAME, metadata2);

      const metadataResult2 = await client.getStreamMetadata(STREAM_NAME);

      expect(metadataResult2.streamName).toEqual(STREAM_NAME);
      expect(metadataResult2.metadata).toEqual(metadata2);
    });
  });
});
