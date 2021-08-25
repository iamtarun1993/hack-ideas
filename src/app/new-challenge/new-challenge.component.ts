import { TaggedTemplateExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { Challenges } from '../interfaces/challenges';
import { ChallengesService } from '../services/challenges.service';

@Component({
  selector: 'app-new-challenge',
  templateUrl: './new-challenge.component.html',
  styleUrls: ['./new-challenge.component.scss']
})
export class NewChallengeComponent implements OnInit {
  newChallengeForm!: FormGroup;
  tagsList!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private challengesService: ChallengesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.newChallengeForm = this.formBuilder.group({
      name: [, Validators.required],
      description: [, Validators.required],
      tags: [, Validators.required],
    })

    this.tagsList = ['FEATURE', 'TECH'];

  }

  addNewChallenge() {

    if (this.newChallengeForm.valid) {
      let newChallnege: Challenges = {
        ...this.newChallengeForm.value,
        created_at: new Date(),
        no_of_likes: 0
      }

      this.challengesService.postChallenge(newChallnege).subscribe(() => {
        this.router.navigate(['/']);
      });



    }

  }

}
