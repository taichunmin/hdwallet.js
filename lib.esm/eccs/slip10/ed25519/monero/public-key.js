// SPDX-License-Identifier: MIT
import { SLIP10Ed25519MoneroPoint } from './point';
import { SLIP10Ed25519PublicKey } from '../../ed25519';
import { SLIP10_ED25519_CONST } from '../../../../consts';
export class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {
    getName() {
        return 'SLIP10-Ed25519-Monero';
    }
    getRawCompressed() {
        return this.publicKey.toRawBytes();
    }
    static getCompressedLength() {
        return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH;
    }
    getPoint() {
        return new SLIP10Ed25519MoneroPoint(this.publicKey);
    }
}
//# sourceMappingURL=public-key.js.map