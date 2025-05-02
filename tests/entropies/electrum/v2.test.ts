// SPDX-License-Identifier: MIT

import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from "../../../src/entropies/electrum/v2";
import { hexToBytes } from "../../../src/utils";
import jsonData from "../../data/json/entropies.json"

describe("ElectrumV2Entropy", (): void => {
  it("should accept valid hex entropy", (): void => {
    const vectors = jsonData['Electrum-V2'] as Record<
      string,
      { 'entropy-suitable': string; strength: number }
    >;

    for (const [strengthKey, { 'entropy-suitable': entropy, strength }] of Object.entries(vectors)) {
      expect(
        ElectrumV2Entropy.isValid(entropy),
      ).toBe(true);
    }
  });

  it("should store correct byte array", (): void => {
    const entropyHex = ElectrumV2Entropy.generate(
        ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
    );
    const entropy = new ElectrumV2Entropy(entropyHex);
    const bytes = hexToBytes(entropyHex);
    expect(entropy.entropy()).toEqual(entropyHex);
  });

  it("should store correct byte array", (): void => {
    const entropyHex = ElectrumV2Entropy.generate(
        ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_SIXTY_FOUR
    );
    expect(ElectrumV2Entropy.isValid(entropyHex)).toEqual(true);
  });

  it("should return the stored entropy and its strength for a 132-bit input", (): void => {
    const entropy = ElectrumV2Entropy.generate(
      ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
    );
    const instance = new ElectrumV2Entropy(entropy);

    expect(instance.entropy()).toBe(entropy);
    expect(instance.strength()).toBe(
      ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
    );
  });

  it("should generate hex strings of the correct byte-rounded length for all supported strengths", (): void => {
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
