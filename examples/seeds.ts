import {
  SEEDS,
  AlgorandSeed,
  BIP39Seed,
  CardanoSeed,
  ElectrumV1Seed,
  ElectrumV2Seed,
  MoneroSeed
} from '../src/seeds'

import {CardanoTypes} from '../src/seeds/cardano'

const algorandPhrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon invest'
const bip39Phrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
const electrumV1Phrase = 'harsh once sadness royal apart consume rabbit beam body accident guard disappear'
const electrumV2Phrase = 'lend strategy friend humble caught marine force coconut rail phrase pet raw'
const moneroPhrase = 'abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey abbey'

const passphrase = "hdwallet-io"

function runSeedExamples() {
  console.log('=== Seeds ===')

  // Algorand
  const algoSeed = AlgorandSeed.fromMnemonic(algorandPhrase)
  console.log(`AlgorandSeed.fromMnemonic => ${algoSeed}`)

  // BIP39
  const bip39Seed = BIP39Seed.fromMnemonic(bip39Phrase, passphrase)
  console.log(`BIP39Seed.fromMnemonic => ${bip39Seed}`)

  // Cardano Byron Icarus (default)
  const cardanoDefault = CardanoSeed.fromMnemonic(bip39Phrase)
  console.log(`CardanoSeed.fromMnemonic (Defualt Byron Icarus) => ${cardanoDefault}`)

  // Cardano Byron Ledger
  const cardanonBLedger = CardanoSeed.fromMnemonic(
    bip39Phrase,
    passphrase,
    CardanoTypes.BYRON_LEDGER
  )
  console.log(`CardanoSeed.fromMnemonic (Byron Ledger) => ${cardanonBLedger}`)

  // Cardano Byron Legacy
  const cardanoBLegacy = CardanoSeed.fromMnemonic(
    bip39Phrase,
    CardanoTypes.BYRON_LEGACY
  )
  console.log(`CardanoSeed.fromMnemonic (Byron Legacy) => ${cardanoBLegacy}`)
  
  // Cardano Shelley Ledger
  const cardanoSICarus = CardanoSeed.fromMnemonic(
    bip39Phrase,
    CardanoTypes.SHELLEY_ICARUS
  )
  console.log(`CardanoSeed.fromMnemonic (Shelley Icarus) => ${cardanoSICarus}`)

  // Cardano Shelley Ledger
  const cardanoShelley = CardanoSeed.fromMnemonic(
    bip39Phrase,
    passphrase,
    CardanoTypes.SHELLEY_LEDGER
  )
  console.log(`CardanoSeed.fromMnemonic (Shelley Ledger) => ${cardanoShelley}`)

  // Electrum V1
  const electrumV1Seed = ElectrumV1Seed.fromMnemonic(electrumV1Phrase)
  console.log(`ElectrumV1Seed.fromMnemonic => ${electrumV1Seed}`)

  // Electrum V2
  const electrumV2Seed = ElectrumV2Seed.fromMnemonic(electrumV2Phrase)
  console.log(`ElectrumV2Seed.fromMnemonic => ${electrumV2Seed}`)

  // Monero
  const moneroSeed = MoneroSeed.fromMnemonic(moneroPhrase)
  console.log(`MoneroSeed.fromMnemonic => ${moneroSeed}`)

}

runSeedExamples()