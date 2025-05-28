// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src/hdwallet';
import { MoneroEntropy, MONERO_ENTROPY_STRENGTHS } from '../../../src/entropies';
import { MONERO_MNEMONIC_LANGUAGES } from '../../../src/mnemonics';
import { Monero as Cryptocurrency } from '../../../src/cryptocurrencies';
import { MoneroDerivation } from '../../../src/derivations';
import { MoneroHD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: MoneroHD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    language: MONERO_MNEMONIC_LANGUAGES.PORTUGUESE,
    paymentID: 'ad17dc6e6793d178'
  }
).fromEntropy(new MoneroEntropy(
  MoneroEntropy.generate(
    MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
  )
)).fromDerivation(new MoneroDerivation({
  minor: 1, major: 0
}));

console.dir(hdwallet.getDump(), { depth: null, colors: true });
// console.dir(hdwallet.getDumps(), { depth: null, colors: true });

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
// console.log('Spend Private Key:', hdwallet.getSpendPrivateKey());
// console.log('View Private Key:', hdwallet.getViewPrivateKey());
// console.log('Spend Public Key:', hdwallet.getSpendPublicKey());
// console.log('View Public Key:', hdwallet.getViewPublicKey());
// console.log('Primary Address:', hdwallet.getPrimaryAddress());
// console.log('Integrated Address:', hdwallet.getIntegratedAddress());
// console.log('Sub Address:', hdwallet.getSubAddress());
