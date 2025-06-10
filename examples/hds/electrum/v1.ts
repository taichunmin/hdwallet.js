// SPDX-License-Identifier: MIT

import { ElectrumV1HD } from '../../../src/hds';
import { Bitcoin as Cryptocurrency } from '../../../src/cryptocurrencies';
import { ElectrumDerivation } from '../../../src/derivations';
import { PUBLIC_KEY_TYPES } from '../../../src/consts';

const electrumV1HD: ElectrumV1HD = new ElectrumV1HD({
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
  wifPrefix: Cryptocurrency.NETWORKS.MAINNET.WIF_PREFIX
});

const seed = '7c2548ab89ffea8a6579931611969ffc0ed580ccf6048d4230762b981195abe5';
const privateKey = '7c2548ab89ffea8a6579931611969ffc0ed580ccf6048d4230762b981195abe5';
const wif = 'L1P2uu8DXVF8AQaR3hLoxsr8XvdMyWuhs9F8HjLYAPirhQTc8jgy';
const publicKey = '034e13b0f311a55b8a5db9a32e959da9f011b131019d4cebe6141b9e2c93edcbfc';

// electrumV1HD.fromSeed(seed);
electrumV1HD.fromPrivateKey(privateKey);
// electrumV1HD.fromWIF(wif);
// electrumV1HD.fromPublicKey(publicKey);

console.log('Seed:', electrumV1HD.getSeed());
console.log('Master Private Key:', electrumV1HD.getMasterPrivateKey());
console.log('Master WIF:', electrumV1HD.getMasterWIF());
console.log('Master Public Key:', electrumV1HD.getMasterPublicKey());
console.log('Public Key Type:', electrumV1HD.getPublicKeyType());
console.log('WIF Type:', electrumV1HD.getWIFType());

const electrumDerivation: ElectrumDerivation = new ElectrumDerivation({
  change: 0, address: 15
});

electrumV1HD.fromDerivation(electrumDerivation);

console.log('Private Key:', electrumV1HD.getPrivateKey());
console.log('WIF:', electrumV1HD.getWIF());
console.log('Public Key:', electrumV1HD.getPublicKey());
console.log('Uncompressed:', electrumV1HD.getUncompressed());
console.log('Compressed:', electrumV1HD.getCompressed());
console.log('Address:', electrumV1HD.getAddress());