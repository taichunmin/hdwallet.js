import { ElectrumV1Entropy } from "../../../src/entropies/electrum/v1";
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
});
