import { IMnemonic, MnemonicOptionsInterface } from "../imnemonic";
import { IEntropy } from "../../entropies/ientropy";
import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from "../../entropies/bip39";
import { MnemonicError, EntropyError, ChecksumError } from "../../exceptions";
import {
  hexToBytes, bytesToBinaryString, integerToBinaryString, binaryStringToBytes, bytesToHex
} from "../../utils";
import { createHash } from "crypto";

interface BIP39MnemonicWordsInterface {
  TWELVE: number,
  FIFTEEN: number,
  EIGHTEEN: number,
  TWENTY_ONE: number,
  TWENTY_FOUR: number
}

interface BIP39MnemonicLanguagesInterface {
  CHINESE_SIMPLIFIED: string,
  CHINESE_TRADITIONAL: string,
  CZECH: string,
  ENGLISH: string,
  FRENCH: string,
  ITALIAN: string,
  JAPANESE: string,
  KOREAN: string,
  PORTUGUESE: string,
  RUSSIAN: string,
  SPANISH: string,
  TURKISH: string
}

export const BIP39_MNEMONIC_WORDS: BIP39MnemonicWordsInterface = {
  TWELVE: 12,
  FIFTEEN: 15,
  EIGHTEEN: 18,
  TWENTY_ONE: 21,
  TWENTY_FOUR: 24
} as const;

export const BIP39_MNEMONIC_LANGUAGES: BIP39MnemonicLanguagesInterface = {
  CHINESE_SIMPLIFIED: "chinese-simplified",
  CHINESE_TRADITIONAL: "chinese-traditional",
  CZECH: "czech",
  ENGLISH: "english",
  FRENCH: "french",
  ITALIAN: "italian",
  JAPANESE: "japanese",
  KOREAN: "korean",
  PORTUGUESE: "portuguese",
  RUSSIAN: "russian",
  SPANISH: "spanish",
  TURKISH: "turkish"
} as const;

export class BIP39Mnemonic extends IMnemonic {

  static wordBitLength: number = 11;
  static wordsListNumber: number = 2048;

  static wordsList: number[] = [
      BIP39_MNEMONIC_WORDS.TWELVE, 
      BIP39_MNEMONIC_WORDS.FIFTEEN, 
      BIP39_MNEMONIC_WORDS.EIGHTEEN,
      BIP39_MNEMONIC_WORDS.TWENTY_ONE, 
      BIP39_MNEMONIC_WORDS.TWENTY_FOUR
  ];

  static wordsToEntropyStrength: Record<number, number> = {
    12: BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
    15: BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_SIXTY,
    18: BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_NINETY_TWO,
    21: BIP39_ENTROPY_STRENGTHS.TWO_HUNDRED_TWENTY_FOUR,
    24: BIP39_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  };

  static languages: string[] = Object.values(
    BIP39_MNEMONIC_LANGUAGES
  );

  static wordlistPath: Record<string, string> = {
    [BIP39_MNEMONIC_LANGUAGES.CHINESE_SIMPLIFIED]: "bip39/wordlist/chinese_simplified.txt",
    [BIP39_MNEMONIC_LANGUAGES.CHINESE_TRADITIONAL]: "bip39/wordlist/chinese_traditional.txt",
    [BIP39_MNEMONIC_LANGUAGES.CZECH]: "bip39/wordlist/czech.txt",
    [BIP39_MNEMONIC_LANGUAGES.ENGLISH]: "bip39/wordlist/english.txt",
    [BIP39_MNEMONIC_LANGUAGES.FRENCH]: "bip39/wordlist/french.txt",
    [BIP39_MNEMONIC_LANGUAGES.ITALIAN]: "bip39/wordlist/italian.txt",
    [BIP39_MNEMONIC_LANGUAGES.JAPANESE]: "bip39/wordlist/japanese.txt",
    [BIP39_MNEMONIC_LANGUAGES.KOREAN]: "bip39/wordlist/korean.txt",
    [BIP39_MNEMONIC_LANGUAGES.PORTUGUESE]: "bip39/wordlist/portuguese.txt",
    [BIP39_MNEMONIC_LANGUAGES.RUSSIAN]: "bip39/wordlist/russian.txt",
    [BIP39_MNEMONIC_LANGUAGES.SPANISH]: "bip39/wordlist/spanish.txt",
    [BIP39_MNEMONIC_LANGUAGES.TURKISH]: "bip39/wordlist/turkish.txt"
  };


  static client(): string {
    return "BIP39";
  }

