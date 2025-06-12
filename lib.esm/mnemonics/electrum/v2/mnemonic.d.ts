import { Mnemonic } from '../../mnemonic';
import { Entropy } from '../../../entropies';
import { MnemonicOptionsInterface, ElectrumV2MnemonicLanguagesInterface, ElectrumV2MnemonicTypesInterface, ElectrumV2MnemonicWordsInterface } from '../../../interfaces';
export declare const ELECTRUM_V2_MNEMONIC_WORDS: ElectrumV2MnemonicWordsInterface;
export declare const ELECTRUM_V2_MNEMONIC_LANGUAGES: ElectrumV2MnemonicLanguagesInterface;
export declare const ELECTRUM_V2_MNEMONIC_TYPES: ElectrumV2MnemonicTypesInterface;
export declare class ElectrumV2Mnemonic extends Mnemonic {
    static wordBitLength: number;
    static wordsList: number[];
    static wordsToEntropyStrength: Record<number, number>;
    static languages: string[];
    static wordLists: Record<string, string[]>;
    static mnemonicTypes: Record<string, string>;
    static getName(): string;
    static fromWords(count: number, language: string, option?: MnemonicOptionsInterface): string;
    static fromEntropy(entropy: string | Uint8Array | Entropy, language: string, option?: MnemonicOptionsInterface): string;
    static encode(entropy: string | Uint8Array, language: string, option?: MnemonicOptionsInterface): string;
    static decode(mnemonic: string | string[], option?: MnemonicOptionsInterface): string;
    static isValid(input: string | string[], option?: MnemonicOptionsInterface): boolean;
    static isType(input: string | string[], mnemonicType: string): boolean;
    getMnemonicType(): string;
    static normalize(input: string | string[]): string[];
}
//# sourceMappingURL=mnemonic.d.ts.map