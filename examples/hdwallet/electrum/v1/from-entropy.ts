// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../../src';
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from '../../../../src/entropies';
import { ELECTRUM_V1_MNEMONIC_LANGUAGES } from '../../../../src/mnemonics';
import { ElectrumDerivation } from '../../../../src/derivations';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { PUBLIC_KEY_TYPES } from '../../../../src/consts';
import { ElectrumV1HD } from '../../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: ElectrumV1HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    language: ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH,
    publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED
  }
).fromEntropy(new ElectrumV1Entropy(
  ElectrumV1Entropy.generate(
    ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
  )
)).fromDerivation(new ElectrumDerivation({
  change: [0, 2], address: [1, 2]
}));

console.log(JSON.stringify(hdwallet.getDump(), null, 4));
// console.log(JSON.stringify(hdwallet.getDumps(), null, 4));

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('Entropy:', hdwallet.getEntropy());
// console.log('Strength:', hdwallet.getStrength());
// console.log('Mnemonic:', hdwallet.getMnemonic());
// console.log('Language:', hdwallet.getLanguage());
// console.log('Seed:', hdwallet.getSeed());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('Master Private Key:', hdwallet.getMasterPrivateKey());
// console.log('Master WIF:', hdwallet.getMasterWIF());
// console.log('Master Public Key:', hdwallet.getMasterPublicKey());
// console.log('Public Key Type:', hdwallet.getPublicKeyType());
// console.log('WIF Type:', hdwallet.getWIFType());
// console.log('Private Key:', hdwallet.getPrivateKey());
// console.log('WIF:', hdwallet.getWIF());
// console.log('Public Key:', hdwallet.getPublicKey());
// console.log('Uncompressed:', hdwallet.getUncompressed());
// console.log('Compressed:', hdwallet.getCompressed());
// console.log('Address:', hdwallet.getAddress());
