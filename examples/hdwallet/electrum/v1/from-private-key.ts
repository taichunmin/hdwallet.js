// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../../src/hdwallet';
import { ElectrumDerivation } from '../../../../src/derivations';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { PUBLIC_KEY_TYPES } from '../../../../src/const';
import { ElectrumV1HD } from '../../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: ElectrumV1HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED
  }
).fromPrivateKey(
  '0fea3ff3b19b033672e8ac8a3b26fed252daf30762c8294e9dd62dc417d2108e'
).fromDerivation(new ElectrumDerivation({
  change: 0, address: 0
}));

console.dir(hdwallet.getDump(), { depth: null, colors: true });
// console.dir(hdwallet.getDumps(), { depth: null, colors: true });

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
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
