// SPDX-License-Identifier: MIT
export class PublicKey {
    publicKey;
    constructor(publicKey) {
        this.publicKey = publicKey;
    }
    getName() {
        throw new Error('Must override getName()');
    }
    static fromBytes(publicKey) {
        throw new Error('Must override fromBytes()');
    }
    static fromPoint(point) {
        throw new Error('Must override fromPoint()');
    }
    static getCompressedLength() {
        throw new Error('Must override compressedLength()');
    }
    static getUncompressedLength() {
        throw new Error('Must override uncompressedLength()');
    }
    static isValidBytes(bytes) {
        try {
            this.fromBytes(bytes);
            return true;
        }
        catch {
            return false;
        }
    }
    static isValidPoint(point) {
        try {
            this.fromPoint(point);
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=public-key.js.map