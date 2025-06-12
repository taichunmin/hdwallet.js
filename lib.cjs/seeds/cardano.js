"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardanoSeed = void 0;
const cbor2_1 = require("cbor2");
const seed_1 = require("./seed");
const bip39_1 = require("./bip39");
const cryptocurrencies_1 = require("../cryptocurrencies");
const mnemonics_1 = require("../mnemonics");
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
class CardanoSeed extends seed_1.Seed {
    constructor(seed, options = {
        cardanoType: cryptocurrencies_1.Cardano.TYPES.BYRON_ICARUS
    }) {
        if (options.cardanoType && !cryptocurrencies_1.Cardano.TYPES.isCardanoType(options.cardanoType)) {
            throw new exceptions_1.SeedError('Invalid Cardano type', {
                expected: cryptocurrencies_1.Cardano.TYPES.getCardanoTypes(), got: options.cardanoType
            });
        }
        super(seed, options);
    }
    static getName() {
        return 'Cardano';
    }
    getCardanoType() {
        if (!this.options?.cardanoType) {
            throw new exceptions_1.SeedError('cardanoType is not found');
        }
        return this.options?.cardanoType;
    }
    static fromMnemonic(mnemonic, options = {
        cardanoType: cryptocurrencies_1.Cardano.TYPES.BYRON_ICARUS
    }) {
        switch (options.cardanoType) {
            case cryptocurrencies_1.Cardano.TYPES.BYRON_ICARUS:
                return this.generateByronIcarus(mnemonic);
            case cryptocurrencies_1.Cardano.TYPES.BYRON_LEDGER:
                return this.generateByronLedger(mnemonic, options.passphrase);
            case cryptocurrencies_1.Cardano.TYPES.BYRON_LEGACY:
                return this.generateByronLegacy(mnemonic);
            case cryptocurrencies_1.Cardano.TYPES.SHELLEY_ICARUS:
                return this.generateShelleyIcarus(mnemonic);
            case cryptocurrencies_1.Cardano.TYPES.SHELLEY_LEDGER:
                return this.generateShelleyLedger(mnemonic, options.passphrase);
            default:
                throw new exceptions_1.SeedError('Invalid Cardano type', {
                    expected: cryptocurrencies_1.Cardano.TYPES.getCardanoTypes(), got: options.cardanoType
                });
        }
    }
    static generateByronIcarus(mnemonic) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!mnemonics_1.BIP39Mnemonic.isValid(phrase)) {
            throw new exceptions_1.MnemonicError(`Invalid Cardano mnemonic words`);
        }
        return mnemonics_1.BIP39Mnemonic.decode(phrase);
    }
    static generateByronLedger(mnemonic, passphrase) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        return bip39_1.BIP39Seed.fromMnemonic(phrase, { passphrase: passphrase });
    }
    static generateByronLegacy(mnemonic) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!mnemonics_1.BIP39Mnemonic.isValid(phrase)) {
            throw new exceptions_1.MnemonicError(`Invalid Cardano mnemonic words`);
        }
        const decoded = mnemonics_1.BIP39Mnemonic.decode(phrase);
        const rawBytes = (0, utils_1.hexToBytes)(decoded);
        const cborBytes = (0, cbor2_1.encode)(rawBytes);
        const hash = (0, crypto_1.blake2b256)(cborBytes);
        return (0, utils_1.bytesToString)(hash);
    }
    static generateShelleyIcarus(mnemonic) {
        return this.generateByronIcarus(mnemonic);
    }
    static generateShelleyLedger(mnemonic, passphrase) {
        return this.generateByronLedger(mnemonic, passphrase);
    }
}
exports.CardanoSeed = CardanoSeed;
//# sourceMappingURL=cardano.js.map