// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, WitnessVersions, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x1c;
    static SCRIPT_ADDRESS_PREFIX = 0x0a;
    static HRP = 'cp';
    static WITNESS_VERSIONS = new WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2
    });
    static MESSAGE_PREFIX = '\x18Bitcoin Signed Message:\n';
    static WIF_PREFIX = 0x7b;
}
export class CranePay extends Cryptocurrency {
    static NAME = 'Crane-Pay';
    static SYMBOL = 'CRP';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/cranepay/cranepay-core',
        WEBSITES: [
            'https://cranepay.io'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.CranePay;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = CranePay.NETWORKS.MAINNET;
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
    static DEFAULT_HD = CranePay.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${CranePay.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = CranePay.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=cranepay.js.map