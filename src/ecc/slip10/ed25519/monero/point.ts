// SPDX-License-Identifier: MIT

import { SLIP10Ed25519Point } from '../point';

export class SLIP10Ed25519MoneroPoint extends SLIP10Ed25519Point {

  static getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }
}