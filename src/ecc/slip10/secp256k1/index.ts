// SPDX-License-Identifier: MIT

import { 
  IEllipticCurveCryptography, IPoint, IPublicKey, IPrivateKey
} from '../../index';
import { SLIP10Secp256k1Point } from './point';
import { SLIP10Secp256k1PublicKey } from './public_key';
import { SLIP10Secp256k1PrivateKey } from './private_key';

export class SLIP10Secp256k1ECC extends IEllipticCurveCryptography {
    
  static NAME: string = 'SLIP10-Secp256k1';
  static ORDER: bigint = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');
  static GENERATOR: IPoint = SLIP10Secp256k1Point.fromCoordinates(
    BigInt('0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798'),
    BigInt('0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8')
  );
  static POINT: typeof IPoint = SLIP10Secp256k1Point;
  static PUBLIC_KEY: typeof IPublicKey  = SLIP10Secp256k1PublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = SLIP10Secp256k1PrivateKey;
}

export {
    SLIP10Secp256k1Point,
    SLIP10Secp256k1PublicKey,
    SLIP10Secp256k1PrivateKey
}