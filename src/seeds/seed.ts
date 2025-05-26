// SPDX-License-Identifier: MIT

import { Mnemonic } from '../mnemonics';
import { SeedOptionsInterface } from '../interfaces';

export class Seed {

  protected seed: string;
  protected options: SeedOptionsInterface;

  constructor(
    seed: string, options: SeedOptionsInterface = { }
  ) {
    this.seed = seed;
    this.options = options;
  }

  static getName(): string {
    throw new Error("Must override getName()");
  }

  getName(): string {
    return (this.constructor as typeof Seed).getName();
  }

  getSeed(): string {
    return this.seed;
  }

  static fromMnemonic(
    mnemonic: string | Mnemonic, options: SeedOptionsInterface = { }
  ): string {
    throw new Error("Must override fromMnemonic()");
  }
}
