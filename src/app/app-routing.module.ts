import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { NewChallengeComponent } from './new-challenge/new-challenge.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: 'sign_in', component: SignInComponent},
  {path: '', component: ChallengesListComponent, canActivate: [AuthGuardService]},
  {path: 'test/:id', component: TestComponent},
  {path: 'new_challenge', component: NewChallengeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
