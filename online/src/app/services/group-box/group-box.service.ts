import { Injectable, signal } from '@angular/core';

import { GroupBoxInterface } from '../../../interfaces';
import { groupBox as gBox } from '../../../consts';

@Injectable({
  providedIn: 'root'
})
export class GroupBoxService {

  public groupBox = signal<GroupBoxInterface>(gBox);

  constructor() { }

  get box() {
    return this.groupBox();
  }

  update(name: string | null, flag: 'warning' | 'error' | null): void {
    let groupBox: GroupBoxInterface = gBox;
    groupBox.name = name;
    if (flag === 'warning') {
      groupBox.flag = groupBox.flags.warning;
    } else if (flag === 'error') {
      groupBox.flag = groupBox.flags.error;
    } else {
      groupBox.flag = groupBox.color;
    }
    this.groupBox.set(groupBox);
  }

  clear(): void {
    this.update(null, null);
  }
}
