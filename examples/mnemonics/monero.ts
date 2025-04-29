// examples/bip39_example.ts

// import { BIP39Mnemonic } from "../src/mnemonics/bip39";
// import { bytesToHex } from "../src/utils";

import { randomBytes } from "crypto";
import { bytesToHex } from "../../src/utils";
import { MoneroMnemonic, MONERO_MNEMONIC_LANGUAGES, MONERO_MNEMONIC_WORDS } from "../../src/mnemonics/monero/mnemonic";
import { MoneroEntropy, MONERO_ENTROPY_STRENGTHS } from "../../src/entropies/monero";

/**
 * Example demonstrating BIP39Mnemonic usage:
 */
function runExample() {
  // const entropyHex = MoneroEntropy.generate(
  //     MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  // );
  const entropyHex = "17b2a01b5af693b6024c31a3ed396dd6437dc181fa9aec313eb13c643c986b21";
  console.log("Entropy (hex):", entropyHex);

  // 2) Convert entropy → mnemonic phrase
  // const mnemonicObj = MoneroMnemonic.fromWords(
  //     MONERO_MNEMONIC_WORDS.TWENTY_FIVE, MONERO_MNEMONIC_LANGUAGES.ENGLISH
  // );
  const mnemonicObj = MoneroMnemonic.fromEntropy(
      entropyHex, MONERO_MNEMONIC_LANGUAGES.ENGLISH, { checksum: true }
  );
  console.log("Mnemonic phrase:", mnemonicObj.mnemonic());

  // 3) Decode mnemonic back → entropy bytes
  const decodedBytes = MoneroMnemonic.decode(mnemonicObj.mnemonic());
  // const decodedBytes = MoneroMnemonic.decode(
  //     "inform attitude erode wheat december virtual husband skin sea deny already satoshi ghost evolve crouch cheese flag twenty arm utility alter riot roof ability grace"
  // );
  console.log(
    "Decoded matches original?",
    decodedBytes === entropyHex, decodedBytes
  );
}


runExample();

