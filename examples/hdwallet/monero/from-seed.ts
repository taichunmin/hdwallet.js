// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src';
import { Monero as Cryptocurrency } from '../../../src/cryptocurrencies';
import { MoneroDerivation } from '../../../src/derivations';
import { MoneroSeed } from '../../../src/seeds';
import { MoneroHD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: MoneroHD,
    network: Cryptocurrency.NETWORKS.STAGENET,
    paymentID: 'ad17dc6e6793d178'
  }
).fromSeed(new MoneroSeed(
  '747bf6f08db7260c80a21bf6faae491c'
)).fromDerivation(new MoneroDerivation({
  minor: 1, major: 55
}));

console.log(JSON.stringify(hdwallet.getDump(), null, 4));
// console.log(JSON.stringify(hdwallet.getDumps(), null, 4));

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
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
