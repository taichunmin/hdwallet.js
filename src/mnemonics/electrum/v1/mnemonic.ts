import { IMnemonic, MnemonicOptionsInterface } from "../../imnemonic";
import { IEntropy } from "../../../entropies/ientropy";
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from "../../../entropies/electrum/v1";
import { MnemonicError, EntropyError } from "../../../exceptions";
import {
    hexToBytes,
    integerToBytes,
    bytesToInteger,
    bytesToHex,
    getBytes
} from "../../../utils";
import { Buffer } from "buffer";

interface ElectrumV1MnemonicWordsInterface {
  TWELVE: number;
}

interface ElectrumV1MnemonicLanguagesInterface {
  ENGLISH: string;
}

export const ELECTRUM_V1_MNEMONIC_WORDS: ElectrumV1MnemonicWordsInterface = {
  TWELVE: 12,
} as const;

export const ELECTRUM_V1_MNEMONIC_LANGUAGES: ElectrumV1MnemonicLanguagesInterface =
  {
    ENGLISH: "english",
  } as const;

export class ElectrumV1Mnemonic extends IMnemonic {

  static wordsListNumber = 1626;

  static wordsListCount: number[] = [
    ELECTRUM_V1_MNEMONIC_WORDS.TWELVE,
  ];

  static wordsToStrength: Record<number, number> = {
    [ELECTRUM_V1_MNEMONIC_WORDS.TWELVE]:
      ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
  };

  static languages: string[] = Object.values(
    ELECTRUM_V1_MNEMONIC_LANGUAGES
  );

  static wordlistPath: Record<string, string> = {
    [ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH]: "electrum/v1/wordlist/english.txt",
  };

  /** “client” instead of “name” */
  static client(): string {
    return "Electrum-V1";
  }

  /** Generate a mnemonic by specifying word count */
  static fromWords(
    count: number,
    language: string,
    options: MnemonicOptionsInterface = {}
  ): ElectrumV1Mnemonic {
    if (!this.wordsListCount.includes(count)) {
      throw new MnemonicError("Invalid mnemonic words number", {
        expected: this.wordsListCount,
        got: count,
      });
    }
    const entropy = ElectrumV1Entropy.generate(
      this.wordsToStrength[count]
    );
    const phrase = this.encode(entropy, language, options);
    return new ElectrumV1Mnemonic(phrase, options);
  }

  /** Generate a mnemonic from existing entropy */
  static fromEntropy(
    entropy: string | Uint8Array | IEntropy, language: string, options: MnemonicOptionsInterface = { }
  ): ElectrumV1Mnemonic {
    let raw: Uint8Array;
    if (typeof entropy === "string") {
      raw = hexToBytes(entropy);
    } else if (entropy instanceof Uint8Array) {
      raw = entropy;
    } else {
      raw = hexToBytes(entropy.entropy());
    }
    const phrase = this.encode(raw, language, options);
    return new ElectrumV1Mnemonic(phrase, options);
  }

  /** Core encode: split 4-byte chunks into 3-word groups */
  static encode(
    entropy: string | Uint8Array, language: string, options: MnemonicOptionsInterface = { }
  ): string {
      const entropyBytes = getBytes(entropy)
    if (!ElectrumV1Entropy.isValidBytesStrength(entropyBytes.length)) {
      throw new EntropyError(
        "Wrong entropy strength", { expected: ElectrumV1Entropy.strengths, got: entropyBytes.length * 8 }
      );
    }

    const rawList = this.getWordsListByLanguage(language, this.wordlistPath);
    const wordList = this.normalize(rawList);
    const wl = wordList.length;
    const mnemonic: string[] = [];

    for (let i = 0; i < entropyBytes.length; i += 4) {
      const chunkBytes = entropyBytes.slice(i, i + 4);
      // big-endian → bigint → number
      const chunkInt = Number(bytesToInteger(chunkBytes, false));
      const w1 = chunkInt % wl;
      const w2 = (Math.floor(chunkInt / wl) + w1) % wl;
      const w3 = (Math.floor(chunkInt / wl / wl) + w2) % wl;
      mnemonic.push(wordList[w1], wordList[w2], wordList[w3]);
    }

    return this.normalize(mnemonic).join(" ");
  }

  /** Core decode: 3 words → 4-byte chunks → hex string */
  static decode(
    mnemonic: string | string[], options: MnemonicOptionsInterface = { checksum: false }
  ): string {

    const words = this.normalize(mnemonic);
    const count = words.length;
    if (!this.wordsListCount.includes(count)) {
      throw new MnemonicError("Invalid mnemonic words count", {
        expected: this.wordsListCount,
        got: count,
      });
    }

    // decide which wordList & idxMap to use
    let wordsList: string[];
    let idxMap: Record<string, number> = { };
    if (options.wordsList && options.wordsListWithIndex) {
      wordsList = options.wordsList;
      idxMap = options.wordsListWithIndex;
    } else {
      [wordsList] = this.findLanguage(words);
      wordsList.forEach((w, i) => (idxMap[w] = i));
    }

    const wl = wordsList.length;
    const bufs: Buffer[] = [];

    for (let i = 0; i < words.length; i += 3) {
      const [w1, w2, w3] = words.slice(i, i + 3);
      const i1 = idxMap[w1];
      const i2 = idxMap[w2] % wl;
      const i3 = idxMap[w3] % wl;

      const chunkVal =
        i1 +
        wl * ((i2 - i1 + wl) % wl) +
        wl * wl * ((i3 - i2 + wl) % wl);

      const chunkBytes = integerToBytes(chunkVal, 4, "big");
      bufs.push(Buffer.from(chunkBytes));
    }

    return bytesToHex(Buffer.concat(bufs), false);
  }


  /** Quick validity check */
  static isValid(
    input: string | string[], options: MnemonicOptionsInterface = { }
  ): boolean {
    try {
      this.decode(input, options);
      return true;
    } catch {
      return false;
    }
  }

  /** Normalize to an array of NFKD-lowered words */
  static normalize(input: string | string[]): string[] {
    const arr =
      typeof input === "string" ? input.trim().split(/\s+/) : input;
    return arr.map((w) => w.normalize("NFKD").toLowerCase());
  }
}
