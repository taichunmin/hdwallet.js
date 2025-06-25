// SPDX-License-Identifier: MIT

import {CardanoSeed} from '../../src/seeds';
import {MnemonicError, SeedError} from '../../src/exceptions';
import {IMnemonic} from '../../src/mnemonics';
import seedVectors from '../data/json/seeds.json';
import {Cardano} from "../../src/cryptocurrencies";

describe("CardanoSeed", () => {
  const byronIcarusVec = seedVectors.Cardano["12"]["byron-icarus"]["english"];
  const { mnemonic: englishPhrase, "non-passphrase-seed": expectedByronIcarus } = byronIcarusVec;

  it("client() should return 'Cardano'", () => {
    expect(CardanoSeed.client()).toBe("Cardano");
  });

  it("should derive correct BYRON_ICARUS seed", () => {
    const seed = CardanoSeed.fromMnemonic(englishPhrase);
    expect(seed).toBe(expectedByronIcarus);
  });

  it("should derive correct BYRON_LEDGER seed (no passphrase)", () => {
    const vec = seedVectors.Cardano["12"]["byron-ledger"]["english"];
    const seed = CardanoSeed.fromMnemonic(
      vec.mnemonic,
      Cardano.TYPES.BYRON_LEDGER,
      undefined
    );
    expect(seed).toBe(vec["non-passphrase-seed"]);
  });

  it("should derive correct BYRON_LEGACY seed", () => {
     const vec = seedVectors.Cardano["12"]["byron-legacy"]["czech"];
     const seed = CardanoSeed.fromMnemonic(
       vec.mnemonic,
       Cardano.TYPES.BYRON_LEGACY
     );
     expect(seed).toBe(vec["non-passphrase-seed"]);
   });



  it("should derive correct SHELLEY_ICARUS seed (alias of BYRON_ICARUS)", () => {
    const seed = CardanoSeed.fromMnemonic(
      englishPhrase,
      Cardano.TYPES.SHELLEY_ICARUS,
      undefined,
    );
    expect(seed).toBe(expectedByronIcarus);
  });

  it("should derive correct SHELLEY_LEDGER seed (alias of BYRON_LEDGER)", () => {
    const vec = seedVectors.Cardano["12"]["byron-ledger"]["english"];
    const seed = CardanoSeed.fromMnemonic(
      vec.mnemonic,
      Cardano.TYPES.SHELLEY_LEDGER,
      undefined
    );
    expect(seed).toBe(vec["non-passphrase-seed"]);
  });

  it("should throw MnemonicError on invalid BIP39 mnemonic for BYRON_ICARUS", () => {
    expect(() =>
      CardanoSeed.fromMnemonic(
        "this is definitely not a valid BIP39 phrase",
        Cardano.TYPES.BYRON_ICARUS,
        undefined
      )
    ).toThrowError(MnemonicError);
  });

  it("should throw SeedError on invalid Cardano type", () => {
    expect(() =>
      CardanoSeed.fromMnemonic(
          englishPhrase,
          "not-a-type",
          undefined
          )
    ).toThrowError(SeedError);
  });

  it("should throw SeedError in constructor when given invalid cardanoType option", () => {
    expect(
      () => new CardanoSeed(expectedByronIcarus, { cardanoType: "foo" })
    ).toThrowError(SeedError);
  });

  it("should expose cardanoType() and seed() on the instance", () => {
    const seedStr = CardanoSeed.fromMnemonic(
      englishPhrase,
      Cardano.TYPES.BYRON_LEDGER,
      undefined
    );
    const inst = new CardanoSeed(seedStr, { cardanoType: Cardano.TYPES.BYRON_LEDGER });
    expect(inst.seed()).toBe(seedStr);
    expect(inst.cardanoType()).toBe(Cardano.TYPES.BYRON_LEDGER);
  });

  it("should accept an IMnemonic stub", () => {
    const stub = { mnemonic: () => englishPhrase } as unknown as IMnemonic;
    const seed = CardanoSeed.fromMnemonic(stub);
    expect(seed).toBe(expectedByronIcarus);
    expect(Cardano.TYPES.isCardanoType("byron-legacy")).toBe(true)
    expect(Cardano.TYPES.isCardanoType("byron-leg")).toBe(false)
  });
});
