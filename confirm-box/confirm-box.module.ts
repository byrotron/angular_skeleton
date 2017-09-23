import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdButtonModule } from '@angular/material';

import { SktnConfirmBoxComponent } from './confirm-box.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule
  ],
  declarations: [
    SktnConfirmBoxComponent
  ]
})
export class SktnConfirmBoxModule { }
