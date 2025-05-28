// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src/hdwallet';
import { MoneroMnemonic, MONERO_MNEMONIC_LANGUAGES, MONERO_MNEMONIC_WORDS } from '../../../src/mnemonics';
import { Monero as Cryptocurrency } from '../../../src/cryptocurrencies';
import { MoneroDerivation } from '../../../src/derivations';
import { MoneroHD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: MoneroHD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    paymentID: 'ad17dc6e6793d178'
  }
).fromMnemonic(new MoneroMnemonic(
  MoneroMnemonic.fromWords(
    MONERO_MNEMONIC_WORDS.TWELVE, MONERO_MNEMONIC_LANGUAGES.DUTCH
  )
)).fromDerivation(new MoneroDerivation({
  minor: 0, major: 5
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
