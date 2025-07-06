// SPDX-License-Identifier: MIT

import { Entropy, ENTROPIES } from './entropies';
import { Mnemonic, ElectrumV2Mnemonic, MoneroMnemonic, ELECTRUM_V2_MNEMONIC_TYPES, MNEMONICS } from './mnemonics';
import { Seed, BIP39Seed, CardanoSeed, ElectrumV2Seed, SEEDS } from './seeds';
import { HD, HDS } from './hds';
import { PUBLIC_KEY_TYPES, SEMANTICS, MODES } from './consts';
import { Cryptocurrency, Network } from './cryptocurrencies/cryptocurrency';
import { deserialize, isValidKey } from './keys';
import { HDWalletAddressOptionsInterface, HDWalletOptionsInterface } from './interfaces';
import { excludeKeys, ensureTypeMatch, toCamelCase } from './utils';
import {
  NetworkError, AddressError, CryptocurrencyError, HDError, XPrivateKeyError, XPublicKeyError,
  PrivateKeyError, PublicKeyError, EntropyError, WIFError
} from './exceptions';
import { Derivation, DERIVATIONS } from './derivations';
import { Address, ADDRESSES } from './addresses';
import { checkDecode } from './libs/base58';
import { Cardano } from './cryptocurrencies';

export class HDWallet {

  private cryptocurrency: typeof Cryptocurrency;
  private network: typeof Network;
  private address: typeof Address;
  private hd: HD;

  private addressType?: string;
  private addressPrefix?: string;

  private entropy?: Entropy;
  private language: string;
  private passphrase: string | null;
  private mnemonic?: Mnemonic;
  private seed?: Seed;
  public derivation?: Derivation;

  private semantic?: string;
  private mode?: string;
  private mnemonicType?: string;
  private publicKeyType?: string;
  private cardanoType?: string;
  private useDefaultPath = true;
  private checksum = true;
  private stakingPublicKey?: string;
  private paymentID?: string;

  constructor(
    cryptocurrency: typeof Cryptocurrency, options: HDWalletOptionsInterface = { }
  ) {
    
    this.cryptocurrency = ensureTypeMatch(
      cryptocurrency, Cryptocurrency, { errorClass: CryptocurrencyError }
    );

    const _hd = options.hd ?? this.cryptocurrency.DEFAULT_HD;
    const resolvedHD = ensureTypeMatch(_hd, HD, { otherTypes: ['string'] });
    const hdName = resolvedHD.isValid ? resolvedHD.value.getName() : _hd;
    if (!this.cryptocurrency.HDS.isHD(hdName)) {
      throw new HDError(`${this.cryptocurrency.NAME} doesn't support HD type`, {
        expected: this.cryptocurrency.HDS.getHDS(), got: hdName
      });
    }
    const hdClass = HDS.getHDClass(hdName);

    const _network = options.network ?? this.cryptocurrency.DEFAULT_NETWORK.NAME;
    const resolvedNetwork = ensureTypeMatch(_network, Network, { otherTypes: ['string'] });
    const networkName = resolvedNetwork.isValid ? resolvedNetwork.value.NAME : _network;
    if (!this.cryptocurrency.NETWORKS.isNetwork(networkName)) {
      throw new NetworkError(`${this.cryptocurrency.NAME} doesn't support network type`, {
        expected: this.cryptocurrency.NETWORKS.getNetworks(), got: networkName
      });
    }
    this.network = this.cryptocurrency.NETWORKS.getNetwork(networkName);

    const _address = options.address ?? this.cryptocurrency.DEFAULT_ADDRESS;
    const resolvedAddress = ensureTypeMatch(_address, Address, { otherTypes: ['string'] });
    const addressName = resolvedAddress.isValid ? resolvedAddress.value.getName() : _address;
    if (!this.cryptocurrency.ADDRESSES.isAddress(addressName)) {
      throw new AddressError(`${this.cryptocurrency.NAME} doesn't support address type`, {
        expected: this.cryptocurrency.ADDRESSES.getAddresses(), got: addressName
      });
    }
    this.address = ADDRESSES.getAddressClass(addressName);


    this.language = options.language ?? 'english';
    this.passphrase = options.passphrase ?? null;
    this.useDefaultPath = options.useDefaultPath ?? false;
    this.stakingPublicKey = options.stakingPublicKey;
    this.paymentID = options.paymentID;

    if (['BIP32', 'BIP44', 'BIP49', 'BIP84', 'BIP86', 'BIP141', 'Electrum-V1'].includes(hdName)) {
      this.publicKeyType = options.publicKeyType ?? (
        hdName === 'Electrum-V1' ? PUBLIC_KEY_TYPES.UNCOMPRESSED : PUBLIC_KEY_TYPES.COMPRESSED
      );
    } else if (hdName === 'Cardano') {
      this.cardanoType = options.cardanoType;
    } else if (hdName === 'Electrum-V2') {
      this.mode = options.mode ?? MODES.STANDARD;
      this.mnemonicType = options.mnemonicType ?? ELECTRUM_V2_MNEMONIC_TYPES.STANDARD;
      this.publicKeyType = options.publicKeyType ?? PUBLIC_KEY_TYPES.UNCOMPRESSED;
    } else if (hdName === 'Monero') {
      this.checksum = options.checksum ?? false;
    }

    this.addressType = options.addressType ?? this.cryptocurrency.DEFAULT_ADDRESS_TYPE;
    if (this.cryptocurrency.NAME === 'Tezos') {
      this.addressPrefix = options.addressPrefix ?? this.cryptocurrency.DEFAULT_ADDRESS_PREFIX;
    }

    if (['BIP32', 'BIP44', 'BIP86', 'Cardano'].includes(hdName)) {
      this.semantic = options.semantic ?? this.cryptocurrency.DEFAULT_SEMANTIC;
    } else if (hdName === 'BIP49') {
      this.semantic = options.semantic ?? SEMANTICS.P2WPKH_IN_P2SH;
    } else if (['BIP84', 'BIP141'].includes(hdName)) {
      this.semantic = options.semantic ?? SEMANTICS.P2WPKH;
    } else {
      this.semantic = undefined;
    }

    this.hd = new hdClass({
      ecc: this.cryptocurrency.ECC,
      publicKeyType: this.publicKeyType,
      semantic: this.semantic,
      coinType: this.cryptocurrency.COIN_TYPE,
      wifPrefix: this.network.WIF_PREFIX,
      cardanoType: this.cardanoType,
      mode: this.mode,
      paymentID: this.paymentID,
      network: this.network
    });
  }

