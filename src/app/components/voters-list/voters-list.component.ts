import { AddParticipantDialogComponent } from '../add-participant-dialog/add-participant-dialog.component';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Voter } from 'src/app/models/person';
import { filter, Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-voters-list',
  templateUrl: './voters-list.component.html',
  styleUrls: ['./voters-list.component.scss'],
})
export class VotersListComponent {
  @Input() voters$: Observable<Voter[]> = of([]);
  @Output() addParticipantEvent = new EventEmitter<Voter>();

  displayedColumns = ['name', 'voted'];

  constructor(public dialog: MatDialog) { }

  addParticipant(): void {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent);

    dialogRef.afterClosed().pipe(filter(result => result)).subscribe(result => {
      const createdVoter = new Voter(result.name);

      this.addParticipantEvent.emit(createdVoter);
    })

  }


}
