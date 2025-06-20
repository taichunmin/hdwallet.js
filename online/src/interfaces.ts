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
