import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-success-modal',
  imports: [TranslateModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
  constructor(private dialogRef: MatDialogRef<SuccessModalComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
