import { AlgorandEntropy } from "../../src/entropies/algorand";

describe("AlgorandEntropy", () => {
  it("should generate a valid hex string of 256 bits", () => {
    const hex = AlgorandEntropy.generate(256);
    expect(typeof hex).toBe("string");
    expect(hex.length).toBe(64);
  });

  it("should validate correct and incorrect hex strings", () => {
    const hex = AlgorandEntropy.generate(256);
    expect(AlgorandEntropy.isValid(hex)).toBe(true);
    expect(AlgorandEntropy.isValid("00")).toBe(false);
  });
});