  static fromWords(
    words: number, language: string, options: MnemonicOptionsInterface = { }
  ): BIP39Mnemonic {
    if (!this.wordsList.includes(words)) {
      throw new MnemonicError(
        `Invalid words`, { expected: this.wordsList, got: words }
      );
    }
    const strength = this.wordsToEntropyStrength[words];
    const entropyHex = BIP39Entropy.generate(strength);
    const phrase = this.encode(entropyHex, language, options);
    return new BIP39Mnemonic(phrase, options);
  }

  static fromEntropy(
    entropy: string | Uint8Array | IEntropy, language: string, options: MnemonicOptionsInterface = { }
  ): BIP39Mnemonic {
    // normalize to hex
    let hex: string;
    if (typeof entropy === "string") {
      hex = entropy;
    } else if (entropy instanceof Uint8Array) {
      hex = Buffer.from(entropy).toString("hex");
    } else {
      hex = entropy.entropy();
    }
    const phrase = this.encode(hex, language, options);
    return new BIP39Mnemonic(phrase, options);
  }

  static encode(
    entropyInput: string | Uint8Array, language: string, options: MnemonicOptionsInterface = { }
  ): string {
    const entropyBytes = typeof entropyInput === "string" ? hexToBytes(entropyInput) : entropyInput;
    const bitLen = entropyBytes.length * 8;
    if (!Object.values(this.wordsToEntropyStrength).includes(bitLen)) {
      throw new EntropyError(
        `Unsupported entropy length ${bitLen}`
      );
    }
    const hash = createHash("sha256").update(entropyBytes).digest();
    const csLen = bitLen / 32;
    const entBits = bytesToBinaryString(entropyBytes, bitLen);
    const hashBits = bytesToBinaryString(hash, 256).slice(0, csLen);
    const bits = entBits + hashBits;

    const wordList = this.getWordsListByLanguage(language, this.wordlistPath);
    if (wordList.length !== this.wordsListNumber) {
      throw new Error(
        `Loaded wordlist length ${wordList.length} !== ${this.wordsListNumber}`
      );
    }
    const words: string[] = [];
    for (let i = 0; i < bits.length / this.wordBitLength; i++) {
      const idx = parseInt(
        bits.slice(i * this.wordBitLength, (i + 1) * this.wordBitLength),
        2
      );
      words.push(wordList[idx]);
    }
    return words.join(" ");
  }

  static decode(
    mnemonic: string | string[], options: MnemonicOptionsInterface = { checksum: false }
  ): string {

    // 1) normalize into words[]
    const words = this.normalize(mnemonic);

    // 2) basic length check
    if (!this.wordsList.includes(words.length)) {
      throw new MnemonicError(
        `Invalid words ${words.length}`,
        { expected: this.wordsList, got: words.length }
      );
    }

    // 3) decide which wordlist & index map to use
    let wordList: string[];
    let idxMap: Record<string, number> = { };
    if (options.wordsList && options.wordsListWithIndex) {
      idxMap = options.wordsListWithIndex;
    } else {
      [ wordList ] = this.findLanguage(words);
      wordList.forEach((w, i) => idxMap[w] = i);
    }

    // 4) rebuild the full bit-string
    const bits = words
      .map(w => {
        const idx = idxMap[w];
        if (idx === undefined) {
          throw new MnemonicError(`Unknown word: ${w}`);
        }
        return integerToBinaryString(idx, this.wordBitLength);
      })
      .join("");

    // 5) split off & verify checksum bits
    const checksumLen = bits.length / 33;
    const entropyBits = bits.slice(0, -checksumLen);
    const givenChecksum = bits.slice(-checksumLen);

    const entropyBytes = binaryStringToBytes(entropyBits);
    const hash = createHash("sha256").update(entropyBytes).digest();
    const hashBits = bytesToBinaryString(hash, 256).slice(0, checksumLen);

    if (givenChecksum !== hashBits) {
      throw new ChecksumError(
        "Checksum mismatch", { expected: givenChecksum, got: hashBits }
      );
    }

    // 6) if the caller wants the “full bits+checksum” hex, return that
    if (options.checksum) {
      const totalBits = bits.length;
      const padBits = totalBits % 8 === 0
        ? totalBits
        : totalBits + (8 - (totalBits % 8));
      return bytesToHex(binaryStringToBytes(bits, padBits / 8));
    }

    // otherwise just return the raw entropy
    return bytesToHex(entropyBytes);
  }
}
