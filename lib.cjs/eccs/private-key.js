"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKey = void 0;
class PrivateKey {
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
exports.PrivateKey = PrivateKey;
//# sourceMappingURL=private-key.js.map