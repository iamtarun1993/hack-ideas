import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, noop, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Challenges } from '../interfaces/challenges';
import { ChallengesService } from '../services/challenges.service';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.scss']
})
export class ChallengesListComponent implements OnInit {
  challengesBehaviorSubject = new BehaviorSubject(1);
  challenges$!: Observable<Challenges[]>;

  constructor(
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.challenges$ = this.challengesBehaviorSubject.pipe(
      switchMap(() => this.challengesService.getAllChallenges())
    );
  }

  liked(id: number) {
    this.challengesService.getChallengeById(id).pipe(
      map((challenge) => {
        return {
          ...challenge,
          is_liked: !challenge.is_liked,
          no_of_likes: !challenge.is_liked ? challenge.no_of_likes + 1 :  challenge.no_of_likes - 1
        }
      }),
      switchMap((res) => {
        return this.challengesService.putChallenge(res);
      })
    ).subscribe(() => this.challengesBehaviorSubject.next(1))
  }

}
