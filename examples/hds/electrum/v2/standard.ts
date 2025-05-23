// SPDX-License-Identifier: MIT

import { ElectrumV2HD } from '../../../../src/hds';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { MODES, PUBLIC_KEY_TYPES } from '../../../../src/const';
import { ElectrumDerivation } from '../../../../src/derivations';

const electrumV2HD: ElectrumV2HD = new ElectrumV2HD({
  mode: MODES.STANDARD,
  publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED,
  wifPrefix: Cryptocurrency.NETWORKS.MAINNET.WIF_PREFIX
});

const seed = '22e0c334cf22eb3c8a93ade2e0d1c43aa979a4426212e6c4099ff4d49434a0c6eecfd1437a79e11ad08605acc94f0255bd77a0728ed9693ab549c385fe610300';

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
