// SPDX-License-Identifier: MIT

import {
  PrivateKey, PublicKey, SLIP10Nist256p1PrivateKey
} from '../../src/eccs';

import { NeoAddress } from '../../src/addresses';
import { bytesToString, getBytes } from '../../src/utils';

const privateKey: PrivateKey = SLIP10Nist256p1PrivateKey.fromBytes(getBytes(
  'be3851aa7822b92deb2f34655e41a40fd510f6cf9aa2a4f0c4d7a4bc81f0ad74'
));
const publicKey: PublicKey = privateKey.getPublicKey();

console.log('Private Key:', bytesToString(privateKey.getRaw()));
console.log('Uncompressed Public Key:', bytesToString(publicKey.getRawUncompressed()));
console.log('Compressed Public Key:', bytesToString(publicKey.getRawCompressed()), '\n');

const neoAddress = NeoAddress.encode(publicKey);
const neoAddressHash = NeoAddress.decode(neoAddress);
console.log('Neo Address:', neoAddress, neoAddressHash);
