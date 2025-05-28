// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../../src/hdwallet';
import { ElectrumV2Seed } from '../../../../src/seeds';
import { ElectrumDerivation } from '../../../../src/derivations';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { MODES, PUBLIC_KEY_TYPES } from '../../../../src/const';
import { ElectrumV2HD } from '../../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: ElectrumV2HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED,
    mode: MODES.SEGWIT
  }
).fromSeed(new ElectrumV2Seed(
  '4c423a08ccc9d0fe2fb6136ffdc5292a18c0a552e1246b572a5740c523052882880ca55faf84c996945c7f7145c84ddaedb671e8f23c9bff87617f67e9fb1319'
)).fromDerivation(new ElectrumDerivation({
  change: 0, address: '9-10'
}));

// console.dir(hdwallet.getDump(), { depth: null, colors: true });
console.dir(hdwallet.getDumps(), { depth: null, colors: true });

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('Seed:', hdwallet.getSeed());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('Mode:', hdwallet.getMode());
// console.log('Mnemonic Type:', hdwallet.getMnemonicType());
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
