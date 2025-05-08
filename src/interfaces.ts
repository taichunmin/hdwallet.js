// SPDX-License-Identifier: MIT

export interface MnemonicOptionsInterface {
  checksum?: boolean;
  mnemonicType?: string;
  maxAttempts?: bigint;
  wordlistPath?: Record<string, string>;
  wordsList?: string[];
  wordsListWithIndex?: Record<string, number>;
  bip39List?: string[];
  bip39Index?: Record<string, number>;
  ev1List?: string[];
  ev1Index?: Record<string, number>;
}

export interface AlgorandMnemonicWordsInterface {
  TWENTY_FIVE: number
}

export interface AlgorandMnemonicLanguagesInterface {
  ENGLISH: string
}

export interface BIP39MnemonicWordsInterface {
  TWELVE: number;
  FIFTEEN: number;
  EIGHTEEN: number;
  TWENTY_ONE: number;
  TWENTY_FOUR: number;
}

export interface BIP39MnemonicLanguagesInterface {
  CHINESE_SIMPLIFIED: string;
  CHINESE_TRADITIONAL: string;
  CZECH: string;
  ENGLISH: string;
  FRENCH: string;
  ITALIAN: string;
  JAPANESE: string;
  KOREAN: string;
  PORTUGUESE: string;
  RUSSIAN: string;
  SPANISH: string;
  TURKISH: string;
}

export interface ElectrumV1MnemonicWordsInterface {
  TWELVE: number;
}

export interface ElectrumV1MnemonicLanguagesInterface {
  ENGLISH: string;
}

export interface ElectrumV2MnemonicWordsInterface {
  TWELVE: number;
  TWENTY_FOUR: number;
}

export interface ElectrumV2MnemonicLanguagesInterface {
  CHINESE_SIMPLIFIED: string;
  ENGLISH: string;
  PORTUGUESE: string;
  SPANISH: string;
}

export interface ElectrumV2MnemonicTypesInterface {
  STANDARD: string;
  SEGWIT: string;
  STANDARD_2FA:string;
  SEGWIT_2FA: string;
}

export interface MoneroMnemonicWordsInterface {
  TWELVE: number;
  THIRTEEN: number;
  TWENTY_FOUR: number;
  TWENTY_FIVE: number;
}

export interface MoneroMnemonicLanguagesInterface {
  CHINESE_SIMPLIFIED: string;
  DUTCH: string;
  ENGLISH: string;
  FRENCH: string;
  GERMAN: string;
  ITALIAN: string;
  JAPANESE: string;
  PORTUGUESE: string;
  RUSSIAN: string;
  SPANISH: string;
}
