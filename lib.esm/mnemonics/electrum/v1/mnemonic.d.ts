import { Mnemonic } from '../../mnemonic';
import { Entropy } from '../../../entropies';
import { MnemonicOptionsInterface, ElectrumV1MnemonicLanguagesInterface, ElectrumV1MnemonicWordsInterface } from '../../../interfaces';
export declare const ELECTRUM_V1_MNEMONIC_WORDS: ElectrumV1MnemonicWordsInterface;
export declare const ELECTRUM_V1_MNEMONIC_LANGUAGES: ElectrumV1MnemonicLanguagesInterface;
export declare class ElectrumV1Mnemonic extends Mnemonic {
    static wordsListNumber: number;
    static wordsList: number[];
    static wordsToStrength: Record<number, number>;
    static languages: string[];
    static wordLists: Record<string, string[]>;
    static getName(): string;
    static fromWords(count: number, language: string, options?: MnemonicOptionsInterface): string;
    static fromEntropy(entropy: string | Uint8Array | Entropy, language: string, options?: MnemonicOptionsInterface): string;
    static encode(entropy: string | Uint8Array, language: string, options?: MnemonicOptionsInterface): string;
    static decode(mnemonic: string | string[], options?: MnemonicOptionsInterface): string;
    static isValid(input: string | string[], options?: MnemonicOptionsInterface): boolean;
    static normalize(input: string | string[]): string[];
}
//# sourceMappingURL=mnemonic.d.ts.map