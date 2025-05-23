// SPDX-License-Identifier: MIT

import { MoneroHD } from '../../src/hds';
import { MoneroDerivation } from '../../src/derivations';
import { Monero } from '../../src/cryptocurrencies';

const moneroHD: MoneroHD = new MoneroHD({
  network: Monero.NETWORKS.MAINNET, minor: 1, major: 0
});

const seed = '7700d24525cd55c703aa3bf96590938b60d6408d6c56cc1d6d28bdb4d768b893';
const privateKey = 'ab37a127a265102d9910702a41eefd879adedec8de3f2f9142b6d3361df3323d';
const spendPrivateKey = '228d2d013851b0ae7a26873e92c7bccf5fd6408d6c56cc1d6d28bdb4d768b803';
const viewPrivateKey = 'b80a6f3f4d679d5c4ebfd59eb15bab9247c1322473954594173bd3f6f9c78503';
const spendPublicKey = '18e3d47a702c21c23a27bd397c77bebc248ef1c06d010b0cd8a557c44acf818e';
const paymentID = 'ad17dc6e6793d178';

moneroHD.fromSeed(seed);
// moneroHD.fromPrivateKey(privateKey);
// moneroHD.fromSpendPrivateKey(spendPrivateKey);
// moneroHD.fromWatchOnly(viewPrivateKey, spendPublicKey);

console.log('Seed:', moneroHD.getSeed());
console.log('Private Key:', moneroHD.getPrivateKey());
console.log('Spend Private Key:', moneroHD.getSpendPrivateKey());
console.log('View Private Key:', moneroHD.getViewPrivateKey());
console.log('Spend Public Key:', moneroHD.getSpendPublicKey());
console.log('View Public Key:', moneroHD.getViewPublicKey());
console.log('Primary Address:', moneroHD.getPrimaryAddress());

console.log('Payment ID:', paymentID);
console.log('Integrated Address:', moneroHD.getIntegratedAddress(paymentID));

const moneroDerivation: MoneroDerivation = new MoneroDerivation({
  minor: 1, major: 0
});

moneroHD.fromDerivation(moneroDerivation);

console.log('Sub-Address:', moneroHD.getSubAddress());
