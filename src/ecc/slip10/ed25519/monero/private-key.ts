// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { PublicKey } from '../../../public-key';
import { SLIP10Ed25519PrivateKey } from '../../ed25519';
import { SLIP10Ed25519MoneroPublicKey } from './public-key';
import { pointScalarMulBase } from '../../../../libs/ed25519-utils';
import { bytesToString } from '../../../../utils';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519MoneroPrivateKey extends SLIP10Ed25519PrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  publicKey(): PublicKey {
    const verifyKey = ec.keyFromPublic(
        bytesToString(pointScalarMulBase(this.privateKey.secret()))
    );
    return SLIP10Ed25519MoneroPublicKey.fromBytes(
        verifyKey.getPublic()
    );
  }
}
