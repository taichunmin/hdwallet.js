// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  validateAndGetPublicKey
} from '../../src/ecc';
import {
  // Secp256k1
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey
} from '../../src/ecc/slip10/secp256k1';

import { hexToBytes, bytesToString, isAllEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.getECC(SLIP10Secp256k1ECC.NAME);

const keys = {
    ecc: 'SLIP10-Secp256k1',
    privateKey: hexToBytes('b66022fff8b6322f8b8fa444d6d097457b6b9e7bb05add5b75f9c827df7bd3b6'),
    publicKey: {
        uncompressed: hexToBytes('0474a436044b4904bbd7a074b098d65fad39fc5b66f28da8440f10dbcf86568429aae5b09b4de9cee5d2f9f98044f688aa98f910134a8e87eff28ec5ba35ddf273'),
        compressed: hexToBytes('0374a436044b4904bbd7a074b098d65fad39fc5b66f28da8440f10dbcf86568429')
    },
    point: {
        raw: hexToBytes('0374a436044b4904bbd7a074b098d65fad39fc5b66f28da8440f10dbcf86568429'),
        x: BigInt('52758426164353529380574599868388529660378638078403259786555024244882051335209'),
        y: BigInt('77299011131343534153324845262253313862502891835680337281121079752838774387315')
    }
}

const slip10Secp256k1PrivateKey: IPrivateKey = SLIP10Secp256k1PrivateKey.fromBytes(keys.privateKey);
const eccSLIP10Secp256k1PrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(keys.privateKey);

console.log(
    'Private Key:',
    ecc.NAME === slip10Secp256k1PrivateKey.getName(),
    slip10Secp256k1PrivateKey instanceof SLIP10Secp256k1PrivateKey,
    eccSLIP10Secp256k1PrivateKey instanceof SLIP10Secp256k1PrivateKey,
    isAllEqual(
        slip10Secp256k1PrivateKey.getRaw(),
        eccSLIP10Secp256k1PrivateKey.getRaw(),
        keys.privateKey
    )
);

const rawSLIP10Secp256k1Point = SLIP10Secp256k1Point.fromBytes(keys.point.raw)
const coordinatesSLIP10Secp256k1Point = SLIP10Secp256k1Point.fromCoordinates(keys.point.x, keys.point.y)

console.log(
    'Point:',
    rawSLIP10Secp256k1Point instanceof SLIP10Secp256k1Point,
    coordinatesSLIP10Secp256k1Point instanceof SLIP10Secp256k1Point,
    isAllEqual(
        rawSLIP10Secp256k1Point.getRaw(),
        coordinatesSLIP10Secp256k1Point .getRaw(),
        ecc.POINT.fromBytes(keys.point.raw).getRaw(),
        ecc.POINT.fromCoordinates(keys.point.x, keys.point.y).getRaw(),
        keys.point.raw
    )
);

const slip10Secp256k1PublicKey: IPublicKey = slip10Secp256k1PrivateKey.getPublicKey();
const eccSLIP10Secp256k1PublicKey: IPublicKey = eccSLIP10Secp256k1PrivateKey.getPublicKey();
const uncompressedPublicKey: IPublicKey = validateAndGetPublicKey(keys.publicKey.uncompressed, SLIP10Secp256k1PublicKey);
const compressedPublicKey: IPublicKey = validateAndGetPublicKey(keys.publicKey.compressed, SLIP10Secp256k1PublicKey);

console.log(
    '(Uncompressed) Public Key:',
    slip10Secp256k1PublicKey instanceof SLIP10Secp256k1PublicKey,
    eccSLIP10Secp256k1PublicKey instanceof SLIP10Secp256k1PublicKey,
    uncompressedPublicKey instanceof SLIP10Secp256k1PublicKey,
    isAllEqual(
        uncompressedPublicKey.getRawUncompressed(),
        slip10Secp256k1PublicKey.getRawUncompressed(),
        eccSLIP10Secp256k1PublicKey.getRawUncompressed(),
        SLIP10Secp256k1PublicKey.fromBytes(keys.publicKey.uncompressed).getRawUncompressed(),
        SLIP10Secp256k1PublicKey.fromPoint(rawSLIP10Secp256k1Point).getRawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(keys.publicKey.uncompressed).getRawUncompressed(),
        ecc.PUBLIC_KEY.fromPoint(coordinatesSLIP10Secp256k1Point).getRawUncompressed(),
        keys.publicKey.uncompressed
    )
);

console.log(
    '(Compressed) Public Key:',
    slip10Secp256k1PublicKey instanceof SLIP10Secp256k1PublicKey,
    eccSLIP10Secp256k1PublicKey instanceof SLIP10Secp256k1PublicKey,
    compressedPublicKey instanceof SLIP10Secp256k1PublicKey,
    isAllEqual(
        compressedPublicKey.getRawCompressed(),
        slip10Secp256k1PublicKey.getRawCompressed(),
        eccSLIP10Secp256k1PublicKey.getRawCompressed(),
        SLIP10Secp256k1PublicKey.fromBytes(keys.publicKey.compressed).getRawCompressed(),
        SLIP10Secp256k1PublicKey.fromPoint(rawSLIP10Secp256k1Point).getRawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(keys.publicKey.compressed).getRawCompressed(),
        ecc.PUBLIC_KEY.fromPoint(coordinatesSLIP10Secp256k1Point).getRawCompressed(),
        keys.publicKey.compressed
    )
);

console.log(
    'ECC:',
    isAllEqual(
        SLIP10Secp256k1ECC.NAME,
        ecc.NAME,
        slip10Secp256k1PrivateKey.getName(),
        eccSLIP10Secp256k1PrivateKey.getName(),
        rawSLIP10Secp256k1Point.getName(),
        coordinatesSLIP10Secp256k1Point.getName(),
        slip10Secp256k1PublicKey.getName(),
        eccSLIP10Secp256k1PublicKey.getName(),
        keys.ecc
    ), '\n'
);

console.log('Elliptic Curve Cryptography:', keys.ecc);
console.log('Private Key:', bytesToString(keys.privateKey));
console.log('Point:', bytesToString(keys.point.raw));
console.log('    x:', keys.point.x);
console.log('    y:', keys.point.y);
console.log('(Uncompressed) Public Key:', bytesToString(keys.publicKey.uncompressed));
console.log('(Compressed) Public Key:', bytesToString(keys.publicKey.compressed));
