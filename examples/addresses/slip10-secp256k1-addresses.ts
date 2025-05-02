// SPDX-License-Identifier: MIT

import { Buffer } from "buffer";
import { IPrivateKey, IPublicKey, SLIP10Secp256k1PrivateKey, } from "../../src/ecc";
import {
  P2PKHAddress,
  P2SHAddress,
  P2TRAddress,
  P2WPKHAddress,
  P2WPKHInP2SHAddress,
  P2WSHAddress,
  P2WSHInP2SHAddress
} from "../../src/addresses";
import { PUBLIC_KEY_TYPES } from "../../src/const";
import { bytesToString } from "../../src/utils";
import { Bitcoin } from '../../src/cryptocurrencies';


const PRIVATE_KEY: IPrivateKey = SLIP10Secp256k1PrivateKey.fromBytes(
  Buffer.from(
    "be3851aa7822b92deb2f34655e41a40fd510f6cf9aa2a4f0c4d7a4bc81f0ad74", "hex"
  )
);
console.log("Private Key:", bytesToString(PRIVATE_KEY.raw()));

const PUBLIC_KEY: IPublicKey = PRIVATE_KEY.publicKey();
console.log("Uncompressed Public Key:", bytesToString(PUBLIC_KEY.rawUncompressed()));
console.log("Compressed Public Key:", bytesToString(PUBLIC_KEY.rawCompressed()), "\n");


const p2pkhAddress: string = P2PKHAddress.encode(PUBLIC_KEY, {
  publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
});
const p2pkhAddressHash: string = P2PKHAddress.decode(p2pkhAddress, {
  publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX
});
console.log("P2PKH Address:", p2pkhAddress, p2pkhAddressHash);

const p2shAddress: string = P2SHAddress.encode(PUBLIC_KEY, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
});
const p2shAddressHash: string = P2SHAddress.decode(p2shAddress, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX
});
console.log("P2SH Address:", p2shAddress, p2shAddressHash);

const p2trAddress: string = P2TRAddress.encode(PUBLIC_KEY, {
  hrp: Bitcoin.NETWORKS.MAINNET.HRP,
  witnessVersion: Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2TR
});
const p2trAddressHash: string = P2TRAddress.decode(p2trAddress, {
  hrp: Bitcoin.NETWORKS.MAINNET.HRP
});
console.log("P2TR Address:", p2trAddress, p2trAddressHash);

const p2wpkhAddress: string = P2WPKHAddress.encode(PUBLIC_KEY, {
  hrp: Bitcoin.NETWORKS.MAINNET.HRP,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
  witnessVersion: Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH
});
const p2wpkhAddressHash: string = P2WPKHAddress.decode(p2wpkhAddress, {
  hrp: Bitcoin.NETWORKS.MAINNET.HRP
});
console.log("P2WPKH Address:", p2wpkhAddress, p2wpkhAddressHash);

const p2wpkhInP2SHAddress: string = P2WPKHInP2SHAddress.encode(PUBLIC_KEY, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
});
const p2wpkhInP2SHAddressHash: string = P2WPKHInP2SHAddress.decode(p2wpkhInP2SHAddress, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX
});
console.log("P2WPKH-In-P2SH Address:", p2wpkhInP2SHAddress, p2wpkhInP2SHAddressHash);

const p2wshAddress: string = P2WSHAddress.encode(PUBLIC_KEY, {
  hrp: Bitcoin.NETWORKS.MAINNET.HRP,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
  witnessVersion: Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WSH
});
const p2wshAddressHash: string = P2WSHAddress.decode(p2wshAddress, {
  hrp: Bitcoin.NETWORKS.MAINNET.HRP
});
console.log("P2WSH Address:", p2wshAddress, p2wshAddressHash);

const p2wshInP2SHAddress: string = P2WSHInP2SHAddress.encode(PUBLIC_KEY, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
  publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
});
const p2wshInP2SHAddressHash: string = P2WSHInP2SHAddress.decode(p2wshInP2SHAddress, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX
});
console.log("P2WSH-In-P2SH Address:", p2wshInP2SHAddress, p2wshInP2SHAddressHash);
