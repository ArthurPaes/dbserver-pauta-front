import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-voting-modal',
  templateUrl: './voting-modal.component.html',
  styleUrls: ['./voting-modal.component.scss'],
})
export class VotingModalComponent {

  constructor(private toastr: ToastrService) {}
  readonly dialogRef = inject(MatDialogRef<VotingModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  public pauta = this.data.pauta;
  public selectedAnswer: boolean | undefined = undefined

  onNoClick(): void {
    this.selectedAnswer = false;
  }

  onYesClick(): void {
    this.selectedAnswer = true;
  }

  onVoteClick(): void {
    this.dialogRef.close(this.selectedAnswer);
  }
}
