#!/usr/bin/env ts-node

import { Buffer } from "buffer";
import { IPrivateKey, IPublicKey, SLIP10Secp256k1PrivateKey, } from "../../src/ecc";
import {
  P2PKHAddress,
  P2SHAddress
} from "../../src/addresses";
import { PUBLIC_KEY_TYPES } from "../../src/const";
import { bytesToString } from "../../src/utils";
import { Bitcoin } from '../../src/cryptocurrencies';


const PRIVATE_KEY: IPrivateKey = SLIP10Secp256k1PrivateKey.fromBytes(
  Buffer.from(
    "b66022fff8b6322f8b8fa444d6d097457b6b9e7bb05add5b75f9c827df7bd3b6", "hex"
  )
);
console.log("Private Key:", bytesToString(PRIVATE_KEY.raw()));

const PUBLIC_KEY: IPublicKey = PRIVATE_KEY.publicKey();
console.log("Uncompressed Public Key:", bytesToString(PUBLIC_KEY.rawUncompressed()));
console.log("Compressed Public Key:", bytesToString(PUBLIC_KEY.rawCompressed()), "\n");


const p2pkhAddress: string = P2PKHAddress.encode(PUBLIC_KEY, {
  publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX, publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED
});
const p2pkhAddressHash: string = P2PKHAddress.decode(p2pkhAddress, {
  publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX
});
console.log("P2PKH Address:", p2pkhAddress, p2pkhAddressHash);

const p2shAddress: string = P2SHAddress.encode(PUBLIC_KEY, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX, publicKeyType: PUBLIC_KEY_TYPES.UNCOMPRESSED
});
const p2shAddressHash: string = P2SHAddress.decode(p2shAddress, {
  scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX
});
console.log("P2SH Address:", p2shAddress, p2shAddressHash);
