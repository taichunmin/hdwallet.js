import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from "../../src/entropies/bip39";

describe("BIP39Entropy", () => {
  it("should generate a hex string of the correct length for all supported strengths", () => {
    for (const strength of BIP39Entropy.strengths) {
      const entropy: string = BIP39Entropy.generate(strength);
      expect(typeof entropy).toBe("string");
      expect(entropy.length).toBe(strength / 4);
    }
  });

  it("should return the original entropy and strength when given a 128-bit hex string", () => {
    const entropy: string = BIP39Entropy.generate(
        BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    );
    const bip39Entropy: BIP39Entropy = new BIP39Entropy(entropy);
    expect(typeof bip39Entropy.entropy()).toBe("string");
    expect(bip39Entropy.entropy()).toBe(entropy);
    expect(typeof bip39Entropy.strength()).toBe("number");
    expect(bip39Entropy.strength()).toBe(
        BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    );
  });

  it("should validate hex correctly", () => {
    expect(BIP39Entropy.client()).toBe("BIP39");
    const entropy: string = BIP39Entropy.generate(
        BIP39_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    );
    expect(BIP39Entropy.isValid(entropy)).toBe(true);
    expect(BIP39Entropy.isValid("00")).toBe(false)
    expect(BIP39Entropy.isValidStrength(
        BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT)
    ).toBe(true);
    expect(BIP39Entropy.isValidStrength(125)).toBe(false);
  });
});