  fromEntropy(entropy: Entropy): HDWallet {

    if (!this.cryptocurrency.ENTROPIES.isEntropy(entropy.getName())) {
      throw new EntropyError(
        `${this.cryptocurrency.NAME} cryptocurrency doesn't support Entropy type`, {
          expected: this.cryptocurrency.ENTROPIES.getEntropies(), got: entropy.getName()
        }
      );
    }
    this.entropy = entropy;

    let mnemonic: string;
    if (this.entropy.getName() === 'Electrum-V2') {
      mnemonic = ElectrumV2Mnemonic.fromEntropy(
        this.entropy.getEntropy(), this.language, { mnemonicType: this.mnemonicType }
      );
    } else if (this.entropy.getName() === 'Monero') {
      mnemonic = MoneroMnemonic.fromEntropy(
        this.entropy.getEntropy(), this.language, { checksum: this.checksum }
      );
    } else {
      mnemonic = MNEMONICS.getMnemonicClass(this.entropy.getName()).fromEntropy(
        this.entropy.getEntropy(), this.language
      );
    }

    const mnemonicClass = MNEMONICS.getMnemonicClass(this.entropy.getName());
    return this.fromMnemonic(
      this.entropy.getName() === 'Electrum-V2' ?
        new mnemonicClass(mnemonic, { mnemonicType: this.mnemonicType }) :
        new mnemonicClass(mnemonic)
    );
  }

  fromMnemonic(mnemonic: Mnemonic): HDWallet {

    if (!this.cryptocurrency.MNEMONICS.isMnemonic(mnemonic.getName())) {
      throw new EntropyError(
        `${this.cryptocurrency.NAME} cryptocurrency doesn't support Mnemonic type`, {
          expected: this.cryptocurrency.MNEMONICS.getMnemonics(), got: mnemonic.getName()
        }
      );
    }
    this.mnemonic = mnemonic;

    if (this.mnemonic.getName() === 'Electrum-V2') {
      const entropyBytes = MNEMONICS.getMnemonicClass(this.mnemonic.getName()).decode(
        this.mnemonic.getMnemonic(), { mnemonicType: this.mnemonicType }
      );
      const entropyClass = ENTROPIES.getEntropyClass(this.mnemonic.getName());
      this.entropy = new entropyClass(entropyBytes);
    } else {
      const entropyBytes = MNEMONICS.getMnemonicClass(this.mnemonic.getName()).decode(
        this.mnemonic.getMnemonic()
      );
      const entropyClass = ENTROPIES.getEntropyClass(this.mnemonic.getName());
      this.entropy = new entropyClass(entropyBytes);
    }

    let seed: string;

    if (this.mnemonic.getName() === 'BIP39' && this.hd.getName() === 'Cardano') {
      seed = CardanoSeed.fromMnemonic(this.mnemonic.getMnemonic(), {
        passphrase: this.passphrase,
        cardanoType: this.cardanoType
      });
    } else if (this.mnemonic.getName() === BIP39Seed.getName()) {
      seed = BIP39Seed.fromMnemonic(this.mnemonic.getMnemonic(), {
        passphrase: this.passphrase
      });
    } else if (this.mnemonic.getName() === ElectrumV2Seed.getName()) {
      seed = ElectrumV2Seed.fromMnemonic(this.mnemonic.getMnemonic(), {
        passphrase: this.passphrase!,
        mnemonicType: this.mnemonicType!
      });
    } else {
      seed = SEEDS.getSeedClass(this.mnemonic.getName()).fromMnemonic(
        this.mnemonic.getMnemonic()
      );
    }

    const seedClass = SEEDS.getSeedClass(
      this.hd.getName() === 'Cardano' ? 'Cardano' : this.mnemonic.getName()
    );
    return this.fromSeed(new seedClass(seed));
  }

