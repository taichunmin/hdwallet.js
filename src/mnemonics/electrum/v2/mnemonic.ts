// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';

import { Mnemonic, BIP39Mnemonic, ElectrumV1Mnemonic } from '../../index';
import { Entropy, ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS,} from '../../../entropies';
import {
  MnemonicOptionsInterface,
  ElectrumV2MnemonicLanguagesInterface,
  ElectrumV2MnemonicTypesInterface,
  ElectrumV2MnemonicWordsInterface
} from '../../../interfaces';
import { hmacSha512 } from '../../../crypto';
import {
  getBytes, integerToBytes, bytesToInteger, bytesToString
} from '../../../utils';
import { EntropyError, MnemonicError } from '../../../exceptions';

export const ELECTRUM_V2_MNEMONIC_WORDS: ElectrumV2MnemonicWordsInterface = {
  TWELVE: 12,
  TWENTY_FOUR: 24
} as const;

export const ELECTRUM_V2_MNEMONIC_LANGUAGES: ElectrumV2MnemonicLanguagesInterface = {
  CHINESE_SIMPLIFIED: 'chinese-simplified',
  ENGLISH: 'english',
  PORTUGUESE: 'portuguese',
  SPANISH: 'spanish'
} as const;

export const ELECTRUM_V2_MNEMONIC_TYPES: ElectrumV2MnemonicTypesInterface = {
  STANDARD: 'standard',
  SEGWIT: 'segwit',
  STANDARD_2FA: 'standard-2fa',
  SEGWIT_2FA: 'segwit-2fa'
} as const;

export class ElectrumV2Mnemonic extends Mnemonic {

  static wordBitLength = 11;

  static wordsList: number[] = [
    ELECTRUM_V2_MNEMONIC_WORDS.TWELVE,
    ELECTRUM_V2_MNEMONIC_WORDS.TWENTY_FOUR
  ];

  static wordsToEntropyStrength: Record<number, number> = {
    12: ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO,
    24: ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_SIXTY_FOUR
  };

  static languages: string[] = Object.values(
    ELECTRUM_V2_MNEMONIC_LANGUAGES
  );

  static wordlistPath: Record<string, string> = {
    [ELECTRUM_V2_MNEMONIC_LANGUAGES.CHINESE_SIMPLIFIED]: 'electrum/v2/wordlist/chinese_simplified.txt',
    [ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH]: 'electrum/v2/wordlist/english.txt',
    [ELECTRUM_V2_MNEMONIC_LANGUAGES.PORTUGUESE]: 'electrum/v2/wordlist/portuguese.txt',
    [ELECTRUM_V2_MNEMONIC_LANGUAGES.SPANISH]: 'electrum/v2/wordlist/spanish.txt'
  };

  static mnemonicTypes: Record<string, string> = {
    [ELECTRUM_V2_MNEMONIC_TYPES.STANDARD]: '01',
    [ELECTRUM_V2_MNEMONIC_TYPES.SEGWIT]: '100',
    [ELECTRUM_V2_MNEMONIC_TYPES.STANDARD_2FA]: '101',
    [ELECTRUM_V2_MNEMONIC_TYPES.SEGWIT_2FA]: '102'
  };

  static getName(): string {
    return 'Electrum-V2';
  }

  static fromWords(
    count: number, language: string, option: MnemonicOptionsInterface = {
      mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD,
      maxAttempts: BigInt('1' + '0'.repeat(60))
    }
  ): ElectrumV2Mnemonic {
    if (!this.wordsList.includes(count)) {
      throw new MnemonicError('Invalid mnemonic words number', {
        expected: this.wordsList,
        got: count,
      });
    }
    const entropyBytes = ElectrumV2Entropy.generate(
      this.wordsToEntropyStrength[count]
    );
    return this.fromEntropy(
      entropyBytes, language, option
    );
  }

  static fromEntropy(
    entropy: string | Uint8Array | Entropy, language: string, option: MnemonicOptionsInterface = {
      mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD,
      maxAttempts: BigInt('1' + '0'.repeat(60))
    }
  ): ElectrumV2Mnemonic {

    if (!option.mnemonicType) {
      throw new MnemonicError('mnemonicType is required');
    }
    if (!option.maxAttempts) {
      option.maxAttempts = BigInt('1' + '0'.repeat(60))
    }

    let raw: Uint8Array;
    if (typeof entropy === 'string') {
      raw = getBytes(entropy);
    } else if (entropy instanceof Uint8Array) {
      raw = entropy;
    } else {
      raw = getBytes(entropy.getEntropy());
    }

    if (!ElectrumV2Entropy.areEntropyBitsEnough(raw)) {
      throw new EntropyError(
        'Entropy bit length is not enough for generating a valid mnemonic'
      );
    }

    const wordsList = this.normalize(
      this.getWordsListByLanguage(language, this.wordlistPath)
    );
    const bip39List = this.normalize(
      this.getWordsListByLanguage(language, BIP39Mnemonic.wordlistPath)
    );
    const bip39Index = Object.fromEntries(
      bip39List.map((w, i) => [w, i] as [string, number])
    );

    let ev1List: string[] = [];
    let ev1Index: Record<string, number> = {};
    try {
      ev1List = this.normalize(
        this.getWordsListByLanguage(
          language, ElectrumV1Mnemonic.wordlistPath
        )
      );
      ev1Index = Object.fromEntries(
        ev1List.map((w, i) => [w, i] as [string, number])
      );
    } catch {
    }

    const baseEnt = bytesToInteger(raw, false);
    // try offsets 0,1,2… up to maxAttempts
    for (let offset = BigInt(0); offset < option.maxAttempts; offset++) {
      const candidate = integerToBytes(baseEnt + offset, raw.length, 'big');
      try {
        const phrase = this.encode(
          candidate, language, {
            mnemonicType: option.mnemonicType,
            wordsList: wordsList,
            bip39List: bip39List,
            bip39Index: bip39Index,
            ev1List: ev1List,
            ev1Index: ev1Index
          }
        );
        return new ElectrumV2Mnemonic(phrase, { mnemonicType: option.mnemonicType });
      } catch (err) {
        if (err instanceof EntropyError) {
          continue;
        }
        throw err;
      }
    }
    throw new MnemonicError('Unable to generate a valid mnemonic');
  }

