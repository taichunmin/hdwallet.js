import { Entropy } from './entropy';
import { AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS } from './algorand';
import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from './bip39';
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from './electrum/v1';
import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from './electrum/v2';
import { MoneroEntropy, MONERO_ENTROPY_STRENGTHS } from './monero';
export declare class ENTROPIES {
    static dictionary: Record<string, typeof Entropy>;
    static getNames(): string[];
    static getClasses(): typeof Entropy[];
    static getEntropyClass(name: string): typeof Entropy | any;
    static isEntropy(name: string): boolean;
}
export { Entropy, AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS, BIP39Entropy, BIP39_ENTROPY_STRENGTHS, ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS, ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS, MoneroEntropy, MONERO_ENTROPY_STRENGTHS };
//# sourceMappingURL=index.d.ts.map