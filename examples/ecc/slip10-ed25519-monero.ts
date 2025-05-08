// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  validateAndGetPublicKey
} from '../../src/ecc';
import {
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey,
} from '../../src/ecc/slip10/ed25519/monero';
import { hexToBytes, bytesToString, isAllEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(SLIP10Ed25519MoneroECC.NAME);

const keys = {
    ecc: 'SLIP10-Ed25519-Monero',
    privateKey: hexToBytes('bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07'),
    publicKey: {
        uncompressed: hexToBytes('628247d3de93857cdd360fee4aef9a67ecfebedfe8eaec9cf6be35eacc895ca7'),
        compressed: hexToBytes('628247d3de93857cdd360fee4aef9a67ecfebedfe8eaec9cf6be35eacc895ca7')
    },
    point: {
        raw: hexToBytes('628247d3de93857cdd360fee4aef9a67ecfebedfe8eaec9cf6be35eacc895ca7'),
        x: BigInt('29078407399097928298542937704975150613766572636435642857509307729044618011935'),
        y: BigInt('17803702088450816962920827141125906638766406094286540639665541388805331190370')
    }
}

const slip10Ed25519MoneroPrivateKey: IPrivateKey = SLIP10Ed25519MoneroPrivateKey.fromBytes(keys.privateKey);
const eccSLIP10Ed25519MoneroPrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(keys.privateKey);

console.log(
    'Private Key:',
    ecc.NAME === slip10Ed25519MoneroPrivateKey.getName(),
    slip10Ed25519MoneroPrivateKey instanceof SLIP10Ed25519MoneroPrivateKey,
    eccSLIP10Ed25519MoneroPrivateKey instanceof SLIP10Ed25519MoneroPrivateKey,
    isAllEqual(
        slip10Ed25519MoneroPrivateKey.raw(),
        eccSLIP10Ed25519MoneroPrivateKey.raw(),
        keys.privateKey
    )
);

const rawSLIP10Ed25519MoneroPoint = SLIP10Ed25519MoneroPoint.fromBytes(keys.point.raw)
const coordinatesSLIP10Ed25519MoneroPoint = SLIP10Ed25519MoneroPoint.fromCoordinates(keys.point.x, keys.point.y)

console.log(
    'Point:',
    rawSLIP10Ed25519MoneroPoint instanceof SLIP10Ed25519MoneroPoint,
    coordinatesSLIP10Ed25519MoneroPoint instanceof SLIP10Ed25519MoneroPoint,
    isAllEqual(
        rawSLIP10Ed25519MoneroPoint.raw(),
        coordinatesSLIP10Ed25519MoneroPoint .raw(),
        ecc.POINT.fromBytes(keys.point.raw).raw(),
        ecc.POINT.fromCoordinates(keys.point.x, keys.point.y).raw(),
        keys.point.raw
    )
);

const slip10Ed25519MoneroPublicKey: IPublicKey = slip10Ed25519MoneroPrivateKey.publicKey();
const eccSLIP10Ed25519MoneroPublicKey: IPublicKey = eccSLIP10Ed25519MoneroPrivateKey.publicKey();
const uncompressedPublicKey: IPublicKey = validateAndGetPublicKey(keys.publicKey.uncompressed, SLIP10Ed25519MoneroPublicKey);
const compressedPublicKey: IPublicKey = validateAndGetPublicKey(keys.publicKey.compressed, SLIP10Ed25519MoneroPublicKey);

console.log(
    '(Uncompressed) Public Key:',
    slip10Ed25519MoneroPublicKey instanceof SLIP10Ed25519MoneroPublicKey,
    eccSLIP10Ed25519MoneroPublicKey instanceof SLIP10Ed25519MoneroPublicKey,
    uncompressedPublicKey instanceof SLIP10Ed25519MoneroPublicKey,
    isAllEqual(
        uncompressedPublicKey.rawUncompressed(),
        slip10Ed25519MoneroPublicKey.rawUncompressed(),
        eccSLIP10Ed25519MoneroPublicKey.rawUncompressed(),
        SLIP10Ed25519MoneroPublicKey.fromBytes(keys.publicKey.uncompressed).rawUncompressed(),
        SLIP10Ed25519MoneroPublicKey.fromPoint(rawSLIP10Ed25519MoneroPoint).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(keys.publicKey.uncompressed).rawUncompressed(),
        ecc.PUBLIC_KEY.fromPoint(coordinatesSLIP10Ed25519MoneroPoint).rawUncompressed(),
        keys.publicKey.uncompressed
    )
);

console.log(
    '(Compressed) Public Key:',
    slip10Ed25519MoneroPublicKey instanceof SLIP10Ed25519MoneroPublicKey,
    eccSLIP10Ed25519MoneroPublicKey instanceof SLIP10Ed25519MoneroPublicKey,
    compressedPublicKey instanceof SLIP10Ed25519MoneroPublicKey,
    isAllEqual(
        compressedPublicKey.rawCompressed(),
        slip10Ed25519MoneroPublicKey.rawCompressed(),
        eccSLIP10Ed25519MoneroPublicKey.rawCompressed(),
        SLIP10Ed25519MoneroPublicKey.fromBytes(keys.publicKey.compressed).rawCompressed(),
        SLIP10Ed25519MoneroPublicKey.fromPoint(rawSLIP10Ed25519MoneroPoint).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(keys.publicKey.compressed).rawCompressed(),
        ecc.PUBLIC_KEY.fromPoint(coordinatesSLIP10Ed25519MoneroPoint).rawCompressed(),
        keys.publicKey.compressed
    )
);

console.log(
    'ECC:',
    isAllEqual(
        SLIP10Ed25519MoneroECC.NAME,
        ecc.NAME,
        slip10Ed25519MoneroPrivateKey.getName(),
        eccSLIP10Ed25519MoneroPrivateKey.getName(),
        rawSLIP10Ed25519MoneroPoint.getName(),
        coordinatesSLIP10Ed25519MoneroPoint.getName(),
        slip10Ed25519MoneroPublicKey.getName(),
        eccSLIP10Ed25519MoneroPublicKey.getName(),
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
