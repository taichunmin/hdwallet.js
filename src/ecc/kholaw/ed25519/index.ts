// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography, IPoint, IPublicKey, IPrivateKey
} from '../../index';
import { SLIP10Ed25519ECC } from '../../slip10';
import { KholawEd25519Point } from './point';
import { KholawEd25519PublicKey } from './public-key';
import { KholawEd25519PrivateKey } from './private-key';

export class KholawEd25519ECC extends IEllipticCurveCryptography {

  static NAME: string = 'Kholaw-Ed25519';
  static ORDER: bigint = SLIP10Ed25519ECC.ORDER;
  static GENERATOR: IPoint = SLIP10Ed25519ECC.GENERATOR;
  static POINT: typeof IPoint = KholawEd25519Point;
  static PUBLIC_KEY: typeof IPublicKey = KholawEd25519PublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = KholawEd25519PrivateKey;
}

export {
  KholawEd25519Point,
  KholawEd25519PublicKey,
  KholawEd25519PrivateKey
};