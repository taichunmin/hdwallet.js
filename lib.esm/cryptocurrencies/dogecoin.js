// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, WitnessVersions, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x1e;
    static SCRIPT_ADDRESS_PREFIX = 0x16;
    static HRP = 'dogecoin';
    static WITNESS_VERSIONS = new WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        DOGECOIN: 0x02fac398,
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        DOGECOIN: 0x02facafd,
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2
    });
    static MESSAGE_PREFIX = '\x19Dogecoin Signed Message:\n';
    static WIF_PREFIX = 0xf1;
}
export class Testnet extends Network {
    static NAME = 'testnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x71;
    static SCRIPT_ADDRESS_PREFIX = 0xc4;
    static HRP = 'dogecointestnet';
    static WITNESS_VERSIONS = new WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        DOGECOIN: 0x04358394,
        P2PKH: 0x04358394,
        P2SH: 0x04358394,
        P2WPKH: 0x04358394,
        P2WPKH_IN_P2SH: 0x04358394
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        DOGECOIN: 0x043587cf,
        P2PKH: 0x043587cf,
        P2SH: 0x043587cf,
        P2WPKH: 0x043587cf,
        P2WPKH_IN_P2SH: 0x043587cf
    });
    static MESSAGE_PREFIX = '\x19Dogecoin Signed Message:\n';
    static WIF_PREFIX = 0xf1;
}
export class Dogecoin extends Cryptocurrency {
    static NAME = 'Dogecoin';
    static SYMBOL = 'DOGE';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/dogecoin/dogecoin',
        WHITEPAPER: 'https://github.com/dogecoin/dogecoin/blob/master/README.md',
        WEBSITES: [
            'http://dogecoin.com'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.Dogecoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Dogecoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Dogecoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Dogecoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = Dogecoin.ADDRESSES.P2PKH;
    static SEMANTICS = ['dogecoin', 'p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh'];
    static DEFAULT_SEMANTIC = 'dogecoin';
}
//# sourceMappingURL=dogecoin.js.map