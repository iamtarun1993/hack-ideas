import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string): Observable<any> {
    let data = localStorage.getItem(key);
    if (data) {
      return of(JSON.parse(data));
    } else {
      return of(null)
    }
  }

  setItem(data: {key: string, value: any}): Observable<any> {
    data.value = JSON.stringify(data.value);
    return of(localStorage.setItem(data.key, data.value))
  }
}
