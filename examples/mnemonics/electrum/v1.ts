// examples/bip39_example.ts

// import { BIP39Mnemonic } from "../src/mnemonics/bip39";
// import { bytesToHex } from "../src/utils";

import { randomBytes } from "crypto";
import { ElectrumV1Mnemonic, ELECTRUM_V1_MNEMONIC_LANGUAGES, ELECTRUM_V1_MNEMONIC_WORDS } from "../../../src/mnemonics/electrum/v1/mnemonic";
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from "../../../src/entropies/electrum/v1";

/**
 * Example demonstrating BIP39Mnemonic usage:
 */
function runExample() {
  // const entropyHex = ElectrumV1Entropy.generate(
  //     ELECTRUM_V1_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  // );
  const entropyHex = "724bf9ce32db1baa801761c4f11fe901";
  console.log("Entropy (hex):", entropyHex);

  // 2) Convert entropy → mnemonic phrase
  // const mnemonicObj = ElectrumV1Mnemonic.fromWords(
  //     ELECTRUM_V1_MNEMONIC_WORDS.TWENTY_FIVE, ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH
  // );
  const mnemonicObj = ElectrumV1Mnemonic.fromEntropy(
      entropyHex, ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH, { checksum: true }
  );
  console.log("Mnemonic phrase:", mnemonicObj.mnemonic());

  // 3) Decode mnemonic back → entropy bytes
  const decodedBytes = ElectrumV1Mnemonic.decode(mnemonicObj.mnemonic());
  // const decodedBytes = ElectrumV1Mnemonic.decode(
  //     "inform attitude erode wheat december virtual husband skin sea deny already satoshi ghost evolve crouch cheese flag twenty arm utility alter riot roof ability grace"
  // );
  console.log(
    "Decoded matches original?",
    decodedBytes === entropyHex, decodedBytes
  );
}


runExample();

