import {
  isMetastream,
  isSystemStream,
  metastreamOf,
  originalStreamOf,
} from "@kurrent/kurrentdb-client";

describe("systemStreams helpers", () => {
  describe("isSystemStream", () => {
    test.each([
      ["hello", false],
      ["", false],
      ["$hello", true],
      ["$$hello", true],
    ])("%s", (name, expected) => {
      expect(isSystemStream(name)).toBe(expected);
    });
  });

  describe("isMetastream", () => {
    test.each([
      ["hello", false],
      ["", false],
      ["$hello", false],
      ["$$hello", true],
    ])("%s", (name, expected) => {
      expect(isMetastream(name)).toBe(expected);
    });
  });

  test("metastreamOf", () => {
    expect(metastreamOf("hello")).toBe("$$hello");
  });

  test("originalStreamOf", () => {
    expect(originalStreamOf("$$hello")).toBe("hello");
  });
});
