// SPDX-License-Identifier: MIT
import { BIP49Derivation, CHANGES } from '../derivations';
import { Bitcoin } from '../cryptocurrencies';
import { P2WPKHInP2SHAddress } from '../addresses';
import { BIP44HD } from './bip44';
import { PUBLIC_KEY_TYPES } from '../consts';
import { serialize } from '../keys';
import { integerToBytes, ensureTypeMatch } from '../utils';
import { DerivationError } from '../exceptions';
export class BIP49HD extends BIP44HD {
    constructor(options = {
        publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
    }) {
        super(options);
        this.coinType = options.coinType ?? Bitcoin.COIN_TYPE;
        this.derivation = new BIP49Derivation({
            coinType: this.coinType,
            account: options.account ?? 0,
            change: options.change ?? CHANGES.EXTERNAL_CHAIN,
            address: options.account ?? 0
        });
    }
    static getName() {
        return 'BIP49';
    }
    fromDerivation(derivation) {
        Object.getPrototypeOf(BIP44HD.prototype).cleanDerivation.call(this);
        this.derivation = ensureTypeMatch(derivation, BIP49Derivation, { errorClass: DerivationError });
        for (const index of this.derivation.getIndexes()) {
            this.drive(index);
        }
        return this;
    }
    updateDerivation(derivation) {
        this.fromDerivation(derivation);
        return this;
    }
    cleanDerivation() {
        Object.getPrototypeOf(BIP44HD.prototype).cleanDerivation.call(this);
        for (const index of this.derivation.getIndexes()) {
            this.drive(index);
        }
        return this;
    }
    getRootXPrivateKey(version = Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true) {
        if (!this.getRootPrivateKey() || !this.getRootChainCode())
            return null;
        return serialize(typeof version === 'number' ? integerToBytes(version) : version, this.rootDepth, new Uint8Array(4), this.rootIndex, this.getRootChainCode(), '00' + this.getRootPrivateKey(), encoded);
    }
    getRootXPublicKey(version = Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true) {
        if (!this.getRootChainCode())
            return null;
        return serialize(typeof version === 'number' ? integerToBytes(version) : version, this.rootDepth, new Uint8Array(4), this.rootIndex, this.getRootChainCode(), this.getRootPublicKey(PUBLIC_KEY_TYPES.COMPRESSED), encoded);
    }
    getXPrivateKey(version = Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true) {
        if (!this.getPrivateKey() || !this.getChainCode())
            return null;
        return serialize(typeof version === 'number' ? integerToBytes(version) : version, this.depth, this.getParentFingerprint(), this.index, this.getChainCode(), '00' + this.getPrivateKey(), encoded);
    }
    getXPublicKey(version = Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true) {
        if (!this.getChainCode())
            return null;
        return serialize(typeof version === 'number' ? integerToBytes(version) : version, this.depth, this.getParentFingerprint(), this.index, this.getChainCode(), this.getPublicKey(PUBLIC_KEY_TYPES.COMPRESSED), encoded);
    }
    getAddress(options = {
        scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX
    }) {
        return P2WPKHInP2SHAddress.encode(this.publicKey, {
            scriptAddressPrefix: options.scriptAddressPrefix ?? Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
            publicKeyType: this.publicKeyType
        });
    }
}
//# sourceMappingURL=bip49.js.map