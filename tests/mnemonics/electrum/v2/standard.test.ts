import { ElectrumV2Entropy } from "../../../../src/entropies";
import { 
  ElectrumV2Mnemonic, ELECTRUM_V2_MNEMONIC_WORDS, ELECTRUM_V2_MNEMONIC_LANGUAGES, ELECTRUM_V2_MNEMONIC_TYPES
} from "../../../../src/mnemonics";
import {EntropyError, MnemonicError} from "../../../../src/exceptions";
import { getBytes } from "../../../../src/utils";
import jsonData from "../../../data/json/mnemonics.json"

describe("ElectrumV2Mnemonic", (): void => {

  it("should expose the correct client identifier and validate languages & word counts", (): void => {
    expect(ElectrumV2Mnemonic.client()).toBe("Electrum-V2");
    expect(ElectrumV2Mnemonic.isValidLanguage(ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH)).toBe(true);
    expect(ElectrumV2Mnemonic.isValidLanguage("klingon")).toBe(false);
    expect(ElectrumV2Mnemonic.isValidWords(ELECTRUM_V2_MNEMONIC_WORDS.TWELVE)).toBe(true);
    expect(ElectrumV2Mnemonic.isValidWords(13)).toBe(false);
  });

  it("should normalize a string into an array of words", (): void => {
    const raw = "  foo   bar\tbaz\nqux  ";
    expect(ElectrumV2Mnemonic.normalize(raw)).toEqual(["foo", "bar", "baz", "qux"]);
    const arr = ["alpha", "beta"];
    expect(ElectrumV2Mnemonic.normalize(arr)).toStrictEqual(arr);
  });

  it("should encode and decode a 128-bit entropy round-trip in English", (): void => {
    for (const words of ElectrumV2Mnemonic.wordsList) {
      type Vector = {
          words: number;
          'mnemonic-types': Record<string, Record<string, { mnemonic: string; 'entropy-suitable': string }>>;
        };
        const vectors = jsonData['Electrum-V2'] as Vector[];
        const suitable: Record<number, Record<string, string>> = Object.fromEntries(
          vectors.map(v => {
            const byLang = v['mnemonic-types']['standard'];
            const entropies = Object.fromEntries(
              Object.entries(byLang).map(([lang, obj]) => [lang, obj['entropy-suitable']])
            );
            return [ v.words, entropies ];
          })
        ) as Record<number, Record<string, string>>;
      for (const language of ElectrumV2Mnemonic.languages) {
        const entropy: string = suitable[words][language];
        const mnemonic: string = ElectrumV2Mnemonic.encode(
            entropy, language, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
        );
        expect(typeof mnemonic).toBe("string");
        expect(mnemonic.split(" ")).toHaveLength(words);
        expect(ElectrumV2Mnemonic.isValid(mnemonic, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD })).toBe(true);
        const decoded: string = ElectrumV2Mnemonic.decode(
            mnemonic, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
        );
        expect(decoded).toBe(entropy);
      }
    }
  });

  it("fromWords() should generate mnemonics of each supported length", (): void => {
    for (const words of ElectrumV2Mnemonic.wordsList) {
      const electrumV2Mnemonic: ElectrumV2Mnemonic = ElectrumV2Mnemonic.fromWords(
          words, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
      );
      expect(electrumV2Mnemonic.words()).toBe(words);
      expect(electrumV2Mnemonic.language()).toBe(ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH);
      const mnemonic: string[] = electrumV2Mnemonic.mnemonic().split(" ");
      expect(mnemonic).toHaveLength(words);
      expect(ElectrumV2Mnemonic.isValid(electrumV2Mnemonic.mnemonic(), { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD })).toBe(true);
    }
  });

  it("fromWords() should throw on an unsupported word count", (): void => {
    expect(() => ElectrumV2Mnemonic.fromWords(13, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH)).toThrowError(MnemonicError);
  });

  it("fromEntropy() should accept hex, Uint8Array, or ElectrumV2Entropy and round-trip correctly", (): void => {
    const vec12 = (jsonData['Electrum-V2'] as any[]).find(v => v.words === 12)!;
    const entropy = vec12['mnemonic-types']['standard'][ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH]['entropy-suitable']
    const entropyBytes: Uint8Array<ArrayBuffer> = getBytes(entropy);
    const electrumV2Entropy: ElectrumV2Entropy = new ElectrumV2Entropy(entropy);

    for (const input of [entropy, entropyBytes, electrumV2Entropy]) {
      const electrumV2Mnemonic: ElectrumV2Mnemonic= ElectrumV2Mnemonic.fromEntropy(
          input, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
      );
      const decoded: string = ElectrumV2Mnemonic.decode(electrumV2Mnemonic.mnemonic(), { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD });
      expect(decoded).toBe(entropy);
    }
  });

  it("encode() should throw on unsupported entropy lengths", (): void => {
    expect((): string => ElectrumV2Mnemonic.encode(
        "00".repeat(100 / 4), ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH
    )).toThrowError(EntropyError);
  });
});
