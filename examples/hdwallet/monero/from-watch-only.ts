// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src';
import { Monero as Cryptocurrency } from '../../../src/cryptocurrencies';
import { MoneroDerivation } from '../../../src/derivations';
import { MoneroHD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: MoneroHD,
    network: Cryptocurrency.NETWORKS.STAGENET,
    paymentID: 'ad17dc6e6793d178'
  }
).fromWatchOnly(
  'c6542d68c6a33d68d80f2ae4c7668f943772152c32a564512b16bc5e10ca460c',
  'f40f86a5c4742a17561fb67a8516bcdbca82ce7cab20f575a677e88444b3f517'
).fromDerivation(new MoneroDerivation({
  minor: 0, major: 9
}));

console.log(JSON.stringify(hdwallet.getDump(), null, 4));
// console.log(JSON.stringify(hdwallet.getDumps(), null, 4));

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('View Private Key:', hdwallet.getViewPrivateKey());
// console.log('Spend Public Key:', hdwallet.getSpendPublicKey());
// console.log('View Public Key:', hdwallet.getViewPublicKey());
// console.log('Primary Address:', hdwallet.getPrimaryAddress());
// console.log('Integrated Address:', hdwallet.getIntegratedAddress());
// console.log('Sub Address:', hdwallet.getSubAddress());