  static encode(
    entropy: string | Uint8Array, language: string, option: MnemonicOptionsInterface = {
      mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD
    }
  ): string {

    if (!option.mnemonicType) {
      throw new MnemonicError('mnemonicType is required');
    }

    const entropyBytes = getBytes(entropy);
    let ent = bytesToInteger(entropyBytes, false);

    if (!ElectrumV2Entropy.areEntropyBitsEnough(entropyBytes)) {
      throw new EntropyError('Invalid entropy strength for V2');
    }

    const wl = option.wordsList ?? this.normalize(
      this.getWordsListByLanguage(language, this.wordlistPath)
    );
    const mnemonic: string[] = [];
    // repeatedly mod/divide
    while (ent > BigInt(0)) {
      const idx = Number(ent % BigInt(wl.length));
      ent = ent / BigInt(wl.length);
      mnemonic.push(wl[idx]);
    }

    if (
      BIP39Mnemonic.isValid(mnemonic, { wordsList: option.bip39List, wordsListWithIndex: option.bip39Index }) ||
      ElectrumV1Mnemonic.isValid(mnemonic, { wordsList: option.ev1List, wordsListWithIndex: option.ev1Index })
    ) {
      throw new EntropyError('Entropy bytes are not suitable for generating a valid mnemonic');
    }

    if (!this.isType(mnemonic, option.mnemonicType)) {
      throw new EntropyError(`Could not generate a '${option.mnemonicType}' mnemonic`);
    }
    return this.normalize(mnemonic).join(' ');
  }

  static decode(
    mnemonic: string | string[], option: MnemonicOptionsInterface = {
      mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD
    }
  ): string {

    if (!option.mnemonicType) {
      throw new MnemonicError('mnemonicType is required');
    }

    const words = this.normalize(mnemonic);
    if (!this.wordsList.includes(words.length)) {
      throw new MnemonicError('Invalid mnemonic words count', {
        expected: this.wordsList,
        got: words.length,
      });
    }

    if (!this.isValid(words, option)) {
      throw new MnemonicError(`Invalid ${option.mnemonicType} mnemonic words`);
    }

    const [ wordsList ] = this.findLanguage(words);
    const idxMap = Object.fromEntries(
      wordsList.map((w, i) => [w, i] as [string, number])
    );

    let ent = BigInt(0);
    // reverse process: from last word to first
    for (const w of words.slice().reverse()) {
      ent = ent * BigInt(wordsList.length) + BigInt(idxMap[w]);
    }

    // convert bigint -> bytes -> hex
    const byteLen = Math.ceil(words.length * this.wordBitLength / 8);
    const buf = integerToBytes(ent, byteLen, 'big');
    return bytesToString(buf);
  }

  static isValid(
    input: string | string[], option: MnemonicOptionsInterface = {
      mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD
    }
  ): boolean {
    if (
      BIP39Mnemonic.isValid(input, {
        wordsList: option.bip39List, wordsListWithIndex: option.bip39Index
      }) ||
      ElectrumV1Mnemonic.isValid(input, {
        wordsList: option.ev1List, wordsListWithIndex: option.ev1Index
      })
    ) {
      return false;
    }
    return this.isType(input, option.mnemonicType);
  }

  static isType(
    input: string | string[], mnemonicType: string | undefined
  ): boolean {

    const phrase = (Array.isArray(input) ? input : input.split(/\s+/))
      .map((w) => w.normalize('NFKD').toLowerCase()).join(' ');
    const tag = bytesToString(
      hmacSha512(Buffer.from('Seed version'), phrase)
    );
    if (!mnemonicType) return false;
    return tag.startsWith(this.mnemonicTypes[mnemonicType]);
  }

  static normalize(input: string | string[]): string[] {
    const arr = typeof input === 'string' ? input.trim().split(/\s+/) : input;
    return arr.map((w) => w.normalize('NFKD').toLowerCase());
  }
}
