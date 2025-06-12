import { Point } from '../../../point';
import { SLIP10Ed25519PublicKey } from '../../ed25519';
export declare class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {
    getName(): string;
    getRawCompressed(): Uint8Array;
    static getCompressedLength(): number;
    getPoint(): Point;
}
//# sourceMappingURL=public-key.d.ts.map