// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src';
import { BIP39_ENTROPY_STRENGTHS, BIP39Entropy } from '../../../src/entropies';
import { BIP39_MNEMONIC_LANGUAGES } from '../../../src/mnemonics';
import { Bitcoin as Cryptocurrency } from '../../../src/cryptocurrencies';
import { BIP44Derivation, CHANGES } from '../../../src/derivations';
import { PUBLIC_KEY_TYPES } from '../../../src/consts';
import { BIP32HD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: BIP32HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    language: BIP39_MNEMONIC_LANGUAGES.ENGLISH,
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
    passphrase: null
  }
).fromEntropy(new BIP39Entropy(
  BIP39Entropy.generate(
    BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_SIXTY
  )
)).fromDerivation(new BIP44Derivation({
  coinType: Cryptocurrency.COIN_TYPE,
  account: 0,
  change: CHANGES.EXTERNAL_CHAIN,
  address: [0, 2]
}));

// console.dir(hdwallet.getDump(), { depth: null, colors: true });
console.dir(hdwallet.getDumps(), { depth: null, colors: true });

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('Entropy:', hdwallet.getEntropy());
// console.log('Strength:', hdwallet.getStrength());
// console.log('Mnemonic:', hdwallet.getMnemonic());
// console.log('Passphrase:', hdwallet.getPassphrase());
// console.log('Language:', hdwallet.getLanguage());
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
