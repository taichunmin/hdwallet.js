import {ELECTRUM_V1_ENTROPY_STRENGTHS, ElectrumV1Entropy} from "../../../src/entropies/electrum/v1";
import { hexToBytes } from "../../../src/utils";

describe("ElectrumV1Entropy", () => {
  it("should accept valid hex entropy", () => {
    const entropyHex = "000102030405060708090A0B0C0D0E0F";
    expect(ElectrumV1Entropy.isValid(entropyHex)).toBe(true);
  });

  it("should store correct byte array", () => {
    const entropyHex = "0f0e0d0c0b0a09080706050403020100";
    const entropy = new ElectrumV1Entropy(entropyHex);
    const bytes = hexToBytes(entropyHex);
    expect(entropy.entropy()).toEqual(entropyHex);
  });

  it("should throw error on invalid hex format", () => {
    const badHex = "g123";
    expect(() => new ElectrumV1Entropy(badHex)).toThrowError();
  });

  it("should generate a hex string of the correct length for all supported strengths", () => {
    for (const strength of ElectrumV1Entropy.strengths) {
      const entropy = ElectrumV1Entropy.generate(strength);
      expect(typeof entropy).toBe("string");
      expect(entropy.length).toBe(strength / 4);
    }
  });

  it("should return the original entropy and strength when given a 128-bit hex string", () => {
    const entropy: string = ElectrumV1Entropy.generate(
        ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    );
    const electrumv1Entropy: ElectrumV1Entropy = new ElectrumV1Entropy(entropy);
    expect(typeof electrumv1Entropy.entropy()).toBe("string");
    expect(electrumv1Entropy.entropy()).toBe(entropy);
    expect(typeof electrumv1Entropy.strength()).toBe("number");
    expect(electrumv1Entropy.strength()).toBe(
        ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    );
  });
});
