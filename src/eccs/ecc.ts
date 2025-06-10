// SPDX-License-Identifier: MIT

import { Point as _Point } from './point';
import { PublicKey as _PublicKey } from './public-key';
import { PrivateKey as _PrivateKey } from './private-key';

export class EllipticCurveCryptography {

  static NAME: string;
  static ORDER: bigint;
  static GENERATOR: _Point;
  static POINT: typeof _Point;
  static PUBLIC_KEY: typeof _PublicKey;
  static PRIVATE_KEY: typeof _PrivateKey;
}

export {
  _Point as Point,
  _PublicKey as PublicKey,
  _PrivateKey as PrivateKey,
};
