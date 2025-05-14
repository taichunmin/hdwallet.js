// SPDX-License-Identifier: MIT

import { BIP44HD } from '../../src/hds/bip44';
import { Bitcoin, Bitcoin as Cryptocurrency } from '../../src/cryptocurrencies';
import { BIP44Derivation, CHANGES } from '../../src/derivations';
import { PUBLIC_KEY_TYPES } from '../../src/const';
import { strict } from 'node:assert';

const bip44HD: BIP44HD = new BIP44HD(
  Cryptocurrency.ECC, {
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
    wifPrefix: Cryptocurrency.NETWORKS.MAINNET.WIF_PREFIX
  }
);

const seed = '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4';
const xPrivateKey = 'xprv9s21ZrQH143K4L18AD5Ko2ELW8bqaGLW4vfASZzo9yEN8fkZPZLdECXWXAMovtonu7DdEFwJuYH31QT96FWJUfkiLUVT8t8e3WNDiwZkuLJ';
const xPublicKey = 'xpub661MyMwAqRbcGp5bGEcLAAB54ASKyj4MS9amExQQiJmM1U5hw6esmzqzNQtquzBRNvLWtPC2kRu2kZR888FSAiZRpvKdjgbmoKRCgGM1YEy';
const wif = 'L1VKQooPmgVLD35vHMeprus1zFYx58bHGMfTz8QYTEnRCzbjwMoo';
const privateKey = '7f60ec0fa89064a37e208ade560c098586dd887e2133bee4564af1de52bc7f5c';
const publicKey = '023e23967b818fb3959f2056b6e6449a65c4982c1267398d8897b921ab53b0be4b';

// bip44HD.fromSeed(seed);
bip44HD.fromXPrivateKey(xPrivateKey, true);
// bip44HD.fromXPublicKey(xPublicKey, true);

// const bip44Derivation: BIP44Derivation = new BIP44Derivation({
//   coinType: Bitcoin.COIN_TYPE, account: 10, change: CHANGES.INTERNAL_CHANGE, address: 5
// });
//
// bip44HD.fromDerivation(bip44Derivation);

bip44HD.fromCoinType(Bitcoin.COIN_TYPE);
bip44HD.fromAccount(10);
bip44HD.fromChange(CHANGES.INTERNAL_CHANGE);
bip44HD.fromAddress(5);

// bip44HD.fromWIF(wif);
// bip44HD.fromPrivateKey(privateKey);
// bip44HD.fromPublicKey(publicKey);

console.log('Seed:', bip44HD.getSeed());
console.log('Root XPrivate Key:', bip44HD.getRootXPrivateKey());
console.log('Root XPublic Key:', bip44HD.getRootXPublicKey());
console.log('Root Private Key:', bip44HD.getRootPrivateKey());
console.log('Root WIF:', bip44HD.getRootWIF());
console.log('Root Chain Code:', bip44HD.getRootChainCode());
console.log('Root Public Key:', bip44HD.getRootPublicKey());
console.log('XPrivate Key:', bip44HD.getXPrivateKey());
console.log('XPublic Key:', bip44HD.getXPublicKey());
console.log('Strict:', bip44HD.getStrict());

console.log('Private Key:', bip44HD.getPrivateKey());
console.log('WIF:', bip44HD.getWIF());
console.log('WIF Type:', bip44HD.getWIFType());
console.log('Chain Code:', bip44HD.getChainCode());
console.log('Public Key:', bip44HD.getPublicKey());
console.log('Public Key Type:', bip44HD.getPublicKeyType());
console.log('Compressed:', bip44HD.getCompressed());
console.log('Uncompressed:', bip44HD.getUncompressed());
console.log('Hash:', bip44HD.getHash());
console.log('Fingerprint:', bip44HD.getFingerprint());
console.log('Parent Fingerprint:', bip44HD.getParentFingerprint());
console.log('Depth:', bip44HD.getDepth());
console.log('Path:', bip44HD.getPath());
console.log('Index:', bip44HD.getIndex());
console.log('Indexes:', bip44HD.getIndexes());
console.log('Address:', bip44HD.getAddress(
  Cryptocurrency.ADDRESSES.P2TR
));
