import { DNSClusterOptions, KurrentDBClient } from "@eventstore/db-client";

describe("deadline", () => {
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
        () => KurrentDBClient.connectionString(connectionString),
      ],
      [
        "constructor",
        () =>
          new KurrentDBClient({
            endpoint: "host:1234",
            ...constructorOptions,
          }),
      ],
    ])("%s", async (_, createClient) => {
      expect(() => createClient()).toThrowErrorMatchingSnapshot();
    });
  });
});
