// SPDX-License-Identifier: MIT

import { IPoint } from './ipoint';
import { IPublicKey } from './ipublic-key';
import { IPrivateKey } from './iprivate-key';

export abstract class IEllipticCurveCryptography {

  static NAME: string;
  static ORDER: bigint;
  static GENERATOR: IPoint;
  static POINT: typeof IPoint;
  static PUBLIC_KEY: typeof IPublicKey;
  static PRIVATE_KEY: typeof IPrivateKey;
}
