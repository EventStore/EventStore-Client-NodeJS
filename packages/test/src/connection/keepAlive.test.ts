import { Channel } from "@grpc/grpc-js";
import { KurrentDBClient } from "@eventstore/db-client";

jest.mock("@grpc/grpc-js/build/src/channel.js");
const ChannelMock = Channel as jest.Mock<Channel>;

describe("keepAlive settings", () => {
  const endpoint = "host:1234";

  beforeEach(() => {
    ChannelMock.mockClear();
  });

  describe("should both default to 10_000", () => {
    describe.each([
      [
        "keepAliveInterval should default to 10_000",
        "esdb://host",
        {},
        {
          "grpc.keepalive_time_ms": 10000,
        },
      ],
      [
        "keepAliveTimeout should default to 10_000",
        "esdb://host",
        {},
        {
          "grpc.keepalive_timeout_ms": 10000,
        },
      ],
      [
        "keepAliveInterval should be settable (leaving timeout as default)",
        "esdb://host?keepAliveInterval=123456",
        { keepAliveInterval: 123456 },
        {
          "grpc.keepalive_time_ms": 123456,
          "grpc.keepalive_timeout_ms": 10000,
        },
      ],
      [
        "keepAliveTimeout should be settable (leaving interval as default)",
        "esdb://host?keepAliveTimeout=246810",
        { keepAliveTimeout: 246810 },
        {
          "grpc.keepalive_time_ms": 10000,
          "grpc.keepalive_timeout_ms": 246810,
        },
      ],
      [
        "both should be settable",
        "esdb://host?keepAliveInterval=9987654&keepAliveTimeout=124816",
        { keepAliveInterval: 9987654, keepAliveTimeout: 124816 },
        {
          "grpc.keepalive_time_ms": 9987654,
          "grpc.keepalive_timeout_ms": 124816,
        },
      ],
      [
        "-1 should disable (max_int) keepAliveInterval (leaving timeout as default)",
        "esdb://host?keepAliveInterval=-1",
        { keepAliveInterval: -1 },
        {
          "grpc.keepalive_time_ms": Number.MAX_VALUE,
          "grpc.keepalive_timeout_ms": 10000,
        },
      ],
      [
        "-1 should disable (max_int) keepAliveTimeout (leaving interval as default)",
        "esdb://host?keepAliveTimeout=-1",
        { keepAliveTimeout: -1 },
        {
          "grpc.keepalive_time_ms": 10000,
          "grpc.keepalive_timeout_ms": Number.MAX_VALUE,
        },
      ],
      [
        "-1 should disable (max_int) both",
        "esdb://host?keepAliveTimeout=-1&keepAliveInterval=-1",
        { keepAliveTimeout: -1, keepAliveInterval: -1 },
        {
          "grpc.keepalive_time_ms": Number.MAX_VALUE,
          "grpc.keepalive_timeout_ms": Number.MAX_VALUE,
        },
      ],
      [
        "0 is fine (but a terrible choice)",
        "esdb://host?keepAliveTimeout=0&keepAliveInterval=0",
        { keepAliveTimeout: 0, keepAliveInterval: 0 },
        {
          "grpc.keepalive_time_ms": 0,
          "grpc.keepalive_timeout_ms": 0,
        },
      ],
    ])("%s", (_, connectionString, constructorOptions, expected) => {
      test.each([
        [
          "connectionString",
          () => KurrentDBClient.connectionString(connectionString),
        ],
        [
          "constructor",
          () =>
            new KurrentDBClient({
              endpoint,
              ...constructorOptions,
            }),
        ],
      ])("%s", async (_, createClient) => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation();
        const client = createClient();

        try {
          await client.restartSubsystem();
        } catch (_) {
          // We're not actually connecting to anything, just triggering channel creation
        }

        expect(ChannelMock.mock.calls).toHaveLength(1);
        const [[, , options]] = ChannelMock.mock.calls;
        expect(options).toMatchObject(expected);
        warnSpy.mockRestore();
      });
    });
  });

  describe("should throw if < -1", () => {
    describe.each`
      option                 | value
      ${"keepAliveTimeout"}  | ${-100}
      ${"keepAliveInterval"} | ${-2}
    `("$option", ({ option, value }) => {
      test.each([
        [
          "connectionString",
          (option: string, value: number) =>
            KurrentDBClient.connectionString`esdb://host?${option}=${value}`,
        ],
        [
          "constructor",
          (option: string, value: number) =>
            new KurrentDBClient({ endpoint, [option]: value }),
        ],
      ])("%s", (_, testCase) => {
        expect(() => testCase(option, value)).toThrowErrorMatchingSnapshot();
      });
    });
  });

  describe("should warn if keepAliveInterval is less than 10_000ms (but more than -1)", () => {
    test.each([
      [
        "connectionString",
        (value: number) =>
          KurrentDBClient.connectionString`esdb://host?keepAliveInterval=${value}`,
      ],
      [
        "constructor",
        (value: number) =>
          new KurrentDBClient({ endpoint, keepAliveInterval: value }),
      ],
    ])("%s", (_, testCase) => {
      for (const keepAliveInterval of [0, 1, 10, 1000, 9999]) {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation();
        testCase(keepAliveInterval);
        expect(warnSpy).toHaveBeenCalled();
        expect(warnSpy.mock.calls).toMatchSnapshot();
        warnSpy.mockRestore();
      }
    });
  });
});
