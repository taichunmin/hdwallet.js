// SPDX-License-Identifier: MIT

import { BIP84HD } from '../../src/hds';
import { Bitcoin as Cryptocurrency } from '../../src/cryptocurrencies';
import { BIP84Derivation, CHANGES } from '../../src/derivations';
import { PUBLIC_KEY_TYPES } from '../../src/const';

const bip84HD: BIP84HD = new BIP84HD({
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

bip84HD.fromSeed(seed);
// bip84HD.fromXPrivateKey(xPrivateKey);
// bip84HD.fromXPublicKey(xPublicKey);

console.log('Seed:', bip84HD.getSeed());
console.log('Strict:', bip84HD.getStrict());
console.log('Root XPrivate Key:', bip84HD.getRootXPrivateKey());
console.log('Root XPublic Key:', bip84HD.getRootXPublicKey());
console.log('Root Private Key:', bip84HD.getRootPrivateKey());
console.log('Root WIF:', bip84HD.getRootWIF());
console.log('Root Chain Code:', bip84HD.getRootChainCode());
console.log('Root Public Key:', bip84HD.getRootPublicKey());

// const bip84Derivation: BIP84Derivation = new BIP84Derivation({
//   coinType: Cryptocurrency.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHAIN, address: 0
// });
//
// bip84HD.fromDerivation(bip84Derivation);

bip84HD.fromCoinType(Cryptocurrency.COIN_TYPE);
bip84HD.fromAccount(0);
bip84HD.fromChange(CHANGES.EXTERNAL_CHAIN);
bip84HD.fromAddress(0);

// bip84HD.fromPrivateKey(privateKey);
// bip84HD.fromWIF(wif);
// bip84HD.fromPublicKey(publicKey);

console.log('XPrivate Key:', bip84HD.getXPrivateKey());
console.log('XPublic Key:', bip84HD.getXPublicKey());
console.log('Private Key:', bip84HD.getPrivateKey());
console.log('WIF:', bip84HD.getWIF());
console.log('WIF Type:', bip84HD.getWIFType());
console.log('Chain Code:', bip84HD.getChainCode());
console.log('Public Key:', bip84HD.getPublicKey());
console.log('Public Key Type:', bip84HD.getPublicKeyType());
console.log('Compressed:', bip84HD.getCompressed());
console.log('Uncompressed:', bip84HD.getUncompressed());
console.log('Hash:', bip84HD.getHash());
console.log('Fingerprint:', bip84HD.getFingerprint());
console.log('Parent Fingerprint:', bip84HD.getParentFingerprint());
console.log('Depth:', bip84HD.getDepth());
console.log('Path:', bip84HD.getPath());
console.log('Index:', bip84HD.getIndex());
console.log('Indexes:', bip84HD.getIndexes());
console.log('Address:', bip84HD.getAddress());
