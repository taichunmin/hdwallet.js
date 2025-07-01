import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getStorage(key: string): any {
    return localStorage.getItem(key);
  }

  public getJSONStorage(key: string): any {
    const item: null | string = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item);
  }

  public setStorage(key: string, value: string | boolean): StorageService {
    localStorage.setItem(key, value.toString());
    return this;
  }

  public appendStorage(key: string, value: string | boolean): StorageService {
    if(localStorage.getItem(key)) {
      localStorage.setItem(key, localStorage.getItem(key) + '\n' + value.toString());
      return this;
    }
    return this.setStorage(key, value);
  }

  public setJSONStorage(key: string, value: object | object []): StorageService {
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  public appendJSONStorage(key: string, value: object | object []): StorageService {
    if(localStorage.getItem(key)) {
      localStorage.setItem(key, localStorage.getItem(key) + '\n' + JSON.stringify(value));
      return this;
    }
    return this.setJSONStorage(key, value)
  }

  public clearStorage(key: string): StorageService {
    localStorage.removeItem(key);
    return this;
  }

  public clearJSONStorage(key: string): StorageService {
    localStorage.removeItem(key);
    return this;
  }

  public clear(): StorageService {
    localStorage.clear();
    return this;
  }

  public appendErrorStorage(key: string, errorMessage: string): void {
    const existingValue = localStorage.getItem(key);
    const errors = existingValue ? JSON.parse(existingValue) : [];
    errors.push({ error: errorMessage });
    localStorage.setItem(key, JSON.stringify(errors));
    console.log(`Stored error in ${key}:`, errorMessage); // For debugging
  }
}

