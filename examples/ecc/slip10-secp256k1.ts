// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey,
  validateAndGetPublicKey
} from '../../src/ecc';
import { hexToBytes, bytesToString, isAllBytesEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(SLIP10Secp256k1ECC.NAME);

const privateKey = hexToBytes('b66022fff8b6322f8b8fa444d6d097457b6b9e7bb05add5b75f9c827df7bd3b6');

const slip10Secp256k1PrivateKey: IPrivateKey = SLIP10Secp256k1PrivateKey.fromBytes(privateKey);
const eccSLIP10Secp256k1PrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(privateKey);

const slip10Secp256k1PublicKey: IPublicKey = slip10Secp256k1PrivateKey.publicKey();
const eccSLIP10Secp256k1PublicKey: IPublicKey = eccSLIP10Secp256k1PrivateKey.publicKey();

console.log('ECC:', SLIP10Secp256k1ECC.NAME);
console.log('Private Key:', bytesToString(slip10Secp256k1PrivateKey.raw()));
console.log('Public Key - Uncompressed:', bytesToString(slip10Secp256k1PublicKey.rawUncompressed()));
console.log('Public Key - Compressed:', bytesToString(slip10Secp256k1PublicKey.rawCompressed()));

const uncompressed: IPublicKey = validateAndGetPublicKey(
    slip10Secp256k1PublicKey.rawUncompressed(), SLIP10Secp256k1PublicKey
);
const compressed: IPublicKey = validateAndGetPublicKey(
    slip10Secp256k1PublicKey.rawCompressed(), SLIP10Secp256k1PublicKey
);

console.log(
    uncompressed instanceof SLIP10Secp256k1PublicKey,
    compressed instanceof SLIP10Secp256k1PublicKey,
    isAllBytesEqual(
        uncompressed.rawUncompressed(),
        slip10Secp256k1PublicKey.rawUncompressed(),
        eccSLIP10Secp256k1PublicKey.rawUncompressed(),
        SLIP10Secp256k1PublicKey.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed()
    ),
    isAllBytesEqual(
        compressed.rawCompressed(),
        slip10Secp256k1PublicKey.rawCompressed(),
        eccSLIP10Secp256k1PublicKey.rawCompressed(),
        SLIP10Secp256k1PublicKey.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed()
    )
);

