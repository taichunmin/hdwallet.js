// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, WitnessVersions, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x26;
    static SCRIPT_ADDRESS_PREFIX = 0x17;
    static HRP = 'btg';
    static WITNESS_VERSIONS = new WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878,
        P2WSH: 0x02aa7a99,
        P2WSH_IN_P2SH: 0x0295b005
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2,
        P2WSH: 0x02aa7ed3,
        P2WSH_IN_P2SH: 0x0295b43f
    });
    static MESSAGE_PREFIX = '\x1dBitcoin Gold Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
export class BitcoinGold extends Cryptocurrency {
    static NAME = 'Bitcoin-Gold';
    static SYMBOL = 'BTG';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/BTCGPU/BTCGPU',
        WHITEPAPER: 'https://github.com/BTCGPU/BTCGPU/wiki/Technical-Spec',
        WEBSITES: [
            'https://bitcoingold.org'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.BitcoinGold;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = BitcoinGold.NETWORKS.MAINNET;
    static ENTROPIES = new Entropies([
        'BIP39'
    ]);
    static MNEMONICS = new Mnemonics([
        'BIP39'
    ]);
    static SEEDS = new Seeds([
        'BIP39'
    ]);
    static HDS = new HDs([
        'BIP32',
        'BIP44'
    ]);
    static DEFAULT_HD = BitcoinGold.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${BitcoinGold.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
        'P2WSH',
        { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = BitcoinGold.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh', 'p2wsh', 'p2wsh-in-p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=bitcoingold.js.map