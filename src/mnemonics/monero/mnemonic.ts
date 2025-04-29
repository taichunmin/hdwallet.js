import { IMnemonic, MnemonicOptionsInterface } from "../imnemonic";
import { IEntropy } from "../../entropies/ientropy";
import { MoneroEntropy, MONERO_ENTROPY_STRENGTHS } from "../../entropies/monero";
import { MnemonicError, EntropyError, ChecksumError } from "../../exceptions";
import {
    hexToBytes,
    bytesToHex,
    bytesToInteger,
    bytesChunkToWords,
    wordsToBytesChunk, toBuffer
} from "../../utils";
import { crc32 } from "../../crypto";


interface MoneroMnemonicWordsInterface {
  TWELVE: number;
  THIRTEEN: number;
  TWENTY_FOUR: number;
  TWENTY_FIVE: number;
}

interface MoneroMnemonicLanguagesInterface {
  CHINESE_SIMPLIFIED: string;
  DUTCH: string;
  ENGLISH: string;
  FRENCH: string;
  GERMAN: string;
  ITALIAN: string;
  JAPANESE: string;
  PORTUGUESE: string;
  RUSSIAN: string;
  SPANISH: string;
}

export const MONERO_MNEMONIC_WORDS: MoneroMnemonicWordsInterface = {
  TWELVE: 12,
  THIRTEEN: 13,
  TWENTY_FOUR: 24,
  TWENTY_FIVE: 25,
} as const;

export const MONERO_MNEMONIC_LANGUAGES: MoneroMnemonicLanguagesInterface = {
  CHINESE_SIMPLIFIED: "chinese-simplified",
  DUTCH: "dutch",
  ENGLISH: "english",
  FRENCH: "french",
  GERMAN: "german",
  ITALIAN: "italian",
  JAPANESE: "japanese",
  PORTUGUESE: "portuguese",
  RUSSIAN: "russian",
  SPANISH: "spanish",
} as const;

export class MoneroMnemonic extends IMnemonic {

  static wordBitLength: number = 11;

  static wordsListCount: number[] = [
    MONERO_MNEMONIC_WORDS.TWELVE,
    MONERO_MNEMONIC_WORDS.THIRTEEN,
    MONERO_MNEMONIC_WORDS.TWENTY_FOUR,
    MONERO_MNEMONIC_WORDS.TWENTY_FIVE
  ];

  static wordsToStrength: Record<number, number> = {
    12: MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
    13: MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
    24: MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX,
    25: MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  };

  static checksumWordCounts: number[] = [
    MONERO_MNEMONIC_WORDS.THIRTEEN,
    MONERO_MNEMONIC_WORDS.TWENTY_FIVE
  ];

  static languages: string[] = Object.values(
      MONERO_MNEMONIC_LANGUAGES
  );

  static languageUniquePrefixLengths: Record<string, number> = {
    [MONERO_MNEMONIC_LANGUAGES.CHINESE_SIMPLIFIED]: 1,
    [MONERO_MNEMONIC_LANGUAGES.DUTCH]: 4,
    [MONERO_MNEMONIC_LANGUAGES.ENGLISH]: 3,
    [MONERO_MNEMONIC_LANGUAGES.FRENCH]: 4,
    [MONERO_MNEMONIC_LANGUAGES.GERMAN]: 4,
    [MONERO_MNEMONIC_LANGUAGES.ITALIAN]: 4,
    [MONERO_MNEMONIC_LANGUAGES.JAPANESE]: 4,
    [MONERO_MNEMONIC_LANGUAGES.PORTUGUESE]: 4,
    [MONERO_MNEMONIC_LANGUAGES.RUSSIAN]: 4,
    [MONERO_MNEMONIC_LANGUAGES.SPANISH]: 4,
  };

  static wordlistPath: Record<string, string> = {
    [MONERO_MNEMONIC_LANGUAGES.CHINESE_SIMPLIFIED]: "monero/wordlist/chinese_simplified.txt",
    [MONERO_MNEMONIC_LANGUAGES.DUTCH]: "monero/wordlist/dutch.txt",
    [MONERO_MNEMONIC_LANGUAGES.ENGLISH]: "monero/wordlist/english.txt",
    [MONERO_MNEMONIC_LANGUAGES.FRENCH]: "monero/wordlist/french.txt",
    [MONERO_MNEMONIC_LANGUAGES.GERMAN]: "monero/wordlist/german.txt",
    [MONERO_MNEMONIC_LANGUAGES.ITALIAN]: "monero/wordlist/italian.txt",
    [MONERO_MNEMONIC_LANGUAGES.JAPANESE]: "monero/wordlist/japanese.txt",
    [MONERO_MNEMONIC_LANGUAGES.PORTUGUESE]: "monero/wordlist/portuguese.txt",
    [MONERO_MNEMONIC_LANGUAGES.RUSSIAN]: "monero/wordlist/russian.txt",
    [MONERO_MNEMONIC_LANGUAGES.SPANISH]: "monero/wordlist/spanish.txt"
  };

