// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  SLIP10Ed25519ECC,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,
  validateAndGetPublicKey
} from '../../src/ecc';
import { hexToBytes, bytesToString, isAllBytesEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(SLIP10Ed25519ECC.NAME);

const privateKey = hexToBytes('bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07');

const slip10Ed25519PrivateKey: IPrivateKey = SLIP10Ed25519PrivateKey.fromBytes(privateKey);
const eccSLIP10Ed25519PrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(privateKey);

const slip10Ed25519PublicKey: IPublicKey = slip10Ed25519PrivateKey.publicKey();
const eccSLIP10Ed25519PublicKey: IPublicKey = eccSLIP10Ed25519PrivateKey.publicKey();

console.log('ECC:', SLIP10Ed25519ECC.NAME);
console.log('Private Key:', bytesToString(slip10Ed25519PrivateKey.raw()));
console.log('Public Key - Uncompressed:', bytesToString(slip10Ed25519PublicKey.rawUncompressed()));
console.log('Public Key - Compressed:', bytesToString(slip10Ed25519PublicKey.rawCompressed()));

const uncompressed: IPublicKey = validateAndGetPublicKey(
    slip10Ed25519PublicKey.rawUncompressed(), SLIP10Ed25519PublicKey
);
const compressed: IPublicKey = validateAndGetPublicKey(
    slip10Ed25519PublicKey.rawCompressed(), SLIP10Ed25519PublicKey
);

console.log(
    uncompressed instanceof SLIP10Ed25519PublicKey,
    compressed instanceof SLIP10Ed25519PublicKey,
    isAllBytesEqual(
        uncompressed.rawUncompressed(),
        slip10Ed25519PublicKey.rawUncompressed(),
        eccSLIP10Ed25519PublicKey.rawUncompressed(),
        SLIP10Ed25519PublicKey.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed()
    ),
    isAllBytesEqual(
        compressed.rawCompressed(),
        slip10Ed25519PublicKey.rawCompressed(),
        eccSLIP10Ed25519PublicKey.rawCompressed(),
        SLIP10Ed25519PublicKey.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed()
    )
);

