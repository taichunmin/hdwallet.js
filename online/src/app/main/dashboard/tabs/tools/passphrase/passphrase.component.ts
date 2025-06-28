import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { take } from 'rxjs/operators';

import {
  generatePassphrase, replaceUnderscore2Hyphen, toLowerCase, toTitleCase
} from '../../../../../../utils';
import { TerminalService } from '../../../../../services/terminal/terminal.service';
import { GroupBoxService } from '../../../../../services/group-box/group-box.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { DictionaryInterface, PassphraseInterface } from '../../../../../../interfaces';

@Component({
  selector: 'app-passphrase',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './passphrase.html',
  styleUrls: ['./passphrase.css']
})
export class PassphraseComponent implements OnInit {

  isLoading: boolean = false;
  passphraseFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public terminalService: TerminalService,
    private storageService: StorageService,
    public groupBoxService: GroupBoxService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.passphraseFormGroup = this.formBuilder.group({
      length: [12, [Validators.required, Validators.min(1), Validators.max(999), Validators.pattern(/^\d+$/)]],
      upperCase: [true],
      lowerCase: [true],
      numbers: [true],
      characters: [false]
    });
  }

  updateFormGroup(key: string, value: any, emitEvent: boolean = true, timeout: number = 0): void {
    if (timeout > 0) {
      setTimeout(() => {
        this.passphraseFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
        this.changeDetectorRef.markForCheck();
      }, timeout);
    } else {
      this.passphraseFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnInit(): void {
    if (this.storageService.getStorage('disclaimer') !== 'true') {
      this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
        if (params.get('tools')?.toString().toLowerCase() === 'passphrase') {
          this.storageService.setStorage('action', 'passphrase');
          this.router.navigateByUrl(this.router.url);
        }
      });
    } else {
      this.initFromURL('passphrase');
    }
  }

  initFromURL(tools: string): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      if (params.get('tools')?.toString().toLowerCase() === tools) {
        this.activatedRoute.queryParams.pipe(take(1)).subscribe((queries: Params) => {
          let queryParams: DictionaryInterface = replaceUnderscore2Hyphen(queries);
          for (let key of ['upper-case', 'numbers', 'lower-case', 'characters', 'length', 'generate']) {
            queryParams = this.setQueryValues(queryParams, key);
          }
          this.router.navigate(
            ['tools', tools], { queryParams: queryParams, replaceUrl: true }
          );
        });
      }
    });
  }

  setQueryValues(queries: DictionaryInterface, key: string): DictionaryInterface {
    const queryParams = { ...queries };
    if (key === 'upper-case' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        this.updateFormGroup('upperCase', queryParams[key] === 'true', true);
      } else {
        queryParams[key] = true;
        this.updateFormGroup('upperCase', queryParams[key], true);
        this.terminalService.update(
          `Invalid '${queries[key]}' upper case, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('passphrase', 'warning');
      }
    } else if (key === 'numbers' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        this.updateFormGroup('numbers', queryParams[key] === 'true', true);
      } else {
        queryParams[key] = true;
        this.updateFormGroup('numbers', queryParams[key], true);
        this.terminalService.update(
          `Invalid '${queries[key]}' numbers, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('passphrase', 'warning');
      }
    } else if (key === 'lower-case' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        this.updateFormGroup('lowerCase', queryParams[key] === 'true', true);
      } else {
        queryParams[key] = true;
        this.updateFormGroup('lowerCase', queryParams[key], true);
        this.terminalService.update(
          `Invalid '${queries[key]}' lower case, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('passphrase', 'warning');
      }
    } else if (key === 'characters' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        this.updateFormGroup('characters', queryParams[key] === 'true', true);
      } else {
        queryParams[key] = false;
        this.updateFormGroup('characters', queryParams[key], true);
        this.terminalService.update(
          `Invalid '${queries[key]}' characters, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('passphrase', 'warning');
      }
    } else if (key === 'generate' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        if (queryParams[key] === 'true') {
          setTimeout(() => { this.generatePassphrase(this.passphraseFormGroup.value) }, 1);
        }
      } else {
        queryParams[key] = false;
        this.terminalService.update(
          `Invalid '${queries[key]}' generate, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('passphrase', 'warning');
      }
    } else if (key === 'length' && queryParams[key]) {
      queryParams[key] = Number(toLowerCase(queryParams[key]));
      if (queryParams[key]) {
        this.updateFormGroup(key, queryParams[key], true);
      } else {
        queryParams[key] = 12;
        this.updateFormGroup(key, queryParams[key], true);
        this.terminalService.update(
          `Invalid '${queries[key]}' length, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('passphrase', 'warning');
      }
    }
    return queryParams;
  }

  isInvalid(controls: string[]): boolean {
    for (const name of controls) {
      const control: AbstractControl<any, any> | null = this.passphraseFormGroup.get(name);
      if (control?.invalid && control.errors) {
        if (control.errors['required']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} is required`, 'error');
        }
        if (control.errors['min']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} must be no less than ${control.errors['min'].min} in value`, 'error');
        }
        if (control.errors['max']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} must be no more than ${control.errors['max'].max} in value`, 'error');
        }
        if (control.errors['pattern']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} must be a number`, 'error');
        }
        return true;
      }
    }
    return false;
  }

  generatePassphrase(passphrase: PassphraseInterface): void {
    this.isLoading = true;
    if (this.isInvalid(['length'])) {
      this.groupBoxService.update('passphrase', 'error');
      this.isLoading = false;
      return;
    }

    if (!(
      passphrase.upperCase || passphrase.lowerCase || passphrase.numbers || passphrase.characters
    )) {
      this.updateFormGroup('upperCase', true, true);
      this.updateFormGroup('lowerCase', true, true);
      this.updateFormGroup('numbers', true, true);
      this.updateFormGroup('characters', false, true);
      const result: any = {
        'passphrase': generatePassphrase(
          Number(passphrase.length),
          this.passphraseFormGroup.get('upperCase')?.value,
          this.passphraseFormGroup.get('lowerCase')?.value,
          this.passphraseFormGroup.get('numbers')?.value,
          this.passphraseFormGroup.get('characters')?.value
        ),
        'length': Number(passphrase.length)
      };
      this.terminalService.update(
        `Select at least one option, defaulting to 'Upper Case', 'Lower Case', and 'Numbers'`, 'warning'
      );
      setTimeout(() => { this.terminalService.update(result, 'json'); }, 1);
      this.groupBoxService.update('passphrase', 'warning');
      this.isLoading = false;
    } else {
      const result: any = {
        'passphrase': generatePassphrase(
          Number(passphrase.length),
          passphrase.upperCase,
          passphrase.lowerCase,
          passphrase.numbers,
          passphrase.characters
        ),
        'length': Number(passphrase.length)
      };
      this.terminalService.update(result, 'json');
      this.groupBoxService.update(null, null);
      this.isLoading = false;
    }
  }
}
