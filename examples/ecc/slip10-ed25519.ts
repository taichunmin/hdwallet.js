// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  validateAndGetPublicKey
} from '../../src/ecc';
import {
  SLIP10Ed25519ECC,
  SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,
} from '../../src/ecc/slip10/ed25519';
import { hexToBytes, bytesToString, isAllEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.getECC(SLIP10Ed25519ECC.NAME);

const keys = {
    ecc: 'SLIP10-Ed25519',
    privateKey: hexToBytes('bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07'),
    publicKey: {
        uncompressed: hexToBytes('00d14696583ee9144878635b557d515a502b04366818dfe7765737746b4f57978d'),
        compressed: hexToBytes('00d14696583ee9144878635b557d515a502b04366818dfe7765737746b4f57978d')
    },
    point: {
        raw: hexToBytes('d14696583ee9144878635b557d515a502b04366818dfe7765737746b4f57978d'),
        x: BigInt('35008547582340824597639173221735807482318787407965447203743372716499096148063'),
        y: BigInt('6147463531448180337884122237947428143499725886130497179241919515820002002641')
    }
}

const slip10Ed25519PrivateKey: IPrivateKey = SLIP10Ed25519PrivateKey.fromBytes(keys.privateKey);
const eccSLIP10Ed25519PrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(keys.privateKey);

console.log(
    'Private Key:',
    ecc.NAME === slip10Ed25519PrivateKey.getName(),
    slip10Ed25519PrivateKey instanceof SLIP10Ed25519PrivateKey,
    eccSLIP10Ed25519PrivateKey instanceof SLIP10Ed25519PrivateKey,
    isAllEqual(
        slip10Ed25519PrivateKey.getRaw(),
        eccSLIP10Ed25519PrivateKey.getRaw(),
        keys.privateKey
    )
);

const rawSLIP10Ed25519Point = SLIP10Ed25519Point.fromBytes(keys.point.raw)
const coordinatesSLIP10Ed25519Point = SLIP10Ed25519Point.fromCoordinates(keys.point.x, keys.point.y)

console.log(
    'Point:',
    rawSLIP10Ed25519Point instanceof SLIP10Ed25519Point,
    coordinatesSLIP10Ed25519Point instanceof SLIP10Ed25519Point,
    isAllEqual(
        rawSLIP10Ed25519Point.getRaw(),
        coordinatesSLIP10Ed25519Point .getRaw(),
        ecc.POINT.fromBytes(keys.point.raw).getRaw(),
        ecc.POINT.fromCoordinates(keys.point.x, keys.point.y).getRaw(),
        keys.point.raw
    )
);

const slip10Ed25519PublicKey: IPublicKey = slip10Ed25519PrivateKey.getPublicKey();
const eccSLIP10Ed25519PublicKey: IPublicKey = eccSLIP10Ed25519PrivateKey.getPublicKey();
const uncompressedPublicKey: IPublicKey = validateAndGetPublicKey(keys.publicKey.uncompressed, SLIP10Ed25519PublicKey);
const compressedPublicKey: IPublicKey = validateAndGetPublicKey(keys.publicKey.compressed, SLIP10Ed25519PublicKey);

console.log(
    '(Uncompressed) Public Key:',
    slip10Ed25519PublicKey instanceof SLIP10Ed25519PublicKey,
    eccSLIP10Ed25519PublicKey instanceof SLIP10Ed25519PublicKey,
    uncompressedPublicKey instanceof SLIP10Ed25519PublicKey,
    isAllEqual(
        uncompressedPublicKey.getRawUncompressed(),
        slip10Ed25519PublicKey.getRawUncompressed(),
        eccSLIP10Ed25519PublicKey.getRawUncompressed(),
        SLIP10Ed25519PublicKey.fromBytes(keys.publicKey.uncompressed).getRawUncompressed(),
        SLIP10Ed25519PublicKey.fromPoint(rawSLIP10Ed25519Point).getRawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(keys.publicKey.uncompressed).getRawUncompressed(),
        ecc.PUBLIC_KEY.fromPoint(coordinatesSLIP10Ed25519Point).getRawUncompressed(),
        keys.publicKey.uncompressed
    )
);

console.log(
    '(Compressed) Public Key:',
    slip10Ed25519PublicKey instanceof SLIP10Ed25519PublicKey,
    eccSLIP10Ed25519PublicKey instanceof SLIP10Ed25519PublicKey,
    compressedPublicKey instanceof SLIP10Ed25519PublicKey,
    isAllEqual(
        compressedPublicKey.getRawCompressed(),
        slip10Ed25519PublicKey.getRawCompressed(),
        eccSLIP10Ed25519PublicKey.getRawCompressed(),
        SLIP10Ed25519PublicKey.fromBytes(keys.publicKey.compressed).getRawCompressed(),
        SLIP10Ed25519PublicKey.fromPoint(rawSLIP10Ed25519Point).getRawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(keys.publicKey.compressed).getRawCompressed(),
        ecc.PUBLIC_KEY.fromPoint(coordinatesSLIP10Ed25519Point).getRawCompressed(),
        keys.publicKey.compressed
    )
);

console.log(
    'ECC:',
    isAllEqual(
        SLIP10Ed25519ECC.NAME,
        ecc.NAME,
        slip10Ed25519PrivateKey.getName(),
        eccSLIP10Ed25519PrivateKey.getName(),
        rawSLIP10Ed25519Point.getName(),
        coordinatesSLIP10Ed25519Point.getName(),
        slip10Ed25519PublicKey.getName(),
        eccSLIP10Ed25519PublicKey.getName(),
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
