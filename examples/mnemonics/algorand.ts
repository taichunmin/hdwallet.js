// examples/bip39_example.ts

// import { BIP39Mnemonic } from "../src/mnemonics/bip39";
// import { bytesToHex } from "../src/utils";

import { randomBytes } from "crypto";
import { bytesToHex } from "../../src/utils";
import { AlgorandMnemonic, ALGORAND_MNEMONIC_LANGUAGES, ALGORAND_MNEMONIC_WORDS } from "../../src/mnemonics/algorand/mnemonic";
import { AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS } from "../../src/entropies/algorand";

/**
 * Example demonstrating BIP39Mnemonic usage:
 */
function runExample() {
  // const entropyHex = AlgorandEntropy.generate(
  //     ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  // );
  const entropyHex = "9cab03999e5f9cd1ff8dca0fae4e0ef6cbb038852627c1ca7a1704bf83e87637";
  console.log("Entropy (hex):", entropyHex);

  // 2) Convert entropy → mnemonic phrase
  // const mnemonicObj = AlgorandMnemonic.fromWords(
  //     ALGORAND_MNEMONIC_WORDS.TWENTY_FIVE, ALGORAND_MNEMONIC_LANGUAGES.ENGLISH
  // );
  const mnemonicObj = AlgorandMnemonic.fromEntropy(entropyHex, ALGORAND_MNEMONIC_LANGUAGES.ENGLISH);
  console.log("Mnemonic phrase:", mnemonicObj.mnemonic());

  // 3) Decode mnemonic back → entropy bytes
  const decodedBytes = AlgorandMnemonic.decode(mnemonicObj.mnemonic());
  // const decodedBytes = AlgorandMnemonic.decode(
  //     "inform attitude erode wheat december virtual husband skin sea deny already satoshi ghost evolve crouch cheese flag twenty arm utility alter riot roof ability grace"
  // );
  console.log(
    "Decoded matches original?",
    decodedBytes === entropyHex, decodedBytes
  );
}


runExample();

