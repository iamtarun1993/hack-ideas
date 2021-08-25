import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  async canActivate() {
    const user = await this.storageService.getItem('user').toPromise()
    if (!user) {
      this.router.navigate(['/', 'sign_in'])
      return false
    }
    return true;

  }
}
