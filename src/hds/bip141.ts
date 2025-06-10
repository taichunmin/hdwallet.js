// SPDX-License-Identifier: MIT

import { Bitcoin } from '../cryptocurrencies';
import { PUBLIC_KEY_TYPES, SEMANTICS } from '../consts';
import { P2WPKHAddress, P2WPKHInP2SHAddress, P2WSHAddress, P2WSHInP2SHAddress } from '../addresses';
import { BIP141HDSemanticOptionsInterface, HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { AddressError, SemanticError } from '../exceptions';
import { BIP32HD } from './bip32';

export class BIP141HD extends BIP32HD {
  
  protected address!: string;
  protected xprivateKeyVersion!: number | Uint8Array;
  protected xpublicKeyVersion!: number | Uint8Array;
  protected semantic!: string;

  constructor(options: HDOptionsInterface = {
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
  }) {
    super(options);

    if (!options.semantic) {
      throw new SemanticError('Semantic is required');
    }
    this.fromSemantic(options.semantic, options);
  }

  static getName(): string {
    return 'BIP141';
  }

  getSemantic(): string {
    return this.semantic;
  }

  fromSemantic(
    semantic: string, options: BIP141HDSemanticOptionsInterface = { }
  ): this {
    
    if (!SEMANTICS.getTypes().includes(semantic)) {
      throw new SemanticError(`Invalid semantic type`, {
        expected: SEMANTICS.getTypes(), got: semantic
      });
    }
    this.semantic = semantic;

    if (semantic === SEMANTICS.P2WPKH) {
      this.address = P2WPKHAddress.getName();
      this.xprivateKeyVersion = options.p2wpkhXPrivateKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WPKH;
      this.xpublicKeyVersion = options.p2wpkhXPublicKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WPKH;
    } else if (semantic === SEMANTICS.P2WPKH_IN_P2SH) {
      this.address = P2WPKHInP2SHAddress.getName();
      this.xprivateKeyVersion = options.p2wpkhInP2SHXPrivateKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WPKH_IN_P2SH;
      this.xpublicKeyVersion = options.p2wpkhInP2SHXPublicKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WPKH_IN_P2SH;
    } else if (semantic === SEMANTICS.P2WSH) {
      this.address = P2WSHAddress.getName();
      this.xprivateKeyVersion = options.p2wshXPrivateKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WSH;
      this.xpublicKeyVersion = options.p2wshXPublicKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WSH;
    } else if (semantic === SEMANTICS.P2WSH_IN_P2SH) {
      this.address = P2WSHInP2SHAddress.getName();
      this.xprivateKeyVersion = options.p2wshInP2SHXPrivateKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WSH_IN_P2SH;
      this.xpublicKeyVersion = options.p2wshInP2SHXPublicKeyVersion ?? Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WSH_IN_P2SH;
    }
    return this;
  }

  getRootXPrivateKey(version?: number | Uint8Array, encoded = true): string | null {
    return super.getRootXPrivateKey(version ?? this.xprivateKeyVersion, encoded);
  }

  getRootXPublicKey(version?: number | Uint8Array, encoded = true): string | null {
    return super.getRootXPublicKey(version ?? this.xpublicKeyVersion, encoded);
  }

  getXPrivateKey(version?: number | Uint8Array, encoded = true): string | null {
    return super.getXPrivateKey(version ?? this.xprivateKeyVersion, encoded);
  }

  getXPublicKey(version?: number | Uint8Array, encoded = true): string | null {
    return super.getXPublicKey(version ?? this.xpublicKeyVersion, encoded);
  }

  getAddress(options: HDAddressOptionsInterface = {
    address: this.address,
    scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
    hrp: Bitcoin.NETWORKS.MAINNET.HRP,
    witnessVersion: Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH
  }): string {

    const address = options?.address ?? this.address;
    const scriptAddressPrefix = options.scriptAddressPrefix ?? Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX;
    const hrp = options.hrp ?? Bitcoin.NETWORKS.MAINNET.HRP;
    const witnessVersion = options.witnessVersion ?? Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH;
    if (address === P2WPKHAddress.getName()) {
      return P2WPKHAddress.encode(this.publicKey!, {
        hrp: hrp,
        witnessVersion: witnessVersion,
        publicKeyType: this.publicKeyType
      });
    } else if (address === P2WPKHInP2SHAddress.getName()) {
      return P2WPKHInP2SHAddress.encode(this.publicKey!, {
        scriptAddressPrefix: scriptAddressPrefix,
        publicKeyType: this.publicKeyType
      });
    } else if (address === P2WSHAddress.getName()) {
      return P2WSHAddress.encode(this.publicKey!, {
        hrp: hrp,
        witnessVersion: witnessVersion,
        publicKeyType: this.publicKeyType
      });
    } else if (address === P2WSHInP2SHAddress.getName()) {
      return P2WSHInP2SHAddress.encode(this.publicKey!, {
        scriptAddressPrefix: scriptAddressPrefix,
        publicKeyType: this.publicKeyType
      });
    }

    throw new AddressError(`Invalid ${BIP141HD.getName()} address`, {
      expected: [
        P2WPKHAddress.getName(),
        P2WPKHInP2SHAddress.getName(),
        P2WSHAddress.getName(),
        P2WSHInP2SHAddress.getName()
      ],
      got: address
    });
  }
}
