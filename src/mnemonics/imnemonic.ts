import * as fs from "fs";
import * as path from "path";
import { MnemonicError } from "../exceptions";
import { IEntropy } from "../entropies/ientropy";

export interface MnemonicOptionsInterface {
  checksum?: boolean;
  mnemonicType?: string;
  maxAttempts?: bigint;
  wordlistPath?: Record<string, string>;
  wordsList?: string[],
  wordsListWithIndex?: Record<string, number>;
  bip39List?: string[],
  bip39Index?: Record<string, number>,
  ev1List?: string[],
  ev1Index?: Record<string, number>
}

export abstract class IMnemonic {

  protected _mnemonic: string[];
  protected _words: number;
  protected _language: string;
  protected _mnemonicType?: string;

  static wordsList: number[] = [];
  static languages: string[] = [];

  static wordlistPath: Record<string, string> = { };

  constructor(
      mnemonic: string | string[], options: MnemonicOptionsInterface = { }
  ) {
    const words = IMnemonic.normalize(mnemonic);
    const constructor = this.constructor as typeof IMnemonic;
    // Validate mnemonic words
    if (!constructor.isValid(words, options)) {
      throw new MnemonicError("Invalid mnemonic words");
    }
    // Determine language and wordlist
    const [wordList, language] = constructor.findLanguage(words, options.wordlistPath);
    this._mnemonic = words;
    this._words = words.length;
    this._language = language;
    this._mnemonicType = options.mnemonicType;
  }

  static client(): string {
    throw new Error("Must override client()");
  }

  mnemonic(): string {
    return this._mnemonic.join(" ");
  }

  language(): string {
    return this._language;
  }

  words(): number {
    return this._words;
  }

  static fromWords(
    words: number, language: string, options: MnemonicOptionsInterface = { }
  ): IMnemonic {
    throw new Error("Must override fromWords()");
  }

  static fromEntropy(
    entropy: string | Uint8Array | IEntropy, language: string, options: MnemonicOptionsInterface = { }
  ): IMnemonic {
    throw new Error("Must override fromEntropy()");
  }

  static encode(
    entropy: string | Uint8Array, language: string, options: MnemonicOptionsInterface = { }
  ): string {
    throw new Error("Must override encode()");
  }

  static decode(
    mnemonic: string | string[], options: MnemonicOptionsInterface = { }
  ): string {
    throw new Error("Must override decode()");
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
    const txt = fs.readFileSync(full, "utf8");
    return txt
      .split(/\r?\n/)
      .map((w) => w.trim())
      .filter((w) => w !== "" && !w.startsWith("#"));
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
      `Invalid language for mnemonic: '${mnemonic.join(" ")}'`
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
    return typeof mnemonic === "string" ? mnemonic.trim().split(/\s+/) : mnemonic;
  }
}
