// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import {
  EllipticCurveCryptography, Point, PublicKey, PrivateKey
} from '../../ecc';
import { SLIP10Nist256p1Point as _SLIP10Nist256p1Point } from './point';
import { SLIP10Nist256p1PublicKey as _SLIP10Nist256p1PublicKey } from './public-key';
import { SLIP10Nist256p1PrivateKey as _SLIP10Nist256p1PrivateKey } from './private-key';

const ec = new elliptic.ec('p256');

export class SLIP10Nist256p1ECC extends EllipticCurveCryptography {
  
  static NAME: string = 'SLIP10-Nist256p1';
  static ORDER: bigint = BigInt(ec.curve.n.toString(10));
  static GENERATOR: Point = _SLIP10Nist256p1Point.fromCoordinates(
    BigInt(ec.curve.g.getX().toString(10)), BigInt(ec.curve.g.getY().toString(10))
  );
  static POINT: typeof Point = _SLIP10Nist256p1Point;
  static PUBLIC_KEY: typeof PublicKey = _SLIP10Nist256p1PublicKey;
  static PRIVATE_KEY: typeof PrivateKey = _SLIP10Nist256p1PrivateKey;
}

export {
  _SLIP10Nist256p1Point as SLIP10Nist256p1Point,
  _SLIP10Nist256p1PublicKey as SLIP10Nist256p1PublicKey,
  _SLIP10Nist256p1PrivateKey as SLIP10Nist256p1PrivateKey
}
