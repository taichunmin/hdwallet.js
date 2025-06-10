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
).fromPublicKey(
  '04da211622e04fc90a4264eac2f4294f74b0cbb23e4ed4c35796a8b188f9d66700c101441f9ed9a13e173f257d12e25a3870d7e2916e25c232d4c732af64e750b6'
).fromDerivation(new ElectrumDerivation({
  change: 0, address: [1, 2]
}));

// console.dir(hdwallet.getDump(), { depth: null, colors: true });
console.dir(hdwallet.getDumps(), { depth: null, colors: true });

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('Master Public Key:', hdwallet.getMasterPublicKey());
// console.log('Public Key Type:', hdwallet.getPublicKeyType());
// console.log('Public Key:', hdwallet.getPublicKey());
// console.log('Uncompressed:', hdwallet.getUncompressed());
// console.log('Compressed:', hdwallet.getCompressed());
// console.log('Address:', hdwallet.getAddress());