  fromSeed(seed: Seed): HDWallet {
    if (!this.cryptocurrency.SEEDS.isSeed(seed.getName())) {
      throw new EntropyError(
        `${this.cryptocurrency.NAME} cryptocurrency doesn't support Seed type`, {
          expected: this.cryptocurrency.SEEDS.getSeeds(), got: seed.getName()
        }
      );
    }
    this.seed = seed;

    if (this.hd.getName() === 'Cardano') {
      this.hd.fromSeed(seed.getSeed(), this.passphrase);
    } else {
      this.hd.fromSeed(seed.getSeed());
    }

    this.derivation = this.hd.getDerivation();
    return this;
  }

  fromXPrivateKey(xprivateKey: string, encoded: boolean = true, strict: boolean = false): HDWallet {

    if (['Electrum-V1', 'Monero'].includes(this.hd.getName())) {
      throw new XPrivateKeyError(
        `Support for XPrivate-Key conversion is not implemented in ${this.hd.getName()} HD type`
      );
    }

    if (!isValidKey(xprivateKey, encoded)) {
      throw new XPrivateKeyError('Invalid XPrivate-Key data');
    }
    const [version, , , , , ] = deserialize(xprivateKey, encoded);
    const decodedLen = encoded ? checkDecode(xprivateKey).length : xprivateKey.length;
    if (!this.network.XPRIVATE_KEY_VERSIONS.isVersion(version) || ![78, 110].includes(decodedLen)) {
      throw new XPrivateKeyError(`Invalid XPrivate-Key for ${this.cryptocurrency.NAME}`);
    }

    this.hd.fromXPrivateKey(xprivateKey, encoded, strict);
    return this;
  }

  fromXPublicKey(xpublicKey: string, encoded: boolean = true, strict: boolean = false): HDWallet {

    if (['Electrum-V1', 'Monero'].includes(this.hd.getName())) {
      throw new XPublicKeyError(
        `Support for XPublic-Key conversion is not implemented in ${this.hd.getName()} HD type`
      );
    } else if (this.hd.getName() === 'Cardano' && this.cardanoType === 'byron-legacy') {
      throw new XPublicKeyError(
        `Conversion from XPublic-Key is unavailable in ${this.cardanoType} mode for ${this.hd.getName()} HD type`
      );
    }

    if (!isValidKey(xpublicKey, encoded)) {
      throw new XPublicKeyError("Invalid XPublic-Key data");
    }
    const [version, , , , , ] = deserialize(xpublicKey, encoded);
    const decodedLen = encoded ? checkDecode(xpublicKey).length : xpublicKey.length;
    if (!this.network.XPUBLIC_KEY_VERSIONS.isVersion(version) || ![78, 110].includes(decodedLen)) {
      throw new XPublicKeyError(`Invalid XPublic-Key for ${this.cryptocurrency.NAME}`);
    }

    this.hd.fromXPublicKey(xpublicKey, encoded, strict);
    return this;
  }

  fromDerivation(derivation: Derivation): HDWallet {
    this.hd.fromDerivation(derivation);
    this.derivation = derivation;
    return this;
  }

  updateDerivation(derivation: Derivation): HDWallet {
    this.hd.updateDerivation(derivation);
    this.derivation = derivation;
    return this;
  }

  cleanDerivation(): HDWallet {
    this.hd.cleanDerivation();
    this.derivation?.clean();
    return this;
  }

  fromPrivateKey(privateKey: string): HDWallet {
    this.hd.fromPrivateKey(privateKey);
    return this;
  }

  fromWIF(wif: string): HDWallet {
    if (['Cardano', 'Monero'].includes(this.hd.getName())) {
      throw new WIFError(`WIF is not supported by ${this.hd.getName()} HD type`);
    }

    if (this.network.WIF_PREFIX === null || this.network.WIF_PREFIX === null) {
      throw new WIFError(`WIF is not supported by ${this.cryptocurrency.NAME} cryptocurrency`);
    }
    this.hd.fromWIF(wif);
    return this;
  }

  fromPublicKey(publicKey: string): HDWallet {
    if (this.hd.getName() === 'Monero') {
      throw new PublicKeyError(`From Public-Key is not supported by ${this.hd.getName()} HD type`);
    }

    this.hd.fromPublicKey(publicKey);
    return this;
  }

  fromSpendPrivateKey(spendPrivateKey: string): HDWallet {
    if (this.hd.getName() !== 'Monero') {
      throw new PrivateKeyError(`From Spend-Private-Key is only supported by ${this.hd.getName()} HD type`);
    }

    this.hd.fromSpendPrivateKey(spendPrivateKey);
    return this;
  }

  fromWatchOnly(viewPrivateKey: string, spendPublicKey: string): HDWallet {
    if (this.hd.getName() !== 'Monero') {
      throw new PublicKeyError(`From Watch-Only is only supported by ${this.hd.getName()} HD type`);
    }

    this.hd.fromWatchOnly(viewPrivateKey, spendPublicKey);
    return this;
  }

  getCryptocurrency(): string {
    return this.cryptocurrency.NAME;
  }

  getSymbol(): string {
    return this.cryptocurrency.SYMBOL;
  }

