// SPDX-License-Identifier: MIT
import { Entropy } from './entropy';
import { AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS } from './algorand';
import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from './bip39';
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from './electrum/v1';
import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from './electrum/v2';
import { MoneroEntropy, MONERO_ENTROPY_STRENGTHS } from './monero';
import { EntropyError } from '../exceptions';
export class ENTROPIES {
    static dictionary = {
        [AlgorandEntropy.getName()]: AlgorandEntropy,
        [BIP39Entropy.getName()]: BIP39Entropy,
        [ElectrumV1Entropy.getName()]: ElectrumV1Entropy,
        [ElectrumV2Entropy.getName()]: ElectrumV2Entropy,
        [MoneroEntropy.getName()]: MoneroEntropy
    };
    static getNames() {
        return Object.keys(this.dictionary);
    }
    static getClasses() {
        return Object.values(this.dictionary);
    }
    static getEntropyClass(name) {
        if (!this.isEntropy(name)) {
            throw new EntropyError('Invalid Entropy name', { expected: this.getNames(), got: name });
        }
        return this.dictionary[name];
    }
    static isEntropy(name) {
        return this.getNames().includes(name);
    }
}
export { Entropy, AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS, BIP39Entropy, BIP39_ENTROPY_STRENGTHS, ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS, ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS, MoneroEntropy, MONERO_ENTROPY_STRENGTHS };
//# sourceMappingURL=index.js.map