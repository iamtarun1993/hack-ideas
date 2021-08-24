import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenges } from '../interfaces/challenges';
import { StorageService } from './storage.service';
import { map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  storageKey: string;


  constructor(
    private storageService: StorageService
  ) { 
    this.storageKey = 'Challenges'
  }

  dummyChallnges: Challenges[] = [
    {
      id: 1,
      name: 'July Circuit',
      no_of_likes: 10,
      description: `Circuits is a coding marathon to challenge developers with several programming questions of varying difficulty levels over 7 days. 
        The questions are created by multiple problem setters from our developer community. 
        Bring to light your logical minds by solving algorithmic programming problems.Circuits take place during the third and fourth week of every month.
        July Circuits ’21 challenges you with 8 problems and the timeline is as follows:`,
      tags: ['FEATURE'],
      is_liked: false
    },
    {
      id: 2,
      name: 'August Circuit',
      no_of_likes: 20,
      description: `Circuits is a coding marathon to challenge developers with several programming questions of varying difficulty levels over 7 days. 
        The questions are created by multiple problem setters from our developer community. 
        Bring to light your logical minds by solving algorithmic programming problems.Circuits take place during the third and fourth week of every month.
        August Circuits ’21 challenges you with 8 problems and the timeline is as follows:`,
      tags: ['FEATURE', 'TECH'],
      is_liked: false
    },
    {
      id: 3,
      name: 'September Circuit',
      no_of_likes: 30,
      description: `Circuits is a coding marathon to challenge developers with several programming questions of varying difficulty levels over 7 days. 
        The questions are created by multiple problem setters from our developer community. 
        Bring to light your logical minds by solving algorithmic programming problems.Circuits take place during the third and fourth week of every month.
        September Circuits ’21 challenges you with 8 problems and the timeline is as follows:`,
      tags: ['TECH'],
      is_liked: false
    }
  ]
  

  getAllChallenges(): Observable<Challenges[]> {
    return this.storageService.getItem(this.storageKey).pipe(
      switchMap((item) => {
        if (item) {
          return of(item);
        } else {
          return this.setStorage(this.dummyChallnges).pipe(
            switchMap(() => {
              return of(this.dummyChallnges)
            })
          )
        }
      })
    )
  }

  getChallengeById(id: number): Observable<Challenges> {
    return this.getAllChallenges().pipe(
      map((challenges) => {
        let challenge = challenges.filter(challenge => {
          return challenge.id === id;
        })
        return challenge[0];
      })
    )
  }

  putChallenge(updatedChallenge: Challenges){
    return this.getAllChallenges().pipe(
      map((challenges) => {
        let updatedChallengs = challenges.map(challenge => {
          if (challenge.id === updatedChallenge.id) {
            challenge = updatedChallenge
          }
          return challenge;
        })
        return updatedChallengs;
      }),
      switchMap((updatedChallnegs) => {
        return this.setStorage(updatedChallnegs);
      })
    )

  }


  setStorage(challenges: Challenges[]) {
    return this.storageService.setItem({
      key: this.storageKey, 
      value: challenges
    })
  }

  
}
