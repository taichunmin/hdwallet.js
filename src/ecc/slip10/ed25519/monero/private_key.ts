// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPrivateKey, IPublicKey } from '../../../index';
import { SLIP10Ed25519PrivateKey } from '../../index';
import { SLIP10Ed25519MoneroPublicKey } from './public_key';
import { pointScalarMulBase } from '../../../../libs/ed25519-utils';
import { bytesToString } from '../../../../utils';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519MoneroPrivateKey extends SLIP10Ed25519PrivateKey {

  static getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  static fromBytes(bytes: Uint8Array): IPrivateKey {
    return super.fromBytes(bytes) as SLIP10Ed25519MoneroPrivateKey;
  }

  publicKey(): IPublicKey {
    const verifyKey = ec.keyFromPublic(
        bytesToString(pointScalarMulBase(this.privateKey.secret()))
    );
    return SLIP10Ed25519MoneroPublicKey.fromBytes(
        verifyKey.getPublic()
    );
  }
}
