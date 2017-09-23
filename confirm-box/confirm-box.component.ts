import { Component, Input, Inject,  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sktn-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class SktnConfirmBoxComponent {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: string,
    public dialog: MdDialogRef<SktnConfirmBoxComponent>
  ) { }

  confirm() {
    this.dialog.close(true);
  }

}
