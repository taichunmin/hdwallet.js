// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src/hdwallet';
import { Monero as Cryptocurrency } from '../../../src/cryptocurrencies';
import { MoneroDerivation } from '../../../src/derivations';
import { MoneroHD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: MoneroHD,
    network: Cryptocurrency.NETWORKS.TESTNET,
    paymentID: 'ad17dc6e6793d178'
  }
).fromPrivateKey(
  '0fea3ff3b19b033672e8ac8a3b26fed252daf30762c8294e9dd62dc417d2108e'
).fromDerivation(new MoneroDerivation({
  major: 5, minor: '0-3'
}));

// console.dir(hdwallet.getDump(), { depth: null, colors: true });
console.dir(hdwallet.getDumps(), { depth: null, colors: true });

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('Private Key:', hdwallet.getPrivateKey());
// console.log('Spend Private Key:', hdwallet.getSpendPrivateKey());
// console.log('View Private Key:', hdwallet.getViewPrivateKey());
// console.log('Spend Public Key:', hdwallet.getSpendPublicKey());
// console.log('View Public Key:', hdwallet.getViewPublicKey());
// console.log('Primary Address:', hdwallet.getPrimaryAddress());
// console.log('Integrated Address:', hdwallet.getIntegratedAddress());
// console.log('Sub Address:', hdwallet.getSubAddress());
