// SPDX-License-Identifier: MIT

import { SEEDS, AlgorandSeed } from '../../src/seeds';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'Algorand',
  mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon invest',
  seed: '0000000000000000000000000000000000000000000000000000000000000000'
}

const AlgorandSeedClass: typeof AlgorandSeed = SEEDS.getSeedClass(data.name);

const algorandSeedClass: AlgorandSeed = new AlgorandSeedClass(data.seed);
const algorandSeed: AlgorandSeed = new AlgorandSeed(data.seed);

console.log(
  isAllEqual(
    algorandSeedClass.getSeed(),
    algorandSeed.getSeed(),
    AlgorandSeedClass.fromMnemonic(data.mnemonic),
    AlgorandSeed.fromMnemonic(data.mnemonic),
    data.seed
  ), '\n'
);

console.log('Name:', data.name);
console.log('Mnemonic:', data.mnemonic);
console.log('Seed:', data.seed);
