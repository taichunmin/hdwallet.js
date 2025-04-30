import { ElectrumV1Entropy} from "../../../src/entropies";
import { ElectrumV1Mnemonic, ELECTRUM_V1_MNEMONIC_LANGUAGES, ELECTRUM_V1_MNEMONIC_WORDS } from "../../../src/mnemonics";
import {EntropyError, MnemonicError} from "../../../src/exceptions";
import { getBytes } from "../../../src/utils";
import jsonData from "../../data/json/mnemonics.json"

describe("ElectrumV2Mnemonic", (): void => {

  it("should expose the correct client identifier and validate languages & word counts", (): void => {
    expect(ElectrumV1Mnemonic.client()).toBe("Electrum-V1");
    expect(ElectrumV1Mnemonic.isValidLanguage(ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH)).toBe(true);
    expect(ElectrumV1Mnemonic.isValidLanguage("klingon")).toBe(false);
    expect(ElectrumV1Mnemonic.isValidWords(ELECTRUM_V1_MNEMONIC_WORDS.TWELVE)).toBe(true);
    expect(ElectrumV1Mnemonic.isValidWords(13)).toBe(false);
  });

  it("should normalize a string into an array of words", (): void => {
    const raw = "  foo   bar\tbaz\nqux  ";
    expect(ElectrumV1Mnemonic.normalize(raw)).toEqual(["foo", "bar", "baz", "qux"]);
    const arr = ["alpha", "beta"];
    expect(ElectrumV1Mnemonic.normalize(arr)).toStrictEqual(arr);
  });

  it("should encode and decode a 128-bit entropy round-trip in English", (): void => {
    for (const words of ElectrumV1Mnemonic.wordsList) {
      for (const language of ElectrumV1Mnemonic.languages) {
        const entropy: string = jsonData['Electrum-V1'][0].entropy;
        const mnemonic: string = ElectrumV1Mnemonic.encode(
            entropy, language
        );
        expect(typeof mnemonic).toBe("string");
        expect(mnemonic.split(" ")).toHaveLength(words);
        expect(ElectrumV1Mnemonic.isValid(mnemonic)).toBe(true);
        const decoded: string = ElectrumV1Mnemonic.decode(
            mnemonic
        );
        expect(decoded).toBe(entropy);
      }
    }
  });

  it("fromWords() should generate mnemonics of each supported length", (): void => {
    for (const words of ElectrumV1Mnemonic.wordsList) {
      const electrumV1Mnemonic: ElectrumV1Mnemonic = ElectrumV1Mnemonic.fromWords(
          words, ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH
      );
      expect(electrumV1Mnemonic.words()).toBe(words);
      expect(electrumV1Mnemonic.language()).toBe(ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH);
      const mnemonic: string[] = electrumV1Mnemonic.mnemonic().split(" ");
      expect(mnemonic).toHaveLength(words);
      expect(ElectrumV1Mnemonic.isValid(electrumV1Mnemonic.mnemonic())).toBe(true);
    }
  });

  it("fromWords() should throw on an unsupported word count", (): void => {
    expect(() => ElectrumV1Mnemonic.fromWords(13, ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH)).toThrowError(MnemonicError);
  });

  it("fromEntropy() should accept hex, Uint8Array, or ElectrumV1Entropy and round-trip correctly", (): void => {
    const entropy = jsonData['Electrum-V1'][0].entropy;
    const entropyBytes: Uint8Array<ArrayBuffer> = getBytes(entropy);
    const electrumV1Entropy: ElectrumV1Entropy = new ElectrumV1Entropy(entropy);

    for (const input of [entropy, entropyBytes, electrumV1Entropy]) {
      const electrumV1Mnemonic: ElectrumV1Mnemonic= ElectrumV1Mnemonic.fromEntropy(
          input, ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH
      );
      const decoded: string = ElectrumV1Mnemonic.decode(electrumV1Mnemonic.mnemonic());
      expect(decoded).toBe(entropy);
    }
  });

  it("encode() should throw on unsupported entropy lengths", (): void => {
    expect((): string => ElectrumV1Mnemonic.encode(
        "00".repeat(100 / 4), ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH
    )).toThrowError(EntropyError);
  });
});
