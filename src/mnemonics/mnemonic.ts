// SPDX-License-Identifier: MIT

import * as fs from 'fs';
import * as path from 'path';

import { Entropy } from '../entropies';
import { MnemonicOptionsInterface } from '../interfaces';
import { MnemonicError } from '../exceptions';

export class Mnemonic {

  protected mnemonic: string[];
  protected words: number;
  protected language: string;
  protected mnemonicType?: string;

  static wordsList: number[] = [];
  static languages: string[] = [];

  static wordlistPath: Record<string, string> = { };

  constructor(mnemonic: string | string[], options: MnemonicOptionsInterface = { }) {
    const words = Mnemonic.normalize(mnemonic);
    const constructor = this.constructor as typeof Mnemonic;
    
    if (!constructor.isValid(words, options)) {
      throw new MnemonicError('Invalid mnemonic words');
    }
    const [_, language] = constructor.findLanguage(
      words, options.wordlistPath
    );
    this.mnemonic = words;
    this.words = words.length;
    this.language = language;
    this.mnemonicType = options.mnemonicType;
  }

  static getName(): string {
    throw new Error('Must override getName()');
  }

  getMnemonic(): string {
    return this.mnemonic.join(' ');
  }

  getWords(): number {
    return this.words;
  }
  
  getLanguage(): string {
    return this.language;
  }

  static fromWords(
    words: number, language: string, options: MnemonicOptionsInterface = { }
  ): Mnemonic {
    throw new Error('Must override fromWords()');
  }

  static fromEntropy(
    entropy: string | Uint8Array | Entropy, language: string, options: MnemonicOptionsInterface = { }
  ): Mnemonic {
    throw new Error('Must override fromEntropy()');
  }

  static encode(
    entropy: string | Uint8Array, language: string, options: MnemonicOptionsInterface = { }
  ): string {
    throw new Error('Must override encode()');
  }

  static decode(
    mnemonic: string | string[], options: MnemonicOptionsInterface = { }
  ): string {
    throw new Error('Must override decode()');
  }

  static getWordsListByLanguage(
    language: string, wordlistPath?: Record<string, string>
  ): string[] {
    const paths = wordlistPath ?? this.wordlistPath;
    const rel = paths[language];
    if (!rel) {
      throw new MnemonicError(`No wordlist for language '${language}'`);
    }
    const full = path.join(__dirname, rel);
    const txt = fs.readFileSync(full, 'utf8');
    return txt
      .split(/\r?\n/)
      .map((w) => w.trim())
      .filter((w) => w !== '' && !w.startsWith('#'));
  }

  static findLanguage(
    mnemonic: string[], wordlistPath?: Record<string, string>
  ): [string[], string] {
    for (const language of this.languages) {
      try {
        const list = this.normalize(
          this.getWordsListByLanguage(language, wordlistPath)
        );
        const map = new Set(list);
        for (const w of mnemonic) {
          if (!map.has(w)) {
            throw new MnemonicError(`Unknown word '${w}'`);
          }
        }
        return [list, language];
      } catch {
        continue;
      }
    }
    throw new MnemonicError(
      `Invalid language for mnemonic: '${mnemonic.join(' ')}'`
    );
  }

  static isValid(
    mnemonic: string | string[], options: MnemonicOptionsInterface = { }
  ): boolean {
    try {
      this.decode(mnemonic, options);
      return true;
    } catch {
      return false;
    }
  }

  static isValidLanguage(language: string): boolean {
    return this.languages.includes(language);
  }

  static isValidWords(words: number): boolean {
    return this.wordsList.includes(words);
  }

  static normalize(mnemonic: string | string[]): string[] {
    return typeof mnemonic === 'string' ? mnemonic.trim().split(/\s+/) : mnemonic;
  }
}
