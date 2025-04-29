import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from "../../../src/entropies/electrum/v2";
import { hexToBytes } from "../../../src/utils";

describe("ElectrumV2Entropy", () => {
  it("should accept valid hex entropy", () => {
    const entropyHex = "0c3a7d6111221a9a9f3f309ee2680aa54a";
    expect(ElectrumV2Entropy.isValid(entropyHex)).toBe(true);
  });

  it("should store correct byte array", () => {
    const entropyHex = ElectrumV2Entropy.generate(
        ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
    );
    const entropy = new ElectrumV2Entropy(entropyHex);
    const bytes = hexToBytes(entropyHex);
    expect(entropy.entropy()).toEqual(entropyHex);
  });

  it("should store correct byte array", () => {
    const entropyHex = ElectrumV2Entropy.generate(
        ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_SIXTY_FOUR
    );
    expect(ElectrumV2Entropy.isValid(entropyHex)).toEqual(true);
  });

  it("should return the stored entropy and its strength for a 132-bit input", () => {
    const entropy = ElectrumV2Entropy.generate(
      ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
    );
    const instance = new ElectrumV2Entropy(entropy);

    expect(instance.entropy()).toBe(entropy);
    expect(instance.strength()).toBe(
      ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
    );
  });

  it("should generate hex strings of the correct byte-rounded length for all supported strengths", () => {
    for (const strength of ElectrumV2Entropy.strengths) {
      const entropy = ElectrumV2Entropy.generate(strength);
      expect(typeof entropy).toBe("string");

      const expectedLength = 2 * Math.ceil(strength / 8);
      expect(entropy).toHaveLength(expectedLength);
    }
  });

  it("should throw an error for invalid hex format", () => {
    expect(() => new ElectrumV2Entropy("000")).toThrowError();
  });
});
