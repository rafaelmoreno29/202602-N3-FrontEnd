import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorage(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getSessionStorage(key: string) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
