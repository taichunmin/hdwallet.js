import { Component, ViewChild } from '@angular/core';
import { EntropyComponent } from './entropy/entropy.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { PassphraseComponent } from './passphrase/passphrase.component';
import { SeedComponent } from './seed/seed.component';

@Component({
  selector: 'app-tools',
  imports: [
    EntropyComponent,
    MnemonicComponent,
    PassphraseComponent,
    SeedComponent
  ],
  templateUrl: './tools.html',
  styleUrl: './tools.css'
})
export class ToolsComponent {

  @ViewChild(EntropyComponent) entropyComponent!: EntropyComponent;
  @ViewChild(MnemonicComponent) mnemonicComponent!: MnemonicComponent;
  @ViewChild(SeedComponent) seedComponent!: SeedComponent;
  @ViewChild(PassphraseComponent) passphraseComponent!: PassphraseComponent;
}
