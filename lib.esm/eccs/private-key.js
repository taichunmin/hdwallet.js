// SPDX-License-Identifier: MIT
export class PrivateKey {
    privateKey;
    options;
    constructor(privateKey, options = {}) {
        this.privateKey = privateKey;
        this.options = options;
    }
    getName() {
        throw new Error('Must override getName()');
    }
    static fromBytes(privateKey) {
        throw new Error('Must override fromBytes()');
    }
    static getLength() {
        throw new Error('Must override size()');
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
}
//# sourceMappingURL=private-key.js.map