// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { KHOLAW_ED25519_CONST } from '../../../const';
import { SLIP10Ed25519PrivateKey } from '../../slip10/ed25519';
import { KholawEd25519PublicKey } from './public-key';
import { IPrivateKey, OptionsPrivateKey } from '../../iprivate-key';
import { pointScalarMulBase } from '../../../libs/ed25519-utils';
import { bytesToString } from '../../../utils';
import { IPublicKey } from '../../ipublic-key';

const ec = new elliptic.eddsa('ed25519');
type EdDSAKeyPair = elliptic.eddsa.KeyPair;

export class KholawEd25519PrivateKey extends SLIP10Ed25519PrivateKey {

  constructor(
      privateKey: EdDSAKeyPair, options: OptionsPrivateKey
  ) {
    if (!options.extendedKey) {
      throw new Error('Extended key is required');
    }
    if (options.extendedKey.length !== SLIP10Ed25519PrivateKey.size()) {
      throw new Error('Invalid extended key length');
    }
    super(privateKey, options);
  }

  getName(): string {
    return 'Kholaw-Ed25519';
  }

  static fromBytes(privateKey: Uint8Array): IPrivateKey {

    if (privateKey.length !== KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    const privateKeyBytes = privateKey.slice(0, SLIP10Ed25519PrivateKey.size());
    const extendedKeyBytes = privateKey.slice(SLIP10Ed25519PrivateKey.size());
    const kp = ec.keyFromSecret(Buffer.from(privateKeyBytes));
    return new KholawEd25519PrivateKey(kp, { extendedKey: extendedKeyBytes });
  }

  static size(): number {
    return KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  raw(): Uint8Array {
    const secret = this.privateKey.secret();
    const combined = new Uint8Array(KholawEd25519PrivateKey.size());
    combined.set(new Uint8Array(secret));
    if (!this.options.extendedKey) throw new Error('Extended key is required');
    combined.set(this.options.extendedKey, SLIP10Ed25519PrivateKey.size());
    return combined;
  }

  publicKey(): IPublicKey {
    const verifyKey = ec.keyFromPublic(
        bytesToString(pointScalarMulBase(this.privateKey.secret()))
    );
    return KholawEd25519PublicKey.fromBytes(
        verifyKey.getPublic()
    );
  }
}