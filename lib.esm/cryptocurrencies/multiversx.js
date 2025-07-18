// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Ed25519ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static HRP = 'erd';
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
export class MultiversX extends Cryptocurrency {
    static NAME = 'MultiversX';
    static SYMBOL = 'EGLD';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/multiversx/mx-chain-go',
        WHITEPAPER: 'https://files.multiversx.com/multiversx-whitepaper.pdf',
        WEBSITES: [
            'https://multiversx.com',
            'https://multiversx.com/ecosystem'
        ]
    });
    static ECC = SLIP10Ed25519ECC;
    static COIN_TYPE = CoinTypes.MultiversX;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = MultiversX.NETWORKS.MAINNET;
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
    static DEFAULT_HD = MultiversX.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${MultiversX.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses({
        MULTIVERSX: 'MultiversX'
    });
    static DEFAULT_ADDRESS = MultiversX.ADDRESSES.MULTIVERSX;
    static SEMANTICS = ['p2pkh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=multiversx.js.map