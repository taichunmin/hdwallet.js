// SPDX-License-Identifier: MIT

import {MnemonicError,  EntropyError} from "../../src/exceptions";
import { getBytes } from "../../src/utils";
import {ALGORAND_MNEMONIC_LANGUAGES, ALGORAND_MNEMONIC_WORDS, AlgorandMnemonic} from "../../src/mnemonics";
import {ALGORAND_ENTROPY_STRENGTHS, AlgorandEntropy} from "../../src/entropies";

describe("AlgorandMnemonic", (): void => {

  it("should expose the correct client identifier and validate languages & word counts", (): void => {
    expect(AlgorandMnemonic.client()).toBe("Algorand");
    expect(AlgorandMnemonic.isValidLanguage(ALGORAND_MNEMONIC_LANGUAGES.ENGLISH)).toBe(true);
    expect(AlgorandMnemonic.isValidLanguage("klingon")).toBe(false);
    expect(AlgorandMnemonic.isValidWords(ALGORAND_MNEMONIC_WORDS.TWENTY_FIVE)).toBe(true);
    expect(AlgorandMnemonic.isValidWords(13)).toBe(false);
  });

  it("should normalize a string into an array of words", (): void => {
    const raw = "  foo   bar\tbaz\nqux  ";
    expect(AlgorandMnemonic.normalize(raw)).toEqual(["foo", "bar", "baz", "qux"]);
    const arr = ["alpha", "beta"];
    expect(AlgorandMnemonic.normalize(arr)).toBe(arr);
  });

  it("should encode and decode a 128-bit entropy round-trip in English", (): void => {
    for (const words of AlgorandMnemonic.wordsList) {
        for (const language of AlgorandMnemonic.languages) {
          const entropy: string = AlgorandEntropy.generate(AlgorandMnemonic.wordsToEntropyStrength[words]);
          const mnemonic: string = AlgorandMnemonic.encode(entropy, language);
          expect(typeof mnemonic).toBe("string");
          expect(mnemonic.split(" ")).toHaveLength(words);
          expect(AlgorandMnemonic.isValid(mnemonic)).toBe(true);
          const decoded: string = AlgorandMnemonic.decode(mnemonic);
          expect(decoded).toBe(entropy);
        }
    }
  });

  it("should throw a ChecksumError for a valid-length but bad-checksum mnemonic", (): void => {
    const good = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    const words: string[] = good.split(" ");
    words[11] = "ability";
    const bad: string = words.join(" ");
    expect((): string => AlgorandMnemonic.decode(bad)).toThrowError(MnemonicError);
  });

  it("fromWords() should generate mnemonics of each supported length", (): void => {
    for (const words of AlgorandMnemonic.wordsList) {
      const algorandMnemonic: AlgorandMnemonic = AlgorandMnemonic.fromWords(
          words, ALGORAND_MNEMONIC_LANGUAGES.ENGLISH
      );
      expect(algorandMnemonic.words()).toBe(words);
      expect(algorandMnemonic.language()).toBe(ALGORAND_MNEMONIC_LANGUAGES.ENGLISH);
      const mnemonic: string[] = algorandMnemonic.mnemonic().split(" ");
      expect(mnemonic).toHaveLength(words);
      expect(AlgorandMnemonic.isValid(algorandMnemonic.mnemonic())).toBe(true);
    }
  });

  it("fromWords() should throw on an unsupported word count", (): void => {
    expect(() => AlgorandMnemonic.fromWords(13, ALGORAND_MNEMONIC_LANGUAGES.ENGLISH)).toThrowError(MnemonicError);
  });

  it("fromEntropy() should accept hex, Uint8Array, or AlgorandEntropy and round-trip correctly", (): void => {
    const entropy: string = AlgorandEntropy.generate(ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX);
    const entropyBytes: Uint8Array<ArrayBuffer> = getBytes(entropy);
    const algorandEntropy: AlgorandEntropy = new AlgorandEntropy(entropy);

    for (const input of [entropy, entropyBytes, algorandEntropy]) {
      const algorandMnemonic: AlgorandMnemonic= AlgorandMnemonic.fromEntropy(
          input, ALGORAND_MNEMONIC_LANGUAGES.ENGLISH
      );
      const decoded: string = AlgorandMnemonic.decode(algorandMnemonic.mnemonic());
      expect(decoded).toBe(entropy);
    }
  });

  it("encode() should throw on unsupported entropy lengths", (): void => {
    expect((): string => AlgorandMnemonic.encode(
        "00".repeat(100 / 4), ALGORAND_MNEMONIC_LANGUAGES.ENGLISH
    )).toThrowError(EntropyError);
  });
});
