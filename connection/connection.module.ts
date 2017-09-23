import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdButtonModule  } from '@angular/material';

import { SktnConnectionComponent } from './connection.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule, 
    MdButtonModule 
  ],
  declarations: [
    SktnConnectionComponent
  ],
  exports: [
    SktnConnectionComponent
  ]
})
export class SktnConnectionModule { }