  /** A simple identifier */
  static client(): string {
    return "Monero";
  }

  /** Generate by word count */
  static fromWords(
    count: number,
    language: string,
    options: MnemonicOptionsInterface = {}
  ): MoneroMnemonic {
    if (!this.wordsListCount.includes(count)) {
      throw new MnemonicError(
        "Invalid word count",
        { expected: this.wordsListCount, got: count }
      );
    }
    const strength = this.wordsToStrength[count];
    const entropyBytes = MoneroEntropy.generate(strength);
    const phrase = this.encode(entropyBytes, language, options);
    return new MoneroMnemonic(phrase, options);
  }

  /** Generate from existing entropy */
  static fromEntropy(
    entropy: string | Uint8Array | IEntropy, language: string, options: MnemonicOptionsInterface = { }
  ): MoneroMnemonic {
    let raw: Uint8Array;
    if (typeof entropy === "string") {
      raw = hexToBytes(entropy);
    } else if (entropy instanceof Uint8Array) {
      raw = entropy;
    } else {
      raw = hexToBytes(entropy.entropy());
    }
    const phrase = this.encode(raw, language, options);
    return new MoneroMnemonic(phrase, options);
  }

  /** Core encode: entropy → mnemonic */
  static encode(
    entropy: string | Uint8Array, language: string, options: MnemonicOptionsInterface = { }
  ): string {

    const entropyBytes = toBuffer(entropy)
    if (!MoneroEntropy.isValidBytesStrength(entropyBytes.length)) {
      throw new EntropyError(
        "Wrong entropy strength", { expected: MoneroEntropy.strengths, got: entropyBytes.length * 8 }
      );
    }

    // load & normalize the wordlist
    const rawList = this.getWordsListByLanguage(language, this.wordlistPath);
    const wordList = this.normalize(rawList);
    if (wordList.length !== 1626) {
      throw new Error(
        `Expected 1626 words in list for "${language}", got ${wordList.length}`
      );
    }

    // split into 4-byte chunks → 3 words each
    const mnemonic: string[] = [];
    for (let i = 0; i < entropyBytes.length; i += 4) {
      const chunk = entropyBytes.slice(i, i + 4);
      mnemonic.push(...bytesChunkToWords(chunk, wordList, "little"));
    }

    // optional checksum word
    if (options.checksum) {
      const prefixLen = this.languageUniquePrefixLengths[language];
      const prefixes = mnemonic.map(w => w.slice(0, prefixLen)).join("");
      // make the array-length into a bigint
      const lenBig = BigInt(mnemonic.length);
      // do the mod in bigint space
      const idxBig = bytesToInteger(crc32(prefixes)) % lenBig;
      // convert back to number for array indexing
      const idx = Number(idxBig);
      mnemonic.push(mnemonic[idx]);
    }

    return this.normalize(mnemonic).join(" ");
  }

  /** Core decode: mnemonic → hex entropy */
  static decode(
    input: string | string[],
    options: MnemonicOptionsInterface = {}
  ): string {
    const words = this.normalize(input);
    const count = words.length;
    if (!this.wordsListCount.includes(count)) {
      throw new MnemonicError(
        "Invalid word count",
        { expected: this.wordsListCount, got: count }
      );
    }

    // detect correct wordlist & language
    const [wordsList, language] = this.findLanguage(words);
    if (wordsList.length !== 1626) {
      throw new Error(
        `Expected 1626 words in list for "${language}", got ${wordsList.length}`
      );
    }

    // work on a copy of the input words
    const phraseWords = [...words];

    // verify & strip checksum if present
    if (this.checksumWordCounts.includes(count as number)) {
      const last = phraseWords.pop()!;
      const prefixLen = this.languageUniquePrefixLengths[language];
      const prefixes = phraseWords.map(w => w.slice(0, prefixLen)).join("");
      const lenBig  = BigInt(phraseWords.length);
      const idxBig  = bytesToInteger(crc32(prefixes)) % lenBig;
      const idx     = Number(idxBig);
      const expected = phraseWords[idx];
      if (last !== expected) {
        throw new ChecksumError("Invalid checksum", { expected, got: last });
      }
    }

    // rebuild entropy in 4-byte chunks
    const buffers: Buffer[] = [];
    for (let i = 0; i < phraseWords.length; i += 3) {
      const [w1, w2, w3] = phraseWords.slice(i, i + 3);
      const chunk = wordsToBytesChunk(w1, w2, w3, wordsList, "little");
      buffers.push(Buffer.from(chunk));
    }

    // return hex string
    return bytesToHex(Buffer.concat(buffers), false);
  }

  static normalize(input: string | string[]): string[] {
    const arr = typeof input === "string"
      ? input.trim().split(/\s+/)
      : input;
    return arr.map(w => w.normalize("NFKD").toLowerCase());
  }
}
