// SPDX-License-Identifier: MIT

import { SEEDS, BIP39Seed } from '../../src/seeds';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'BIP39',
  mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
  seeds: [
    {
      seed: '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4',
      passphrase: null
    },
    {
      seed: 'bc8279bcc79d3cd026cc662d94e88519a0a5e783cccfdb65b0717bc28164dc360777ef6b5eed44440ee892558f19d1b38f508a9851fac42b02d34e240cc61597',
      passphrase: 'talonlab'
    }
  ]
}

const BIP39SeedClass: typeof BIP39Seed = SEEDS.getSeedClass(data.name);

for (const seed of data.seeds) {

  const bip39SeedClass: BIP39Seed = new BIP39SeedClass(seed.seed);
  const bip39Seed: BIP39Seed = new BIP39Seed(seed.seed);

  console.log(
    isAllEqual(
      bip39SeedClass.getSeed(),
      bip39Seed.getSeed(),
      BIP39SeedClass.fromMnemonic(data.mnemonic, { passphrase: seed.passphrase }),
      BIP39Seed.fromMnemonic(data.mnemonic, { passphrase: seed.passphrase }),
      seed.seed
    ), '\n'
  );

  console.log('Name:', data.name);
  console.log('Mnemonic:', data.mnemonic);
  console.log('Seed:', seed.seed);
  console.log('Passphrase:', seed.passphrase, '\n');
}
