export interface DictionaryInterface {
  [key: string]: any;
}

export interface KeyValuePairInterface {
  key: string;
  value: any;
}

export interface GroupBoxInterface {
  name: string | null;
  color: string;
  flags: {
    warning: string;
    error: string;
  }
  flag: string | null;
}

export interface ComboboxInterface {
  name: string;
  value: any;
}

export interface DonationAddressInterface {
  cryptocurrency: string;
  symbol: string;
  address: string;
  defaultAddress: string;
  addressType?: string;
}

export interface DonationInterface {
  publicKeys: Array<DictionaryInterface>;
  addresses: Array<DonationAddressInterface>;
}

export interface EntropyInterface {
  client: string;
  strength: number;
}

export interface MnemonicInterface {
  client: string;
  language: string;
  from: 'words' | 'entropy';
  words?: number;
  entropy?: string;
  mnemonicType?: string;
}

export interface SeedInterface {
  client: string;
  cardanoType?: string;
  mnemonicType?: string;
  mnemonic: string;
  passphrase?: string;
}

export interface PassphraseInterface {
  length: number;
  numbers: boolean;
  upperCase: boolean;
  lowerCase: boolean;
  characters: boolean;
}
