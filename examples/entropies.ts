import { BIP39Entropy }         from "../src/entropies/bip39";
import { ElectrumV1Entropy }    from "../src/entropies/electrum/v1";
import { ElectrumV2Entropy }    from "../src/entropies/electrum/v2";
import { MoneroEntropy }        from "../src/entropies/monero";
import { AlgorandEntropy }      from "../src/entropies/algorand";
import { IEntropy }             from "../src/entropies/ientropy";
import { bytesToHex, hexToBytes }           from "../src/utils";

/**
 * Demonstration of each entropy type usage:
 */
function runEntropyExamples() {
  console.log("=== BIP39 Entropy (128 bits) ===");
  const bipHex = BIP39Entropy.generate(128);
  const bipBytes = hexToBytes(bipHex);
  console.log("Entropy Hex:", bipHex);
  console.log("Entropy Bytes:", bipBytes);
  console.log("Strength: 128 bits");
  console.log();

  console.log("=== Electrum V1 Entropy ===");
  console.log("bipHex:", bipHex);
  const electrum1 = new ElectrumV1Entropy(bipHex);
  console.log("Is Valid:", ElectrumV1Entropy.isValid(bipHex));
  console.log("Hex:", electrum1.entropy());
  console.log("Bytes:", hexToBytes(electrum1.entropy()));
  console.log();

  console.log("=== Electrum V2 Entropy ===");
  const electrum1e = ElectrumV2Entropy.generate(132);
  // const electrum2 = new ElectrumV2Entropy(bipHex);
  console.log("Hex:", electrum1e);
  // console.log("Bytes:", electrum2.bytes);
  // console.log("Mnemonic words:", electrum2.words);
  // console.log();

  console.log("=== Monero Entropy (256 bits) ===");
  const moneroHex = MoneroEntropy.generate(256);
  const moneroBytes = hexToBytes(moneroHex);
  console.log("Hex:", moneroHex);
  console.log("Bytes:", moneroBytes);
  console.log();

  console.log("=== Algorand Entropy (256 bits) ===");
  const algoHex = AlgorandEntropy.generate(256);
  const algoBytes = hexToBytes(algoHex);
  console.log("Hex:", algoHex);
  console.log("Bytes:", algoBytes);
  console.log();

  console.log("=== Validate Hex ===");
  // console.log("Is valid hex entropy?", AlgorandEntropy.isValid(algoHex));
}

runEntropyExamples();

