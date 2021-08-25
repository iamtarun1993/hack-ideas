import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, noop, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
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
  sortByOptions!: { value: string; label: string; }[];

  constructor(
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.challenges$ = this.challengesBehaviorSubject.pipe(
      switchMap(() => this.challengesService.getAllChallenges())
    );

    this.sortByOptions = [
      {
        value: 'likes',
        label: 'Likes'
      },
      {
        value: 'created_at',
        label: 'Created At'
      }
    ]
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

  doSomething(selectedOption: any) {
    const value = selectedOption.value;

    if (value === 'likes') {
      this.challenges$ = this.challenges$.pipe(
        map((challeges) => {
          return challeges.sort((first: Challenges, second: Challenges) => {
            return (first.no_of_likes > second.no_of_likes) ? 1 : -1
          })
        })
      )
    } else if (value === 'created_at') {
      this.challenges$ = this.challenges$.pipe(
        map((challeges) => {
          return challeges.sort((first: Challenges, second: Challenges) => {
            return (first.created_at > second.created_at) ? 1 : -1
          })
        })
      )
    }

  }

}
