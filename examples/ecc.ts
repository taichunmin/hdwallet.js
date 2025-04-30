// ecc_example.ts

import {
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey,
} from '../src/ecc/slip10/secp256k1';
import { ECCS, validateAndGetPublicKey } from '../src/ecc';
import { hexToBytes } from '../src/utils';

/**
 * Demonstration of SLIP10 Secp256k1 ECC operations in TypeScript
 */
function runEcExamples(): void {
  console.log('=== ECC Example: SLIP10 Secp256k1 ===\n');

  // Curve metadata
  console.log(`Curve Name  : ${SLIP10Secp256k1ECC.NAME}`);
  console.log(`Curve Order : 0x${SLIP10Secp256k1ECC.ORDER.toString(16)}\n`);

  // Generator point
  const G = SLIP10Secp256k1ECC.GENERATOR;
  console.log('Generator G:');
  console.log(`  x = 0x${G.x().toString(16)}`);
  console.log(`  y = 0x${G.y().toString(16)}\n`);

  // Example private key (hex)
  const privHex = 'b66022fff8b6322f8b8fa444d6d097457b6b9e7bb05add5b75f9c827df7bd3b6';
  const privBytes = hexToBytes(privHex);
  const privKey = SLIP10Secp256k1PrivateKey.fromBytes(privBytes);
  console.log(`Private Key (hex) : ${privHex}`);

  // Derive public key
  const pubKey = privKey.publicKey();
  const compHex = Buffer.from(pubKey.rawCompressed()).toString('hex');
  const uncompHex = Buffer.from(pubKey.rawUncompressed()).toString('hex');
  console.log(`Public Key (compressed)   : ${compHex}`);
  console.log(`Public Key (uncompressed) : ${uncompHex}\n`);

  // Parse point from public key
  const P = SLIP10Secp256k1Point.fromBytes(pubKey.rawCompressed());
  console.log('Point from Public Key:');
  console.log(`  x = 0x${P.x().toString(16)}`);
  console.log(`  y = 0x${P.y().toString(16)}\n`);

  // Scalar multiplication
  const k = BigInt(3);
  const kG = G.multiply(k);
  console.log('3 * G:');
  console.log(`  x = 0x${kG.x().toString(16)}`);
  console.log(`  y = 0x${kG.y().toString(16)}\n`);

  // Commutativity check
  const twoG = G.multiply(BigInt(2));
  const sum1 = G.add(twoG);
  const sum2 = twoG.add(G);
  const sumHex1 = Buffer.from(sum1.rawEncoded()).toString('hex');
  const sumHex2 = Buffer.from(sum2.rawEncoded()).toString('hex');
  console.log(`(G + 2G) === (2G + G)? ${sumHex1 === sumHex2}\n`);

  // Lookup via ECCS
  const eccClass = ECCS.ecc(SLIP10Secp256k1ECC.NAME);
  console.log(`Lookup ECC by name: ${eccClass.NAME}\n`);

  // Validate public key
  const validated = validateAndGetPublicKey(pubKey.rawCompressed(), SLIP10Secp256k1PublicKey);
  console.log(`Validated PublicKey instance: ${validated instanceof SLIP10Secp256k1PublicKey}\n`);
}

runEcExamples();
