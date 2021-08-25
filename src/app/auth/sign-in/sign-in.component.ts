import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  data!: { name: string; image: string; description: string; dateLastEdited: string; }[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [, Validators.required ],
      password: [, Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log("logged in with ", this.loginForm.controls.email.value);
      this.storageService.setItem({key: 'user', value: this.loginForm.controls.email.value})
      this.router.navigate(['/']);
    }
  }

}
