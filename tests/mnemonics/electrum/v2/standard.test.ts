import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from "../../../../src/entropies";
import { 
  ElectrumV2Mnemonic, ELECTRUM_V2_MNEMONIC_WORDS, ELECTRUM_V2_MNEMONIC_LANGUAGES, ELECTRUM_V2_MNEMONIC_TYPES
} from "../../../../src/mnemonics";
import { MnemonicError, ChecksumError } from "../../../../src/exceptions";
import { getBytes } from "../../../../src/utils";

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
      const suitable: Record<number, string> = {
        12: "0c3a7d6111221a9a9f3f309ee2680aae7a",
        24: "d0390f742597401abdfcc898a228bd895d11071492455386cc57b87f3e99e2d427"
      }
      const entropy: string = suitable[words];
      const mnemonic: string = ElectrumV2Mnemonic.encode(
          entropy, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
      );
      expect(typeof mnemonic).toBe("string");
      expect(mnemonic.split(" ")).toHaveLength(words);
      expect(ElectrumV2Mnemonic.isValid(mnemonic)).toBe(true);
      const decoded: string = ElectrumV2Mnemonic.decode(
          mnemonic, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
      );
      expect(decoded).toBe(entropy);
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
      expect(ElectrumV2Mnemonic.isValid(electrumV2Mnemonic.mnemonic())).toBe(true);
    }
  });

  // it("fromWords() should throw on an unsupported word count", (): void => {
  //   expect(() => ElectrumV2Mnemonic.fromWords(13, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH)).toThrowError(MnemonicError);
  // });
  //
  // it("fromEntropy() should accept hex, Uint8Array, or ElectrumV2Entropy and round-trip correctly", (): void => {
  //   const entropy: string = ElectrumV2Entropy.generate(ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT);
  //   const entropyBytes: Uint8Array<ArrayBuffer> = getBytes(entropy);
  //   const electrumV2Entropy: ElectrumV2Entropy = new ElectrumV2Entropy(entropy);
  //
  //   for (const input of [entropy, entropyBytes, electrumV2Entropy]) {
  //     const electrumV2Mnemonic: ElectrumV2Mnemonic= ElectrumV2Mnemonic.fromEntropy(
  //         input, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH
  //     );
  //     const decoded: string = ElectrumV2Mnemonic.decode(electrumV2Mnemonic.mnemonic());
  //     expect(decoded).toBe(entropy);
  //   }
  // });
  //
  // it("encode() should throw on unsupported entropy lengths", (): void => {
  //   expect((): string => ElectrumV2Mnemonic.encode(
  //       "00".repeat(100 / 4), ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH
  //   )).toThrowError(/Unsupported entropy length/);
  // });
});
