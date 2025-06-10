// SPDX-License-Identifier: MIT

import { PublicKey } from '../../../public-key';
import { pointScalarMulBase } from '../../../../libs/ed25519-utils';
import { SLIP10Ed25519MoneroPublicKey } from './public-key';
import { SLIP10Ed25519PrivateKey } from '../../ed25519';

export class SLIP10Ed25519MoneroPrivateKey extends SLIP10Ed25519PrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  getPublicKey(): PublicKey {
    return SLIP10Ed25519MoneroPublicKey.fromBytes(
      pointScalarMulBase(this.getRaw())
    );
  }
}
