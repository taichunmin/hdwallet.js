// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../src/hdwallet';
import { Bitcoin as Cryptocurrency } from '../../../src/cryptocurrencies';
import { PUBLIC_KEY_TYPES } from '../../../src/const';
import { BIP44HD } from '../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: BIP44HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
  }
).fromPublicKey(
  '04aaeb52dd7494c361049de67cc680e83ebcbbbdbeb13637d92cd845f70308af5e9370164133294e5fd1679672fe7866c307daf97281a28f66dca7cbb52919824f'
);

console.dir(hdwallet.getDump(), { depth: null, colors: true });

// console.log('Cryptocurrency:', hdwallet.getCryptocurrency());
// console.log('Symbol:', hdwallet.getSymbol());
// console.log('Network:', hdwallet.getNetwork());
// console.log('Coin Type:', hdwallet.getCoinType());
// console.log('ECC:', hdwallet.getECC());
// console.log('HD:', hdwallet.getHD());
// console.log('Semantic:', hdwallet.getSemantic());
// console.log('Public Key Type:', hdwallet.getPublicKeyType());
// console.log('Public Key:', hdwallet.getPublicKey());
// console.log('Uncompressed:', hdwallet.getUncompressed());
// console.log('Compressed:', hdwallet.getCompressed());
// console.log('Hash:', hdwallet.getHash());
// console.log('Fingerprint:', hdwallet.getFingerprint());
// console.log('Address:', hdwallet.getAddress());
