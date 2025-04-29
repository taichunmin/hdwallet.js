import { IMnemonic } from '../mnemonics';

export abstract class ISeed {
  protected _seed: string;

  constructor(seed: string, options: Record<string, any> = {}) {
    this._seed = seed;
  }

  static client(): string {
    throw new Error("Must override client()");
  }

  seed(): string {
    return this._seed;
  }

  static fromMnemonic(mnemonic: string | IMnemonic): string {
    throw new Error("Must override fromMnemonic()");
  }
}
