// SPDX-License-Identifier: MIT

import { SLIP10Ed25519ECC } from '../index';
import { 
  IEllipticCurveCryptography, IPoint, IPublicKey, IPrivateKey
} from '../../../index';
import { SLIP10Ed25519Blake2bPoint } from './point';
import { SLIP10Ed25519Blake2bPublicKey } from './public-key';
import { SLIP10Ed25519Blake2bPrivateKey } from './private-key';

export class SLIP10Ed25519Blake2bECC extends IEllipticCurveCryptography {

  static NAME: string = 'SLIP10-Ed25519-Blake2b';
  static ORDER: bigint = SLIP10Ed25519ECC.ORDER;
  static GENERATOR: IPoint = SLIP10Ed25519ECC.GENERATOR;
  static POINT: typeof IPoint = SLIP10Ed25519Blake2bPoint;
  static PUBLIC_KEY: typeof IPublicKey = SLIP10Ed25519Blake2bPublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = SLIP10Ed25519Blake2bPrivateKey;
}

export {
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey
};
