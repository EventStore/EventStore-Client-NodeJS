import { KurrentDBClient } from "@eventstore/db-client";

describe("keepAlive settings", () => {
  const endpoint = "host:1234";

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
