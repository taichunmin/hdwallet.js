// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  SLIP10Ed25519Blake2bECC,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey,
  validateAndGetPublicKey
} from '../../src/ecc';
import { hexToBytes, bytesToString, isAllBytesEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(SLIP10Ed25519Blake2bECC.NAME);

const privateKey = hexToBytes('bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07');

const slip10Ed25519Blake2bPrivateKey: IPrivateKey = SLIP10Ed25519Blake2bPrivateKey.fromBytes(privateKey);
const eccSLIP10Ed25519Blake2bPrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(privateKey);

const slip10Ed25519Blake2bPublicKey: IPublicKey = slip10Ed25519Blake2bPrivateKey.publicKey();
const eccSLIP10Ed25519Blake2bPublicKey: IPublicKey = eccSLIP10Ed25519Blake2bPrivateKey.publicKey();

console.log('ECC:', SLIP10Ed25519Blake2bECC.NAME);
console.log('Private Key:', bytesToString(slip10Ed25519Blake2bPrivateKey.raw()));
console.log('Public Key - Uncompressed:', bytesToString(slip10Ed25519Blake2bPublicKey.rawUncompressed()));
console.log('Public Key - Compressed:', bytesToString(slip10Ed25519Blake2bPublicKey.rawCompressed()));

const uncompressed: IPublicKey = validateAndGetPublicKey(
    slip10Ed25519Blake2bPublicKey.rawUncompressed(), SLIP10Ed25519Blake2bPublicKey
);
const compressed: IPublicKey = validateAndGetPublicKey(
    slip10Ed25519Blake2bPublicKey.rawCompressed(), SLIP10Ed25519Blake2bPublicKey
);

console.log(
    uncompressed instanceof SLIP10Ed25519Blake2bPublicKey,
    compressed instanceof SLIP10Ed25519Blake2bPublicKey,
    isAllBytesEqual(
        uncompressed.rawUncompressed(),
        slip10Ed25519Blake2bPublicKey.rawUncompressed(),
        eccSLIP10Ed25519Blake2bPublicKey.rawUncompressed(),
        SLIP10Ed25519Blake2bPublicKey.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed()
    ),
    isAllBytesEqual(
        compressed.rawCompressed(),
        slip10Ed25519Blake2bPublicKey.rawCompressed(),
        eccSLIP10Ed25519Blake2bPublicKey.rawCompressed(),
        SLIP10Ed25519Blake2bPublicKey.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed()
    )
);

