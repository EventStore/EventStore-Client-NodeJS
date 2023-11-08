import { Channel } from "@grpc/grpc-js";

import {
  BaseOptions,
  DNSClusterOptions,
  EventStoreDBClient,
} from "@eventstore/db-client";

/*
Mocking this file breaks grpc, but allows us to check the settings passed to grpc
These tests need to be kept seperate to any tests that need to actually make calls 
*/
jest.mock("@grpc/grpc-js/build/src/channel.js");
const ChannelMock = Channel as jest.Mock<Channel>;

describe("deadline", () => {
  beforeEach(() => {
    ChannelMock.mockClear();
  });

  describe.each<
    [
      test_name: string,
      connection_string: string,
      constructor_options: Partial<DNSClusterOptions>,
      call_options: BaseOptions,
      expected: number
    ]
  >([
    ["should default to 10_000", "esdb://host", {}, {}, 10_000],
    [
      "should be settable: 1",
      "esdb://host?defaultDeadline=1",
      { defaultDeadline: 1 },
      {},
      1,
    ],
    [
      "should be settable: 100000",
      "esdb://host?defaultDeadline=100000",
      { defaultDeadline: 10_0000 },
      {},
      10_0000,
    ],
    [
      "passing in call options should override default",
      "esdb://host",
      {},
      { deadline: 10_0000 },
      10_0000,
    ],
    [
      "passing in call options should override settings",
      "esdb://host?defaultDeadline=100000",
      { defaultDeadline: 10_0000 },
      { deadline: 10 },
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
      const createCall = ChannelInstance.createCall as unknown as jest.Mock<
        Channel["createCall"]
      >;

      const deadline = createCall.mock.calls[0][1].getTime();

      expect(deadline).toBeGreaterThanOrEqual(before + expected);
      expect(deadline).toBeLessThanOrEqual(after + expected);

      expect(warnSpy).not.toBeCalled();
      warnSpy.mockRestore();
    });
  });

  describe.each<
    [
      test_name: string,
      connection_string: string,
      constructor_options: Partial<DNSClusterOptions>
    ]
  >([
    [
      "should throw on zero",
      "esdb://host?defaultDeadline=0",
      { defaultDeadline: 0 },
    ],
    [
      "should throw on negative",
      "esdb://host?defaultDeadline=-1",
      { defaultDeadline: -1 },
    ],
    [
      "should throw on negative",
      "esdb://host?defaultDeadline=-1000000000000000",
      { defaultDeadline: -1000000000000000 },
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
