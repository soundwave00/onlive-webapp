import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ErrorDialogData {
  title?: string;
  description: string;
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
  ) {
    if(data.title == undefined)
      data.title = 'Attenzione'
  }

}
