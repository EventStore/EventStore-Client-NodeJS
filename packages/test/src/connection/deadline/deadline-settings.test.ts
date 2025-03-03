import { DNSClusterOptions, KurrentDBClient } from "@kurrent/kurrentdb-client";

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
      "kurrent://host?defaultDeadline=0",
      { defaultDeadline: 0 },
    ],
    [
      "should throw on negative",
      "kurrent://host?defaultDeadline=-1",
      { defaultDeadline: -1 },
    ],
    [
      "should throw on negative",
      "kurrent://host?defaultDeadline=-1000000000000000",
      { defaultDeadline: -1000000000000000 },
    ],
  ])("%s", (_, connectionString, constructorOptions) => {
    test.each([
      [
        "connectionString",
        () => KurrentDBClient.connectionString(connectionString),
      ],
    ])("%s", async (_, createClient) => {
      expect(() => createClient()).toThrowErrorMatchingSnapshot();
    });
  });
});
