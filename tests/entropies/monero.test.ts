// SPDX-License-Identifier: MIT

import {MONERO_ENTROPY_STRENGTHS, MoneroEntropy} from "../../src/entropies/monero";

describe("MoneroEntropy", () => {
  it("should generate a hex string of the correct length for all supported strengths", () => {
    for (const strength of MoneroEntropy.strengths) {
      const entropy = MoneroEntropy.generate(strength);
      expect(typeof entropy).toBe("string");
      expect(entropy.length).toBe(strength / 4);
    }
  });

  it("should return the original entropy and strength for a 128-bit hex string", () => {
    const entropy = MoneroEntropy.generate(
        MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    );
    const moneroEntropy: MoneroEntropy = new MoneroEntropy(entropy);
    expect(typeof moneroEntropy.entropy()).toBe("string");
    expect(moneroEntropy.entropy()).toBe(entropy);
    expect(typeof moneroEntropy.strength()).toBe("number");
    expect(moneroEntropy.strength()).toBe(
        MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    );
  });

  it("should validate hex string and strength correctly", () => {
    expect(MoneroEntropy.client()).toBe("Monero")
    const entropy = MoneroEntropy.generate(
        MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    );
    expect(MoneroEntropy.isValid(entropy)).toBe(true);
    expect(MoneroEntropy.isValid("00")).toBe(false);
    expect(MoneroEntropy.isValidStrength(
        MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    )).toBe(true);
    expect(MoneroEntropy.isValidStrength(125)).toBe(false);
  });
});