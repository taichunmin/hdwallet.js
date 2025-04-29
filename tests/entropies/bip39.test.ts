import { BIP39Entropy } from "../../src/entropies/bip39";
import { hexToBytes } from "../../src/utils";

describe("BIP39Entropy", () => {
  it("should generate a hex string of the correct length for 128 bits", () => {
    const hex = BIP39Entropy.generate(128);
    expect(typeof hex).toBe("string");
    expect(hex.length).toBe(32);
  });

  it("should convert hex to bytes for 256 bits", () => {
    const hex = BIP39Entropy.generate(256);
    const bytes = hexToBytes(hex);
    expect(bytes.length).toBe(32);
  });

  it("should validate hex correctly", () => {
    const hex = BIP39Entropy.generate(192);
    expect(BIP39Entropy.isValid(hex)).toBe(true);
    expect(BIP39Entropy.isValid("00")).toBe(false);
  });
});