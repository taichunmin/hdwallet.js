// SPDX-License-Identifier: MIT

import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from "../../src/entropies/bip39";
import { BIP39_MNEMONIC_LANGUAGES, BIP39_MNEMONIC_WORDS, BIP39Mnemonic } from "../../src/mnemonics/bip39/mnemonic";
import {MnemonicError, ChecksumError, EntropyError} from "../../src/exceptions";
import { getBytes } from "../../src/utils";

describe("BIP39Mnemonic", (): void => {

  it("should expose the correct client identifier and validate languages & word counts", (): void => {
    expect(BIP39Mnemonic.client()).toBe("BIP39");
    expect(BIP39Mnemonic.isValidLanguage(BIP39_MNEMONIC_LANGUAGES.ENGLISH)).toBe(true);
    expect(BIP39Mnemonic.isValidLanguage("klingon")).toBe(false);
    expect(BIP39Mnemonic.isValidWords(BIP39_MNEMONIC_WORDS.TWELVE)).toBe(true);
    expect(BIP39Mnemonic.isValidWords(13)).toBe(false);
  });

  it("should normalize a string into an array of words", (): void => {
    const raw = "  foo   bar\tbaz\nqux  ";
    expect(BIP39Mnemonic.normalize(raw)).toEqual(["foo", "bar", "baz", "qux"]);
    const arr = ["alpha", "beta"];
    expect(BIP39Mnemonic.normalize(arr)).toBe(arr);
  });

  it("should encode and decode a 128-bit entropy round-trip in English", (): void => {
    for (const words of BIP39Mnemonic.wordsList) {
        for (const language of BIP39Mnemonic.languages) {
          const entropy: string = BIP39Entropy.generate(BIP39Mnemonic.wordsToEntropyStrength[words]);
          const mnemonic: string = BIP39Mnemonic.encode(entropy, language);
          expect(typeof mnemonic).toBe("string");
          expect(mnemonic.split(" ")).toHaveLength(words);
          expect(BIP39Mnemonic.isValid(mnemonic)).toBe(true);
          const decoded: string = BIP39Mnemonic.decode(mnemonic);
          expect(decoded).toBe(entropy);
        }
    }
  });

  it("should throw a ChecksumError for a valid-length but bad-checksum mnemonic", (): void => {
    const good = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    const words: string[] = good.split(" ");
    words[11] = "ability";
    const bad: string = words.join(" ");
    expect((): string => BIP39Mnemonic.decode(bad)).toThrowError(ChecksumError);
  });

  it("fromWords() should generate mnemonics of each supported length", (): void => {
    for (const words of BIP39Mnemonic.wordsList) {
      const bip39Mnemonic: BIP39Mnemonic = BIP39Mnemonic.fromWords(
          words, BIP39_MNEMONIC_LANGUAGES.ENGLISH
      );
      expect(bip39Mnemonic.words()).toBe(words);
      expect(bip39Mnemonic.language()).toBe(BIP39_MNEMONIC_LANGUAGES.ENGLISH);
      const mnemonic: string[] = bip39Mnemonic.mnemonic().split(" ");
      expect(mnemonic).toHaveLength(words);
      expect(BIP39Mnemonic.isValid(bip39Mnemonic.mnemonic())).toBe(true);
    }
  });

  it("fromWords() should throw on an unsupported word count", (): void => {
    expect(() => BIP39Mnemonic.fromWords(13, BIP39_MNEMONIC_LANGUAGES.ENGLISH)).toThrowError(MnemonicError);
  });

  it("fromEntropy() should accept hex, Uint8Array, or BIP39Entropy and round-trip correctly", (): void => {
    const entropy: string = BIP39Entropy.generate(BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT);
    const entropyBytes: Uint8Array<ArrayBuffer> = getBytes(entropy);
    const bip39Entropy: BIP39Entropy = new BIP39Entropy(entropy);

    for (const input of [entropy, entropyBytes, bip39Entropy]) {
      const bip39Mnemonic: BIP39Mnemonic= BIP39Mnemonic.fromEntropy(
          input, BIP39_MNEMONIC_LANGUAGES.ENGLISH
      );
      const decoded: string = BIP39Mnemonic.decode(bip39Mnemonic.mnemonic());
      expect(decoded).toBe(entropy);
    }
  });

  it("encode() should throw on unsupported entropy lengths", (): void => {
    expect((): string => BIP39Mnemonic.encode(
        "00".repeat(100 / 4), BIP39_MNEMONIC_LANGUAGES.ENGLISH
    )).toThrowError(EntropyError);
  });
});
