import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisabledStateService {

  private disabledSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  disabled$: Observable<boolean> = this.disabledSubject.asObservable();

  setDisabledState(isDisabled: boolean) {
    this.disabledSubject.next(isDisabled);
  }
}
