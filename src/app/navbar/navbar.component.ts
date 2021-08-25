import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$!: Observable<any>;
  userBehaviorSubject = new BehaviorSubject(1);


  constructor(
    private storageService: StorageService,
    private router: Router
  ) { 
    this.router.events.subscribe((events) => {
      this.userBehaviorSubject.next(1);
    })
  }

  ngOnInit(): void {
    this.user$ = this.userBehaviorSubject.pipe(
      switchMap(() => this.storageService.getItem('user'))
    )
  }

  logout() {
    this.storageService.removeItem('user').subscribe(() => {
      this.userBehaviorSubject.next(1);
      this.router.navigate(['/', 'sign_in']);
    })
  }

}
