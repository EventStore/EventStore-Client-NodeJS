import { parseConnectionString } from "@kurrent/db-client/dist/Client/parseConnectionString";
import { valid, invalid, warning } from "./parseConnectionStringMockups";

describe("connection string parser", () => {
  describe("Should parse valid connection strings", () => {
    test.each(valid)("%s", (connectionString, expected) => {
      const parsed = parseConnectionString(connectionString);
      expect(parsed).toStrictEqual(expected);
    });
  });

  describe("Should throw on invalid strings", () => {
    test.each(invalid)("%s", (connectionString) => {
      expect(() => {
        const parsed = parseConnectionString(connectionString);
        console.log(parsed);
      }).toThrowErrorMatchingSnapshot();
    });
  });

  describe("Should warn on unknown and unsupported keys", () => {
    test.each(warning)("%s", (connectionString, expected) => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();
      const parsed = parseConnectionString(connectionString);
      expect(parsed).toStrictEqual(expected);
      expect(warnSpy).toHaveBeenCalled();
      expect(warnSpy.mock.calls).toMatchSnapshot();
      warnSpy.mockRestore();
    });
  });
});
