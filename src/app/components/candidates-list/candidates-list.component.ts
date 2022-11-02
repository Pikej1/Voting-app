import { Candidate } from '../../models/person';
import { AddParticipantDialogComponent } from '../add-participant-dialog/add-participant-dialog.component';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent {
  @Input() candidates$: Observable<Candidate[]>;
  @Output() addParticipantEvent = new EventEmitter<Candidate>();

  displayedColumns = ['name', 'votes'];

  constructor(public dialog: MatDialog) { }

  addParticipant(): void {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent);

    dialogRef.afterClosed().pipe(filter(result => result)).subscribe(result => {
      const createdVoter = new Candidate(result.name);

      this.addParticipantEvent.emit(createdVoter);
    })
  }

}
