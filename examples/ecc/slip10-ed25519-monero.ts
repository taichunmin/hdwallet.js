// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey,
  validateAndGetPublicKey
} from '../../src/ecc';
import { hexToBytes, bytesToString, isAllBytesEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(SLIP10Ed25519MoneroECC.NAME);

const privateKey = hexToBytes('bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07');

const slip10Ed25519MoneroPrivateKey: IPrivateKey = SLIP10Ed25519MoneroPrivateKey.fromBytes(privateKey);
const eccSLIP10Ed25519MoneroPrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(privateKey);

const slip10Ed25519MoneroPublicKey: IPublicKey = slip10Ed25519MoneroPrivateKey.publicKey();
const eccSLIP10Ed25519MoneroPublicKey: IPublicKey = eccSLIP10Ed25519MoneroPrivateKey.publicKey();

console.log('ECC:', SLIP10Ed25519MoneroECC.NAME);
console.log('Private Key:', bytesToString(slip10Ed25519MoneroPrivateKey.raw()));
console.log('Public Key - Uncompressed:', bytesToString(slip10Ed25519MoneroPublicKey.rawUncompressed()));
console.log('Public Key - Compressed:', bytesToString(slip10Ed25519MoneroPublicKey.rawCompressed()));

const uncompressed: IPublicKey = validateAndGetPublicKey(
    slip10Ed25519MoneroPublicKey.rawUncompressed(), SLIP10Ed25519MoneroPublicKey
);
const compressed: IPublicKey = validateAndGetPublicKey(
    slip10Ed25519MoneroPublicKey.rawCompressed(), SLIP10Ed25519MoneroPublicKey
);

console.log(
    uncompressed instanceof SLIP10Ed25519MoneroPublicKey,
    compressed instanceof SLIP10Ed25519MoneroPublicKey,
    isAllBytesEqual(
        uncompressed.rawUncompressed(),
        slip10Ed25519MoneroPublicKey.rawUncompressed(),
        eccSLIP10Ed25519MoneroPublicKey.rawUncompressed(),
        SLIP10Ed25519MoneroPublicKey.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed()
    ),
    isAllBytesEqual(
        compressed.rawCompressed(),
        slip10Ed25519MoneroPublicKey.rawCompressed(),
        eccSLIP10Ed25519MoneroPublicKey.rawCompressed(),
        SLIP10Ed25519MoneroPublicKey.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed()
    )
);

