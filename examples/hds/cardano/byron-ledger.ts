// SPDX-License-Identifier: MIT

import { CardanoHD } from '../../../src/hds/cardano';
import { BIP44Derivation, CHANGES } from '../../../src/derivations';
import { Cardano } from '../../../src/cryptocurrencies';

const cardanoHD: CardanoHD = new CardanoHD(
  Cardano.TYPES.BYRON_LEDGER
);

const seed = '2f370832206daef44362eeb0327f1c04c4e64ce4535754e2d94656f6698382a243393120e71bdf9d4ae4543723aabe8477b20e473c6517b7971cd15a1e760960';
const xPrivateKey = 'xprv3QESAWYc9vDdZnQAzoRU9TqGMCHQsNv54B6ZbYH9XBUxjS8dzG54TAvYnv3LGrxv8JJTA5CwppfcrELdK554QjuKHU678otKHdEUxniPYvXXnv5eaDKmGwEXQq3TwbFfbFJ3Ws5odsquz1PvnDbJ2z6';
const xPublicKey = 'xpub661MyMwAqRbcGHMw89APz6eSmz7oeCnWTLFtYuoUVaCwvTFHjVYeC79w5fwXsyNcN1GgvnZ6378pUqE2FkteESXiY4LutWk6Xni7fveKg7h';

cardanoHD.fromSeed(seed);
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
