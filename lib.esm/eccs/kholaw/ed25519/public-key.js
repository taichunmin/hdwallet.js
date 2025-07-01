// SPDX-License-Identifier: MIT
import { SLIP10Ed25519PublicKey } from '../../slip10';
import { KholawEd25519Point } from './point';
export class KholawEd25519PublicKey extends SLIP10Ed25519PublicKey {
    getName() {
        return 'Kholaw-Ed25519';
    }
    getPoint() {
        return new KholawEd25519Point(this.publicKey);
    }
}
//# sourceMappingURL=public-key.js.map