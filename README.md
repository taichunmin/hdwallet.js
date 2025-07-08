# Hierarchical Deterministic (HD) Wallet

> [!WARNING]
> This library is still under development and not ready for production use.

[![npm version](https://img.shields.io/npm/v/@hdwallet/core)](https://www.npmjs.com/package/@hdwallet/core)
![NPM License](https://img.shields.io/npm/l/%40hdwallet%2Fcore?color=%23000000)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40hdwallet%2Fcore)

A complete Hierarchical Deterministic (HD) Wallet generator for 200+ cryptocurrencies, built with TypeScript.

> The library is designed to be flexible and scalable, making it ideal for developers who need to integrate multi-currency wallet functionalities into their applications. 
> It supports standard protocols for compatibility with other wallets and services, offering features like secure seed creation, efficient key management, and easy account handling.
>
> This library simplifies the complexity of blockchain interactions and enhances security for end-users. 

| Features                      | Protocols                                                                                                                                                                                                                                                                                                                                                                                                             |
|:------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cryptocurrencies              | <a href="https://hdwallet.io/cryptocurrencies">#supported-cryptocurrencies</a>                                                                                                                                                                                                                                                                                                                                        |
| Entropies                     | ``Algorand``, ``BIP39``, ``Electrum-V1``, ``Electrum-V2``, ``Monero``                                                                                                                                                                                                                                                                                                                                                 |
| Mnemonics                     | ``Algorand``, ``BIP39``, ``Electrum-V1``, ``Electrum-V2``, ``Monero``                                                                                                                                                                                                                                                                                                                                                 |
| Seeds                         | ``Algorand``, ``BIP39``, ``Cardano``, ``Electrum-V1``, ``Electrum-V2``, ``Monero``                                                                                                                                                                                                                                                                                                                                    |
| Elliptic Curve Cryptography's | ``Kholaw-Ed25519``, ``SLIP10-Ed25519``, ``SLIP10-Ed25519-Blake2b``, ``SLIP10-Ed25519-Monero``, ``SLIP10-Nist256p1``, ``SLIP10-Secp256k1``                                                                                                                                                                                                                                                                             |
| Hierarchical Deterministic's  | ``BIP32``, ``BIP44``, ``BIP49``, ``BIP84``, ``BIP86``, ``BIP141``, ``Cardano``, ``Electrum-V1``, ``Electrum-V2``, ``Monero``                                                                                                                                                                                                                                                                                          |
| Derivations                   | ``BIP44``, ``BIP49``, ``BIP84``, ``BIP86``, ``CIP1852``, ``Custom``, ``Electrum``, ``Monero``, ``HDW (Our own custom derivation)``                                                                                                                                                                                                                                                                                    |
| Addresses                     | ``Algorand``, ``Aptos``, ``Avalanche``, ``Cardano``, ``Cosmos``, ``EOS``, ``Ergo``, ``Ethereum``, ``Filecoin``, ``Harmony``, ``Icon``, ``Injective``, ``Monero``, ``MultiversX``, ``Nano``, ``Near``, ``Neo``, ``OKT-Chain``, ``P2PKH``, ``P2SH``, ``P2TR``, ``P2WPKH``, ``P2WPKH-In-P2SH``, ``P2WSH``, ``P2WSH-In-P2SH``, ``Ripple``, ``Solana``, ``Stellar``, ``Sui``, ``Tezos``, ``Tron``, ``XinFin``, ``Zilliqa`` |
| Others                        | ``Wallet Import Format``, ``Serialization``                                                                                                                                                                                                                                                                                                                                                                           |

## Installation

Pick the build that matches your environment.

### Node.js / Bundlers

Full TypeScript typings included, works out-of-the-box with ts-node and standard bundlers.

```shell
npm install @hdwallet/core
```

### Browser (no build step)

The bundled library is available in the `./dist/` folder in this repo.

#### ESM

Modern module build, `import …` straight in the browser or any ESM-aware bundler.

```html
<script type="module">
  import { hdwallet } from './dist/hdwallet.min.js';
</script>
```

#### UDM

Standalone browser build, load via `<script>` and access as `window.hdwallet`.

```html
<script src="./dist/hdwallet.udm.min.js" type="text/javascript"></script>
```

## Quick Usage

> [!NOTE]
> Full documentation is coming soon — until then, explore the [examples](https://github.com/hdwallet-io/hdwallet.js/blob/master/examples) folder for every feature or check the [python-hdwallet](https://github.com/hdwallet-io/python-hdwallet) docs (APIs are almost identical).

```node
// bitcoin.hdwallet.ts

import { HDWallet } from '@hdwallet/core';
import { BIP39_ENTROPY_STRENGTHS, BIP39Entropy } from '@hdwallet/core/entropies';
import { BIP39_MNEMONIC_LANGUAGES } from '@hdwallet/core/mnemonics';
import { Bitcoin as Cryptocurrency } from '@hdwallet/core/cryptocurrencies';
import { CustomDerivation } from '@hdwallet/core/derivations';
import { PUBLIC_KEY_TYPES } from '@hdwallet/core/consts';
import { BIP32HD } from '@hdwallet/core/hds';

const hdwallet: HDWallet = new HDWallet(Cryptocurrency, {
  hd: BIP32HD,
  network: Cryptocurrency.NETWORKS.MAINNET,
  language: BIP39_MNEMONIC_LANGUAGES.KOREAN,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
  passphrase: 'talonlab'
}).fromEntropy(new BIP39Entropy(
  BIP39Entropy.generate(
    BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
  )
)).fromDerivation(new CustomDerivation({
  path: 'm/0\'/0/0-1'  // Cryptocurrency.DEFAULT_PATH
}));

// console.log(JSON.stringify(hdwallet.getDump(['indexes']), null, 4));
console.log(JSON.stringify(hdwallet.getDumps(['indexes']), null, 4));
```

<details open>
  <summary>Output</summary><br/>

```json
{
    "cryptocurrency": "Bitcoin",
    "symbol": "BTC",
    "network": "mainnet",
    "coin-type": 0,
    "entropy": "00000000000000000000000000000000",
    "strength": 128,
    "mnemonic": "가격 가격 가격 가격 가격 가격 가격 가격 가격 가격 가격 가능",
    "passphrase": "talonlab",
    "language": "korean",
    "seed": "4e415367c4a4d57ed9737ca50d2f8bf38a274d1d7fb3dd6598c759101c595cdf54045dbaeb216cf3751ce47862c41ff79caf961ca6c2aed11854afeb5efc1ab7",
    "ecc": "SLIP10-Secp256k1",
    "hd": "BIP32",
    "semantic": "p2pkh",
    "root-xprivate-key": "xprv9s21ZrQH143K4L18AD5Ko2ELW8bqaGLW4vfASZzo9yEN8fkZPZLdECXWXAMovtonu7DdEFwJuYH31QT96FWJUfkiLUVT8t8e3WNDiwZkuLJ",
    "root-xpublic-key": "xpub661MyMwAqRbcGp5bGEcLAAB54ASKyj4MS9amExQQiJmM1U5hw6esmzqzNQtquzBRNvLWtPC2kRu2kZR888FSAiZRpvKdjgbmoKRCgGM1YEy",
    "root-private-key": "7f60ec0fa89064a37e208ade560c098586dd887e2133bee4564af1de52bc7f5c",
    "root-wif": "L1VKQooPmgVLD35vHMeprus1zFYx58bHGMfTz8QYTEnRCzbjwMoo",
    "root-chain-code": "e3fa538b530821c258bc7a7915945b7a7184632c1c36a6f165f52690984633b0",
    "root-public-key": "023e23967b818fb3959f2056b6e6449a65c4982c1267398d8897b921ab53b0be4b",
    "strict": true,
    "public-key-type": "compressed",
    "wif-type": "wif-compressed",
    "derivations": [
        {
            "at": {
                "path": "m/0'/0/0",
                "depth": 3,
                "index": 0
            },
            "xprivate-key": "xprv9ygweU6CCkHDimDhPBgbfpi5cLBJpQQhKKRTmn4FdV8QFJ6d2ykk4rwbjftRqZi4qf4NH5ASXnQFYy5misVR3bbLu5pFtNUh83zorMeedVk",
            "xpublic-key": "xpub6CgJ3yd637qWwFJAVDDc2xepAN1oDs8YgYM4aATsBpfP86RmaX4zcfG5avjbFfogEdYRfh7tGjH8sNWpxxsic1aZfaaPVEtZDeCy6rYPL9r",
            "private-key": "be3851aa7822b92deb2f34655e41a40fd510f6cf9aa2a4f0c4d7a4bc81f0ad74",
            "wif": "L3bURmbosdpWYiyn8RvSmg1kkPfw9aqKUhGaPamCsV6p4uwidip9",
            "chain-code": "4d3d731202c9b647b54a3f73de0868f02ac11ba4f9def204ec1b5831334088a9",
            "public-key": "02a6247d244d3bf7b8078940986226756a9eb3aaee97267dabef906c7357f1866b",
            "uncompressed": "04a6247d244d3bf7b8078940986226756a9eb3aaee97267dabef906c7357f1866b2cad34bdb883f6f0230ee513b756815fd8742da754af2d1c40cde277e3302da4",
            "compressed": "02a6247d244d3bf7b8078940986226756a9eb3aaee97267dabef906c7357f1866b",
            "fingerprint": "8af4ba43",
            "parent-fingerprint": "8ba1670b",
            "hash": "8af4ba43dcba0b2eac50e5acb44469e6436c0ac6",
            "addresses": {
                "p2pkh": "1DfjRSmJyQP79AL3Ww7wkSPPH65LCamWv4",
                "p2sh": "35dRc3fmPBMuhfgyKHPUG7sgeyJEw4yEoJ",
                "p2tr": "bc1pp47dx9trjs9307vfnvqtmtjlh7cd9hk45tw6d3t5ezj4u3n5aw5qvrpmum",
                "p2wpkh": "bc1q3t6t5s7uhg9jatzsukktg3rfuepkczkxy8qet0",
                "p2wpkh-in-p2sh": "3CBWzWcMVCSPbUaTMXTHXyWgXLr4JHEYeh",
                "p2wsh": "bc1qnxyylsl2flhdt5nudxpe87s7wssvwc666s064h8xlf2gmr670thsz3y88x",
                "p2wsh-in-p2sh": "3FLAK2eBsFb6rYU8dEHRVrAH18CmgBYWRy"
            }
        },
        {
            "at": {
                "path": "m/0'/0/1",
                "depth": 3,
                "index": 1
            },
            "xprivate-key": "xprv9ygweU6CCkHDmj3unNmBaXknTsrh9jzuY1acX2GQZ3pDrFMM4uskpf7CciYNKnXxs9YfDD173rxoCpErE3HzcNP5NSDhyKqtEoRW3wgd9ap",
            "xpublic-key": "xpub6CgJ3yd637qWzD8NtQJBwfhX1uhBZCikuEWDKQg27PMCj3gVcTC1NTRgU2Rdzzu9oS4tDnG2yNNmtmpDjo2XaUHFaNxSaJGUGimCq9pz4ma",
            "private-key": "408d26ffd1054c1bf670b9eb4596927a5a514e776a96c1207545b24164a39b3b",
            "wif": "KyPBzVhKq61epwjd8MokmKVT41yK35138HJkMHzSsj1DSDZ29RqH",
            "chain-code": "76cf29a3ec5cd3ff80042841729650ea0233c546996da51e9bc2aa55aeae0a3a",
            "public-key": "03b85939956927999c277753b088b79051a9b310bdf8bb5133b19e9d6afde53a2d",
            "uncompressed": "04b85939956927999c277753b088b79051a9b310bdf8bb5133b19e9d6afde53a2d916877edeca0bd2af66974947301610d672a706cf14ae52a42903670c002d6a1",
            "compressed": "03b85939956927999c277753b088b79051a9b310bdf8bb5133b19e9d6afde53a2d",
            "fingerprint": "2bcd7323",
            "parent-fingerprint": "8ba1670b",
            "hash": "2bcd7323743e0ad9b51a23c9c26ec665da7c4031",
            "addresses": {
                "p2pkh": "14zcB9bnKS86bPJWhbnkcvJE9RGFmM2TGq",
                "p2sh": "3LtKCT6Bgnrb9KPqxeMjztQSDhFM9p3B8A",
                "p2tr": "bc1p9tz8fvm389nmfg73pkw0ee4rxtdvg82mpt489rhunv5lys450htsjc4vtq",
                "p2wpkh": "bc1q90xhxgm58c9dndg6y0yuymkxvhd8csp32lpnzt",
                "p2wpkh-in-p2sh": "3QZdMy6k1aq5sZeSuGiv1gD7ec45mk4t87",
                "p2wsh": "bc1q36u54nlxk5vjpaynus04qlxrgntcyl6dl3p7vecn3xj37cqjphqsfvjjh4",
                "p2wsh-in-p2sh": "34BsDYDWzfC8D1HbVDtzRniW9ASwxT86KP"
            }
        }
    ]
}
```
</details>

## Contributing

Feel free to open an [issue](https://github.com/hdwallet-io/hdwallet.js/issues) if you find a problem,
or a pull request if you've solved an issue. And also any help in testing, development,
documentation and other tasks is highly appreciated and useful to the project.
There are tasks for contributors of all experience levels.

For more information, see the [CONTRIBUTING.md](https://github.com/hdwallet-io/hdwallet.js/blob/master/CONTRIBUTING.md) file.

## Donations

If this tool was helpful, support its development with a donation or a ⭐!

**EVM Chains** - 0xD3cbCB0B6F82A03C715D665b72dC44CEf54e6D9B / meherett.eth

**Bitcoin** - 16c7ajUwHEMaafrceuYSrd35SDjmfVdjoS

## License

Distributed under the [MIT](https://github.com/hdwallet-io/hdwallet.js/blob/master/LICENSE) license. See ``LICENSE`` for more information.
