import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule  } from '@angular/material';

import { SktnConnectionComponent } from './connection.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule, 
    MatButtonModule 
  ],
  declarations: [
    SktnConnectionComponent
  ],
  exports: [
    SktnConnectionComponent
  ]
})
export class SktnConnectionModule { }
