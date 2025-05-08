// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPoint } from '../../../ipoint';
import { SLIP10Ed25519MoneroPoint } from './point';
import { SLIP10Ed25519PublicKey } from '../../ed25519';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  rawCompressed(): Uint8Array {
    return new Uint8Array(ec.encodePoint(this.publicKey));
  }

  point(): IPoint {
    return new SLIP10Ed25519MoneroPoint(this.publicKey);
  }
}