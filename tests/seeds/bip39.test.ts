import {BIP39Seed} from "../../src/seeds";
import {MnemonicError} from "../../src/exceptions";
import jsonData from "../data/json/seeds.json";


describe("BIP39Seed.fromMnemonic", () => {
  const allVectors = (jsonData as any).BIP39 as Record<string, Record<string, any>>;

  it("generates the correct seed for every English test‐vector", () => {
    for (const wordCount of Object.keys(allVectors)) {
      const vector = allVectors[wordCount].english;
      const {
        mnemonic,
        passphrases,
        "non-passphrase-seed": noPassSeed,
      } = vector;

      expect(BIP39Seed.fromMnemonic(mnemonic)).toBe(noPassSeed);

      for (const [pw, expectedSeed] of Object.entries(passphrases)) {
        expect(BIP39Seed.fromMnemonic(mnemonic, pw)).toBe(expectedSeed);
      }
    }
  });

  it("throws on invalid mnemonic", () => {
    expect(() => BIP39Seed.fromMnemonic("foo bar baz")).toThrow(MnemonicError);
  });
});