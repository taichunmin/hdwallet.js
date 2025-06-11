// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src';
import { Qtum as Cryptocurrency } from '../../../src/cryptocurrencies';
import { CustomDerivation } from '../../../src/derivations';
import { PUBLIC_KEY_TYPES, SEMANTICS } from '../../../src/consts';
import { BIP141HD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: BIP141HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
    semantic: SEMANTICS.P2WPKH_IN_P2SH
  }
).fromXPrivateKey(
  'yprvABrGsX5C9jantZVwdwcQhDXkqsu4RoSAZKBwPnLA3uyeVM3C3fvTuqzru4fovMSLqYSqALGe9MBqCf7Pg7Y7CTsjoNnLYg6HxR2Xo44NX7E', true
).fromDerivation(new CustomDerivation({
  path: "m/0'/0"
}));

console.log(JSON.stringify(hdwallet.getDump(['indexes']), null, 4));
// console.log(JSON.stringify(hdwallet.getDumps(['indexes']), null, 4));

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('Semantic:', hdwallet.getSemantic());
// console.log('Root XPrivate Key:', hdwallet.getRootXPrivateKey());
// console.log('Root XPublic Key:', hdwallet.getRootXPublicKey());
// console.log('Root Private Key:', hdwallet.getRootPrivateKey());
// console.log('Root WIF:', hdwallet.getRootWIF());
// console.log('Root Chain Code:', hdwallet.getRootChainCode());
// console.log('Root Public Key:', hdwallet.getRootPublicKey());
// console.log('Strict:', hdwallet.getStrict());
// console.log('Public Key Type:', hdwallet.getPublicKeyType());
// console.log('WIF Type:', hdwallet.getWIFType());
// console.log('Path:', hdwallet.getPath());
// console.log('Depth:', hdwallet.getDepth());
// console.log('Indexes:', hdwallet.getIndexes());
// console.log('Index:', hdwallet.getIndex());
// console.log('XPrivate Key:', hdwallet.getXPrivateKey());
// console.log('XPublic Key:', hdwallet.getXPublicKey());
// console.log('Private Key:', hdwallet.getPrivateKey());
// console.log('WIF:', hdwallet.getWIF());
// console.log('Chain Code:', hdwallet.getChainCode());
// console.log('Public Key:', hdwallet.getPublicKey());
// console.log('Uncompressed:', hdwallet.getUncompressed());
// console.log('Compressed:', hdwallet.getCompressed());
// console.log('Hash:', hdwallet.getHash());
// console.log('Fingerprint:', hdwallet.getFingerprint());
// console.log('Parent Fingerprint:', hdwallet.getParentFingerprint());
// console.log('Address:', hdwallet.getAddress());
