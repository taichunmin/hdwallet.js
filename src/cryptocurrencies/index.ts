// SPDX-License-Identifier: MIT

import { ICryptocurrency } from './icryptocurrency';
import { Bitcoin } from './bitcoin';
import { CryptocurrencyError, SymbolError } from '../exceptions';

export class CRYPTOCURRENCIES {

  private static readonly dictionary: Record<string, typeof ICryptocurrency> = {
    [Bitcoin.NAME]: Bitcoin,
  };

  static getNames(): string[] {
    return Object.keys(this.dictionary);
  }

  static getClasses(): Array<typeof ICryptocurrency> {
    return Object.values(this.dictionary);
  }

  static cryptocurrency(name: string): typeof ICryptocurrency {
    if (!this.isCryptocurrency(name)) {
      throw new CryptocurrencyError(
        'Invalid cryptocurrency name', { expected: this.getNames(), got: name }
      );
    }
    return this.dictionary[name];
  }

  static isCryptocurrency(name: string): boolean {
    return name in this.dictionary;
  }
}

export function getCryptocurrency(symbol: string): typeof ICryptocurrency {

  for (const cls of CRYPTOCURRENCIES.getClasses()) {
    if ((cls as any).SYMBOL === symbol) {
      return cls;
    }
  }
  throw new SymbolError(
    `Cryptocurrency not found with symbol ${symbol}`
  );
}

export {
  ICryptocurrency,
  Bitcoin,
};
