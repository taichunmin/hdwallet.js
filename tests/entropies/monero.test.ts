import { MoneroEntropy } from "../../src/entropies/monero";

describe("MoneroEntropy", () => {
  it("should generate a valid hex string of 256 bits", () => {
    const hex = MoneroEntropy.generate(256);
    expect(typeof hex).toBe("string");
    expect(hex.length).toBe(64);
  });

  it("should validate correct and incorrect hex", () => {
    const hex = MoneroEntropy.generate(256);
    expect(MoneroEntropy.isValid(hex)).toBe(true);
    expect(MoneroEntropy.isValid("00")).toBe(false);
  });
});