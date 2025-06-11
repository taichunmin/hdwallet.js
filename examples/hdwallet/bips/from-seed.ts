// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src';
import { Algorand as Cryptocurrency } from '../../../src/cryptocurrencies';
import { AlgorandSeed } from '../../../src/seeds';
import { BIP44Derivation, CHANGES } from '../../../src/derivations';
import { PUBLIC_KEY_TYPES } from '../../../src/consts';
import { BIP32HD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: BIP32HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
  }
).fromSeed(new AlgorandSeed(
  '680dca0430704e98224ea64e48964f647d6a428116e629f83c34fe37f799712a'
)).fromDerivation(new BIP44Derivation({
  coinType: Cryptocurrency.COIN_TYPE,
  account: '0-1',
  change: CHANGES.EXTERNAL_CHAIN,
  address: 0
}));

// console.log(JSON.stringify(hdwallet.getDump(['indexes']), null, 4));
console.log(JSON.stringify(hdwallet.getDumps(['indexes']), null, 4));

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('Seed:', hdwallet.getSeed());
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
