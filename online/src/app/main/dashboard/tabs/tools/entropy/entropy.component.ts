import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { take } from 'rxjs/operators';

import { ENTROPIES } from '@hdwallet/core/entropies';

import {
  toTitleCase, replaceHyphen2Underscore, replaceUnderscore2Hyphen, toLowerCase
} from '../../../../../../utils';
import { CustomComboboxComponent } from '../../../../../common/custom-combobox/custom-combobox.component';
import { ComboboxInterface, DictionaryInterface, EntropyInterface } from '../../../../../../interfaces';
import { TerminalService } from '../../../../../services/terminal/terminal.service';
import { GroupBoxService } from '../../../../../services/group-box/group-box.service';
import { StorageService } from '../../../../../services/storage/storage.service';

@Component({
  selector: 'app-entropy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomComboboxComponent
  ],
  templateUrl: './entropy.html',
  styleUrl: './entropy.css'
})
export class EntropyComponent implements OnInit {

  isLoading: boolean = false;
  clients: ComboboxInterface[] = ENTROPIES.getNames().map(
    (item: string): ComboboxInterface => ({ name: item, value: item })
  );
  strengths: ComboboxInterface[] = this.getStrengths(this.clients[1].value);
  entropyFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public terminalService: TerminalService,
    private storageService: StorageService,
    public groupBoxService: GroupBoxService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.entropyFormGroup = this.formBuilder.group({
      client: [this.clients[1].value, [Validators.required]],
      strength: [this.strengths[0].value, [Validators.required]]
    });
  }

  getStrengths(client: string): ComboboxInterface[] {
    return ENTROPIES.getEntropyClass(client).strengths.map(
      (item: number): ComboboxInterface => ({
        name: item.toString(), value: item
    })) || [];
  }

  updateFormGroup(key: string, value: any, emitEvent: boolean = true, timeout: number = 0): void {
    if (timeout > 0) {
      setTimeout(() => { this.entropyFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent }); }, timeout);
    } else {
      this.entropyFormGroup.get(key)?.setValue(value, { emitEvent: emitEvent });
    }
  }

  updateClient(client: string, emitEvent: boolean = true, timeout: number = 0): void {
    this.strengths = this.getStrengths(client);
    this.updateFormGroup('strength', this.strengths[0].value, emitEvent, timeout);
  }

  ngOnInit(): void {
    this.entropyFormGroup.get('client')?.valueChanges.subscribe((client: string) => { this.updateClient(client, true, 1); });
    if (this.storageService.getStorage('disclaimer') !== 'true') {
      this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
        if (params.get('tools')?.toString().toLowerCase() === 'entropy') {
          this.storageService.setStorage('action', 'entropy');
          this.router.navigateByUrl(this.router.url);
        }
      });
    } else {
      this.initFromURL('entropy');
    }
  }

  initFromURL(tools: string): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      if (params.get('tools')?.toString().toLowerCase() === tools) {
        this.activatedRoute.queryParams.pipe(take(1)).subscribe((queries: Params) => {
          let queryParams: DictionaryInterface = replaceHyphen2Underscore(queries);
          for (let key of ['client', 'strength', 'generate']) {
            queryParams = this.setQueryValues(queryParams, key);
          }
          this.router.navigate(
            ['tools', tools], { queryParams: replaceUnderscore2Hyphen(queryParams), replaceUrl: true }
          );
        });
      }
    });
  }

  setQueryValues(queries: DictionaryInterface, key: string): DictionaryInterface {
    const queryParams = { ...queries };
    const client: string = queryParams['client'] ? queryParams['client'] : this.entropyFormGroup.get('client')?.value
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
        this.groupBoxService.update('entropy', 'warning');
      }
    } else if (key === 'strength' && queryParams[key]) {
      queryParams[key] = Number(toLowerCase(queryParams[key]));
      const strengths: string[] = this.strengths.map((item: ComboboxInterface) => item.value);
      if (strengths.includes(queryParams[key])) {
        this.updateFormGroup('strength', queryParams[key], true);
      } else {
        queryParams[key] = strengths[0];
        this.updateFormGroup('strength', queryParams[key], true);
        this.terminalService.update(
          `Unsupported '${queries[key]}' strength by '${client}' client, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('entropy', 'warning');
      }
    } else if (key === 'generate' && queryParams[key]) {
      queryParams[key] = toLowerCase(queryParams[key]);
      if (['true', 'false'].includes(queryParams[key])) {
        if (queryParams[key] === 'true') {
          setTimeout(() => { this.generateEntropy(this.entropyFormGroup.value) }, 1);
        }
      } else {
        queryParams[key] = false;
        this.terminalService.update(
          `Invalid '${queries[key]}' generate, defaulting to '${queryParams[key]}'`, 'warning'
        );
        this.groupBoxService.update('entropy', 'warning');
      }
    }
    return queryParams;
  }

  isInvalid(controls: string[]): boolean {
    for (const name of controls) {
      const control: AbstractControl<any, any> | null = this.entropyFormGroup.get(name);
      if (control?.invalid && control.errors) {
        if (control.errors['required']) {
          this.terminalService.update(`${toTitleCase(toLowerCase(name, /_/g, '-'), /-/g, ' ')} is required`, 'error');
        }
        return true;
      }
    }
    return false;
  }

  generateEntropy(entropy: EntropyInterface): void {
    this.isLoading = true;
    if (this.isInvalid(['client', 'strength'])) {
      this.groupBoxService.update('entropy', 'error');
      this.isLoading = false;
      return;
    }

    this.terminalService.update({
      client: entropy.client,
      entropy: ENTROPIES.getEntropyClass(entropy.client).generate(entropy.strength),
      strength: entropy.strength
    }, 'json');
    this.groupBoxService.update(null, null);
    this.isLoading = false;
  }
}
