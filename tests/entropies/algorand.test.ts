import {ALGORAND_ENTROPY_STRENGTHS, AlgorandEntropy} from "../../src/entropies/algorand";

describe("AlgorandEntropy", () => {
  it("should generate a hex string of the correct length for all supported strengths", () => {
    for (const strength of AlgorandEntropy.strengths) {
      const entropy = AlgorandEntropy.generate(strength);
      expect(typeof entropy).toBe("string");
      expect(entropy.length).toBe(strength / 4);
    }
  });

  it("should return the original entropy and strength for a 256-bit hex string", () => {
    const entropy = AlgorandEntropy.generate(
        ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    );
    const algorandEntropy: AlgorandEntropy = new AlgorandEntropy(entropy)
    expect(typeof algorandEntropy.entropy()).toBe("string");
    expect(algorandEntropy.entropy()).toBe(entropy);
    expect(typeof algorandEntropy.strength()).toBe("number");
    expect(algorandEntropy.strength()).toBe(
        ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    )
  });

  it("should validate hex string and strength correctly", () => {
    expect(AlgorandEntropy.client()).toBe("Algorand");
    const entropy: string = AlgorandEntropy.generate(
        ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    )
    expect(AlgorandEntropy.isValid(entropy)).toBe(true);
    expect(AlgorandEntropy.isValid("00")).toBe(false);
    expect(AlgorandEntropy.isValidStrength(
        ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    )).toBe(true);
    expect(AlgorandEntropy.isValidStrength(250)).toBe(false);
  });
});