  getCoinType(): number {
    return this.cryptocurrency.COIN_TYPE;
  }

  getNetwork(): string {
    return this.network.NAME;
  }

  getEntropy(): string | null {
    return this.entropy?.getEntropy() ?? null;
  }

  getStrength(): number | null {
    return this.entropy?.getStrength() ?? null;
  }

  getMnemonic(): string | null {
    return this.mnemonic?.getMnemonic() ?? null;
  }

  getMnemonicType(): string | null {
    return this.mnemonicType ?? null;
  }

  getLanguage(): string | null {
    return this.mnemonic?.getLanguage() ?? null;
  }

  getWords(): number | null {
    return this.mnemonic?.getWords() ?? null;
  }

  getPassphrase(): string | null {
    return this.passphrase;
  }

  getSeed(): string | null {
    return this.hd.getSeed();
  }

  getECC(): string {
    return this.cryptocurrency.ECC.NAME;
  }

  getHD(): string {
    return this.hd.getName();
  }

  getSemantic(): string | null {
    return this.semantic ?? null;
  }

  getCardanoType(): string | null {
    return this.hd.getName() === 'Cardano' ? (this.cardanoType ?? null) : null;
  }

  getMode(): string {
    if (this.hd.getName() !== 'Electrum-V2') {
      throw new Error(`Get mode is only for Electrum-V2 HD type, not ${this.hd.getName()}`);
    }
    return this.hd.getMode();
  }

  getPathKey(): string | null {
    return this.hd.getPathKey();
  }

  getRootXPrivateKey(semantic?: string, encoded: boolean = true): string | null {
    const currentSemantic = semantic ?? this.semantic;
    if (['Electrum-V1', 'Monero'].includes(this.hd.getName()) || !currentSemantic) {
      return null;
    }

    return this.hd.getRootXPrivateKey(
      this.network.XPRIVATE_KEY_VERSIONS.getVersion(currentSemantic), encoded
    );
  }

  getRootXPublicKey(semantic?: string, encoded: boolean = true): string | null {
    const currentSemantic = semantic ?? this.semantic;
    if (['Electrum-V1', 'Monero'].includes(this.hd.getName()) || !currentSemantic) {
      return null;
    }

    return this.hd.getRootXPublicKey(
      this.network.XPUBLIC_KEY_VERSIONS.getVersion(currentSemantic), encoded
    );
  }

  getMasterXPrivateKey(semantic?: string, encoded: boolean = true): string | null {
    return this.getRootXPrivateKey(semantic, encoded);
  }

  getMasterXPublicKey(semantic?: string, encoded: boolean = true): string | null {
    return this.getRootXPublicKey(semantic, encoded);
  }

  getRootPrivateKey(): string | null {
    if (['Electrum-V1', 'Electrum-V2'].includes(this.hd.getName())) {
      return this.hd.getMasterPrivateKey();
    }
    return this.hd.getRootPrivateKey();
  }

  getRootWIF(wifType?: string): string | null {
    if (['Cardano', 'Monero'].includes(this.hd.getName())) {
      return null;
    }
    if (['Electrum-V1', 'Electrum-V2'].includes(this.hd.getName())) {
      return this.hd.getMasterWIF(wifType);
    }
    return this.hd.getRootWIF(wifType);
  }

  getRootChainCode(): string | null {
    return this.hd.getRootChainCode();
  }

  getRootPublicKey(publicKeyType?: string): string | null {
    if (['Electrum-V1', 'Electrum-V2'].includes(this.hd.getName())) {
      return this.hd.getMasterPublicKey(publicKeyType);
    }
    return this.hd.getRootPublicKey(publicKeyType);
  }

  getMasterPrivateKey(): string | null {
    if (['Electrum-V1', 'Electrum-V2'].includes(this.hd.getName())) {
      return this.hd.getMasterPrivateKey();
    }
    return this.hd.getRootPrivateKey();
  }

  getMasterWIF(wifType?: string): string | null {
    if (['Cardano', 'Monero'].includes(this.hd.getName())) {
      return null;
    }
    if (['Electrum-V1', 'Electrum-V2'].includes(this.hd.getName())) {
      return this.hd.getMasterWIF(wifType);
    }
    return this.hd.getRootWIF(wifType);
  }

  getMasterChainCode(): string | null {
    return this.hd.getRootChainCode();
  }

  getMasterPublicKey(publicKeyType?: string): string | null {
    if (['Electrum-V1', 'Electrum-V2'].includes(this.hd.getName())) {
      return this.hd.getMasterPublicKey(publicKeyType);
    }
    return this.hd.getRootPublicKey(publicKeyType);
  }

  getXPrivateKey(semantic?: string, encoded: boolean = true): string | null {
    const currentSemantic = semantic ?? this.semantic;
    if (['Electrum-V1', 'Monero'].includes(this.hd.getName()) || !currentSemantic) {
      return null;
    }

    return this.hd.getXPrivateKey(
      this.network.XPRIVATE_KEY_VERSIONS.getVersion(currentSemantic), encoded
    );
  }

