import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate, Voter } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private voters: Voter[] = [{
    id: '1',
    name: 'Peppa',
    hasVoted: false
  },
  {
    id: '2',
    name: 'Rumcajs',
    hasVoted: true
  }];
  private candidates: Candidate[] = []
  private voters$: BehaviorSubject<Voter[]> = new BehaviorSubject(this.voters);
  private candidates$: BehaviorSubject<Candidate[]> = new BehaviorSubject(this.candidates);


  constructor() { }

  addVoter(voter: Voter): void {
    this.voters.push(voter);
    this.updateVoters();
  }

  addCandidate(candidate: Candidate): void {
    this.candidates.push(candidate);
    this.updateCandidates();
  }

  getVoters(): Observable<Voter[]> {
    return this.voters$;
  }

  getCandidates(): Observable<Candidate[]> {
    return this.candidates$;
  }

  updateCandidatesVotes(id: string): void {
    const index = this.candidates.findIndex(candidate => candidate.id === id);

    this.candidates[index].votes++;
    this.updateCandidates();
  }

  updateVotersStatus(id: string): void {
    const index = this.voters.findIndex(voter => voter.id === id);

    this.voters[index].hasVoted = true;
    this.updateVoters();
  }

  private updateVoters(): void {
    this.voters$.next(this.voters);
  }

  private updateCandidates(): void {
    this.candidates$.next(this.candidates);
  }
}
