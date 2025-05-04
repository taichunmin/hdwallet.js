// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  SLIP10Nist256p1ECC,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey,
  validateAndGetPublicKey
} from '../../src/ecc';
import { hexToBytes, bytesToString, isAllBytesEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(SLIP10Nist256p1ECC.NAME);

const privateKey = hexToBytes('f79495fda777197ce73551bcd8e162ceca19167575760d3cc2bced4bf2a213dc');

const slip10Nist256p1PrivateKey: IPrivateKey = SLIP10Nist256p1PrivateKey.fromBytes(privateKey);
const eccSLIP10Nist256p1PrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(privateKey);

const slip10Nist256p1PublicKey: IPublicKey = slip10Nist256p1PrivateKey.publicKey();
const eccSLIP10Nist256p1PublicKey: IPublicKey = eccSLIP10Nist256p1PrivateKey.publicKey();

const uncompressed: IPublicKey = validateAndGetPublicKey(
    slip10Nist256p1PublicKey.rawUncompressed(), SLIP10Nist256p1PublicKey
);
const compressed: IPublicKey = validateAndGetPublicKey(
    slip10Nist256p1PublicKey.rawCompressed(), SLIP10Nist256p1PublicKey
);

console.log('ECC:', SLIP10Nist256p1ECC.NAME);
console.log('Private Key:', bytesToString(slip10Nist256p1PrivateKey.raw()));
console.log('Public Key - Uncompressed:', bytesToString(slip10Nist256p1PublicKey.rawUncompressed()));
console.log('Public Key - Compressed:', bytesToString(slip10Nist256p1PublicKey.rawCompressed()));

console.log(
    uncompressed instanceof SLIP10Nist256p1PublicKey,
    compressed instanceof SLIP10Nist256p1PublicKey,
    isAllBytesEqual(
        uncompressed.rawUncompressed(),
        slip10Nist256p1PublicKey.rawUncompressed(),
        eccSLIP10Nist256p1PublicKey.rawUncompressed(),
        SLIP10Nist256p1PublicKey.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed()
    ),
    isAllBytesEqual(
        compressed.rawCompressed(),
        slip10Nist256p1PublicKey.rawCompressed(),
        eccSLIP10Nist256p1PublicKey.rawCompressed(),
        SLIP10Nist256p1PublicKey.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed()
    )
);

