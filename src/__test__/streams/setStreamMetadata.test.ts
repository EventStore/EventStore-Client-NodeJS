import { createTestNode, jsonTestEvents } from "@test-utils";
import {
  EventStoreDBClient,
  StreamMetadata,
  START,
} from "@eventstore/db-client";

describe("setStreamMetadata", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should successfully set metadata of stream", () => {
    test("partial metadata", async () => {
      const STREAM_NAME = "partial_stream_name";

      const metadata: StreamMetadata = {
        maxAge: 2,
      };

      await client.setStreamMetadata(STREAM_NAME, metadata);

      const { metadata: readMetadata } = await client.getStreamMetadata(
        STREAM_NAME
      );

      expect(readMetadata).toEqual(metadata);
    });

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

      const { metadata: readMetadata } = await client.getStreamMetadata(
        STREAM_NAME
      );

      expect(readMetadata).toEqual(metadata);
    });

    test("extra keys", async () => {
      const STREAM_NAME = "test_stream_name";

      type CustomStreamMetadata = {
        kitten: string;
      };

      const metadata: StreamMetadata<CustomStreamMetadata> = {
        maxAge: 2,
        kitten: "😾",
      };

      await client.setStreamMetadata<CustomStreamMetadata>(
        STREAM_NAME,
        metadata
      );

      const { metadata: readMetadata } =
        await client.getStreamMetadata<CustomStreamMetadata>(STREAM_NAME);

      expect(readMetadata).toEqual(metadata);
      // key is accessible on type
      expect(readMetadata!.kitten).toBeDefined();
      // @ts-expect-error `cat` doesnt exist on `CustomStreamMetadata`, so this errors
      expect(readMetadata.cat).not.toBeDefined();
    });

    test("ignore unknown keys in acl", async () => {
      const STREAM_NAME = "unknown_keys_acl";

      const warnSpy = jest.spyOn(console, "warn").mockImplementation();

      const metadata: StreamMetadata = {
        acl: {
          deleteRoles: ["admin"],
          // @ts-expect-error `chicken` doesnt exist on `acl`
          chicken: "🐔",
        },
      };

      await client.setStreamMetadata(STREAM_NAME, metadata);

      const { metadata: readMetadata } = await client.getStreamMetadata(
        STREAM_NAME
      );

      expect(readMetadata!.acl).toEqual({
        deleteRoles: ["admin"],
      });

      expect(warnSpy.mock.calls).toHaveLength(1);
      warnSpy.mockRestore();
    });

    test("metadata goes to the right place", async () => {
      const STREAM_NAME = "the_right_place";

      const metadata: StreamMetadata = {
        // only two events in this stream
        maxCount: 2,
      };

      await client.setStreamMetadata(STREAM_NAME, metadata);
      await client.appendToStream(STREAM_NAME, jsonTestEvents(20));

      let count = 0;
      for await (const _ of client.readStream(STREAM_NAME, {
        fromRevision: START,
        maxCount: 200,
      })) {
        count++;
      }

      expect(count).toBe(2);
    });

    describe("disallows non integer numbers", () => {
      test.each(["maxAge", "truncateBefore", "cacheControl", "maxCount"])(
        "for %s",
        async (key) => {
          const STREAM_NAME = "err";

          await expect(
            client.setStreamMetadata(STREAM_NAME, { [key]: 2.5 })
          ).rejects.toThrowError(
            `Invalid stream metadata: "${key}" must be an integer.`
          );
        }
      );
    });
  });
});
