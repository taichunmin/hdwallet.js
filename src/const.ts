// SPDX-License-Identifier: MIT

import { NetworkError } from './exceptions';
import { bytesToInteger } from './utils';


export class NestedNamespace {

  [key: string]: any;

  constructor(data: Set<string> | any[] | Record<string, any>) {
    if (data instanceof Set) {
      data.forEach(item => {
        this[item] = item;
      });
    } else if (Array.isArray(data)) {
      data.forEach(item => {
        if (item != null && typeof item === 'object' && !Array.isArray(item)) {
          Object.entries(item).forEach(([key, value]) => {
            this[key] = (value != null && typeof value === 'object')
              ? new NestedNamespace(value)
              : value;
          });
        } else {
          this[item] = item;
        }
      });
    } else {
      Object.entries(data).forEach(([key, value]) => {
        this[key] = (value != null && typeof value === 'object')
          ? new NestedNamespace(value)
          : value;
      });
    }
  }
}

export const SLIP10_ED25519_CONST: Record<string, any> = {
  PRIVATE_KEY_BYTE_LENGTH: 32,
  PUBLIC_KEY_PREFIX: Buffer.from([0x00]),
  PUBLIC_KEY_BYTE_LENGTH: 32
} as const;

export const KHOLAW_ED25519_CONST: Record<string, any> = {
  ...SLIP10_ED25519_CONST,
  PRIVATE_KEY_BYTE_LENGTH: 64
} as const;

export const SLIP10_SECP256K1_CONST: Record<string, any> = {
  POINT_COORDINATE_BYTE_LENGTH: 32,
  PRIVATE_KEY_BYTE_LENGTH: 32,
  PRIVATE_KEY_UNCOMPRESSED_PREFIX: 0x00,
  PRIVATE_KEY_COMPRESSED_PREFIX: 0x01,
  PUBLIC_KEY_UNCOMPRESSED_PREFIX: Buffer.from([0x04]),
  PUBLIC_KEY_COMPRESSED_BYTE_LENGTH: 33,
  PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH: 65,
  CHECKSUM_BYTE_LENGTH: 4
} as const;

export class Info extends NestedNamespace {
  SOURCE_CODE?: string;
  WHITEPAPER?: string;
  WEBSITES!: string[];
  constructor(data: Record<string, any>) {
    super(data);
  }
}

export class WitnessVersions extends NestedNamespace {
  getWitnessVersion(address: string): number | undefined {
    return (this as any)[address.toUpperCase()];
  }
}

export class Entropies extends NestedNamespace {
  getEntropies(): string[] {
    return Object.values(this as any) as string[];
  }
}

export class Mnemonics extends NestedNamespace {
  getMnemonics(): string[] {
    return Object.values(this as any) as string[];
  }
}

export class Seeds extends NestedNamespace {
  getSeeds(): string[] {
    return Object.values(this as any) as string[];
  }
}

export class HDs extends NestedNamespace {
  getHDS(): string[] {
    return Object.values(this as any) as string[];
  }
}

export class Addresses extends NestedNamespace {
  getAddresses(): string[] {
    return Object.values(this as any) as string[];
  }
  length(): number {
    return this.getAddresses().length;
  }
}

export class AddressTypes extends NestedNamespace {
  getAddressTypes(): string[] {
    return Object.values(this as any) as string[];
  }
}

export class AddressPrefixes extends NestedNamespace {
  getAddressPrefixes(): string[] {
    return Object.values(this as any) as string[];
  }
}

export class Networks extends NestedNamespace {
  isNetwork(network: string): boolean {
    return this.getNetworks().includes(network.toLowerCase());
  }
  getNetworks(): string[] {
    return Object.keys(this as any).map(k => k.toLowerCase());
  }
  getNetwork(network: string): any {
    if (!this.isNetwork(network)) {
      throw new NetworkError(`${network} network is not available`);
    }
    return (this as any)[network.toUpperCase()];
  }
}

export class Params extends NestedNamespace { }

export class ExtendedKeyVersions extends NestedNamespace {
  isVersion(version: Buffer): boolean {
    return Object.values(this as any).includes(bytesToInteger(version));
  }
  getVersions(): string[] {
    return Object.keys(this as any).map(k => k.toLowerCase().replace(/_/g, '-'));
  }
  getVersion(name: string): number | string | Buffer {
    return (this as any)[name.toUpperCase().replace(/-/g, '_')];
  }
  getName(version: Buffer): string | undefined {
    const intVer = bytesToInteger(version);
    return Object.entries(this as any).find(([, v]) => v === intVer)?.[0];
  }
}

export class XPrivateKeyVersions extends ExtendedKeyVersions { }

export class XPublicKeyVersions extends ExtendedKeyVersions { }

export const PUBLIC_KEY_TYPES = {
  UNCOMPRESSED: 'uncompressed',
  COMPRESSED: 'compressed'
} as const;

export const WIF_TYPES: Record<string, any> = {
  WIF: 'wif',
  WIF_COMPRESSED: 'wif-compressed'
} as const;

export const SEMANTICS: Record<string, any> = {
  P2WPKH: 'p2wpkh',
  P2WPKH_IN_P2SH: 'p2wpkh-in-p2sh',
  P2WSH: 'p2wsh',
  P2WSH_IN_P2SH: 'p2wsh-in-p2sh'
} as const;

export const MODES: Record<string, any> = {
  STANDARD: 'standard',
  SEGWIT: 'segwit'
} as const;