  getXPublicKey(semantic?: string, encoded: boolean = true): string | null {
    const currentSemantic = semantic ?? this.semantic;
    if (['Electrum-V1', 'Monero'].includes(this.hd.getName()) || !currentSemantic) {
      return null;
    }

    return this.hd.getXPublicKey(
      this.network.XPUBLIC_KEY_VERSIONS.getVersion(currentSemantic), encoded
    );
  }

  getPrivateKey(): string | null {
    return this.hd.getPrivateKey();
  }

  getSpendPrivateKey(): string | null {
    if (this.hd.getName() !== 'Monero') {
      throw new Error('Get Spend-Private-Key is only supported by Monero HD type');
    }
    return this.hd.getSpendPrivateKey();
  }

  getViewPrivateKey(): string {
    if (this.hd.getName() !== 'Monero') {
      throw new Error('Get View-Private-Key is only supported by Monero HD type');
    }
    return this.hd.getViewPrivateKey();
  }

  getWIF(wifType?: string): string | null {
    if (['Cardano', 'Monero'].includes(this.hd.getName())) {
      return null;
    }
    return this.hd.getWIF(wifType);
  }

  getWIFType(): string | null {
    return this.getWIF() ? this.hd.getWIFType() : null;
  }

  getChainCode(): string | null {
    return this.hd.getChainCode();
  }

  getPublicKey(publicKeyType?: string): string {
    return this.hd.getPublicKey(publicKeyType);
  }

  getPublicKeyType(): string {
    return this.hd.getPublicKeyType();
  }

  getUncompressed(): string {
    return this.hd.getUncompressed();
  }

  getCompressed(): string {
    return this.hd.getCompressed();
  }

  getSpendPublicKey(): string {
    if (this.hd.getName() !== 'Monero') {
      throw new Error('Get Spend-Public-Key is only supported by Monero HD type');
    }
    return this.hd.getSpendPublicKey();
  }

  getViewPublicKey(): string {
    if (this.hd.getName() !== 'Monero') {
      throw new Error('Get View-Public-Key is only supported by Monero HD type');
    }
    return this.hd.getViewPublicKey();
  }

  getHash(): string {
    return this.hd.getHash();
  }

  getDepth(): number {
    return this.hd.getDepth();
  }

  getFingerprint(): string {
    return this.hd.getFingerprint();
  }

  getParentFingerprint(): string {
    return this.hd.getParentFingerprint();
  }

  getPath(): string {
    return this.hd.getPath();
  }

  getIndex(): number {
    return this.hd.getIndex();
  }

  getIndexes(): number[] {
    return this.hd.getIndexes();
  }

  getStrict(): boolean | null {
    return ['Electrum-V1', 'Monero'].includes(this.hd.getName()) ? null : this.hd.getStrict();
  }

  getPrimaryAddress(): string | null {
    return this.hd.getName() === 'Monero' ? this.hd.getPrimaryAddress() : null;
  }

  getIntegratedAddress(paymentID?: string): string | null {
    return this.hd.getName() === 'Monero' ? this.hd.getIntegratedAddress(paymentID) : null;
  }

  getSubAddress(minor?: number, major?: number): string | null {
    return this.hd.getName() === 'Monero' ? this.hd.getSubAddress(minor, major) : null;
  }

  getAddress(options: HDWalletAddressOptionsInterface = { }): string | null {

    const _address = options.address ?? this.address;
    const resolvedAddress = ensureTypeMatch(_address, Address, { otherTypes: ['string'] });
    const addressName = resolvedAddress.isValid ? resolvedAddress.value.getName() : _address;
    if (!this.cryptocurrency.ADDRESSES.isAddress(addressName)) {
      throw new AddressError(`${this.cryptocurrency.NAME} doesn't support address type`, {
        expected: this.cryptocurrency.ADDRESSES.getAddresses(), got: addressName
      });
    }

    if (this.network.WITNESS_VERSIONS) {
      options.witnessVersion = this.network.WITNESS_VERSIONS.getWitnessVersion(addressName);
    }

    const hdName = this.hd.getName();
    if (hdName === 'Cardano') {
      options.network = options.network ?? this.network.NAME;
      options.addressType = options.addressType ?? this.addressType;
      options.stakingPublicKey = options.stakingPublicKey ?? this.stakingPublicKey;
      return this.hd.getAddress(options);
    } else if (hdName === 'Electrum-V1') {
      return this.hd.getAddress({
        publicKeyAddressPrefix: this.network.PUBLIC_KEY_ADDRESS_PREFIX
      });
    } else if (hdName === 'Electrum-V2') {
      return this.hd.getAddress({
        publicKeyAddressPrefix: this.network.PUBLIC_KEY_ADDRESS_PREFIX,
        hrp: this.network.HRP,
        witnessVersion: this.network.WITNESS_VERSIONS?.getWitnessVersion('P2WPKH')
      });
    } else if (hdName === 'Monero') {
      const versionType = options.versionType;
      if (versionType === 'standard') {
        return this.getPrimaryAddress()!;
      } else if (versionType === 'integrated') {
        return this.getIntegratedAddress(options.paymentID)!;
      } else if (versionType === 'sub-address') {
        return this.getSubAddress(options.minor, options.major)!;
      }
    } else {

      const addressClass = ADDRESSES.getAddressClass(addressName);
      if (['Bitcoin-Cash', 'Bitcoin-Cash-SLP', 'eCash'].includes(this.cryptocurrency.NAME)) {
        const addressType = options.addressType ?? this.addressType;
        return addressClass.encode(this.getPublicKey(), {
          publicKeyAddressPrefix: (this.network as any)[
            `${addressType?.toUpperCase()}_PUBLIC_KEY_ADDRESS_PREFIX`
          ],
          scriptAddressPrefix: (this.network as any)[
            `${addressType?.toUpperCase()}_SCRIPT_ADDRESS_PREFIX`
          ],
          networkType: this.network.NAME,
          publicKeyType: this.getPublicKeyType(),
          hrp: this.network.HRP
        });
      } else {
        return addressClass.encode(this.getPublicKey(), {
          publicKeyAddressPrefix: this.network.PUBLIC_KEY_ADDRESS_PREFIX,
          scriptAddressPrefix: this.network.SCRIPT_ADDRESS_PREFIX,
          networkType: this.network.NAME,
          publicKeyType: this.getPublicKeyType(),
          hrp: this.network.HRP,
          addressType: options.addressType ?? this.addressType,
          addressPrefix: options.addressPrefix ?? this.addressPrefix
        });

      }
    }

    throw new AddressError(`Could not resolve address for ${hdName} HD type`);
  }

