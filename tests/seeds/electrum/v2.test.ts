// SPDX-License-Identifier: MIT

import { ElectrumV2Seed } from "../../../src/seeds/electrum/v2";
import { MnemonicError } from "../../../src/exceptions";
import { IMnemonic } from "../../../src/mnemonics";
import seedVectors from "../../data/json/seeds.json";

describe("ElectrumV2Seed", () => {
  const vec = seedVectors["Electrum-V2"]["12"]["standard"]["english"];
  const { mnemonic, "non-passphrase-seed": noPassSeed, passphrases } = vec;
  const hdPass = "hdwallet";
  const jpPass = "ゆしゅつ";

  it("client() should return the correct client string", () => {
    expect(ElectrumV2Seed.client()).toBe("Electrum-V2");
  });

  it("should derive correct seed from a valid mnemonic string (no passphrase)", () => {
    const seed = ElectrumV2Seed.fromMnemonic(mnemonic);
    expect(typeof seed).toBe("string");
    expect(seed).toBe(noPassSeed);
  });

  it("should derive correct seed from a valid mnemonic + passphrase (hdwallet)", () => {
    const seed = ElectrumV2Seed.fromMnemonic(mnemonic, hdPass);
    expect(seed).toBe(passphrases[hdPass]);
  });

  it("should derive correct seed from a valid mnemonic + passphrase (ゆしゅつ)", () => {
    const seed = ElectrumV2Seed.fromMnemonic(mnemonic, jpPass);
    expect(seed).toBe(passphrases[jpPass]);
  });

  it("should throw a MnemonicError on an invalid mnemonic", () => {
    expect(() => ElectrumV2Seed.fromMnemonic("not a valid mnemonic")).toThrowError(MnemonicError);
  });

  it("should derive correct seed from an IMnemonic instance", () => {
    const stub = { mnemonic: () => mnemonic } as unknown as IMnemonic;
    const seed = ElectrumV2Seed.fromMnemonic(stub);
    expect(seed).toBe(noPassSeed);
  });

  it("should store and return the seed string via instance", () => {
    const seedStr = ElectrumV2Seed.fromMnemonic(mnemonic, hdPass);
    const inst = new (ElectrumV2Seed as any)(seedStr, { passphrase: hdPass });
    expect(inst.seed()).toBe(seedStr);
  });
});
