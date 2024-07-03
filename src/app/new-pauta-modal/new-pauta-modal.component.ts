import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreateSectionRequest } from '../core/api/interfaces/ISection';
import { preventNonNumericCharacters } from '../utils/utilFunctions';
@Component({
  selector: 'app-new-pauta-modal',
  templateUrl: './new-pauta-modal.component.html',
  styleUrls: ['./new-pauta-modal.component.scss'],
})
export class NewPautaModalComponent {
  readonly dialogRef = inject(MatDialogRef<NewPautaModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  public newPauta: ICreateSectionRequest = {
    name: '',
    description: '',
    expiration: 1,
  };
  public preventNonNumeric = preventNonNumericCharacters;

  onNoClick(): void {
    this.dialogRef.close(this.newPauta);
  }
}
