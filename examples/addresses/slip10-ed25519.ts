// SPDX-License-Identifier: MIT

import {
  PrivateKey, PublicKey, SLIP10Ed25519PrivateKey
} from '../../src/ecc';
import {
  AlgorandAddress,
  MultiversXAddress,
  SolanaAddress,
  StellarAddress,
  TezosAddress,
  SuiAddress,
  AptosAddress,
  NearAddress
} from '../../src/addresses';
import { bytesToString, getBytes } from '../../src/utils';
import { MultiversX, Stellar, Tezos } from '../../src/cryptocurrencies';

const privateKey: PrivateKey = SLIP10Ed25519PrivateKey.fromBytes(getBytes(
  'bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07'
));
const publicKey: PublicKey = privateKey.getPublicKey();

console.log('Private Key:', bytesToString(privateKey.getRaw()));
console.log('Uncompressed Public Key:', bytesToString(publicKey.getRawUncompressed()));
console.log('Compressed Public Key:', bytesToString(publicKey.getRawCompressed()), '\n');

const algorandAddress = AlgorandAddress.encode(publicKey);
const algorandAddressHash = AlgorandAddress.decode(algorandAddress);
console.log('Algorand Address:', algorandAddress, algorandAddressHash);

const multiversXAddress = MultiversXAddress.encode(publicKey, {
  hrp: MultiversX.NETWORKS.MAINNET.HRP
});
const multiversXAddressHash = MultiversXAddress.decode(multiversXAddress, {
  hrp: MultiversX.NETWORKS.MAINNET.HRP
});
console.log('MultiversX Address:', multiversXAddress, multiversXAddressHash);

const solanaAddress = SolanaAddress.encode(publicKey);
const solanaAddressHash = SolanaAddress.decode(solanaAddress);
console.log('Solana Address:', solanaAddress, solanaAddressHash);

const stellarAddress = StellarAddress.encode(publicKey, {
  addressType: Stellar.ADDRESS_TYPES.PRIVATE_KEY
});
const stellarAddressHash = StellarAddress.decode(stellarAddress, {
  addressType: Stellar.ADDRESS_TYPES.PRIVATE_KEY
});
console.log('Stellar Address:', stellarAddress, stellarAddressHash);

const tezosAddress = TezosAddress.encode(publicKey, {
  addressPrefix: Tezos.ADDRESS_PREFIXES.TZ1
});
const tezosAddressHash = TezosAddress.decode(tezosAddress, {
  addressPrefix: Tezos.ADDRESS_PREFIXES.TZ1
});
console.log('Tezos Address:', tezosAddress, tezosAddressHash);

const suiAddress = SuiAddress.encode(publicKey);
const suiAddressHash = SuiAddress.decode(suiAddress);
console.log('Sui Address:', suiAddress, suiAddressHash);

const aptosAddress = AptosAddress.encode(publicKey);
const aptosAddressHash = AptosAddress.decode(aptosAddress);
console.log('Aptos Address:', aptosAddress, aptosAddressHash);

const nearAddress = NearAddress.encode(publicKey);
const nearAddressHash = NearAddress.decode(nearAddress);
console.log('Near Address:', nearAddress, nearAddressHash);
