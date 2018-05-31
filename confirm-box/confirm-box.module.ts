import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';

import { SktnConfirmBoxComponent } from './confirm-box.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    SktnConfirmBoxComponent
  ],
  exports: [
    SktnConfirmBoxComponent,
    MatDialogModule
  ]
})
export class SktnConfirmBoxModule { }
