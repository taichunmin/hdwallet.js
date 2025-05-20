// SPDX-License-Identifier: MIT

import {
  PrivateKey, PublicKey, KholawEd25519PrivateKey
} from '../../src/ecc';
import { CardanoAddress } from '../../src/addresses';
import { bytesToString, getBytes } from '../../src/utils';
import { Cardano } from '../../src/cryptocurrencies';

const privateKey: PrivateKey = KholawEd25519PrivateKey.fromBytes(getBytes(
  '8061879a8fc9e7c685cb89b7014c85a6c4a2a8f3b6fa4964381d0751baf8fb5ff97530b002426a6eb1308e01372905d4c19c2b52a939bccd24c99a5826b9f87c'
));
const publicKey: PublicKey = privateKey.getPublicKey();

console.log('Private Key:', bytesToString(privateKey.getRaw()));
console.log('Uncompressed Public Key:', bytesToString(publicKey.getRawUncompressed()));
console.log('Compressed Public Key:', bytesToString(publicKey.getRawCompressed()), '\n');

const byronIcarusAddress = CardanoAddress.encode(publicKey, {
  encodeType: Cardano.TYPES.BYRON_ICARUS, chainCode: 'd537f39c41f0f781f543c4c512cac38927e5ebd3cd82b870dd7ce94de9e510b4'
});
const byronIcarusAddressHash = CardanoAddress.decode(byronIcarusAddress, {
  decodeType: Cardano.TYPES.BYRON_ICARUS
});
console.log('Byron-Icarus Address:', byronIcarusAddress, byronIcarusAddressHash);

const byronLegacyAddress = CardanoAddress.encode(publicKey, {
  encodeType: Cardano.TYPES.BYRON_LEGACY,
  path: "m/0'/0234'/123/243/5/7",
  pathKey: '39ddaa1e5719d88d6b53eda320f3dbe8c012d24abe33f4ac358fe78df43d5814',
  chainCode: 'd537f39c41f0f781f543c4c512cac38927e5ebd3cd82b870dd7ce94de9e510b4'
});
const byronLegacyAddressHash = CardanoAddress.decode(byronLegacyAddress, {
  decodeType: Cardano.TYPES.BYRON_LEGACY
});
console.log('Byron-Legacy Address:', byronLegacyAddress, byronLegacyAddressHash);

const shelleyAddress = CardanoAddress.encode(publicKey, {
  encodeType: Cardano.ADDRESS_TYPES.PAYMENT,
  stakingPublicKey: '007505bd415a4d5b21cb5be55360adeff02192ad952b5a1728e65010aea306aa54',
  network: 'mainnet'
});
const shelleyAddressHash = CardanoAddress.decode(shelleyAddress, {
  decodeType: Cardano.ADDRESS_TYPES.PAYMENT, network: 'mainnet'
});
console.log('Shelley Address:', shelleyAddress, shelleyAddressHash);

const shelleyStakingAddress = CardanoAddress.encode(publicKey, {
  encodeType: Cardano.ADDRESS_TYPES.STAKING, network: 'mainnet'
});
const shelleyStakingAddressHash = CardanoAddress.decode(shelleyStakingAddress, {
  decodeType: Cardano.ADDRESS_TYPES.STAKING, network: 'mainnet'
});
console.log('Shelley Staking Address:', shelleyStakingAddress, shelleyStakingAddressHash);
