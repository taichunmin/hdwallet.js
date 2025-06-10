// SPDX-License-Identifier: MIT

import { HDWallet } from '../../../../src/hdwallet';
import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from '../../../../src/entropies';
import { ELECTRUM_V2_MNEMONIC_LANGUAGES, ELECTRUM_V2_MNEMONIC_TYPES } from '../../../../src/mnemonics';
import { ElectrumDerivation } from '../../../../src/derivations';
import { Bitcoin as Cryptocurrency } from '../../../../src/cryptocurrencies';
import { MODES, PUBLIC_KEY_TYPES } from '../../../../src/consts';
import { ElectrumV2HD } from '../../../../src/hds';

const hdwallet: HDWallet = new HDWallet(
  Cryptocurrency, {
    hd: ElectrumV2HD,
    network: Cryptocurrency.NETWORKS.MAINNET,
    language: ELECTRUM_V2_MNEMONIC_LANGUAGES.PORTUGUESE,
    mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.SEGWIT,
    publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED,
    mode: MODES.SEGWIT
  }
).fromEntropy(new ElectrumV2Entropy(
  ElectrumV2Entropy.generate(
    ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO
  )
)).fromDerivation(new ElectrumDerivation({
  change: '1-2', address: [0, 2]
}));

// console.dir(hdwallet.getDump(), { depth: null, colors: true });
console.dir(hdwallet.getDumps(), { depth: null, colors: true });

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
