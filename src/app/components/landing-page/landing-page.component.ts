import { ParticipantsService } from './../../services/participants.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, Voter } from './../../models/person';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  voters$: Observable<Voter[]>;
  candidates$: Observable<Candidate[]>;

  constructor(private participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.voters$ = this.participantsService.getVoters();
    this.candidates$ = this.participantsService.getCandidates();
  }

  addVoter(voter: Voter): void {
    this.participantsService.addVoter(voter);
  }

  addCandidate(candidate: Candidate): void {
    this.participantsService.addCandidate(candidate);
  }

}
