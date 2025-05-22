// SPDX-License-Identifier: MIT

import { CardanoHD } from '../../../src/hds/cardano';
import { CustomDerivation } from '../../../src/derivations';
import { Cardano } from '../../../src/cryptocurrencies';

const cardanoHD: CardanoHD = new CardanoHD(
  Cardano.TYPES.BYRON_LEGACY
);

const seed = 'aa88d53b805f411823f57c797c88bfab1454f5eee5f7b2bafeabeadac2cc59fe';
const xPrivateKey = 'xprv3QESAWYc9vDdZTncakVdLLPy3cLJYsPCkkFseh6jb96oDBK4x4ZGBpjvRtTSmgeho8L2CDXEBsGdziVKgdFs9Fs34AcnR9d2jGVQa2DDSfsTbTunTdQTjFZMpoDFt4xb2Eg4xoU4cRA5KNUmCSnuGJG';
const xPublicKey = 'xpub661MyMwAqRbcFChpDRzR18jyqTYumPn32qGVKzFqCqy6t6Dz3otrQArHo1YDXHNd39vycLYs97sDJtENPcj7VSgZZWHiK8H2udWSzhR3QY5';

cardanoHD.fromSeed(seed);
// cardanoHD.fromXPrivateKey(xPrivateKey);
// cardanoHD.fromXPublicKey(xPublicKey);

const customDerivation: CustomDerivation = new CustomDerivation({
  path: `m/0'/0`
});

cardanoHD.fromDerivation(customDerivation);

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
console.log('Path Key:', cardanoHD.getPathKey());
console.log('Index:', cardanoHD.getIndex());
console.log('Indexes:', cardanoHD.getIndexes());
console.log('getStrict:', cardanoHD.getStrict());
console.log('Address:', cardanoHD.getAddress());
