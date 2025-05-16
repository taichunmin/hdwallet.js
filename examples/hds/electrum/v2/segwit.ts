// SPDX-License-Identifier: MIT

import { ElectrumV2HD } from '../../../../src/hds/electrum/v2';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { MODES, PUBLIC_KEY_TYPES } from '../../../../src/const';
import { ElectrumDerivation } from '../../../../src/derivations';

const electrumV2HD: ElectrumV2HD = new ElectrumV2HD({
  mode: MODES.SEGWIT,
  publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED,
  wifPrefix: Cryptocurrency.NETWORKS.MAINNET.WIF_PREFIX
});

const seed = 'cf9d920a1e95f1304ff77d50a15bc06e17eead71947d766780ce9a9ad4efb286e64481542f080c5901a4b3487793a252c5354ab7e6576301a5a08c5b9d771f8a';

electrumV2HD.fromSeed(seed);

console.log('Mode:', electrumV2HD.getMode());
console.log('Seed:', electrumV2HD.getSeed());
console.log('Master Private Key:', electrumV2HD.getMasterPrivateKey());
console.log('Master WIF:', electrumV2HD.getMasterWIF());
console.log('Master Public Key:', electrumV2HD.getMasterPublicKey());
console.log('Public Key Type:', electrumV2HD.getPublicKeyType());
console.log('WIF Type:', electrumV2HD.getWIFType());

const electrumDerivation: ElectrumDerivation = new ElectrumDerivation({
  change: 0, address: 0
});

electrumV2HD.fromDerivation(electrumDerivation);

console.log('Private Key:', electrumV2HD.getPrivateKey());
console.log('WIF:', electrumV2HD.getWIF());
console.log('Public Key:', electrumV2HD.getPublicKey());
console.log('Uncompressed:', electrumV2HD.getUncompressed());
console.log('Compressed:', electrumV2HD.getCompressed());
console.log('Address:', electrumV2HD.getAddress());
