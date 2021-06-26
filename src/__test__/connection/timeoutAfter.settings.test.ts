import { Channel } from "@grpc/grpc-js";

import { EventStoreDBClient } from "../..";

/*
Mocking this file breaks grpc, but allows us to check the settings passed to grpc
These tests need to be kept seperate to any tests that need to actually make calls 
*/
jest.mock("@grpc/grpc-js/build/src/channel.js");
const ChannelMock = Channel as jest.Mock<Channel>;

describe("timeoutAfter settings", () => {
  beforeEach(() => {
    ChannelMock.mockClear();
  });

  describe.each([
    [
      "should default to 5_000", // test name
      "esdb://host", // connection string
      {}, // constructor options
      undefined, // call options
      5_000, // expected
    ],
    [
      "should be settable: 1",
      "esdb://host?timeoutAfter=1",
      { timeoutAfter: 1 },
      undefined,
      1,
    ],
    [
      "should be settable: 100000",
      "esdb://host?timeoutAfter=100000",
      { timeoutAfter: 10_0000 },
      undefined,
      10_0000,
    ],
    [
      "passing in call options should override default",
      "esdb://host",
      {},
      { timeoutAfter: 10_0000 },
      10_0000,
    ],
    [
      "passing in call options should override settings",
      "esdb://host?timeoutAfter=100000",
      { timeoutAfter: 10_0000 },
      { timeoutAfter: 10 },
      10,
    ],
  ])("%s", (_, connectionString, constructorOptions, callOptions, expected) => {
    test.each([
      [
        "connectionString",
        () => EventStoreDBClient.connectionString(connectionString),
      ],
      [
        "constructor",
        () =>
          new EventStoreDBClient({
            endpoint: "host:1234",
            ...constructorOptions,
          }),
      ],
    ])("%s", async (_, createClient) => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();
      const client = createClient();
      const before = Date.now();

      try {
        await client.restartSubsystem(callOptions);
      } catch (_) {
        // We're not actually connecting to anything, just triggering channel creation
      }

      const after = Date.now();

      const ChannelInstance = ChannelMock.mock.instances[0];
      const createCall = (ChannelInstance.createCall as unknown) as jest.Mock<
        Channel["createCall"]
      >;

      const deadline = createCall.mock.calls[0][1];

      expect(deadline).toBeGreaterThanOrEqual(before + expected);
      expect(deadline).toBeLessThanOrEqual(after + expected);

      expect(warnSpy).not.toBeCalled();
      warnSpy.mockRestore();
    });
  });

  describe.each([
    ["should throw on zero", "esdb://host?timeoutAfter=0", { timeoutAfter: 0 }],
    [
      "should throw on negative",
      "esdb://host?timeoutAfter=-1",
      { timeoutAfter: -1 },
    ],
    [
      "should throw on negative",
      "esdb://host?timeoutAfter=-1000000000000000",
      { timeoutAfter: -1000000000000000 },
    ],
  ])("%s", (_, connectionString, constructorOptions) => {
    test.each([
      [
        "connectionString",
        () => EventStoreDBClient.connectionString(connectionString),
      ],
      [
        "constructor",
        () =>
          new EventStoreDBClient({
            endpoint: "host:1234",
            ...constructorOptions,
          }),
      ],
    ])("%s", async (_, createClient) => {
      expect(() => createClient()).toThrowErrorMatchingSnapshot();
    });
  });
});
