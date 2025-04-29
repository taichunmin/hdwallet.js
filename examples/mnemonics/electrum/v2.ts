// examples/bip39_example.ts

// import { BIP39Mnemonic } from "../src/mnemonics/bip39";
// import { bytesToHex } from "../src/utils";

import { randomBytes } from "crypto";
import {
  ElectrumV2Mnemonic,
  ELECTRUM_V2_MNEMONIC_LANGUAGES,
  ELECTRUM_V2_MNEMONIC_WORDS,
    ELECTRUM_V2_MNEMONIC_TYPES
} from "../../../src/mnemonics/electrum/v2/mnemonic";
import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from "../../../src/entropies/electrum/v2";

/**
 * Example demonstrating BIP39Mnemonic usage:
 */
function runExample() {
  // const entropyHex = ElectrumV2Entropy.generate(
  //     ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  // );
  const entropyHex = "0c3a7d6111221a9a9f3f309ee2680aaa97";
  console.log("Entropy (hex):", entropyHex);

  // 2) Convert entropy → mnemonic phrase
  // const mnemonicObj = ElectrumV2Mnemonic.fromWords(
  //     ELECTRUM_V2_MNEMONIC_WORDS.TWENTY_FIVE, ELECTRUM_V2_MNEMONIC_LANGUAGES.ENGLISH
  // );
  const mnemonicObj = ElectrumV2Mnemonic.fromEntropy(
      entropyHex, ELECTRUM_V2_MNEMONIC_LANGUAGES.SPANISH, { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
  );
  console.log("Mnemonic phrase:", mnemonicObj.mnemonic());

  // 3) Decode mnemonic back → entropy bytes
  const decodedBytes = ElectrumV2Mnemonic.decode(
      mnemonicObj.mnemonic(), { mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD }
  );
  // const decodedBytes = ElectrumV2Mnemonic.decode(
  //     "inform attitude erode wheat december virtual husband skin sea deny already satoshi ghost evolve crouch cheese flag twenty arm utility alter riot roof ability grace"
  // );
  console.log(
    "Decoded matches original?",
    decodedBytes === entropyHex, decodedBytes
  );
}


runExample();

