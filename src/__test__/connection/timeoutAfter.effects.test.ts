import { EventStoreDBClient } from "../..";
import { createTestNode, jsonTestEvents } from "../utils";

describe("timeoutAfter", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("should time out a call", () => {
    test.each([
      [
        "client settings",
        () =>
          new EventStoreDBClient(
            { endpoint: node.uri, timeoutAfter: 1 },
            { rootCertificate: node.rootCertificate }
          ).appendToStream("client_settings", jsonTestEvents()),
      ],
      [
        "call options",
        () =>
          new EventStoreDBClient(
            { endpoint: node.uri },
            { rootCertificate: node.rootCertificate }
          ).appendToStream("call_options", jsonTestEvents(), {
            timeoutAfter: 1,
          }),
      ],
      [
        "call options override",
        () =>
          new EventStoreDBClient(
            { endpoint: node.uri, timeoutAfter: 20000 },
            { rootCertificate: node.rootCertificate }
          ).appendToStream("call_options_override", jsonTestEvents(), {
            timeoutAfter: 1,
          }),
      ],
    ])("%s", async (_, makeCall) => {
      await expect(makeCall).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
