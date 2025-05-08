// SPDX-License-Identifier: MIT

import { IEllipticCurveCryptography } from '../../../iecc';
import { IPoint } from '../../../ipoint';
import { IPublicKey } from '../../../ipublic-key';
import { IPrivateKey } from '../../../iprivate-key';
import { SLIP10Ed25519ECC } from '../index';
import { SLIP10Ed25519MoneroPoint } from './point';
import { SLIP10Ed25519MoneroPublicKey } from './public-key';
import { SLIP10Ed25519MoneroPrivateKey } from './private-key';

export class SLIP10Ed25519MoneroECC extends IEllipticCurveCryptography {
  static NAME: string = 'SLIP10-Ed25519-Monero';
  static ORDER: bigint = SLIP10Ed25519ECC.ORDER;
  static GENERATOR: IPoint = SLIP10Ed25519ECC.GENERATOR;
  static POINT: typeof IPoint = SLIP10Ed25519MoneroPoint;
  static PUBLIC_KEY: typeof IPublicKey = SLIP10Ed25519MoneroPublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = SLIP10Ed25519MoneroPrivateKey;
}

export {
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey
};