import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import {
  AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { take } from 'rxjs/operators';

import { SEEDS } from '@hdwallet/core/seeds';
import { Cardano } from '@hdwallet/core/cryptocurrencies';

import {
  replaceHyphen2Underscore, replaceUnderscore2Hyphen, toLowerCase,  toTitleCase
} from '../../../../../../utils';
import { TerminalService } from '../../../../../services/terminal/terminal.service';
import { CustomComboboxComponent } from '../../../../../common/custom-combobox/custom-combobox.component';
import { GroupBoxService } from '../../../../../services/group-box/group-box.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { ComboboxInterface, DictionaryInterface, SeedInterface } from '../../../../../../interfaces';
import { ELECTRUM_V2_MNEMONIC_TYPES } from '@hdwallet/core/mnemonics';

@Component({
  selector: 'app-seed',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomComboboxComponent,
    FormsModule
  ],
  templateUrl: './seed.html',
  styleUrls: ['./seed.css']
})
export class SeedComponent implements OnInit {

  isLoading: boolean = false;
  clients: ComboboxInterface[] = SEEDS.getNames().map(
    (item: string): ComboboxInterface => ({ name: item, value: item })
  );
  cardanoTypes: ComboboxInterface[] = this.getCardanoTypes();
  mnemonicTypes: ComboboxInterface[] = this.getMnemonicTypes();
  seedFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public terminalService: TerminalService,
    private storageService: StorageService,
    public groupBoxService: GroupBoxService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.seedFormGroup = this.formBuilder.group({
      client: [this.clients[1].value, [Validators.required]],
      cardanoType: [null],
      mnemonicType: [null],
      mnemonic: [null, [Validators.required]],
      passphrase: [null]
    });
  }

  updateFormGroup(key: string, value: any, emitEvent: boolean = true, timeout: number = 0): void {
    if (timeout > 0) {
      setTimeout(() => {
        this.seedFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
        this.changeDetectorRef.markForCheck();
      }, timeout);
    } else {
      this.seedFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
      this.changeDetectorRef.markForCheck();
    }
  }

  updateClient(client: string, emitEvent: boolean = true, timeout: number = 0): void {
    this.seedFormGroup.get('cardanoType')?.setValidators(client === 'Cardano' ? [Validators.required] : []);
    this.seedFormGroup.get('cardanoType')?.updateValueAndValidity();
    this.seedFormGroup.get('mnemonicType')?.setValidators(client === 'Electrum-V2' ? [Validators.required] : []);
    this.seedFormGroup.get('mnemonicType')?.updateValueAndValidity();
    this.updateFormGroup('cardanoType', client === 'Cardano' ? 'shelley-icarus' : null, emitEvent, timeout);
    this.updateFormGroup('mnemonicType', client === 'Electrum-V2' ? 'standard' : null, emitEvent, timeout);
    this.updateFormGroup('mnemonic', null, emitEvent, timeout);
    this.updateFormGroup('passphrase', null, emitEvent, timeout);
  }

  ngOnInit(): void {
    this.seedFormGroup.get('client')?.valueChanges.subscribe((client: string) => { this.updateClient(client, true, 1); });
    if (this.storageService.getStorage('disclaimer') !== 'true') {
      this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
        if (params.get('generate')?.toString().toLowerCase() === 'seed') {
          this.storageService.setStorage('action', 'seed');
          this.router.navigateByUrl(this.router.url);
        }
      });
    } else {
      this.initFromURL('seed');
    }
  }

  initFromURL(generate: string): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      if (params.get('generate')?.toString().toLowerCase() === generate) {
        this.activatedRoute.queryParams.pipe(take(1)).subscribe((queries: Params) => {
          let queryParams: DictionaryInterface = replaceHyphen2Underscore(queries);
          queryParams = this.setQueryValues(queryParams, 'client');
          for (let key of this.getControls(this.seedFormGroup.get('client')?.value)) {
            queryParams = this.setQueryValues(queryParams, key);
          }
          if (this.seedFormGroup.get('client')?.value === 'Cardano' &&
            ['byron-ledger', 'shelley-ledger'].includes(this.seedFormGroup.get('cardanoType')?.value)
          ) { queryParams = this.setQueryValues(queryParams, 'passphrase'); }
          queryParams = this.setQueryValues(queryParams, 'generate');
          this.router.navigate(
            ['generate', generate], { queryParams: replaceUnderscore2Hyphen(queryParams), replaceUrl: true }
          );
        });
      }
    });
  }

  getCardanoTypes(): ComboboxInterface[] {
    return Object.values(Cardano.TYPES).map(
      (item: string): ComboboxInterface => ({ name: toTitleCase(item), value: item })
    ) || [];
  }

  getMnemonicTypes(): ComboboxInterface[] {
    return Object.values(ELECTRUM_V2_MNEMONIC_TYPES).map(
      (item: string): ComboboxInterface => ({ name: toTitleCase(item), value: item })
    ) || [];
  }

  setQueryValues(queries: DictionaryInterface, key: string): DictionaryInterface {
    const queryParams = { ...queries };
    if (key === 'client' && queryParams[key]) {
      queryParams[key] = toTitleCase(queryParams[key]);
      const clients: string[] = this.clients.map((item: ComboboxInterface) => item.value);
      if (clients.includes(queryParams[key])) {
        this.updateFormGroup('client', queryParams[key], false);
        this.updateClient(queryParams[key], false);
      } else {
        queryParams[key] = clients[1];
        this.updateFormGroup('client', queryParams[key], false);
        this.updateClient(queryParams[key], false);
        this.terminalService.update(
          `Unknown '${queries[key]}' client, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('seed', 'warning');
      }
    } else if (key === 'mnemonic_type' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      const mnemonicTypes: string[] = this.mnemonicTypes.map((item: ComboboxInterface) => item.value);
      if (mnemonicTypes.includes(queryParams[key])) {
        this.updateFormGroup('mnemonicType', queryParams[key], true);
      } else {
        queryParams[key] = mnemonicTypes[0];
        this.updateFormGroup('mnemonicType', queryParams[key], true);
        this.terminalService.update(
          `Unknown '${queries[key]}' mnemonic type, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('seed', 'warning');
      }
    } else if (key === 'cardano_type' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      const cardanoTypes: string[] = this.cardanoTypes.map((item: ComboboxInterface) => item.value);
      if (cardanoTypes.includes(queryParams[key])) {
        this.updateFormGroup('cardanoType', queryParams[key], true);
      } else {
        queryParams[key] = 'shelley-icarus';
        this.updateFormGroup('cardanoType', queryParams[key], true);
        this.terminalService.update(
          `Unknown '${queries[key]}' cardano type, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('seed', 'warning');
      }
    } else if (key === 'generate' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        if (queryParams[key] === 'true') {
          setTimeout(() => { this.generateSeed(this.seedFormGroup.value) }, 1);
        }
      } else {
        queryParams[key] = false;
        this.terminalService.update(
          `Invalid '${queries[key]}' generate, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('seed', 'warning');
      }
    } else if (['mnemonic', 'passphrase'].includes(key) && queryParams[key]) {
      this.updateFormGroup(key, queryParams[key], true);
    }
    return queryParams;
  }

  getControls(client: string): string[] {
    let controls: string[] = [];
    if (['Algorand', 'Electrum-V1', 'Monero'].includes(client)) {
      controls = ['mnemonic'];
    } else if (client === 'BIP39') {
      controls = ['mnemonic', 'passphrase'];
    } else if (client === 'Electrum-V2') {
      controls = ['mnemonic_type', 'mnemonic', 'passphrase'];
    } else if (client === 'Cardano') {
      controls = ['cardano_type', 'mnemonic'];
    }
    return controls;
  }

  isInvalid(controls: string[]): boolean {
    for (const name of controls) {
      const control: AbstractControl<any, any> | null = this.seedFormGroup.get(name);
      if (control?.invalid && control.errors) {
        if (control.errors['required']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} is required`, 'error');
        }
        return true;
      }
    }
    return false;
  }

  generateSeed(seed: SeedInterface): void {
    this.isLoading = true;
    if (this.isInvalid(['client', 'cardanoType', 'mnemonicType', 'mnemonic'])) {
      this.groupBoxService.update('seed', 'error');
      this.isLoading = false;
      return;
    }

    try {
      const result: any = {
        'client': seed.client,
        'seed': SEEDS.getSeedClass(seed.client).fromMnemonic(seed.mnemonic, {
          mnemonicType: seed.mnemonicType, cardanoType: seed.cardanoType, passphrase: seed.passphrase
        })
      };
      if (seed.client === 'Electrum-V2') {
        result['mnemonic-type'] = seed.mnemonicType;
      } else if (seed.client === 'Cardano') {
        result['cardano-type'] = seed.cardanoType;
      }
      this.terminalService.update(result, 'json');
      this.groupBoxService.update(null, null);
    } catch (error) {
      this.terminalService.update(`Invalid ${seed.client} seed`, 'error');
      this.groupBoxService.update('seed', 'error');
    }
    this.isLoading = false;
  }
}
