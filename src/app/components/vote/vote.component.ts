import { ParticipantsService } from './../../services/participants.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Candidate, Voter } from './../../models/person';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent implements OnInit{
  @Input() voters$: Observable<Voter[]>;
  @Input() candidates$: Observable<Candidate[]>;

  voters: Voter[] = [];
  candidates: Candidate[] = [];
  votingForm = new FormGroup({
    voter: new FormControl('', Validators.required),
    candidate: new FormControl('', Validators.required)
  })

  constructor(private participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.voters$.subscribe(voters => {
      this.voters = voters.filter(voter => !voter.hasVoted);
    })
    this.candidates$.subscribe(candidates => this.candidates = candidates)
  }

  onSubmit(): void {
    const candidatesId = this.votingForm.controls.candidate.value;
    const votersId = this.votingForm.controls.voter.value;

    if (candidatesId) this.participantsService.updateCandidatesVotes(candidatesId);
    if (votersId) this.participantsService.updateVotersStatus(votersId);

    this.votingForm.reset();
  }

}
