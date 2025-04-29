// examples/bip39_example.ts

// import { BIP39Mnemonic } from "../src/mnemonics/bip39";
// import { bytesToHex } from "../src/utils";

import { randomBytes } from "crypto";
import { bytesToHex } from "../src/utils";
import { BIP39Mnemonic, BIP39_MNEMONIC_LANGUAGES } from "../src/mnemonics/bip39/mnemonic";
import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from "../src/entropies/bip39";

/**
 * Example demonstrating BIP39Mnemonic usage:
 */
function runExample() {
  // 1) Generate 128-bit entropy
  // const entropyHex = BIP39Entropy.generate(
  //     BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_SIXTY
  // );
  const entropyHex = "00000000000000000000000000000000";
  console.log("Entropy (hex):", entropyHex);

  // 2) Convert entropy → mnemonic phrase
  // const mnemonicObj = BIP39Mnemonic.fromWords(15, BIP39_MNEMONIC_LANGUAGES.ENGLISH);
  const mnemonicObj = BIP39Mnemonic.fromEntropy(entropyHex, BIP39_MNEMONIC_LANGUAGES.ENGLISH);
  console.log("Mnemonic phrase:", mnemonicObj.mnemonic());

  // 3) Decode mnemonic back → entropy bytes
  const decodedBytes = BIP39Mnemonic.decode(mnemonicObj.mnemonic());
  console.log(
    "Decoded matches original?",
    decodedBytes === entropyHex, decodedBytes
  );
}


runExample();