  getDump(exclude: string[] = []): Record<string, any> {

    const derivationDump: Record<string, any> = { };
    const hdName = this.hd.getName();

    if (this.derivation) {
      let at: Record<string, any> = {};

      switch (this.derivation.getName()) {
        case 'BIP44':
        case 'BIP49':
        case 'BIP84':
        case 'BIP86':
          at = {
            'path': this.derivation.getPath(),
            'indexes': this.derivation.getIndexes(),
            'depth': this.getDepth(),
            'purpose': this.derivation.getPurpose(),
            'coin-type': this.derivation.getCoinType(),
            'account': this.derivation.getAccount(),
            'change': this.derivation.getChange(),
            'address': this.derivation.getAddress()
          };
          break;

        case 'CIP1852':
          at = {
            'path': this.derivation.getPath(),
            'indexes': this.derivation.getIndexes(),
            'depth': this.getDepth(),
            'purpose': this.derivation.getPurpose(),
            'coin-type': this.derivation.getCoinType(),
            'account': this.derivation.getAccount(),
            'role': this.derivation.getRole(),
            'address': this.derivation.getAddress()
          };
          break;

        case 'Electrum':
          at = {
            'change': this.derivation.getChange(),
            'address': this.derivation.getAddress()
          };
          break;

        case 'Monero':
          at = {
            'minor': this.derivation.getMinor(),
            'major': this.derivation.getMajor()
          };
          break;

        default:
          at = {
            'path': this.derivation.getPath(),
            'indexes': this.derivation.getIndexes(),
            'depth': this.getDepth(),
            'index': this.getIndex()
          };
      }

      derivationDump['at'] = at;
    }

    if ([
      'BIP32', 'BIP44', 'BIP49', 'BIP84', 'BIP86', 'BIP141', 'Cardano'
    ].includes(hdName)) {
      Object.assign(derivationDump, {
        'xprivate-key': this.getXPrivateKey(),
        'xpublic-key': this.getXPublicKey(),
        'private-key': this.getPrivateKey(),
        'wif': this.getWIF(),
        'chain-code': this.getChainCode(),
        'public-key': this.getPublicKey(),
        'uncompressed': this.getUncompressed(),
        'compressed': this.getCompressed(),
        'fingerprint': this.getFingerprint(),
        'parent-fingerprint': this.getParentFingerprint(),
        'hash': this.getHash()
      });

      if (hdName === 'Cardano') {
        delete derivationDump.wif;
        delete derivationDump.uncompressed;
        delete derivationDump.compressed;
      }

      if (this.cryptocurrency.ADDRESSES.length() > 1 || this.cryptocurrency.NAME === 'Tezos') {

        const addresses: Record<string, string | null> = { };

        if (this.cryptocurrency.NAME === 'Avalanche' && this.cryptocurrency.ADDRESS_TYPES) {
          addresses[toCamelCase(this.cryptocurrency.ADDRESS_TYPES.C_CHAIN)] = this.getAddress({ address: 'Ethereum' });
          addresses[toCamelCase(this.cryptocurrency.ADDRESS_TYPES.P_CHAIN)] = this.getAddress({
            address: 'Avalanche', addressType: this.cryptocurrency.ADDRESS_TYPES.P_CHAIN
          });
          addresses[toCamelCase(this.cryptocurrency.ADDRESS_TYPES.X_CHAIN)] = this.getAddress({
            address: 'Avalanche', addressType: this.cryptocurrency.ADDRESS_TYPES.X_CHAIN
          });
        } else if (this.cryptocurrency.NAME === 'Binance' && this.cryptocurrency.ADDRESS_TYPES) {
          addresses[toCamelCase(this.cryptocurrency.ADDRESS_TYPES.CHAIN)] = this.getAddress({ address: 'Cosmos' });
          addresses[toCamelCase(this.cryptocurrency.ADDRESS_TYPES.SMART_CHAIN)] = this.getAddress({ address: 'Ethereum' });
        } else if (
          (this.cryptocurrency.NAME === 'Bitcoin-Cash' ||
          this.cryptocurrency.NAME === 'Bitcoin-Cash-SLP' ||
          this.cryptocurrency.NAME === 'eCash') &&
          this.cryptocurrency.ADDRESS_TYPES
        ) {
          for (const addressType of this.cryptocurrency.ADDRESS_TYPES.getAddressTypes()) {
            for (const address of this.cryptocurrency.ADDRESSES.getAddresses()) {
              addresses[`${addressType}${address.split('-').join('')}`] = ADDRESSES.getAddressClass(address).encode(
                this.getPublicKey(), {
                publicKeyAddressPrefix: (this.network as any)[`${addressType?.toUpperCase()}_PUBLIC_KEY_ADDRESS_PREFIX`],
                scriptAddressPrefix: (this.network as any)[`${addressType?.toUpperCase()}_SCRIPT_ADDRESS_PREFIX`],
                publicKeyType: this.getPublicKeyType(),
                hrp: this.network.HRP,
              });
            }
          }
        } else if (this.cryptocurrency.NAME === 'Tezos' && this.cryptocurrency.ADDRESS_PREFIXES) {
          addresses[this.cryptocurrency.ADDRESS_PREFIXES.TZ1] = this.getAddress({
            addressPrefix: this.cryptocurrency.ADDRESS_PREFIXES.TZ1
          });
          addresses[this.cryptocurrency.ADDRESS_PREFIXES.TZ2] = this.getAddress({
            addressPrefix: this.cryptocurrency.ADDRESS_PREFIXES.TZ2
          });
          addresses[this.cryptocurrency.ADDRESS_PREFIXES.TZ3] = this.getAddress({
            addressPrefix: this.cryptocurrency.ADDRESS_PREFIXES.TZ3
          });
        } else if (this.hd.getName() === 'BIP44') {
          derivationDump['address'] = this.getAddress({ address: 'P2PKH' });
        } else if (this.hd.getName() === 'BIP49') {
          derivationDump['address'] = this.getAddress({ address: 'P2WPKH-In-P2SH' });
        } else if (this.hd.getName() === 'BIP84') {
          derivationDump['address'] = this.getAddress({ address: 'P2WPKH' });
        } else if (this.hd.getName() === 'BIP86') {
          derivationDump['address'] = this.getAddress({ address: 'P2TR' });
        } else if (this.hd.getName() === 'BIP141') {
          if (this.semantic === SEMANTICS.P2WPKH) {
            derivationDump['address'] = this.getAddress({ address: 'P2WPKH' });
          } else if (this.semantic === SEMANTICS.P2WPKH_IN_P2SH) {
            derivationDump['address'] = this.getAddress({ address: 'P2WPKH-In-P2SH' });
          } else if (this.semantic === SEMANTICS.P2WSH) {
            derivationDump['address'] = this.getAddress({ address: 'P2WSH' });
          } else if (this.semantic === SEMANTICS.P2WSH_IN_P2SH) {
            derivationDump['address'] = this.getAddress({ address: 'P2WSH-In-P2SH' });
          }
        } else {
          for (const address of this.cryptocurrency.ADDRESSES.getAddresses()) {
            addresses[address.toLowerCase()] = this.getAddress({ address: address });
          }
        }
        if (Object.keys(addresses).length !== 0) {
          derivationDump['addresses'] = addresses;
        }
      } else {
        if (this.cryptocurrency.NAME === 'Cardano' && [
          Cardano.TYPES.SHELLEY_ICARUS, Cardano.TYPES.SHELLEY_LEDGER
        ].includes(this.cardanoType!)) {
          derivationDump['address'] = this.getAddress({
            network: this.network.NAME,
            addressType: this.addressType,
            stakingPublicKey: this.stakingPublicKey
          });
        } else {
          derivationDump['address'] = this.getAddress();
        }
      }
    } else if (['Electrum-V1', 'Electrum-V2'].includes(hdName)) {
      Object.assign(derivationDump, {
        'private-key': this.getPrivateKey(),
        'wif': this.getWIF(),
        'public-key': this.getPublicKey(),
        'uncompressed': this.getUncompressed(),
        'compressed': this.getCompressed(),
        'address': this.getAddress()
      });
    } else if (hdName === 'Monero') {
      derivationDump['sub-address'] = this.getSubAddress();
    }

    if (exclude.includes('at')) {
      delete derivationDump['at'];
    }

    if (exclude.includes('root')) {
      return excludeKeys(derivationDump, exclude);
    }

    const root: Record<string, any> = {
      'cryptocurrency': this.getCryptocurrency(),
      'symbol': this.getSymbol(),
      'network': this.getNetwork(),
      'coin-type': this.getCoinType(),
      'entropy': this.getEntropy(),
      'strength': this.getStrength(),
      'mnemonic': this.getMnemonic(),
      'passphrase': this.getPassphrase(),
      'language': this.getLanguage(),
      'seed': this.getSeed(),
      'ecc': this.getECC(),
      'hd': this.getHD()
    };

    if (['Electrum-V1', 'Electrum-V2', 'Monero'].includes(hdName)) {
      delete root['passphrase'];
    }

    if (['BIP32', 'BIP44', 'BIP49', 'BIP84', 'BIP86', 'BIP141', 'Cardano'].includes(hdName)) {
      if (hdName === 'Cardano') {
        root['cardano-type'] = this.getCardanoType();
      }

      Object.assign(root, {
        'semantic': this.getSemantic(),
        'root-xprivate-key': this.getRootXPrivateKey(),
        'root-xpublic-key': this.getRootXPublicKey(),
        'root-private-key': this.getRootPrivateKey(),
        'root-wif': this.getRootWIF(),
        'root-chain-code': this.getRootChainCode(),
        'root-public-key': this.getRootPublicKey(),
        'path-key': this.getPathKey(),
        'strict': this.getStrict(),
        'public-key-type': this.getPublicKeyType(),
        'wif-type': this.getWIFType()
      });

      if (hdName === 'Cardano') {
        delete root['root-wif'];
        delete root['root-type'];
        if (this.cardanoType !== Cardano.TYPES.BYRON_LEGACY) {
          delete root['path-key'];
        }
      } else {
        delete root['path-key'];
      }
    } else if (hdName === 'Electrum-V1' || hdName === 'Electrum-V2') {
      if (hdName === 'Electrum-V2') {
        root['mode'] = this.getMode();
        root['mnemonic-type'] = this.getMnemonicType();
      }

      Object.assign(root, {
        'master-private-key': this.getMasterPrivateKey(),
        'master-wif': this.getMasterWIF(),
        'master-public-key': this.getMasterPublicKey(),
        'public-key-type': this.getPublicKeyType(),
        'wif-type': this.getWIFType()
      });
    } else if (hdName === 'Monero') {
      Object.assign(root, {
        'private-key': this.getPrivateKey(),
        'spend-private-key': this.getSpendPrivateKey(),
        'view-private-key': this.getViewPrivateKey(),
        'spend-public-key': this.getSpendPublicKey(),
        'view-public-key': this.getViewPublicKey(),
        'primary-address': this.getPrimaryAddress()
      });

      if (this.paymentID) {
        root['integrated-address'] = this.getIntegratedAddress(this.paymentID);
      }
    }

    if (!exclude.includes('derivation')) {
      root['derivation'] = derivationDump;
    }
    return excludeKeys(root, exclude);
  }

