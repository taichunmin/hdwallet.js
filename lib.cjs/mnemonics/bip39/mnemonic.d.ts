import { Mnemonic } from '../mnemonic';
import { Entropy } from '../../entropies';
import { MnemonicOptionsInterface, BIP39MnemonicLanguagesInterface, BIP39MnemonicWordsInterface } from '../../interfaces';
export declare const BIP39_MNEMONIC_WORDS: BIP39MnemonicWordsInterface;
export declare const BIP39_MNEMONIC_LANGUAGES: BIP39MnemonicLanguagesInterface;
export declare class BIP39Mnemonic extends Mnemonic {
    static wordBitLength: number;
    static wordsListNumber: number;
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