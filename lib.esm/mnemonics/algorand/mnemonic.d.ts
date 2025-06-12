import { Mnemonic } from '../mnemonic';
import { Entropy } from '../../entropies';
import { MnemonicOptionsInterface, AlgorandMnemonicLanguagesInterface, AlgorandMnemonicWordsInterface } from '../../interfaces';
export declare const ALGORAND_MNEMONIC_WORDS: AlgorandMnemonicWordsInterface;
export declare const ALGORAND_MNEMONIC_LANGUAGES: AlgorandMnemonicLanguagesInterface;
export declare class AlgorandMnemonic extends Mnemonic {
    static checksumLength: number;
    static wordBitLength: number;
    static wordsList: number[];
    static wordsToEntropyStrength: Record<number, number>;
    static languages: string[];
    static wordLists: Record<string, string[]>;
    static getName(): string;
    static fromWords(words: number, language: string, options?: MnemonicOptionsInterface): string;
    static fromEntropy(entropy: string | Uint8Array | Entropy, language: string, options?: MnemonicOptionsInterface): string;
    static encode(entropyInput: string | Uint8Array, language: string, options?: MnemonicOptionsInterface): string;
    static decode(mnemonic: string | string[], options?: MnemonicOptionsInterface): string;
    static normalize(input: string | string[]): string[];
}
//# sourceMappingURL=mnemonic.d.ts.map