  getDumps(exclude: string[] = []): Record<string, any> | Record<string, any>[] | null {
    if (!this.derivation) return null;

    const derivationsList: Record<string, any>[] = [];

    const isRangeTuple = (
      tuple: [number, number, boolean] | [number, boolean]
    ): tuple is [number, number, boolean] => {
      return tuple.length === 3;
    };

    const drive = (
      ...args: ([number, number, boolean] | [number, boolean])[]
    ): string[] => {
      const driveHelper = (
        derivations: ([number, number, boolean] | [number, boolean])[],
        current: [number, boolean][] = []
      ): string[] => {
        if (derivations.length === 0) {
          const derivationName = this.derivation!.getName();
          const derivationClass = DERIVATIONS.getDerivationClass(derivationName);
          let derivation: Derivation;

          if (['BIP44', 'BIP49', 'BIP84', 'BIP86'].includes(derivationName)) {
            derivation = new derivationClass({
              coinType: current[1][0],
              account: current[2][0],
              change: current[3][0],
              address: current[4][0]
            });
          } else if (derivationName === 'CIP1852') {
            derivation = new derivationClass({
              coinType: current[1][0],
              account: current[2][0],
              role: current[3][0],
              address: current[4][0]
            });
          } else if (derivationName === 'Electrum') {
            derivation = new derivationClass({
              change: current[0][0],
              address: current[1][0]
            });
          } else if (derivationName === 'Monero') {
            derivation = new derivationClass({
              minor: current[0][0],
              major: current[1][0]
            });
          } else if (derivationName === 'HDW') {
            derivation = new derivationClass({
              account: current[0][0],
              ecc: current[1][0],
              address: current[2][0]
            });
          } else {
            const path = 'm/' + current.map(([v, h]) => `${v}${h ? "'" : ''}`).join('/');
            derivation = new derivationClass({ path });
          }

          this.updateDerivation(derivation);
          derivationsList.push(this.getDump(['root', ...exclude]));
          return [derivation.getPath()];
        }

        const [head, ...rest] = derivations;
        const result: string[] = [];

        if (isRangeTuple(head)) {
          const [start, end, hardened] = head;
          for (let i = start; i <= end; i++) {
            result.push(...driveHelper(rest, [...current, [i, hardened]]));
          }
        } else {
          result.push(...driveHelper(rest, [...current, head]));
        }
        return result;
      };
      return driveHelper(args);
    };

    drive(...(this.derivation.getDerivations() as ([number, number, boolean] | [number, boolean])[]));

    if (exclude.includes('root')) {
      return derivationsList;
    }

    const rootDump = this.getDump(['derivation', ...exclude]);

    if (!exclude.includes('derivations')) {
      rootDump['derivations'] = derivationsList;
    }
    return excludeKeys(rootDump, exclude);
  }
}
