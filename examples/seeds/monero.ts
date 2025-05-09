// SPDX-License-Identifier: MIT

import { SEEDS, MoneroSeed } from '../../src/seeds';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'Monero',
  mnemonic: 'abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey',
  seed: '0000000000000000000000000000000000000000000000000000000000000000'
}

const MoneroSeedClass: typeof MoneroSeed = SEEDS.getSeedClass(data.name);

const moneroSeedClass: MoneroSeed = new MoneroSeedClass(data.seed);
const moneroSeed: MoneroSeed = new MoneroSeed(data.seed);

console.log(
  isAllEqual(
    moneroSeedClass.getSeed(),
    moneroSeed.getSeed(),
    MoneroSeedClass.fromMnemonic(data.mnemonic),
    MoneroSeed.fromMnemonic(data.mnemonic),
    data.seed
  ), '\n'
);

console.log('Name:', data.name);
console.log('Mnemonic:', data.mnemonic);
console.log('Seed:', data.seed);
