// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../../src/hdwallet';
import { ElectrumDerivation } from '../../../../src/derivations';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { PUBLIC_KEY_TYPES } from '../../../../src/consts';
import { ElectrumV1HD } from '../../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: ElectrumV1HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED
  }
).fromWIF(
  '5HwJ7KdZapuVs2hJe7rSGXipupaToWCpxYG6eiqjWtmMdRtZDUA'
).fromDerivation(new ElectrumDerivation({
  change: [0, 2], address: [1, 2]
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
