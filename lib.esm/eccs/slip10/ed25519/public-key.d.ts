import { PublicKey } from '../../public-key';
import { Point } from '../../point';
export declare class SLIP10Ed25519PublicKey extends PublicKey {
    getName(): string;
    static fromBytes(publicKey: Uint8Array): PublicKey;
    static fromPoint(point: Point): PublicKey;
    static getCompressedLength(): number;
    static getUncompressedLength(): number;
    getUnderlyingObject(): any;
    getRawCompressed(): Uint8Array;
    getRawUncompressed(): Uint8Array;
    getPoint(): Point;
}
//# sourceMappingURL=public-key.d.ts.map