// SPDX-License-Identifier: MIT

import { BIP49HD } from '../../src/hds';
import { Bitcoin as Cryptocurrency } from '../../src/cryptocurrencies';
import { BIP49Derivation, CHANGES } from '../../src/derivations';
import { PUBLIC_KEY_TYPES } from '../../src/const';

const bip49HD: BIP49HD = new BIP49HD({
  ecc: Cryptocurrency.ECC,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
  wifPrefix: Cryptocurrency.NETWORKS.MAINNET.WIF_PREFIX
});

const seed = '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4';
const xPrivateKey = 'xprv9s21ZrQH143K4L18AD5Ko2ELW8bqaGLW4vfASZzo9yEN8fkZPZLdECXWXAMovtonu7DdEFwJuYH31QT96FWJUfkiLUVT8t8e3WNDiwZkuLJ';
const xPublicKey = 'xpub661MyMwAqRbcGp5bGEcLAAB54ASKyj4MS9amExQQiJmM1U5hw6esmzqzNQtquzBRNvLWtPC2kRu2kZR888FSAiZRpvKdjgbmoKRCgGM1YEy';
const privateKey = '7f60ec0fa89064a37e208ade560c098586dd887e2133bee4564af1de52bc7f5c';
const wif = 'L1VKQooPmgVLD35vHMeprus1zFYx58bHGMfTz8QYTEnRCzbjwMoo';
const publicKey = '023e23967b818fb3959f2056b6e6449a65c4982c1267398d8897b921ab53b0be4b';

bip49HD.fromSeed(seed);
// bip49HD.fromXPrivateKey(xPrivateKey);
// bip49HD.fromXPublicKey(xPublicKey);

console.log('Seed:', bip49HD.getSeed());
console.log('Strict:', bip49HD.getStrict());
console.log('Root XPrivate Key:', bip49HD.getRootXPrivateKey());
console.log('Root XPublic Key:', bip49HD.getRootXPublicKey());
console.log('Root Private Key:', bip49HD.getRootPrivateKey());
console.log('Root WIF:', bip49HD.getRootWIF());
console.log('Root Chain Code:', bip49HD.getRootChainCode());
console.log('Root Public Key:', bip49HD.getRootPublicKey());

// const bip49Derivation: BIP49Derivation = new BIP49Derivation({
//   coinType: Cryptocurrency.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
// });
//
// bip49HD.fromDerivation(bip49Derivation);

bip49HD.fromCoinType(Cryptocurrency.COIN_TYPE);
bip49HD.fromAccount(0);
bip49HD.fromChange(CHANGES.EXTERNAL_CHANGE);
bip49HD.fromAddress(0);

// bip49HD.fromPrivateKey(privateKey);
// bip49HD.fromWIF(wif);
// bip49HD.fromPublicKey(publicKey);

console.log('XPrivate Key:', bip49HD.getXPrivateKey());
console.log('XPublic Key:', bip49HD.getXPublicKey());
console.log('Private Key:', bip49HD.getPrivateKey());
console.log('WIF:', bip49HD.getWIF());
console.log('WIF Type:', bip49HD.getWIFType());
console.log('Chain Code:', bip49HD.getChainCode());
console.log('Public Key:', bip49HD.getPublicKey());
console.log('Public Key Type:', bip49HD.getPublicKeyType());
console.log('Compressed:', bip49HD.getCompressed());
console.log('Uncompressed:', bip49HD.getUncompressed());
console.log('Hash:', bip49HD.getHash());
console.log('Fingerprint:', bip49HD.getFingerprint());
console.log('Parent Fingerprint:', bip49HD.getParentFingerprint());
console.log('Depth:', bip49HD.getDepth());
console.log('Path:', bip49HD.getPath());
console.log('Index:', bip49HD.getIndex());
console.log('Indexes:', bip49HD.getIndexes());
console.log('Address:', bip49HD.getAddress());
