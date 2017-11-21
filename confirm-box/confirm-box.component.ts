import { Component, Input, Inject,  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sktn-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class SktnConfirmBoxComponent {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialog: MdDialogRef<SktnConfirmBoxComponent>
  ) { }

  confirm() {
    
    if(this.data.href) {
      window.open(
        this.data.href,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    this.dialog.close(true);
  }

}
