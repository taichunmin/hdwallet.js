// SPDX-License-Identifier: MIT

import {MnemonicError,  EntropyError} from "../../src/exceptions";
import { getBytes } from "../../src/utils";
import {MONERO_MNEMONIC_LANGUAGES, MONERO_MNEMONIC_WORDS, MoneroMnemonic} from "../../src/mnemonics";
import {MONERO_ENTROPY_STRENGTHS, MoneroEntropy} from "../../src/entropies";


describe("MoneroMnemonic", (): void => {

  it("should expose the correct client identifier and validate languages & word counts", (): void => {
    expect(MoneroMnemonic.client()).toBe("Monero");
    expect(MoneroMnemonic.isValidLanguage(MONERO_MNEMONIC_LANGUAGES.ENGLISH)).toBe(true);
    expect(MoneroMnemonic.isValidLanguage("klingon")).toBe(false);
    expect(MoneroMnemonic.isValidWords(MONERO_MNEMONIC_WORDS.TWENTY_FIVE)).toBe(true);
    expect(MoneroMnemonic.isValidWords(14)).toBe(false);
  });

  it("should normalize a string into an array of words", (): void => {
    const raw = "  foo   bar\tbaz\nqux  ";
    expect(MoneroMnemonic.normalize(raw)).toEqual(["foo", "bar", "baz", "qux"]);
    const arr = ["alpha", "beta"];
    expect(MoneroMnemonic.normalize(arr)).toStrictEqual(arr);
  });

  it("should encode and decode a round-trip in every supported length", (): void => {
  for (const words of MoneroMnemonic.wordsList) {
    const strength = MoneroMnemonic.wordsToStrength[words];
    for (const language of MoneroMnemonic.languages) {
      const entropy = MoneroEntropy.generate(strength);
      const needChecksum = MoneroMnemonic.checksumWordCounts.includes(words);

      const mnemonic = MoneroMnemonic.encode(
        entropy,
        language,
        { checksum: needChecksum }
      );
      const parts = mnemonic.split(" ");
      expect(parts).toHaveLength(words);
      expect(MoneroMnemonic.isValid(mnemonic)).toBe(true);

      const decoded = MoneroMnemonic.decode(mnemonic);
      expect(decoded).toBe(entropy);
    }
  }
});


  it("should throw a ChecksumError for a valid-length but bad-checksum mnemonic", (): void => {
    const good = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    const words: string[] = good.split(" ");
    words[11] = "ability";
    const bad: string = words.join(" ");
    expect((): string => MoneroMnemonic.decode(bad)).toThrowError(MnemonicError);
  });

  it("fromWords() should generate mnemonics of each supported length", (): void => {
    for (const words of MoneroMnemonic.wordsList) {
      const moneroMnemonic: MoneroMnemonic = MoneroMnemonic.fromWords(
          words, MONERO_MNEMONIC_LANGUAGES.ENGLISH
      );
      expect(moneroMnemonic.words()).toBe(words);
      expect(moneroMnemonic.language()).toBe(MONERO_MNEMONIC_LANGUAGES.ENGLISH);
      const mnemonic: string[] = moneroMnemonic.mnemonic().split(" ");
      expect(mnemonic).toHaveLength(words);
      expect(MoneroMnemonic.isValid(moneroMnemonic.mnemonic())).toBe(true);
    }
  });

  it("fromWords() should throw on an unsupported word count", (): void => {
    expect(() => MoneroMnemonic.fromWords(14, MONERO_MNEMONIC_LANGUAGES.ENGLISH)).toThrowError(MnemonicError);
  });

  it("fromEntropy() should accept hex, Uint8Array, or MoneroEntropy and round-trip correctly", (): void => {
    const entropy: string = MoneroEntropy.generate(MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX);
    const entropyBytes: Uint8Array<ArrayBuffer> = getBytes(entropy);
    const moneroEntropy: MoneroEntropy = new MoneroEntropy(entropy);

    for (const input of [entropy, entropyBytes, moneroEntropy]) {
      const moneroMnemonic: MoneroMnemonic= MoneroMnemonic.fromEntropy(
          input, MONERO_MNEMONIC_LANGUAGES.ENGLISH
      );
      const decoded: string = MoneroMnemonic.decode(moneroMnemonic.mnemonic());
      expect(decoded).toBe(entropy);
    }
  });

  it("encode() should throw on unsupported entropy lengths", (): void => {
    expect((): string => MoneroMnemonic.encode(
        "00".repeat(100 / 4), MONERO_MNEMONIC_LANGUAGES.ENGLISH
    )).toThrowError(EntropyError);
  });
});
