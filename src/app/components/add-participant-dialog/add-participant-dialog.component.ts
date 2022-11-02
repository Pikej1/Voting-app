import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-participant-dialog',
  templateUrl: './add-participant-dialog.component.html',
  styleUrls: ['./add-participant-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddParticipantDialogComponent {
  name = new FormControl('', Validators.required)

  constructor(public dialogRef: MatDialogRef<AddParticipantDialogComponent>) { }

  addParticipant(): void {
    this.dialogRef.close({ name: this.name.value })
  }
}
