import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import {
  AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { take } from 'rxjs/operators';

import { MNEMONICS, ELECTRUM_V2_MNEMONIC_TYPES } from '@hdwallet/core/mnemonics';

import { replaceUnderscore2Hyphen, toLowerCase, toTitleCase } from '../../../../../../utils';
import { CustomComboboxComponent } from '../../../../../common/custom-combobox/custom-combobox.component';
import { ComboboxInterface, DictionaryInterface, MnemonicInterface } from '../../../../../../interfaces';
import { TerminalService } from '../../../../../services/terminal/terminal.service';
import { GroupBoxService } from '../../../../../services/group-box/group-box.service';
import { StorageService } from '../../../../../services/storage/storage.service';

@Component({
  selector: 'app-mnemonic',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomComboboxComponent,
    FormsModule
  ],
  templateUrl: './mnemonic.html',
  styleUrls: ['./mnemonic.css']
})
export class MnemonicComponent implements OnInit {

  isLoading: boolean = false;
  clients: ComboboxInterface[] = MNEMONICS.getNames().map(
    (item: string): ComboboxInterface => ({ name: item, value: item })
  );
  languages: ComboboxInterface[] = this.getLanguages(this.clients[1].value);
  froms: ComboboxInterface[] = ['words', 'entropy'].map(
    (item: string): ComboboxInterface => ({ name: toTitleCase(item), value: item })
  );
  words: ComboboxInterface[] = this.getWords(this.clients[1].value);
  mnemonicTypes: ComboboxInterface[] = this.getMnemonicTypes();
  mnemonicFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public terminalService: TerminalService,
    private storageService: StorageService,
    public groupBoxService: GroupBoxService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.mnemonicFormGroup = this.formBuilder.group({
      client: [this.clients[1].value, [Validators.required]],
      language: ['english', [Validators.required]],
      from: ['words', [Validators.required]],
      words: [this.words[0].value],
      entropy: [null],
      mnemonicType: [null]
    });
  }

  updateFormGroup(key: string, value: any, emitEvent: boolean = true, timeout: number = 0): void {
    if (timeout > 0) {
      setTimeout(() => {
        this.mnemonicFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
        this.changeDetectorRef.markForCheck();
      }, timeout);
    } else {
      this.mnemonicFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
      this.changeDetectorRef.markForCheck();
    }
  }

  updateClient(client: string, emitEvent: boolean = true, timeout: number = 0): void {
    this.languages = this.getLanguages(client);
    this.words = this.getWords(client);
    this.mnemonicFormGroup.get('mnemonicType')?.setValidators(client === 'Electrum-V2' ? [Validators.required] : []);
    this.mnemonicFormGroup.get('mnemonicType')?.updateValueAndValidity();
    this.updateFormGroup('language', 'english', emitEvent, timeout);
    this.updateFormGroup('words', this.words[0].value, emitEvent, timeout);
    this.updateFormGroup('entropy', null, emitEvent, timeout);
    this.updateFormGroup('mnemonicType', client === 'Electrum-V2' ? 'standard' : null, emitEvent, timeout);
  }

  updateFrom(from: string, emitEvent: boolean = true, timeout: number = 0): void {
    this.mnemonicFormGroup.get('entropy')?.setValidators(from === 'entropy' ? [Validators.required] : []);
    this.mnemonicFormGroup.get('entropy')?.updateValueAndValidity();
    this.mnemonicFormGroup.get('words')?.setValidators(from === 'words' ? [Validators.required] : []);
    this.mnemonicFormGroup.get('words')?.updateValueAndValidity();
    this.updateFormGroup('words', from === 'words' ? this.words[0].value : null, emitEvent, timeout);
    this.updateFormGroup('entropy', null, emitEvent, timeout);
  }

  ngOnInit(): void {
    this.mnemonicFormGroup.get('client')?.valueChanges.subscribe((client: string) => { this.updateClient(client, true, 1); });
    this.mnemonicFormGroup.get('from')?.valueChanges.subscribe((from: string) => { this.updateFrom(from, true, 1) });
    if (this.storageService.getStorage('disclaimer') !== 'true') {
      this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
        if (params.get('tools')?.toString().toLowerCase() === 'mnemonic') {
          this.storageService.setStorage('action', 'mnemonic');
          this.router.navigateByUrl(this.router.url);
        }
      });
    } else {
      this.initFromURL('mnemonic');
    }
  }

  initFromURL(tools: string): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      if (params.get('tools')?.toString().toLowerCase() === tools) {
        this.activatedRoute.queryParams.pipe(take(1)).subscribe((queries: Params) => {
          let queryParams: DictionaryInterface = replaceUnderscore2Hyphen(queries);
          for (let key of ['client', 'from', 'language']) {
            queryParams = this.setQueryValues(queryParams, key);
          }
          if (this.mnemonicFormGroup.get('from')?.value === 'words') {
            queryParams = this.setQueryValues(queryParams, 'words');
          } else if (this.mnemonicFormGroup.get('from')?.value === 'entropy') {
            queryParams = this.setQueryValues(queryParams, 'entropy');
          }
          if (this.mnemonicFormGroup.get('client')?.value === 'Electrum-V2') {
            queryParams = this.setQueryValues(queryParams, 'mnemonic-type');
          }
          queryParams = this.setQueryValues(queryParams, 'generate');
          this.router.navigate(
            ['tools', tools], { queryParams: queryParams, replaceUrl: true }
          );
        });
      }
    });
  }

  getLanguages(client: string): ComboboxInterface[] {
    return MNEMONICS.getMnemonicClass(client).languages.map((item: string): ComboboxInterface => ({
      name: toTitleCase(item), value: item
    })) || [];
  }

  getWords(client: string): ComboboxInterface[] {
    return MNEMONICS.getMnemonicClass(client).wordsList.map((item: number): ComboboxInterface => ({
      name: item.toString(), value: item
    })) || [];
  }

  getMnemonicTypes(): ComboboxInterface[] {
    return Object.values(ELECTRUM_V2_MNEMONIC_TYPES).map(
      (item: string): ComboboxInterface => ({ name: toTitleCase(item), value: item })
    ) || [];
  }

  setQueryValues(queries: DictionaryInterface, key: string): DictionaryInterface {
    let queryParams: DictionaryInterface = { ...queries };
    const client: string = queryParams['client'] ? queryParams['client'] : this.mnemonicFormGroup.get('client')?.value
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
        this.groupBoxService.update('mnemonic', 'warning');
      }
    } else if (key === 'from' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['words', 'entropy'].includes(queryParams[key])) {
        this.updateFormGroup('from', queryParams[key], false);
        this.updateFrom(queryParams[key], false);
      } else {
        queryParams[key] = 'words';
        this.updateFormGroup('from', queryParams[key], false);
        this.updateFrom(queryParams[key], false);
        this.terminalService.update(
          `Wrong '${queries[key]}' from, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('mnemonic', 'warning');
      }
    } else if (key === 'language' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      const languages: string[] = this.languages.map((item: ComboboxInterface) => item.value);
      if (languages.includes(queryParams[key])) {
        this.updateFormGroup('language', queryParams[key], true);
      } else {
        queryParams[key] = 'english';
        this.updateFormGroup('language', queryParams[key], true);
        this.terminalService.update(
          `Unsupported '${queries[key]}' language by '${client}' client, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('mnemonic', 'warning');
      }
    } else if (key === 'words' && queryParams[key]) {
      queryParams[key] = Number(toLowerCase(queryParams[key]));
      const words: number[] = this.words.map((item: ComboboxInterface) => item.value);
      if (words.includes(queryParams[key])) {
        this.updateFormGroup('words', queryParams[key], true);
      } else {
        queryParams[key] = words[0];
        this.updateFormGroup('words', queryParams[key], true);
        this.terminalService.update(
          `Unsupported '${queries[key]}' words by '${client}' client, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('mnemonic', 'warning');
      }
    } else if (key === 'mnemonic-type' && queryParams[key]) {
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
        this.groupBoxService.update('mnemonic', 'warning');
      }
    } else if (key === 'generate' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        if (queryParams[key] === 'true') {
          setTimeout(() => { this.generateMnemonic(this.mnemonicFormGroup.value) }, 1);
        }
      } else {
        queryParams[key] = false;
        this.terminalService.update(
          `Invalid '${queries[key]}' generate, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('mnemonic', 'warning');
      }
    } else if (key === 'entropy' && queryParams[key]) {
      this.updateFormGroup(key, queryParams[key], true);
    }
    return queryParams;
  }

  isInvalid(controls: string[]): boolean {
    for (const name of controls) {
      const control: AbstractControl<any, any> | null = this.mnemonicFormGroup.get(name);
      if (control?.invalid && control.errors) {
        if (control.errors['required']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} is required`, 'error');
        }
        return true;
      }
    }
    return false;
  }

  generateMnemonic(mnemonic: MnemonicInterface): void {
    this.isLoading = true;
    if (this.isInvalid(['client', 'language', 'from', 'words', 'entropy', 'mnemonicType'])) {
      this.groupBoxService.update('mnemonic', 'error');
      this.isLoading = false;
      return;
    }

    try {
      const result: any = {
        'client': mnemonic.client,
        'language': mnemonic.language,
        'mnemonic': (mnemonic.from === 'entropy') ?
          MNEMONICS.getMnemonicClass(mnemonic.client).fromEntropy(
            mnemonic.entropy, mnemonic.language, { mnemonicType: mnemonic.mnemonicType }
          ) :
          MNEMONICS.getMnemonicClass(mnemonic.client).fromWords(
            mnemonic.words, mnemonic.language, { mnemonicType: mnemonic.mnemonicType }
          ),
        'words': mnemonic.words,
      };
      if (mnemonic.client === 'Electrum-V2') {
        result['mnemonic-type'] = mnemonic.mnemonicType;
      }
      this.terminalService.update(result, 'json');
      this.groupBoxService.update(null, null);
    } catch (error) {
      this.terminalService.update(`Invalid ${mnemonic.client} entropy`, 'error');
      this.groupBoxService.update('mnemonic', 'error');
    }
    this.isLoading = false;
  }
}
