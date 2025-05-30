// SPDX-License-Identifier: MIT

import crypto from 'crypto';

import { Mnemonic } from '../mnemonic';
import { Entropy, BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from '../../entropies';
import {
  MnemonicOptionsInterface, BIP39MnemonicLanguagesInterface, BIP39MnemonicWordsInterface
} from '../../interfaces';
import {
  hexToBytes, bytesToBinaryString, integerToBinaryString, binaryStringToBytes, bytesToHex
} from '../../utils';
import { MnemonicError, EntropyError, ChecksumError } from '../../exceptions';
import {
  BIP39_CHINESE_SIMPLIFIED_WORDLIST,
  BIP39_CHINESE_TRADITIONAL_WORDLIST,
  BIP39_CZECH_WORDLIST,
  BIP39_ENGLISH_WORDLIST,
  BIP39_FRENCH_WORDLIST,
  BIP39_ITALIAN_WORDLIST,
  BIP39_JAPANESE_WORDLIST,
  BIP39_KOREAN_WORDLIST,
  BIP39_PORTUGUESE_WORDLIST,
  BIP39_RUSSIAN_WORDLIST,
  BIP39_SPANISH_WORDLIST,
  BIP39_TURKISH_WORDLIST
} from './wordlists';

export const BIP39_MNEMONIC_WORDS: BIP39MnemonicWordsInterface = {
  TWELVE: 12,
  FIFTEEN: 15,
  EIGHTEEN: 18,
  TWENTY_ONE: 21,
  TWENTY_FOUR: 24
} as const;

export const BIP39_MNEMONIC_LANGUAGES: BIP39MnemonicLanguagesInterface = {
  CHINESE_SIMPLIFIED: 'chinese-simplified',
  CHINESE_TRADITIONAL: 'chinese-traditional',
  CZECH: 'czech',
  ENGLISH: 'english',
  FRENCH: 'french',
  ITALIAN: 'italian',
  JAPANESE: 'japanese',
  KOREAN: 'korean',
  PORTUGUESE: 'portuguese',
  RUSSIAN: 'russian',
  SPANISH: 'spanish',
  TURKISH: 'turkish'
} as const;

export class BIP39Mnemonic extends Mnemonic {

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

  static wordLists: Record<string, string[]> = {
    [BIP39_MNEMONIC_LANGUAGES.CHINESE_SIMPLIFIED]: BIP39_CHINESE_SIMPLIFIED_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.CHINESE_TRADITIONAL]: BIP39_CHINESE_TRADITIONAL_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.CZECH]: BIP39_CZECH_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.ENGLISH]: BIP39_ENGLISH_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.FRENCH]: BIP39_FRENCH_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.ITALIAN]: BIP39_ITALIAN_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.JAPANESE]: BIP39_JAPANESE_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.KOREAN]: BIP39_KOREAN_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.PORTUGUESE]: BIP39_PORTUGUESE_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.RUSSIAN]: BIP39_RUSSIAN_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.SPANISH]: BIP39_SPANISH_WORDLIST,
    [BIP39_MNEMONIC_LANGUAGES.TURKISH]: BIP39_TURKISH_WORDLIST
  };

  static getName(): string {
    return 'BIP39';
  }

  static fromWords(
    words: number, language: string, options: MnemonicOptionsInterface = { }
  ): string {

    if (!this.wordsList.includes(words)) {
      throw new MnemonicError(
        `Invalid words`, { expected: this.wordsList, got: words }
      );
    }
    const strength = this.wordsToEntropyStrength[words];
    const entropyHex = BIP39Entropy.generate(strength);
    return this.encode(entropyHex, language, options);
  }

  static fromEntropy(
    entropy: string | Uint8Array | Entropy, language: string, options: MnemonicOptionsInterface = { }
  ): string {

    let hex: string;
    if (typeof entropy === 'string') {
      hex = entropy;
    } else if (entropy instanceof Uint8Array) {
      hex = Buffer.from(entropy).toString('hex');
    } else {
      hex = entropy.getEntropy();
    }
    return this.encode(hex, language, options);
  }

  static encode(
    entropyInput: string | Uint8Array, language: string, options: MnemonicOptionsInterface = { }
  ): string {

    const entropyBytes = typeof entropyInput === 'string' ?
      hexToBytes(entropyInput) : entropyInput;
    const bitLen = entropyBytes.length * 8;
    if (!Object.values(this.wordsToEntropyStrength).includes(bitLen)) {
      throw new EntropyError(
        `Unsupported entropy length ${bitLen}`
      );
    }
    const hash = crypto.createHash('sha256').update(entropyBytes).digest();
    const csLen = bitLen / 32;
    const entBits = bytesToBinaryString(entropyBytes, bitLen);
    const hashBits = bytesToBinaryString(hash, 256).slice(0, csLen);
    const bits = entBits + hashBits;

    const wordList = this.getWordsListByLanguage(language, this.wordLists);
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
    return words.join(' ');
  }

  static decode(
    mnemonic: string | string[], options: MnemonicOptionsInterface = { checksum: false }
  ): string {

    const words = this.normalize(mnemonic);

    if (!this.wordsList.includes(words.length)) {
      throw new MnemonicError(
        `Invalid words ${words.length}`,
        { expected: this.wordsList, got: words.length }
      );
    }

    let wordList: string[];
    let idxMap: Record<string, number> = { };
    if (options.wordsList && options.wordsListWithIndex) {
      idxMap = options.wordsListWithIndex;
    } else {
      [ wordList ] = this.findLanguage(words, this.wordLists);
      wordList.forEach((w, i) => idxMap[w] = i);
    }

    const bits = words
      .map(w => {
        const idx = idxMap[w];
        if (idx === undefined) {
          throw new MnemonicError(`Unknown word: ${w}`);
        }
        return integerToBinaryString(idx, this.wordBitLength);
      })
      .join('');

    const checksumLen = bits.length / 33;
    const entropyBits = bits.slice(0, -checksumLen);
    const givenChecksum = bits.slice(-checksumLen);

    const entropyBytes = binaryStringToBytes(entropyBits);
    const hash = crypto.createHash('sha256').update(entropyBytes).digest();
    const hashBits = bytesToBinaryString(hash, 256).slice(0, checksumLen);

    if (givenChecksum !== hashBits) {
      throw new ChecksumError(
        'Checksum mismatch', { expected: givenChecksum, got: hashBits }
      );
    }

    if (options.checksum) {
      const totalBits = bits.length;
      const padBits = totalBits % 8 === 0
        ? totalBits
        : totalBits + (8 - (totalBits % 8));
      return bytesToHex(binaryStringToBytes(bits, padBits / 8));
    }
    return bytesToHex(entropyBytes);
  }
}
