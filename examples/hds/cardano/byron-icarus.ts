// SPDX-License-Identifier: MIT

import { CardanoHD } from '../../../src/hds';
import { BIP44Derivation, CHANGES } from '../../../src/derivations';
import { Cardano } from '../../../src/cryptocurrencies';

const cardanoHD: CardanoHD = new CardanoHD({
  cardanoType: Cardano.TYPES.BYRON_ICARUS
});

const seed = 'dd585f208c3adf2726d6437bf5278d05';
const passphrase = 'talonlab';
const xPrivateKey = 'xprv3QESAWYc9vDdZLxk8ma2q6k6uiDpnf7s8g2c7atpYWnUfEMsn8khuT4GpKRZ9BnmF25dnPZ53Yv9rmb8AhGVv4Bm53UZYq7Vf6KVQZcGpok6kVWD3P66qABDhcF1F25y4d3bXY4hZgZWtRZWNVeNFxD';
const xPublicKey = 'xpub661MyMwAqRbcEojCTV9kmWZMJPpDX53Gw5d3Ep1dbNzzX9bML9fXeDaGRoeZncQX9kDtqy7b17AA17JjZtoctuRq9qmRTb2UnQcPsxwNSkN';

cardanoHD.fromSeed(seed, passphrase);
// cardanoHD.fromXPrivateKey(xPrivateKey);
// cardanoHD.fromXPublicKey(xPublicKey);

const bip44Derivation: BIP44Derivation = new BIP44Derivation({
  coinType: Cardano.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
});

cardanoHD.fromDerivation(bip44Derivation);

console.log('Seed:', cardanoHD.getSeed());
console.log('Root XPrivate Key:', cardanoHD.getRootXPrivateKey());
console.log('Root XPublic Key:', cardanoHD.getRootXPublicKey());
console.log('Root Private Key:', cardanoHD.getRootPrivateKey());
console.log('Root Chain Code:', cardanoHD.getRootChainCode());
console.log('Root Public Key:', cardanoHD.getRootPublicKey());

console.log('XPrivate Key:', cardanoHD.getXPrivateKey());
console.log('XPublic Key:', cardanoHD.getXPublicKey());
console.log('Private Key:', cardanoHD.getPrivateKey());
console.log('Chain Code:', cardanoHD.getChainCode());
console.log('Public Key:', cardanoHD.getPublicKey());
console.log('Public Key Type:', cardanoHD.getPublicKeyType());
console.log('Compressed:', cardanoHD.getCompressed());
console.log('Uncompressed:', cardanoHD.getUncompressed());
console.log('Hash:', cardanoHD.getHash());
console.log('Fingerprint:', cardanoHD.getFingerprint());
console.log('Parent Fingerprint:', cardanoHD.getParentFingerprint());
console.log('Depth:', cardanoHD.getDepth());
console.log('Path:', cardanoHD.getPath());
console.log('Index:', cardanoHD.getIndex());
console.log('Indexes:', cardanoHD.getIndexes());
console.log('getStrict:', cardanoHD.getStrict());
console.log('Address:', cardanoHD.getAddress());
