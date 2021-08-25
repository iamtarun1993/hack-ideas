import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'home', component: ChallengesListComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
